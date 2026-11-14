// =========================================================================
// ゲームの状態・変数の管理
// =========================================================================
let winningCurtain = Math.floor(Math.random() * 3); 
let firstSelected = null; 
let revealedGoat = null;  
let gameState = "START";  

// カウント用の変数（当選回数と挑戦回数）
let winChangeCount = 0;
let tryChangeCount = 0;

let winKeepCount = 0;
let tryKeepCount = 0;

let totalGames = 0;

// =========================================================================
// 主要なゲーム関数
// =========================================================================

// 1回目の選択（カーテンをクリックしたとき）
function firstChoice(selectedIndex) {
    if (gameState !== "START") return;
    
    firstSelected = selectedIndex;
    gameState = "DECISION";
    
    document.getElementById(`curtain${firstSelected}`).classList.add('selected');
    
    let candidates = [];
    for (let i = 0; i < 3; i++) {
        if (i !== winningCurtain && i !== firstSelected) {
            candidates.push(i);
        }
    }
    revealedGoat = candidates[Math.floor(Math.random() * candidates.length)];
    
    const goatCurtain = document.getElementById(`curtain${revealedGoat}`);
    goatCurtain.classList.add('opened');
    goatCurtain.innerText = '🐐';
    
    document.getElementById('message').innerHTML = `あなたが選んだのは <strong>${getLabel(firstSelected)}</strong> ですね。<br>では、残りのカーテンからハズレの <strong>${getLabel(revealedGoat)}（ヤギ）</strong> をお見せしましょう！<br>さあ、ここで選択を<strong>【変えますか？ 変えませんか？】</strong>`;
    document.getElementById('choiceArea').style.display = 'flex';
    
    for (let i = 0; i < 3; i++) {
        if (i !== revealedGoat) {
            document.getElementById(`curtain${i}`).style.cursor = 'default';
        }
    }
}

// 2回目の選択（変える・変えないのボタンを押したとき）
function secondChoice(willChange) {
    if (gameState !== "DECISION") return;
    gameState = "END";
    
    document.getElementById('choiceArea').style.display = 'none';
    let finalSelected = firstSelected;
    
    if (willChange) {
        for (let i = 0; i < 3; i++) {
            if (i !== firstSelected && i !== revealedGoat) {
                finalSelected = i;
                break;
            }
        }
        document.getElementById(`curtain${firstSelected}`).classList.remove('selected');
        document.getElementById(`curtain${finalSelected}`).classList.add('selected');
    }
    
    for (let i = 0; i < 3; i++) {
        const curtain = document.getElementById(`curtain${i}`);
        curtain.classList.add('opened');
        
        if (i === winningCurtain) {
            curtain.innerHTML = '<span class="car-win">🚗</span>';
            curtain.classList.add('selected-win');
        } else {
            curtain.innerText = '🐐';
        }
    }
    
    // 挑戦回数のカウント更新
    totalGames++;
    const isWin = (finalSelected === winningCurtain);

    if (willChange) {
        tryChangeCount++;
        if (isWin) winChangeCount++;
    } else {
        tryKeepCount++;
        if (isWin) winKeepCount++;
    }

    // スコアボードの更新
    updateScoreboard();
    
    // 勝敗メッセージの組み立て
    const resultDiv = document.getElementById('result');
    let resultHTML = '';

    if (isWin) {
        resultHTML = '<span class="success">🎉 おめでとうございます！！！ 🎉<br>見事に【新型の新車】を引き当てました！夢のドライブへGO！</span>';
    } else {
        resultHTML = '<span class="failure">メェ〜〜〜🐐<br>残念！ヤギが出てきてしまいました。</span>';
    }

    // 10回達成時の案内メッセージ追加
    if (willChange && tryChangeCount === 10) {
        resultHTML += '<br><span class="milestone">✨ 「変える」の実験10回達成！次は「変えない」も10回試してみましょう！</span>';
    } else if (!willChange && tryKeepCount === 10) {
        resultHTML += '<br><span class="milestone">✨ 「変えない」の実験10回達成！次は「変える」も10回試してみましょう！</span>';
    }

    if (tryChangeCount >= 10 && tryKeepCount >= 10 && (tryChangeCount === 10 || tryKeepCount === 10)) {
        resultHTML += '<br><span class="milestone">🎊 両方10回ずつの実験完了！勝率の差を比べて「📜 全米論争の歴史を見る」へ進みましょう！</span>';
    }

    resultDiv.innerHTML = resultHTML;
    
    document.getElementById('reset-btn').style.display = 'inline-block';
    document.getElementById('history-btn').style.display = 'inline-block';
}

// スコアボードと勝率の計算・表示更新
function updateScoreboard() {
    const rateChange = tryChangeCount > 0 ? Math.round((winChangeCount / tryChangeCount) * 100) : 0;
    const rateKeep = tryKeepCount > 0 ? Math.round((winKeepCount / tryKeepCount) * 100) : 0;

    document.getElementById('countChange').innerHTML = `${winChangeCount}<span>/ ${tryChangeCount}回</span>`;
    document.getElementById('rateChange').innerText = `勝率: ${rateChange}%（目標: 10回）`;

    document.getElementById('countKeep').innerHTML = `${winKeepCount}<span>/ ${tryKeepCount}回</span>`;
    document.getElementById('rateKeep').innerText = `勝率: ${rateKeep}%（目標: 10回）`;

    document.getElementById('countTotal').innerHTML = `${totalGames}<span>/ 20回</span>`;

    if (tryChangeCount >= 10 && tryKeepCount >= 10) {
        document.getElementById('experimentStatus').innerText = '実験完了！結果を比較しよう';
    } else {
        document.getElementById('experimentStatus').innerText = `変える:${tryChangeCount}/10 ・ 変えない:${tryKeepCount}/10`;
    }
}

// ゲームのリセット（もう一度挑戦するボタン）
function resetGame() {
    winningCurtain = Math.floor(Math.random() * 3);
    firstSelected = null;
    revealedGoat = null;
    gameState = "START";
    
    document.getElementById('result').innerText = '';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('history-btn').style.display = 'none';
    document.getElementById('message').innerHTML = '3枚のカーテンのうち、1枚の後ろには【豪華新車】が隠されています！<br>好きなカーテンを1枚クリックして選んでください。';
    
    for (let i = 0; i < 3; i++) {
        const curtain = document.getElementById(`curtain${i}`);
        curtain.className = 'curtain';
        curtain.innerText = '幕';
        curtain.style.cursor = 'pointer';
    }
}

// カーテンのインデックスをA, B, Cの文字に変換する補助関数
function getLabel(index) {
    return ['A', 'B', 'C'][index];
}
