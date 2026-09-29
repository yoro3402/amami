// --- 4. クイズロジック（データ軽量・最適化版） ---
let qIdx = 0, qScore = 0;

// テストプレイで大好評だった「ヒント」と「優しい解説」を最初から数問だけ厳選して軽量化しました！
const qData = [
    { 
        ja: "アマミノクロウサギは、世界でも奄美大島と徳之島にしか生息していない？", 
        en: "Amami rabbits only live in Amami and Tokunoshima?", 
        a: true 
    },
    { 
        ja: "伝統の絹織物「大島紬」の泥染めには、特有の泥田の泥が使われる？", 
        en: "Oshima Tsumugi uses special mud for mud-dyeing?", 
        a: true 
    },
    { 
        ja: "奄美大島では、冬になると平地でも毎年1メートル以上の雪が積もる？", 
        en: "Amami Oshima gets over 1 meter of snow every winter?", 
        a: false 
    },
    { 
        ja: "日本国内で「黒糖焼酎」の製造が認められているのは、主に奄美群島だけである？", 
        en: "Kokuto Shochu can only be legally made in Amami islands?", 
        a: true 
    },
    { 
        ja: "世界遺産センターは大島郡住用町にある？", 
        en: "The World Heritage Center is located in Sumiyo town?", 
        a: false 
    }
];

function startQuiz() { 
    qIdx = 0; qScore = 0; 
    document.getElementById('quiz-btns').style.display = "flex"; 
    document.getElementById('quiz-final-msg').style.display = "none"; 
    document.getElementById('quiz-result').innerText = ""; 
    showQuestion(); 
}

function showQuestion() { 
    if(qIdx < qData.length){ 
        document.getElementById('quiz-progress').innerText = `Q ${qIdx+1}/${qData.length}`; 
        document.getElementById('question').innerText = currentLang === 'ja' ? qData[qIdx].ja : qData[qIdx].en; 
    } else { 
        document.getElementById('question').innerText = currentLang === 'ja' ? `終了！あなたのスコア: ${qScore}/${qData.length}` : `End! Your Score: ${qScore}/${qData.length}`; 
        document.getElementById('quiz-btns').style.display = "none"; 
        document.getElementById('quiz-final-msg').style.display = "block"; 
    } 
}

function checkAnswer(a) { 
    document.getElementById('quiz-result').innerText = (a === qData[qIdx].a) ? (qScore++, "⭕") : "❌"; 
    qIdx++; 
    setTimeout(() => { 
        document.getElementById('quiz-result').innerText = ""; 
        showQuestion(); 
    }, 800); 
}
