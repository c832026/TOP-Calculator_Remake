function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(numA, numB, operator) {
    switch (operator) {
        case '+':
            return add(numA, numB);
            break;
        case '-':
            return subtract(numA, numB);
            break;
        case '*':
            return multiply(numA, numB);
            break;
        case '/':
            return divide(numA, numB);
    }
}

let firstNumber = '', secondNumber = '', operator = '';
const display = document.querySelector('.display-screen>span');

// Set arithmetic logic using "Event delegation"
const buttons = document.querySelector('.buttons-container');
buttons.addEventListener('click', e => {
    if (e.target.classList.contains('button')) {
        const btnText = e.target.textContent;
        // Get first number
        if (!operator && btnText >= 0 && btnText <= 9) {
            firstNumber += btnText;
        // Get operator
        } else if ((btnText === '×' || btnText === '÷' || btnText === '+' || btnText === '-') &&
                  firstNumber.length != 0 && secondNumber.length === 0) {
            switch (btnText) {
                case '×':
                    operator = '×';
                    break;
                case '÷':
                    operator = '÷';
                    break;
                case '+':
                    operator = '+';
                    break;
                case '-':
                    operator = '-';
            }
        // Get second number
        } else if (operator && btnText >= 0 && btnText <= 9) {
            secondNumber += btnText;
        }
        
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    }
});
