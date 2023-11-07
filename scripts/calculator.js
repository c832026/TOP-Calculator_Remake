function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return Math.round((a * b) * (10 ** 5)) / (10 ** 5);
}

function divide(a, b) {
    return Math.round((a / b) * (10 ** 5)) / (10 ** 5);
}

function operate(numA, numB, operator) {
    numA = +numA;
    numB = +numB;
    switch (operator) {
        case '+':
            return add(numA, numB);
            break;
        case '-':
            return subtract(numA, numB);
            break;
        case '×':
            return multiply(numA, numB);
            break;
        case '÷':
            return divide(numA, numB);
    }
}

function showResult(numA, numB, theOperator) {
    const result = operate(numA, numB, theOperator);
    firstNumber = result.toString();
    secondNumber = '';
    operator = '';
}

let firstNumber = '', secondNumber = '', operator = '';
const display = document.querySelector('.display-screen>span');

// Set arithmetic logic with "Event delegation"
const buttons = document.querySelector('.buttons-container');
buttons.addEventListener('click', e => {
    if (e.target.classList.contains('button')) {
        // Reset font size
        display.style.fontSize = '48px';

        const btnText = e.target.textContent;

        // Get first number
        if (!operator && (btnText >= 0 && btnText <= 9) || (btnText === '-' && firstNumber === '')) {
            firstNumber += btnText;

        // Get operator
        } else if ((btnText === '×' || btnText === '÷' || btnText === '+' || btnText === '-') &&
            firstNumber !== '' && !isNaN(+firstNumber)) {
            // Calculate and show result if already got two number in advance
            if (secondNumber !== '' && !isNaN(+secondNumber)) {
                showResult(firstNumber, secondNumber, operator);
            }
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
            
        } else if (btnText === 'AC') {
            firstNumber = '';
            secondNumber = '';
            operator = '';

        // Delete the last input
        } else if (btnText === 'DEL') {
            if (secondNumber.length != 0) {
                secondNumber = secondNumber.slice(0, -1);
            } else if (operator && secondNumber.length === 0) {
                operator = '';
            } else if (!operator) {
                firstNumber = firstNumber.slice(0, -1);
            }
        } else if (btnText === '+/-') {
            if (operator && !secondNumber.includes('-')) {
                secondNumber = '-' + secondNumber;
            } else if (secondNumber.includes('-')) {
                secondNumber = secondNumber.slice(1);
            } else if (!operator && !firstNumber.includes('-')) {
                firstNumber = '-' + firstNumber;
            } else if (firstNumber.includes('-')) {
                firstNumber = firstNumber.slice(1);
            }
        } else if (btnText === '.') {
            if (!operator && !firstNumber.includes('.')) {
                firstNumber += '.';
            } else if (operator && !secondNumber.includes('.')) {
                secondNumber += '.';
            }
        }

        if (btnText === '=' && !isNaN(+firstNumber) && !isNaN(+secondNumber)) {
            showResult(firstNumber, secondNumber, operator);
        }

        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;

        // Show error message if user tries divide by 0
        if (firstNumber === 'Infinity' || firstNumber === '-Infinity') {
            display.textContent = 'Error, can\'t divide number by 0 or -0';
            display.style.fontSize = '35px';
            firstNumber = '';
            secondNumber = '';
            operator = '';
        }
    }
});
