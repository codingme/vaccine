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
          aichi: "愛知県",
          fukuoka: "福岡県",
          chiba: "千葉県",
          hyogo: "兵庫県",
          kanagawa: "神奈川県",
          okayama: "岡山県",
          osaka: "大阪府",
          saitama: "埼玉県",
          tokyo: "東京都"
        },
        districts: {
          aichi: [
            { en: "nagoya", ja: "名古屋市", wards: wards.nagoya },
            { en: "nisshin", ja: "日進市" }
          ],
          chiba: [{ en: "matsudo", ja: "松戸市" }],
          fukuoka: [{ en: "fukuoka", ja: "福岡市", wards: wards.fukuoka }],
          hyogo: [
            { en: "amagasaki", ja: "尼崎市" },
            { en: "kobe", ja: "神戸市", wards: wards.kobe }
          ],
          kanagawa: [{ en: "yokohama", ja: "横浜市", wards: wards.yokohama }],
          okayama: [{ en: "okayama", ja: "岡山市", wards: wards.okayama }],
          osaka: [
            { en: "higashiosaka", ja: "東大阪市" },
            { en: "hirakata", ja: "枚方市" },
            { en: "osaka", ja: "大阪市", wards: wards.osaka },
            { en: "suita", ja: "吹田市" },
            { en: "takatsuki", ja: "高槻市" },
            { en: "toyonaka", ja: "豊中市" }
          ],
          saitama: [
            { en: "kawaguchi", ja: "川口市" },
            { en: "saitama", ja: "さいたま市", wards: wards.saitama },
          ],
          tokyo: [{ en: "tokyo23", ja: "23区", wards: wards.tokyo23 }]
        },
        cityPlaces: null,
        selectedPref: "osaka",
        selectedCity: { en: "osaka", ja: "大阪市", wards: wards.osaka },
        selectedWard: { en: "chuo", ja: "中央区" },
        targetWard: "chuo",
        source: {}
      };
    },
    methods: {
      showPlaces: async function (city, prefecture) {
        this.selectedCity = city;
        if (prefecture) {
          this.selectedPref = prefecture;
          this.targetWard = wards[city.en] ? wards[city.en][0].value : "";
          await this.downloadData();
          if (!this.places) {
            return false;
          }
        }

        if (this.targetWard) {
          const { text, value } = wards[this.selectedCity.en].filter(
            (val, idx) => val.value === this.targetWard
          )[0];
          this.selectedWard = { en: value, ja: text };
        } else {
          this.selectedWard = { ja: "" };
        }
        this.counter = 0;
        this.cityPlaces = null;
        for (let m of this.markers) {
          m.setMap(null);
        }
        this.markers = [];

        // for those latlnt ambiguous
        let yakusyoList = [];
        switch (this.selectedCity.en) {
          case "fukuoka":
            yakusyoList = ["sawara", "nishi"];
            break;
          case "kobe":
            yakusyoList = ["chuo", "nada", "nishi"];
            break;
          case "okayama":
            yakusyoList = ["kita", "naka", "higashi", "minami"];
            break;
          default:
        }
        this.geocoder.geocode(
          {
            address:
              this.selectedWard.ja + (yakusyoList.includes(this.targetWard) ? "役所" : "") +
              "," +
              this.selectedCity.ja +
              "," +
              this.selectedPref
          },
          (results, status) => {
            this.gmap.setCenter(results[0].geometry.location);
          }
        );

        this.addExtraInfoToPlaces();
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
            "<a href='//www.google.com/maps/search/?api=1&query=" +
            encodeURI(place.address + "," + place.facility_name) +
            "'>" +
            place.facility_name +
            "</a>" +
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
                  // "ward_name"
                ].includes(key)
              ) {
                // Do not render to info window for these items
                return acc;
              }
              return (
                acc +
                "<span class='font-weight-light'>" +
                placeItems[key] +
                "</span>" +
                "&nbsp;<span class='font-weight-bold'>" +
                (("ward_name" === key) ? val.replace(this.prefs[this.selectedPref], "") : val) +
                "</span><br/>"
              );
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
          if (
            (this.selectedCity.en === "tokyo23"
              ? "東京都"
              : this.selectedCity.ja) +
            this.selectedWard.ja ===
            place.ward_name
          ) {
            place.ward_en = this.selectedWard.en;
          }
        }
      },
      downloadData: async function () {
        this.source = sources[this.selectedCity.en];
        await fetch(this.source.data, {
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
      this.showPlaces(this.selectedCity, this.selectedPref);
    }
  });
};
