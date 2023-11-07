let firstNumber = '', secondNumber = '', operator = '';
const display = document.querySelector('.display-screen>span');

// Mouse click input, utilize "Event Delegation" technique
const buttons = document.querySelector('.buttons-container');
buttons.addEventListener('click', inputEventSwitch);

// Prevent focus on button when clicking button
buttons.addEventListener('mousedown', (e) => e.preventDefault());

// Keyboard input
const body = document.querySelector('body');
body.addEventListener('keydown', inputEventSwitch);

//-------------------------------------------Functions---------------------------------------------------
function add(a, b) {
    return Math.round((a + b) * (10 ** 5)) / (10 ** 5);
}

function subtract(a, b) {
    return Math.round((a - b) * (10 ** 5)) / (10 ** 5);
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

function inputEventSwitch(e) {
    let btnText;

    if (e.type === 'click' && e.target.classList.contains('button')) {
        btnText = e.target.textContent;
    } else if (e.type === 'keydown') {
        const key = e.key;

        if (key >= 0 && key <= 9) {
            btnText = key;
        }
        switch(key) {
            case '+':
                btnText = '+';
                break;
            case '-':
                btnText = '-';
                break;
            case '*':
                btnText = '×';
                break;
            case '/':
                btnText = '÷';
                break;
            case '.':
                btnText = '.';
                break;
            case 'Enter':
                btnText = '=';
                break;
            case 'Backspace':
                btnText = 'DEL';
                break;
            case 'Escape':
                btnText = 'AC';
        }
    }

    // End the switch when above conditions are not met
    if (btnText === undefined) {
        return;
    }

    // Reset font size
    display.style.fontSize = '48px';

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

    if (btnText === '=' && firstNumber !== '' && secondNumber !== '' &&
    !isNaN(+firstNumber) && !isNaN(+secondNumber)) {
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