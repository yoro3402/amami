// ==========================================================================
// 🧭 瀬戸内検定 (画像入り3択版) - クイズデータ専用保管庫（1〜20問）
// ==========================================================================
const imageKenteiDatabase = [
    { q: "これは何の糞でしょうか？", img: "images/amaminokurousagi.webp", c: ["アマミノクロウサギ", "リュウキュウイノシシ", "ノヤギ"], a: 1 },
    { q: "このネズミの名は？", img: "images/kenaganezumi.webp", c: ["ケナガネズミ", "トゲネズミ", "クマネズミ"], a: 1 },
    { q: "このコウモリは何？", img: "images/oriikokikugasirakoumori.webp", c: ["エラブオオコウモリ", "オリイコキクガシラコウモリ", "イエコウモリ"], a: 2 },
    { q: "この動物は何？", img: "images/amaminokurousagi.webp", c: ["クマネズミ", "リュウキュウイノシシ", "アマミノクロウサギ"], a: 3 },
    { q: "この緑色のカエルは何?", img: "amaminokurousagi1.webp", c: ["アマミイシカワガエル", "リュウキュウカジカガエル", "アマミアオガエル"], a: 1 },
    { q: "このカエルは何？", img: "images/ottonngaeru.webp", c: ["リュウキュウカジカガエル", "ハロウエルアマガエル", "オットンガエル"], a: 3 },
    { q: "この動物は何？", img: "images/ryuukyuuaohebi.webp", c: ["ミミズヘビ", "ガラスヒバア", "リュウキュウアオヘビ"], a: 3 },
    { q: "このヘビは何？", img: "images/hyann.webp", c: ["アカマタ", "ヒメハブ", "ヒャン"], a: 3 },
    { q: "この動物は何？", img: "images/ba-batokage.webp", c: ["オキナワトカゲ", "アオカナヘビ", "バーバートカゲ"], a: 3 },
    { q: "このトカゲは何？", img: "images/ba-batokage.webp", c: ["アオスジトカゲ", "バーバートカゲ", "オオシマトカゲ"], a: 2 },
    { q: "この動物は何？", img: "images/kinoboritokage.webp", c: ["キノボリトカゲ", "ミナミヤモリ", "オビトカゲモドキ"], a: 1 },
    { q: "この動物は何？", img: "images/akaumigame.webp", c: ["アカウミガメ", "アオウミガメ", "タイマイ"], a: 1 },
    { q: "この鳥は何？", img: "images/akahige.webp", c: ["アカマタ", "アカヒゲ", "アカショウビン"], a: 2 },
    { q: "この鳥は何？", img: "images/amamiyamasigi.webp", c: ["キジバト", "アマミヤマシギ", "ミフウズラ"], a: 2 },
    { q: "この鳥は何？", img: "images/misago.webp", c: ["カツオドリ", "オオミズナギドリ", "ミサゴ"], a: 3 },
    { q: "この鳥は何？", img: "images/akashoubinn.webp", c: ["アカショウビン", "アカヒゲ", "アカマタ"], a: 1 },
    { q: "養殖されている魚では世界一大きな魚は？", img: "images/kuromaguro.webp", c: ["カツオ", "クロマグロ", "カンパチ"], a: 2 },
    { q: "これは何？", img: "images/minamitobihaze.webp", c: ["ミナミトビハゼ", "ウナギ", "ヨシノボリ"], a: 1 },
    { q: "昼間の地面を這っているこの魚は何？", img: "images/oounagi.webp", c: ["オオウナギ", "タウナギ", "オナガウツボ"], a: 1 },
    { q: "1970年代に沖縄では絶滅して、奄美しかいないこの魚は？", img: "images/ryuukyuuayu.webp", c: ["リュウキュウアユ", "タップミノー", "メダカ"], a: 1 }
];
// ==========================================================================
// 🧭 クイズデータ専用保管庫（21〜39問）を配列へ追加合体
// ==========================================================================
imageKenteiDatabase.push(
    { q: "これ貝は何？", img: "images/mabegai.webp", c: ["マベガイ", "シロチョウガイ", "アコヤガイ"], a: 1 },
    { q: "これは何？", img: "images/kobusime.webp", c: ["スルメイカ", "ダイオウイカ", "コブシメ"], a: 3 },
    { q: "干潟に住むこのカニは何？", img: "images/okinawahakusennsiomaneki.webp", c: ["ズワイガニ", "コメツキガニ", "オキナワハクセンシオマネキ"], a: 3 },
    { q: "このクモの名前は？", img: "images/oojorougumo.webp", c: ["オオジョロウグモ", "アシダカグモ", "ハエトリグモ"], a: 1 },
    { q: "このクワガタの名前は？", img: "images/amamimarubanekuwagata.webp", c: ["アマミビラタクワガタ", "アマミマルバネクワガタ", "アマミノコギリクワガタ"], a: 2 },
    { q: "このクワガタの名前は？", img: "images/amaminokogirikuwagata.webp", c: ["アマミミヤマクワガタ", "アマミノコギリクワガタ", "シカクワガタ"], a: 2 },
    { q: "これは何？", img: "images/marudaikokukogane.webp", c: ["アマミコカブトムシ", "オオシマセンチコガネ", "マルダイコクコガネ"], a: 3 },
    { q: "このチョウは何？", img: "images/ryukyuasagimadara.webp", c: ["アカボシゴマダラ", "リュウキュウアサギマダラ", "ツマベニチョウ"], a: 2 },
    { q: "これは何？", img: "images/ryuukyuuhagurotonnbo.webp", c: ["オニヤンマ", "リュウキュウハグロトンボ", "アマミトゲオトンボ"], a: 2 },
    { q: "これは何？", img: "images/hikegehego.webp", c: ["ヒカゲヘゴ", "アマミシダ", "リュウビンタイ"], a: 1 },
    { q: "この木の枝に依っている植物は何？", img: "images/simaootaniwatari.webp", c: ["タマシダ", "シマオオタニワタリ", "ワラビ"], a: 2 },
    { q: "これは何？", img: "images/ssimaazami.webp", c: ["ソテツ", "シマアザミ", "カリフラワー"], a: 2 },
    { q: "これは何でしょう。日本で一番早く咲き，沖縄では正月前に咲きます。", img: "images/hikannzakura.webp", c: ["ソメイヨシノ", "カンヒザクラ(ヒカンザクラ)", "オオシマザクラ"], a: 2 },
    { q: "これは何でしょう？アメリカ大陸原産の移入植物，菊の仲間で白い花を一年中咲かせる。奄美大島でも畑や道路脇の雑草となり困りもの。", img: "images/sironosenndanngusa.webp", c: ["タヂアワユキセンダングサ(シロノセンダングサ)", "オオマツヨイグサ", "セイタカアワダチソウ"], a: 1 },
    { q: "これは何の根？", img: "images/gajumaru.webp", c: ["オキナワジイ", "サキシマスオウノキ", "ガジュマル"], a: 3 },
    { q: "秋にとれるこのキノコの名は？", img: "images/siitake.webp", c: ["シイタケ", "マツタケ", "バカマツタケ"], a: 1 },
    { q: "このキノコの名は？", img: "images/kikurage.webp", c: ["コフキサルノコシカケ", "カワラタケ", "キクラゲ"], a: 3 },
    { q: "マングローブ林で見かけるこの土の山は何？", img: "images/okinawananajakonosu.webp", c: ["ベンケイガニの巣", "ネズミの巣", "オキナワアナジャコの巣"], a: 3 },
    { q: "ヤドリ浜にあるこれは何？", img: "images/bi-tirokku.webp", c: ["捨てられたコンクリート", "ビーチロック", "岩"], a: 2 }
);
