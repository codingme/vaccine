const placeItems = {};
// 共通
placeItems["pref_name"] = "都道府県";
placeItems["city_name"] = "所在市";
placeItems["ward_name"] = "所在区";
placeItems["facility_name"] = "名称";
placeItems["address"] = "住所";
placeItems["lat"] = "緯度";
placeItems["lng"] = "経度";
placeItems["recept_as"] = "受入区分";
placeItems["vaccine_type"] = "種別";

// 大阪市
placeItems["exec_start"] = "接種開始時期";
const wards = {
  osaka: [
    { text: "北区", value: "kita" },
    { text: "都島区", value: "Miyakojima" },
    { text: "福島区", value: "fukushima" },
    { text: "此花区", value: "konohana" },
    { text: "中央区", value: "chuo" },
    { text: "西区", value: "nishi" },
    { text: "港区", value: "minato" },
    { text: "大正区", value: "taisho" },
    { text: "天王寺区", value: "tennojo" },
    { text: "浪速区", value: "naniwa" },
    { text: "西淀川区", value: "nishiyodogawa" },
    { text: "淀川区", value: "yodogawa" },
    { text: "東淀川区", value: "higashiyodogawa" },
    { text: "東成区", value: "higashinai" },
    { text: "生野区", value: "ikuno" },
    { text: "旭区", value: "asahi" },
    { text: "城東区", value: "jouto" },
    { text: "鶴見区", value: "joto" },
    { text: "阿倍野区", value: "abeno" },
    { text: "住之江区", value: "suminoe" },
    { text: "住吉区", value: "sumiyoshi" },
    { text: "東住吉区", value: "higashisumiyoshi" },
    { text: "平野区", value: "hirano" },
    { text: "西成区", value: "nishinari" }
  ]
};
