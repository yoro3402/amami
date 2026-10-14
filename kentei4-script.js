let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let isAnswered = false; // 連打バグ防止用のフラグ

// 🧭 クイズをスタート（またはリセット）する関数
function startKentei() {
    score = 0;
    currentIndex = 0;
    isAnswered = false;
    document.getElementById('quizPlay').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('resultMark').textContent = '';
    document.getElementById('resultMark').className = 'result-mark';

    // 各選択肢ボタンの無効化を解除
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById('choice' + i);
        if (btn) btn.disabled = false;
    }

    // 別室（quiz-data4.js）のデータを安全に呼び出す処理
    let sourceDatabase = typeof imageKenteiDatabase !== 'undefined' ? imageKenteiDatabase : [];
    
    if (sourceDatabase.length === 0) {
        alert("画像クイズのデータが正しく読み込めません。");
        return;
    }

    // 39問から毎回ランダムに10問を抽出する数理アルゴリズム
    let shuffled = [...sourceDatabase].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, 10);

    showKenteiQuestion();
}

// 📝 画面に問題文と写真を正しく送り届ける関数（ボタン番号のズレを完全修復）
function showKenteiQuestion() {
    isAnswered = false;
    document.getElementById('resultMark').textContent = '';
    document.getElementById('resultMark').className = 'result-mark';
    document.getElementById('quizProgress').textContent = `もんだい ${currentIndex + 1} / 全 10 問`;
    
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById('choice' + i);
        if (btn) btn.disabled = false;
    }

    const currentQ = currentQuestions[currentIndex];
    document.getElementById('questionText').textContent = currentQ.q;
    
    // 【画像自動補正システム】
    const imgEl = document.getElementById('quizImage');
    if (currentQ.img && imgEl) {
        let cleanSrc = currentQ.img;
        cleanSrc = cleanSrc.replace('images/', '').replace('image/', '');
        if (cleanSrc === "ssimaazami.webp") {
            cleanSrc = "simaazami.webp";
        }
        imgEl.src = 'images/' + cleanSrc;
        imgEl.style.display = 'inline-block';
    } else if (imgEl) {
        imgEl.style.display = 'none';
    }
    
    // 【大修正】HTMLの「choice1, 2, 3」と配列データの番号を100%同期
    if (currentQ.c && currentQ.c.length >= 3) {
        let c1 = currentQ.c[0].replace('タヂアワユキ', 'タチアワユキ');
        let c2 = currentQ.c[1].replace('タヂアワユキ', 'タチアワユキ');
        let c3 = currentQ.c[2].replace('タヂアワユキ', 'タチアワユキ');

        document.getElementById('choice1').textContent = `① ${c1}`;
        document.getElementById('choice2').textContent = `② ${c2}`;
        document.getElementById('choice3').textContent = `③ ${c3}`;
    }
}

// ボタンが押されたら答え合わせをする関数（テンポの良い自動進捗システム）
function answerKentei(playerChoice) {
    if (isAnswered) return; // 回答済みなら処理をブロック（連打防止）
    isAnswered = true;

    const quizResult = document.getElementById('resultMark');
    const correctAnswer = currentQuestions[currentIndex].a;

    // ボタンを一斉に無効化（1.2秒の間の誤作動を鉄壁ガード）
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById('choice' + i);
        if (btn) btn.disabled = true;
    }

    if (playerChoice === correctAnswer) {
        score++;
        quizResult.textContent = "⭕";
        quizResult.className = "result-mark result-good";
    } else {
        quizResult.textContent = "❌";
        quizResult.className = "result-mark result-bad";
    }

    // 1.2秒待ってから自動的に次の問題へ進む最高のテンポシステム
    setTimeout(() => {
        currentIndex++;
        if (currentIndex < 10) {
            showKenteiQuestion();
        } else {
            showKenteiScore();
        }
    }, 1200);
}

// 🎉 10問終わった後に点数とジョッキー君のコメントを発表する関数
function showKenteiScore() {
    document.getElementById('quizPlay').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    const scoreText = document.getElementById('scoreText');
    const commentText = document.getElementById('gradeText');
    
    scoreText.textContent = `10問中、 ${score}問 せいかいでした！`;

    if (score === 10) {
        commentText.innerHTML = "👑「パーフェクトワン！きみは今日からかんぺきな瀬戸内画像マスターだね！🐾」";
        commentText.style.color = "#fbbf24";
    } else if (score >= 7) {
        commentText.innerHTML = "🛶「すごいすごい！せとうちの豊かな生き物や自然にめちゃくちゃ詳しいね！」";
        commentText.style.color = "#10b981";
    } else if (score >= 4) {
        commentText.innerHTML = "👍「ナイス！何度も写真を見て、お出かけしながら覚えていこう！」";
        commentText.style.color = "#38bdf8";
    } else {
        commentText.innerHTML = "🌿「がんばったね！もう一度チャレンジして、奄美の秘密を発見しよう！🐾」";
        commentText.style.color = "#cbd5e1";
    }
}

// 🚀 画面が開いた瞬間にクイズを起動させます
startKentei();
