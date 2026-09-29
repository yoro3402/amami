// --- 1. 自動スライドショーの制御 ---
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000);
}
showSlides();

// --- 2. ページ切り替えと多言語制御 ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    const target = document.getElementById(pageId);
    if(target) target.classList.add('active-section');
    document.getElementById('home-back-btn').style.display = (pageId === 'main-screen') ? 'none' : 'block';
    
    // 【クイズ画面バグの安全装置】画面が切り替わったら、自動で確実にクイズを開始させる
    if (pageId === 'quiz-screen' && typeof startQuiz === 'function') { 
        startQuiz(); 
    }
    
    window.scrollTo(0, 0);
}

function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-ja]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if(val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('.price-tag').forEach(el => {
        const price = el.getAttribute('data-price-' + lang);
        if(price !== null) el.innerText = price;
    });
    document.getElementById('btn-ja').classList.toggle('active', lang === 'ja');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    if (document.getElementById('quiz-screen').classList.contains('active-section')) showQuestion();
}

// --- 3. 🎲 ダイスゲームロジック（奥田さんのオリジナルプログラム） ---
let myMoney = 1000, pot = 0, myDie = 0, cpuDie = 0, myGuess = 0;
const diceIcons = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function resetGame() { 
    myMoney = 1000; updateStatus(); 
    document.getElementById('my-dice').innerText = "?"; 
    document.getElementById('btn-start').style.display = 'inline-block'; 
    document.getElementById('action-controls').style.display = 'none'; 
    document.getElementById('guess-display-area').style.display = 'none';
    document.getElementById('game-msg').innerText = "勝負開始！";
}
function updateStatus() { 
    document.getElementById('player-money').innerText = myMoney; 
    document.getElementById('current-pot').innerText = pot; 
}
function initRound() { 
    if (myMoney < 100) { alert("お金が足りません！"); return; }
    myMoney -= 100; pot = 200; 
    myDie = Math.floor(Math.random()*6)+1; cpuDie = Math.floor(Math.random()*6)+1; 
    document.getElementById('my-dice').innerText = diceIcons[myDie]; 
    document.getElementById('guess-display-area').style.display = 'none';
    document.getElementById('game-msg').innerText = "サイコロの合計値を上のボタンから選んでね！";
    updateStatus(); showGuessSelector(); 
}
function showGuessSelector() { 
    const div = document.getElementById('guess-buttons'); div.innerHTML = ""; 
    document.getElementById('guess-selector').style.display='block'; document.getElementById('btn-start').style.display='none'; 
    for(let i=2; i<=12; i++){ 
        let b=document.createElement('button'); b.className="btn btn-purple guess-btn"; b.innerText=i; b.onclick=()=>selectGuess(i); div.appendChild(b); 
    } 
}
function selectGuess(n) { 
    myGuess = n; document.getElementById('guess-selector').style.display='none'; document.getElementById('action-controls').style.display='flex'; 
    let cpuGuess = cpuDie + Math.floor(Math.random()*6)+1;
    document.getElementById('display-my-guess').innerText = myGuess; document.getElementById('display-cpu-guess').innerText = cpuGuess;
    document.getElementById('guess-display-area').style.display = 'block';
    document.getElementById('game-msg').innerText = "予想が決まったよ。勝負する？それとも降りる？";
}
function playerAction(t) { if(t==='call') showdown(); else showResult('fold',0,myDie+cpuDie); }
function showdown() { 
    const tot = myDie + cpuDie; 
    if(Math.abs(tot - myGuess) < 2){ myMoney += pot; showResult('win', pot, tot); } else { showResult('lose', pot, tot); } 
    pot = 0; updateStatus(); 
}
function showResult(s, a, t) { 
    document.getElementById('my-dice').innerText = `${diceIcons[myDie]} + ${diceIcons[cpuDie]} = ${t}`; 
    document.getElementById('action-controls').style.display='none'; document.getElementById('btn-start').style.display='inline-block'; 
    const msgEl = document.getElementById('game-msg');
    if (s === 'win') msgEl.innerHTML = `<span class="win-msg">きみの勝ち！</span> ${a}円ゲット！`;
    else if (s === 'lose') msgEl.innerHTML = `<span class="lose-msg">君の負け！</span> 200円もらうね。`;
    else if (s === 'fold') msgEl.innerHTML = `<span style="color: #64748b;">勝負を降りました。</span> (合計は ${t} でした)`;
}
