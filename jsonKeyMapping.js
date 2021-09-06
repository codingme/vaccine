const placeItems = {};
// 共通
// placeItems["pref_name"] = "都道府県";
// placeItems["city_name"] = "所在市";
placeItems["ward_name"] = "所在地区";
placeItems["facility_name"] = "名称";
placeItems["address"] = "住所";
placeItems["postal_code"] = "郵便番号";
placeItems["lat"] = "緯度";
placeItems["lng"] = "経度";
placeItems["ages"] = "対象年齢層";
placeItems["recept_as"] = "受入区分";
placeItems["reception"] = "受付/予約";
placeItems["workday"] = "受付時間";
placeItems["vaccine_type"] = "種別";
placeItems["remark"] = "備考";

// 大阪市
placeItems["exec_start"] = "接種開始時期";

const wards = {
  nagoya: [
    { text: "港区", value: "minato" },
    { text: "守山区", value: "moriyama" },
    { text: "昭和区", value: "showa" },
    { text: "瑞穂区", value: "mizuho" },
    { text: "西区", value: "nishi" },
    { text: "千種区", value: "chikusa" },
    { text: "中区", value: "naka" },
    { text: "中川区", value: "nakagawa" },
    { text: "中村区", value: "nakamura" },
    { text: "天白区", value: "tempaku" },
    { text: "東区", value: "higashi" },
    { text: "南区", value: "minami" },
    { text: "熱田区", value: "atsuta" },
    { text: "北区", value: "kita" },
    { text: "名東区", value: "meito" },
    { text: "緑区", value: "midori" }
  ],
  fukuoka: [
    { text: "中央区", value: "chuo" },
    { text: "東区", value: "higashi" },
    { text: "博多区", value: "hakata" },
    { text: "南区", value: "minami" },
    { text: "城南区", value: "jonan" },
    { text: "早良区", value: "sawara" },
    { text: "西区", value: "nishi" }
  ],
  kobe: [
    { text: "中央区", value: "chuo" },
    { text: "長田区", value: "nagata" },
    { text: "須磨区", value: "suma" },
    { text: "垂水区", value: "tarumi" },
    { text: "東灘区", value: "higashinada" },
    { text: "灘区", value: "nada" },
    { text: "西区", value: "nishi" },
    { text: "兵庫区", value: "hyogo" }
  ],
  yokohama: [
    { text: "鶴見区", value: "tsurumi" },
    { text: "神奈川区", value: "kanagawa" },
    { text: "西区", value: "nishi" },
    { text: "中区", value: "naka" },
    { text: "南区", value: "minami" },
    { text: "港南区", value: "konan" },
    { text: "保土ケ谷区", value: "hodogaya" },
    { text: "旭区", value: "asahi" },
    { text: "磯子区", value: "isogo" },
    { text: "金沢区", value: "kanazawa" },
    { text: "港北区", value: "kohoku" },
    { text: "青葉区", value: "aoba" },
    { text: "緑区", value: "midori" },
    { text: "都筑区", value: "tsuzuki" },
    { text: "戸塚区", value: "totsuka" },
    { text: "栄区", value: "sakae" },
    { text: "泉区", value: "izumi" },
    { text: "瀬谷区", value: "seya" }
  ],
  okayama: [
    { text: "北区", value: "kita" },
    { text: "中区", value: "naka" },
    { text: "東区", value: "higashi" },
    { text: "南区", value: "minami" }
  ],
  osaka: [
    { text: "中央区", value: "chuo" },
    { text: "北区", value: "kita" },
    { text: "都島区", value: "miyakojima" },
    { text: "福島区", value: "fukushima" },
    { text: "此花区", value: "konohana" },
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
  ],
  saitama: [
    { text: "中央区", value: "chuo" },
    { text: "西区", value: "nishi" },
    { text: "北区", value: "kita" },
    { text: "大宮区", value: "omiya" },
    { text: "見沼区", value: "minuma" },
    { text: "桜区", value: "sakura" },
    { text: "浦和区", value: "urawa" },
    { text: "南区", value: "minami" },
    { text: "緑区", value: "midori" },
    { text: "岩槻区", value: "iwatsuki" }
  ],
  tokyo23: [
    { text: "中央区", value: "chuo" },
    { text: "千代田区", value: "chiyoda" },
    { text: "台東区", value: "taito" },
    { text: "品川区", value: "shinagawa" },
    { text: "江東区", value: "koto" },
    { text: "港区", value: "minato" },
    { text: "渋谷区", value: "shibuya" },
    { text: "新宿区", value: "shinjuku" },
    { text: "目黒区", value: "meguro" },
    { text: "豊島区", value: "toshima" },
    { text: "荒川区", value: "arakawa" },
    { text: "杉並区", value: "suginami" },
    { text: "北区", value: "kita" },
  ]
};
