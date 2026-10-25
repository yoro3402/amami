const allColors = [
    "#ff4b4b", "#ff8533", "#ffcc00", "#a3e635", "#4ade80", 
    "#2dd4bf", "#38bdf8", "#818cf8", "#c084fc", "#f472b6"
];

const cheerMessages = {
    1: "👍 よし、いいスタートだ！",
    2: "✨ いいぞ！その調子！",
    3: "🔥 できてる！いいぞ！",
    4: "🚀 ナイス！いい調子だ！",
    5: "🏁 いよいよ後半戦だ！がんばれ！",
    6: "🧠 ここが踏ん張りどころ、集中だぞ！",
    7: "🎯 あともう少し！いけるよ！",
    8: "⚡ 気を抜くな！ラストスパート！",
    9: "👑 いけー！次でラストだー！"
};

let currentOperation = 'addition'; // 現在の計算種類（addition / subtraction / multiplication / division）
let currentClass = 'easy'; 
let maxTime = 10;          
let timeLeft = 10;
let timerId = null;
let isPlaying = false;
let currentInput = ""; 
let correctAnswerValue = 0; 
let currentStreak = 0; 
let isGameCleared = false; 

// 🌟【新設】一番最初の画面で、たし算・ひき算などを選んだときの処理
function selectOperation(opType, titleText) {
    currentOperation = opType;
    document.getElementById("mainTitle").textContent = titleText; // 題名を書き換え
    
    // 計算選択画面を隠して、級の選択画面を表示
    document.getElementById("operationPage").classList.remove("active-page");
    document.getElementById("menuPage").classList.add("active-page");
}

// 🌟【新設】級選択画面から一番最初の計算選択画面にもどる処理
function backToOperationSelect() {
    document.getElementById("mainTitle").textContent = "正負の数の計算";
    document.getElementById("menuPage").classList.remove("active-page");
    document.getElementById("operationPage").classList.add("active-page");
}

// 級がクリックされた時の処理
function selectClassAndStart(className) {
    currentClass = className;
    currentStreak = 0;
    isGameCleared = false;

    if (className === 'easy') {
        maxTime = 10;
    } else if (className === 'normal') {
        maxTime = 10;
    } else if (className === 'hard') {
        maxTime = 5;
    }

    document.getElementById("menuPage").classList.remove("active-page");
    document.getElementById("gamePage").classList.add("active-page");

    startGame();
}

// タイマーのマスを画面に作る関数
function buildTimerBar() {
    const timerBar = document.getElementById("timerBar");
    timerBar.innerHTML = ""; 
    for (let i = 1; i <= maxTime; i++) {
        const block = document.createElement("div");
        block.className = "bar-block";
        block.id = "b" + i;
        timerBar.appendChild(block);
    }
    initColors();
}

// タイマーの色をセットする
function initColors() {
    for (let i = 1; i <= maxTime; i++) {
        const block = document.getElementById("b" + i);
        if (block) {
            block.style.backgroundColor = allColors[i - 1];
            block.classList.remove("hidden");
        }
    }
}

// 問題の開始（毎問題の初期化）
function startGame() {
    if (timerId) clearInterval(timerId);
    timeLeft = maxTime; 
    isPlaying = true;
    currentInput = "";
    
    document.getElementById("answerDisplay").textContent = "？"; 
    document.getElementById("correctMark").style.display = "none";
    document.getElementById("incorrectMark").style.display = "none";
    document.getElementById("nextActionPanel").style.display = "none"; 
    document.getElementById("timeOverPanel").style.display = "none"; 
    document.getElementById("inputPanel").style.display = "block";
    document.getElementById("scoreArea").style.display = "block";
    document.getElementById("streakText").textContent = currentStreak;
    document.getElementById("cheerText").textContent = "";

    buildTimerBar(); 

    // 🌟【変更】generator.jsの関数を使って問題と正解を取得する
    const problem = generateProblem(currentOperation, currentClass);
    document.getElementById("questionText").textContent = problem.text;
    correctAnswerValue = problem.answer;

    // 1秒ごとのタイマー処理
    timerId = setInterval(() => {
        const rightBlock = document.getElementById("b" + timeLeft);
        if (rightBlock) rightBlock.classList.add("hidden");

        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerId);
            isPlaying = false;
            
            currentStreak = 0;
            document.getElementById("streakText").textContent = currentStreak;
            document.getElementById("questionText").textContent = "タイムアップ！😭";
            document.getElementById("answerDisplay").textContent = (correctAnswerValue > 0 ? "+" : "") + correctAnswerValue; 
            document.getElementById("incorrectMark").style.display = "block";
            
            handleTimeOver();
        }
    }, 1000);
}

// 入力処理
function inputChar(char) {
    if (!isPlaying) return;
    if (currentInput === "？" || currentInput === "") {
        currentInput = char;
    } else {
        currentInput += char;
    }
    document.getElementById("answerDisplay").textContent = currentInput;
}

// クリア処理
function clearAnswer() {
    if (!isPlaying) return;
    currentInput = "";
    document.getElementById("answerDisplay").textContent = "？";
}

// 解答決定・判定
function submitAnswer() {
    if (!isPlaying) return;
    if (currentInput === "" || currentInput === "？") return; 

    clearInterval(timerId); 
    isPlaying = false;

    let processedInput = currentInput.replace(/＋/g, '+').replace(/ー/g, '-');
    let playerAnswerValue = parseInt(processedInput, 10);

    if (playerAnswerValue === correctAnswerValue) {
        currentStreak++;
        document.getElementById("streakText").textContent = currentStreak;
        document.getElementById("correctMark").style.display = "block";
        
        if (currentStreak >= 10) {
            document.getElementById("scoreArea").style.display = "none";
            document.getElementById("questionText").textContent = "🎉10問連続正解！完全クリア！🎉";
            currentStreak = 0; 
            isGameCleared = true;
            showEndButton();
            return;
        }

        if (cheerMessages[currentStreak]) {
            document.getElementById("cheerText").textContent = cheerMessages[currentStreak];
        }

        handleNextStep();
    } else {
        currentStreak = 0;
        document.getElementById("streakText").textContent = currentStreak;
        document.getElementById("incorrectMark").style.display = "block";
        document.getElementById("answerDisplay").textContent = (correctAnswerValue > 0 ? "+" : "") + correctAnswerValue;
        handleNextStep();
    }
}

function handleNextStep() {
    if (currentClass === 'normal' || currentClass === 'hard') {
        document.getElementById("inputPanel").style.display = "none";
        setTimeout(startGame, 2000);
    } else {
        showEndButton();
    }
}

function handleTimeOver() {
    document.getElementById("inputPanel").style.display = "none";
    document.getElementById("timeOverPanel").style.display = "block";
}

function showEndButton() {
    document.getElementById("inputPanel").style.display = "none";
    if (isGameCleared) {
        document.getElementById("timeOverPanel").style.display = "block";
    } else {
        document.getElementById("nextActionPanel").style.display = "block";
    }
}

function handleActionClick() {
    startGame();
}

function retryGame() {
    currentStreak = 0; 
    startGame();       
}

function backToMenu() {
    if (timerId) clearInterval(timerId);
    isPlaying = false;
    document.getElementById("timeOverPanel").style.display = "none";
    document.getElementById("nextActionPanel").style.display = "none";
    document.getElementById("gamePage").classList.remove("active-page");
    document.getElementById("menuPage").classList.add("active-page");
}
