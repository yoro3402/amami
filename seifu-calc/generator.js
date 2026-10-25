// 数字を（＋3）や（－5）の形に整える関数
function formatNumber(num) {
    if (num > 0) {
        return "（＋" + num + "）";
    } else {
        return "（－" + Math.abs(num) + "）";
    }
}

// 0を除外したランダムな整数を作る関数
function getRandomIntExcludingZero(min, max) {
    let num = 0;
    while (num === 0) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
}

// 🌟 計算の種類と難易度（範囲）から、問題文と正しい答えの数値を返す関数
function generateProblem(operationType, difficultyClass) {
    // 難易度に応じた数値の基本範囲
    let range = (difficultyClass === 'hard') ? 15 : 10;
    
    let num1 = 0;
    let num2 = 0;
    let operatorSign = "";
    let answerValue = 0;

    switch (operationType) {
        case 'addition': // 加法（たし算）
            num1 = getRandomIntExcludingZero(-range, range);
            num2 = getRandomIntExcludingZero(-range, range);
            operatorSign = "＋";
            answerValue = num1 + num2;
            break;

        case 'subtraction': // 減法（ひき算）
            num1 = getRandomIntExcludingZero(-range, range);
            num2 = getRandomIntExcludingZero(-range, range);
            operatorSign = "－";
            answerValue = num1 - num2;
            break;

        case 'multiplication': // 乗法（かけ算）
            // かけ算は桁が大きくなりすぎないよう範囲を少しマイルドに調整
            let multRange = (difficultyClass === 'hard') ? 9 : 6;
            num1 = getRandomIntExcludingZero(-multRange, multRange);
            num2 = getRandomIntExcludingZero(-multRange, multRange);
            operatorSign = "×";
            answerValue = num1 * num2;
            break;

        case 'division': // 除法（わり算）
            // わり算は「必ず割り切れる（答えが整数になる）」ように、逆算して作ります
            let divRange = (difficultyClass === 'hard') ? 8 : 5;
            num2 = getRandomIntExcludingZero(-divRange, divRange); // わる数
            answerValue = getRandomIntExcludingZero(-divRange, divRange); // 答えの数
            num1 = num2 * answerValue; // わられる数（これできれいに割り切れます）
            operatorSign = "÷";
            break;
    }

    // 表示する計算式テキストを作って戻す
    const questionText = formatNumber(num1) + operatorSign + formatNumber(num2) + "＝";
    
    return {
        text: questionText,
        answer: answerValue
    };
}
