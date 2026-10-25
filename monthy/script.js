// =========================================================================
// ゲームの状態・変数の管理
// =========================================================================
let winningCurtain = Math.floor(Math.random() * 3); 
let firstSelected = null; 
let revealedGoat = null;  
let gameState = "START";  

// カウント用の変数
let winChangeCount = 0;
let winKeepCount = 0;
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
    
    for(let i=0; i<3; i++) {
        if(i !== revealedGoat) {
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
            // 【変更】車にアニメーション用の特別クラスをつけ、カーテン自体も金色に輝かせるクラスを付与
            curtain.innerHTML = '<span class="car-win">🚗</span>';
            curtain.classList.add('selected-win');
        } else {
            curtain.innerText = '🐐';
        }
    }
    
    // 勝敗が決まったので、総挑戦数をプラス
    totalGames++;
    document.getElementById('countTotal').innerHTML = totalGames + '<span>回中</span>';
    
    const resultDiv = document.getElementById('result');
    if (finalSelected === winningCurtain) {
        resultDiv.innerHTML = '<span class="success">🎉 おめでとうございます！！！ 🎉<br>見事に【新型の新車】を引き当てました！夢のドライブへGO！</span>';
        
        if (willChange) {
            winChangeCount++;
            document.getElementById('countChange').innerHTML = winChangeCount + '<span>回</span>';
        } else {
            winKeepCount++;
            document.getElementById('countKeep').innerHTML = winKeepCount + '<span>回</span>';
        }
    } else {
        resultDiv.innerHTML = '<span class="failure">メェ〜〜〜🐐<br>残念！ヤギが出てきてしまいました。</span>';
    }
    
    document.getElementById('reset-btn').style.display = 'inline-block';
    document.getElementById('history-btn').style.display = 'inline-block';
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
        curtain.innerHTML = '幕'; // HTMLの中身もテキストに戻す
    }
}

// カーテンのインデックスをA, B, Cの文字に変換する補助関数
function getLabel(index) {
    return ['A', 'B', 'C'][index];
}
