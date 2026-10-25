/* === 2. ゲーム進行の仕組み === */
const allColors = ["#ff4b4b", "#ff8533", "#ffcc00", "#a3e635", "#4ade80", "#2dd4bf", "#38bdf8", "#818cf8", "#c084fc", "#f472b6"];
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
let currentOperation = 'addition', currentClass = 'easy', maxTime = 10, timeLeft = 10;
let timerId = null, nextTimeoutId = null, isPlaying = false, currentInput = "", currentStreak = 0, isGameCleared = false;

function selectOperation(opType, titleText) {
    currentOperation = opType;
    document.getElementById("mainTitle").textContent = titleText;
    document.getElementById("operationPage").classList.remove("active-page");
    document.getElementById("menuPage").classList.add("active-page");
}
function backToOperationSelect() {
    document.getElementById("mainTitle").textContent = "文字式の計算";
    document.getElementById("menuPage").classList.remove("active-page");
    document.getElementById("operationPage").classList.add("active-page");
}
function selectClassAndStart(className) {
    currentClass = className; currentStreak = 0; isGameCleared = false;
    maxTime = (className === 'hard') ? 5 : 10;
    document.getElementById("menuPage").classList.remove("active-page");
    document.getElementById("gamePage").classList.add("active-page");
    startGame();
}
function buildTimerBar() {
    const timerBar = document.getElementById("timerBar"); timerBar.innerHTML = "";
    for (let i = 1; i <= maxTime; i++) {
        const block = document.createElement("div"); block.className = "bar-block"; block.id = "b" + i; timerBar.appendChild(block);
    }
    initColors();
}
function initColors() {
    for (let i = 1; i <= maxTime; i++) {
        const block = document.getElementById("b" + i);
        if (block) { block.style.backgroundColor = allColors[Math.floor(((i-1)/maxTime)*allColors.length)]; block.classList.remove("hidden"); }
    }
}
function startGame() {
    if (timerId) clearInterval(timerId);
    if (nextTimeoutId) clearTimeout(nextTimeoutId);
    
    timeLeft = maxTime; isPlaying = true; currentInput = "";
    document.getElementById("answerDisplay").textContent = "？";
    document.getElementById("answerDisplay").classList.remove("no-border"); 
    
    document.getElementById("correctMark").style.display = "none"; 
    document.getElementById("incorrectMark").style.display = "none";
    document.getElementById("nextActionPanel").style.display = "none"; 
    document.getElementById("timeOverPanel").style.display = "none";
    document.getElementById("inputPanel").style.display = "block"; 
    document.getElementById("scoreArea").style.display = "block";
    document.getElementById("streakText").textContent = currentStreak; 
    document.getElementById("cheerText").textContent = "";
    
    buildTimerBar();
    const problem = generateProblem(currentOperation, currentClass);
    document.getElementById("questionText").textContent = problem.text; correctAnswerValue = problem.answer;
    
    timerId = setInterval(() => {
        const rightBlock = document.getElementById("b" + timeLeft); if (rightBlock) rightBlock.classList.add("hidden");
        timeLeft--;
        if (timeLeft < 0) { 
            clearInterval(timerId); 
            isPlaying = false; 
            currentStreak = 0; 
            document.getElementById("streakText").textContent = currentStreak; 
            document.getElementById("questionText").textContent = "タイムアップ！😭 正解は"; 
            document.getElementById("answerDisplay").textContent = correctAnswerValue; 
            document.getElementById("incorrectMark").style.display = "block"; 
            handleTimeOver(); 
        }
    }, 1000);
}
function inputChar(char) {
    if (!isPlaying) return;
    if (currentInput === "？" || currentInput === "") { 
        currentInput = char; 
    } else { 
        currentInput += char; 
    }
    document.getElementById("answerDisplay").textContent = currentInput;
}
function clearAnswer() { if (!isPlaying) return; currentInput = ""; document.getElementById("answerDisplay").textContent = "？"; }
function submitAnswer() {
    if (!isPlaying || currentInput === "" || currentInput === "？") return;
    clearInterval(timerId); isPlaying = false;
    let playerAnswer = currentInput.replace(/＋/g, '+').replace(/ー/g, '-').toLowerCase();
    let expectedAnswer = String(correctAnswerValue).replace(/＋/g, '+').replace(/ー/g, '-').toLowerCase();
    
    if (playerAnswer === expectedAnswer) {
        currentStreak++; document.getElementById("streakText").textContent = currentStreak; document.getElementById("correctMark").style.display = "block";
        if (currentStreak >= 10) { 
            document.getElementById("scoreArea").style.display = "none"; 
            document.getElementById("questionText").textContent = "🎉10問連続正解！完全クリア！🎉"; 
            document.getElementById("answerDisplay").textContent = ""; 
            document.getElementById("correctMark").style.display = "none"; 
            document.getElementById("answerDisplay").classList.add("no-border"); 
            isGameCleared = true; 
            showEndButton(); 
            return; 
        }
        if (cheerMessages[currentStreak]) { document.getElementById("cheerText").textContent = cheerMessages[currentStreak]; }
        handleNextStep(true);
    } else {
        currentStreak = 0; document.getElementById("streakText").textContent = currentStreak; document.getElementById("incorrectMark").style.display = "block"; 
        document.getElementById("answerDisplay").textContent = currentInput + " (正解: " + correctAnswerValue + ")"; 
        handleNextStep(false);
    }
}
function handleNextStep(isCorrect) { 
    document.getElementById("inputPanel").style.display = "none"; 
    if (currentClass === 'normal' || currentClass === 'hard') { 
        nextTimeoutId = setTimeout(startGame, 2000); 
    } else { 
        showEndButton(); 
    } 
}
function handleTimeOver() { 
    document.getElementById("inputPanel").style.display = "none"; 
    if (currentClass === 'normal' || currentClass === 'hard') { 
        nextTimeoutId = setTimeout(startGame, 2500); 
    } else { 
        showEndButton(); 
    } 
}
function showEndButton() { 
    document.getElementById("inputPanel").style.display = "none"; 
    if (isGameCleared) { 
        document.getElementById("timeOverPanel").style.display = "block"; 
    } else { 
        document.getElementById("nextActionPanel").style.display = "block"; 
    } 
}
function handleActionClick() { startGame(); }
function retryGame() { currentStreak = 0; isGameCleared = false; startGame(); }
function backToMenu() { 
    if (timerId) clearInterval(timerId); 
    if (nextTimeoutId) clearTimeout(nextTimeoutId);
    isPlaying = false; 
    document.getElementById("timeOverPanel").style.display = "none"; 
    document.getElementById("nextActionPanel").style.display = "none"; 
    document.getElementById("gamePage").classList.remove("active-page"); 
    document.getElementById("menuPage").classList.add("active-page"); 
}
