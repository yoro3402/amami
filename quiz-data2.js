// ==========================================================================
// 【瀬戸内検定 - 〇×クイズデータ部屋】全29問
// ==========================================================================
const setouchiQuestions = [
    { ja: "アマミノクロウサギは土に巣穴を掘って子どもを産む。", en: "Amami rabbits dig burrows in the soil to give birth to their young.", a: true },
    { ja: "アマミノクロウサギは子どもが大きくなってくると攻撃して遠くに追い出す。", en: "Amami rabbits attack and drive away their young as they grow larger.", a: true },
    { ja: "アマミトゲネズミはハブの攻撃をジャンプしてかわすことができる。", en: "Amami spiny rats can jump to dodge attacks from Habu snakes.", a: true },
    { ja: "与路島には平成中頃までイノシシはいなかった。", en: "There were no wild boars on Yoro Island until the middle of the Heisei period.", a: true },
    { ja: "オットンガエルは加計呂麻島にも生息する。", en: "The Otton frog also lives on Kakeroma Island.", a: true },
    { ja: "アマミイシカワガエルは川の浅瀬に産卵する。", en: "Amami Ishikawa's frogs lay their eggs in the shallows of rivers.", a: true },
    { ja: "アマミハナサキガエルは天然記念物ではない。", en: "The Amami Hanasaki frog is not designated as a natural monument.", a: false },
    { ja: "シリケンイモリは奄美群島のどの島にも生息する。", en: "Sword-tailed newts live on every single island in the Amami Islands.", a: false },
    { ja: "イボイモリは水たまりの中に産卵する。", en: "Anderson's crocodiles newts lay their eggs inside puddles.", a: false },
    { ja: "ハブの毒は筋肉を分解することができる。", en: "Habu snake venom has the ability to break down muscle tissue.", a: false },
    { ja: "銀ハブより金ハブの方の毒が強い。", en: "The gold Habu has stronger venom than the silver Habu.", a: false },
    { ja: "冬に古仁屋の町の中でも盛んにケロロとないているカエルはアマミアオガエルである。", en: "The frog croaking loudly in Koniya town during winter is the Amami green frog.", a: false },
    { ja: "ヒメハブは本土のマムシと同じ種類である。", en: "The Hime-habu is the exact same species as the Mamushi on the mainland.", a: true },
    { ja: "ヒャンのしっぽには毒針があるので危険だ。", en: "The tail of the Cyan snake has a venomous stinger and is dangerous.", a: false },
    { ja: "ガラスヒバアは強い毒を持っているので危険だ。", en: "The Glasshibaa snake is highly venomous and dangerous.", a: false },
    { ja: "ヒメハブの卵の殻は透明で，中の赤ちゃんが透けて見える。", en: "The eggshells of Hime-habu are transparent, allowing you to see the baby inside.", a: true },
    { ja: "キノボリトカゲは体の色を変えることができる。", en: "Ryukyu tree lizards can change their body color.", a: true },
    { ja: "ルリカケスは奄美大島に生息する鳥の中で一年の最初に子育てをする鳥である。", en: "The Lidth's Jay is the first bird of the year to raise its young in Amami Oshima.", a: true },
    { ja: "オオトラツグミは奄美大島本島だけに生息する。", en: "The Amami thrush lives exclusively on the main island of Amami Oshima.", a: true },
    { ja: "瀬戸内町古仁屋の平均降水量（雨量）は3000mmを超える。", en: "The average annual rainfall in Koniya, Setouchi Town, exceeds 3,000 mm.", a: false },
    { ja: "与路島の東にある無人島ハミヤ島で繁殖しているオオミズナギドリは，地面から飛び立つことができない。", en: "Streaked shearwaters breeding on Hamiya Island cannot take off directly from flat ground.", a: true },
    { ja: "沖縄のリュウキュウアユは奄美大島原産のアユである。", en: "The Ryukyu ayu in Okinawa originally came from Amami Oshima.", a: true },
    { ja: "奄美大島の８月の最高気温の平均値は,鹿児島市より高い。", en: "The average maximum temperature in Amami Oshima in August is higher than in Kagoshima City.", a: false },
    { ja: "ヤドリ浜の砂は軽い石が細かく砕かれたものである。", en: "The sand of Yadori Beach is formed by finely crushed pumice stones.", a: false },
    { ja: "ハブは隆起サンゴ礁でできた喜界島，沖永良部島，与論島には生息しない。", en: "Habu snakes do not live on Kikai, Okinoerabu, or Yoron islands, which are made of raised coral reefs.", a: true },
    { ja: "リュウキュウアユは海を渡って別の川に行くことができる", en: "Ryukyu ayu can travel through the sea to migrate to other rivers.", a: true },
    { ja: "ハミヤ島は水鳥の繁殖地として有名だ。", en: "Hamiya Island is famous as a breeding ground for seabirds.", a: true },
    { ja: "湯湾岳の岩よりもホノホシ海岸の岩の方が古い。", en: "The rocks of Honohoshi Coast are older than the rocks of Mt. Yuwan.", a: false },
    { ja: "ハブはイオウが嫌いだから火山島には住んでいない。", en: "Habu snakes do not live on volcanic islands because they dislike sulfur.", a: false }
];
