window.onload = () => {
  new Vue({
    el: "#app",
    data() {
      return {
        gmap: null,
        geocoder: null,
        places: null,
        markers: [],
        counter: 0,
        prefs: {
          osaka: "大阪府"
        },
        districts: {
          osaka: [{ en: "osaka", ja: "大阪市", wards: wards.osaka }]
        },
        cityPlaces: null,
        selectedPref: "osaka",
        selectedCity: { en: "osaka", ja: "大阪市" },
        selectedWard: { en: "chuo", ja: "中央区" },
        targetWard: "chuo"
      };
    },
    methods: {
      showPlaces: async function (city) {
        this.selectedCity = city;
        const { text, value } = wards[this.selectedCity.en].filter(
          (val, idx) => val.value === this.targetWard
        )[0];
        this.selectedWard = { en: value, ja: text };
        this.counter = 0;
        this.cityPlaces = null;
        this.places = null;
        for (let m of this.markers) {
          m.setMap(null);
        }
        this.markers = [];

        this.geocoder.geocode(
          {
            address:
              this.selectedWard.ja +
              "," +
              this.selectedCity.ja +
              "," +
              this.selectedPref
          },
          (results, status) => {
            this.gmap.setCenter(results[0].geometry.location);
          }
        );

        await this.downloadData();
        if (!this.places) {
          return false;
        }
        this.cityPlaces = await this.places.filter((place) => {
          return (
            this.selectedCity.en + this.selectedWard.en ===
            place.city_en + place.ward_en
          );
        });
        for (let p of this.cityPlaces) {
          this.counter++;
          // if (this.counter > 10) break;
          await new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.renderMarker(p)), 10);
          });
        }
      },
      renderMarker: function (place) {
        const infoWindow = new google.maps.InfoWindow({
          content:
            "<h4>" +
            place.facility_name +
            "</h4>" +
            (place.facility_kana ? place.facility_kana : "") +
            "<br/>" +
            Object.entries(place).reduce((acc, [key, val]) => {
              if (!val) {
                // Do not render to info window when nothing
                return acc;
              }
              if (
                [
                  "facility_name",
                  "lat",
                  "lng",
                  "city_en",
                  "ward_en",
                  "ward_name"
                ].includes(key)
              ) {
                // Do not render to info window for these items
                return acc;
              }
              return acc + placeItems[key] + ":" + val + "<br/>";
            }, [])
        });

        const marker = new google.maps.Marker({
          // position: { lat: 34.6937, lng: 135.5023 },
          position: { lat: Number(place.lat), lng: Number(place.lng) },
          map: this.gmap,
          label: { text: "接", color: "red", fontSize: "1.6em" },
          title: place.facility_name,
          icon: "http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png",
          animation: google.maps.Animation.DROP,
          optimized: true
        });
        this.markers.push(marker);
        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map: this.gmap
          });
        });
      },
      extractCsvToJson: function (csv) {
        const lines = csv.split(/[\r\n]+/gm); // Both Linux & Windows line-break
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
          let obj = {};
          const currentline = lines[i].split(",");
          if (!currentline) {
            continue;
          }

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j].replace('""', "")
              ? currentline[j]
              : null;
          }

          result.push(obj);
        }

        return result; //JavaScript object
        // return JSON.stringify(result); //JSON
      },
      addExtraInfoToPlaces: function () {
        // let counter = 0;
        for (let place of this.places) {
          // if (counter++ > 10) break;
          place.city_en = this.selectedCity.en;
          if (this.selectedCity.ja + this.selectedWard.ja === place.ward_name) {
            place.ward_en = this.selectedWard.en;
          }
        }
      },
      downloadData: async function () {
        await fetch(sources[this.selectedCity.en], {
          method: "get",
          headers: {
            "content-type": "text/csv;charset=UTF-8"
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then((csvData) => {
            this.places = this.extractCsvToJson(csvData);
            this.addExtraInfoToPlaces();
            console.debug(this.places[0]);
          });
      }
    },
    mounted() {
      this.gmap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.6937, lng: 135.5023 },
        zoom: 14
      });
      this.geocoder = new google.maps.Geocoder();
      this.showPlaces(this.selectedCity);
    }
  });
};
