/* === 1. 問題生成の仕組み === */
let correctAnswerValue = "";

function getRandomIntExcludingZero(min, max) { 
    let num = 0; 
    while (num === 0) { 
        num = Math.floor(Math.random() * (max - min + 1)) + min; 
    } 
    return num; 
}

function formatTerm(coef, letter) { 
    if (coef === 1) return letter; 
    if (coef === -1) return "-" + letter; 
    return coef + letter; 
}

function generateProblem(operationType, difficultyClass) {
    let range = (difficultyClass === 'hard') ? 12 : 9;
    let num1 = 0;
    let num2 = 0;
    let operatorSign = "";
    let questionText = "";
    
    switch (operationType) {
        case 'addition':
            num1 = getRandomIntExcludingZero(-range, range); 
            num2 = getRandomIntExcludingZero(-range, range); 
            operatorSign = "＋";
            let addAns = num1 + num2; 
            correctAnswerValue = (addAns === 0) ? "0" : formatTerm(addAns, "a");
            questionText = formatTerm(num1, "a") + operatorSign + (num2 > 0 ? formatTerm(num2, "a") : "(" + formatTerm(num2, "a") + ")") + "＝"; 
            break;
        case 'subtraction':
            num1 = getRandomIntExcludingZero(-range, range); 
            num2 = getRandomIntExcludingZero(-range, range); 
            operatorSign = "－";
            let subAns = num1 - num2; 
            correctAnswerValue = (subAns === 0) ? "0" : formatTerm(subAns, "a");
            questionText = formatTerm(num1, "a") + operatorSign + (num2 > 0 ? formatTerm(num2, "a") : "(" + formatTerm(num2, "a") + ")") + "＝"; 
            break;
        case 'multiplication':
            let multRange = (difficultyClass === 'hard') ? 7 : 5; 
            num1 = getRandomIntExcludingZero(-multRange, multRange); 
            num2 = getRandomIntExcludingZero(-multRange, multRange); 
            operatorSign = "×";
            correctAnswerValue = formatTerm(num1 * num2, "ab");
            questionText = formatTerm(num1, "a") + operatorSign + (num2 > 0 ? formatTerm(num2, "b") : "(" + formatTerm(num2, "b") + ")") + "＝"; 
            break;
        case 'division':
            let divRange = (difficultyClass === 'hard') ? 6 : 4; 
            num2 = getRandomIntExcludingZero(-divRange, divRange); 
            let ansCoef = getRandomIntExcludingZero(-divRange, divRange);
            num1 = num2 * ansCoef; 
            operatorSign = "÷"; 
            correctAnswerValue = formatTerm(ansCoef, "b");
            questionText = formatTerm(num1, "ab") + operatorSign + (num2 > 0 ? formatTerm(num2, "a") : "(" + formatTerm(num2, "a") + ")") + "＝"; 
            break;
    }
    return { text: questionText, answer: correctAnswerValue };
}

function checkAutoSubmit(inputStr, correctVal) {
    let processed = inputStr.replace(/＋/g, '+').replace(/ー/g, '-').toLowerCase();
    let expected = String(correctVal).replace(/＋/g, '+').replace(/ー/g, '-').toLowerCase();
    return processed.length === expected.length;
}
