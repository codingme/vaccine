const sources = {
  // 福岡県
  fukuoka: {
    data: "./data/fukuoka/fukuoka_kobetu_20210804.csv",
    link: "//www.city.fukuoka.lg.jp/hofuku/coronavaccine/wakutin.html",
    desc: "福岡市8月4日時点"
  },
  // 愛知県
  nagoya: {
    data: "./data/aichi/nagoya_kobetu_20210713.csv",
    link: "//www.city.nagoya.jp/kenkofukushi/page/0000136137.html#kobetusessyu",
    desc: "名古屋市7月13日時点"
  },
  nisshin: {
    data: "./data/aichi/nisshin_kobetu_20210801.csv",
    link: "//www.city.nisshin.lg.jp/department/kenko/kenko/6/2/2/news/1/11778.html",
    desc: "日進市8月1日時点"
  },
  // 千葉県
  matsudo: {
    data: "./data/chiba/matsudo_kobetu_20210726.csv",
    link: "//www.city.matsudo.chiba.jp/iryoutoshi/corona_vaccine/sesshubasho.html",
    desc: "松戸市7月26日時点"
  },
  // 兵庫県
  amagasaki: {
    data: "./data/hyogo/amagasaki_kobetu_20210713.csv",
    link:
      "//www.city.amagasaki.hyogo.jp/kurashi/kenko/kansensyo/1024145/1025559.html",
    desc: "尼崎市7月13日時点"
  },
  kobe: {
    data: "./data/hyogo/kobe_kobetu_20210806.csv",
    link:
      "//www.city.kobe.lg.jp/a73576/coronavaccine_iryokikanichiran.html",
    desc: "神戸市8月6日時点"
  },
  // 神奈川県
  yokohama: {
    data: "./data/kanagawa/yokohama_kobetu_20210705.csv",
    link:
      "//www.city.yokohama.lg.jp/kurashi/kenko-iryo/yobosesshu/vaccine/vaccine-portal/kobetsu-other.html",
    desc: "横浜市７月１日時点"
  },
  // 岡山県
  okayama: {
    data: "./data/okayama/okayama_kobetu_20210728.csv",
    link: "//www.city.okayama.jp/0000030645.html",
    desc: "岡山市2021年7月28日時点"
  },
  // 大阪府
  higashiosaka: {
    data: "./data/osaka/higashiosaka_kobetu_20210819.csv",
    link: "//www.city.higashiosaka.lg.jp/0000030178.html",
    desc: "東大阪市2021年8月19日時点"
  },
  hirakata: {
    data: "./data/osaka/hirakata_kobetu_20210708.csv",
    link: "//www.city.hirakata.osaka.jp/0000034803.html",
    desc: "枚方市2021年7月8日時点"
  },
  osaka: {
    data: "./data/osaka/osaka_kobetu_20210707.csv",
    link: "//data.city.osaka.lg.jp/data/dataset/data-00000577",
    desc: "大阪市2021年7月7日時点"
  },
  suita: {
    data: "./data/osaka/suita_kobetu_20210716.csv",
    link:
      "//www.city.suita.osaka.jp/home/soshiki/div-kenkoiryo/hokencjigyo/_107101/_107393.html",
    desc: "吹田市2021年7月16日時点"
  },
  takatsuki: {
    data: "./data/osaka/takatsuki_kobetu_20210821.csv",
    link:
      "http://www.city.takatsuki.osaka.jp/kakuka/kenkouf/kenkouir/gyomuannai/kenkoukikikanri/kenkoukikikanritaisakuhonnbu/corona_vaccine/vaccine_iryokikan.html",
    desc: "高槻市2021年8月21日時点"
  },
  toyonaka: {
    data: "./data/osaka/toyonaka_kobetu_20210710.csv",
    link:
      "//www.city.toyonaka.osaka.jp/kenko/kenko_hokeneisei/kekkaku_kansensho/covid19_vaccine/ticket_after/reserve.html",
    desc: "豊中市2021年7月10日時点"
  },
  // 埼玉県
  kawaguchi: {
    data: "./data/saitama/kawaguchi_kobetu_20210716.csv",
    link: "//www.city.kawaguchi.lg.jp/soshiki/01090/015/33582.html",
    desc: "川口市2021年7月16日時点"
  },
  saitama: {
    data: "./data/saitama/saitama_kobetu_20210716.csv",
    link: "//www.city.saitama.jp/002/001/008/006/013/008/p078570.html#3-3-a-a",
    desc: "さいたま市2021年7月16日時点"
  },
  // 東京都
  tokyo23: {
    data: "./data/tokyo/23wards_kobetu_202107--.csv",
    desc: "東京都23区7月10日時点"
  }
};
