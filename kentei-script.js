let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
const TOTAL_QUESTIONS = 10;

window.onload = function() {
    backToQuizMenu();
};

// クイズ選択メニュー画面に戻る処理
function backToQuizMenu() {
    document.getElementById('mainTitle').innerText = "奄美クイズ";
    document.getElementById('subTitle').innerText = "▲ えらんで ちょうせんしよう！ ▲";
    document.getElementById('quizMenu').style.display = 'block';
    document.getElementById('quizPlay').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';

    // メニュー画面のときは一番下のボタンを「ホームへもどる」に変更
    const footerBtn = document.getElementById('footerLinkBtn');
    if (footerBtn) {
        footerBtn.innerText = "🏠 ホームへもどる";
        footerBtn.href = "index.html";
        footerBtn.setAttribute("onclick", ""); 
    }
}

// 世界自然遺産クイズが選ばれたときの処理
function selectQuiz(type) {
    document.getElementById('mainTitle').innerText = "世界自然遺産クイズ";
    document.getElementById('subTitle').innerText = "▲ クイズに ちょうせん中！ ▲";

    // クイズ本編が始まったら一番下のボタンを「メニューにもどる」に切り替え
    const footerBtn = document.getElementById('footerLinkBtn');
    if (footerBtn) {
        footerBtn.innerText = "⬅ クイズメニューにもどる";
        footerBtn.href = "javascript:void(0);";
        footerBtn.setAttribute("onclick", "backToQuizMenu()");
    }

    startQuiz();
}

// クイズを実際にスタートさせる共通関数
function startQuiz() {
    let sourceQuestions = typeof heritageQuestions !== 'undefined' ? heritageQuestions : [];
    
    if (sourceQuestions.length === 0) {
        alert("クイズデータがまだ準備されていないか、読み込めていません。");
        backToQuizMenu();
        return;
    }

    // シャッフルして10問を贅沢に切り出す
    let shuffled = [...sourceQuestions].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, TOTAL_QUESTIONS);
    
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('quizPlay').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';

    showQuestion();
}

// 現在の問題を表示
function showQuestion() {
    const currentQ = selectedQuestions[currentQuestionIndex];

    document.getElementById('quizProgress').innerText = `もんだい ${currentQuestionIndex + 1} / 全 ${TOTAL_QUESTIONS} 問`;
    document.getElementById('questionText').innerText = currentQ.ja;
    document.getElementById('questionTextEn').innerText = currentQ.en || '';
    document.getElementById('resultMessage').innerText = '';
    document.getElementById('nextBtn').style.display = 'none';

    const buttons = document.getElementsByClassName('quiz-ox-btn');
    for(let btn of buttons) { btn.disabled = false; }
}

// 〇×ボタンが押された時の正誤判定処理
function checkAnswer(userChoice) {
    const currentQ = selectedQuestions[currentQuestionIndex];
    const buttons = document.getElementsByClassName('quiz-ox-btn');
    for(let btn of buttons) { btn.disabled = true; }

    const resultMsg = document.getElementById('resultMessage');

    if (userChoice === currentQ.a) {
        resultMsg.innerText = "⭕️ せいかい！ / CORRECT";
        resultMsg.style.color = "#38bdf8";
        score++;
    } else {
        resultMsg.innerText = "❌ まちがい！ / INCORRECT";
        resultMsg.style.color = "#ef4444";
    }

    document.getElementById('nextBtn').style.display = 'block';
    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
        document.getElementById('nextBtn').innerText = "けっか発表を見る ➔";
    } else {
        document.getElementById('nextBtn').innerText = "つぎの問題へ 👉";
    }
}

// つぎの問題へ進む処理
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
        showQuestion();
    } else {
        showResult();
    }
}

// 結果発表画面の描写（ジョッキー君のお祝いメッセージ）
function showResult() {
    document.getElementById('quizPlay').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    document.getElementById('scoreText').innerText = `10問中、 ${score}問 せいかいでした！`;

    const gradeText = document.getElementById('gradeText');
    const rate = score / TOTAL_QUESTIONS;

    if (rate === 1) {
        gradeText.innerText = "🐶「パーフェクトワン！きみは今日からかんぺきなマスターだね！🐾」";
        gradeText.style.color = "#fbbf24";
    } else if (rate >= 0.7) {
        gradeText.innerText = "🛶「すごいすごい！奄美のことがとっても大好きなんだね！」";
        gradeText.style.color = "#10b981";
    } else {
        gradeText.innerText = "🌿「おしい！これでお出かけすれば、もっと奄美の山や海がおもしろくなるよ！」";
        gradeText.style.color = "#cbd5e1";
    }

    // 結果画面になったら一番下の固定ボタンをメニューに戻す
    const footerBtn = document.getElementById('footerLinkBtn');
    if (footerBtn) {
        footerBtn.innerText = "⬅ クイズメニューにもどる";
        footerBtn.href = "javascript:void(0);";
        footerBtn.setAttribute("onclick", "backToQuizMenu()");
    }
}

// 今後構築予定の未開通の部屋用アラート
function openComingSoon(quizName) {
    alert(`「${quizName}」の部屋は、ただいま相棒のジョッキー君と一緒にバキバキに構築しています！お楽しみに 🐶🐾`);
}
