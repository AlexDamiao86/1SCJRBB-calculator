const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent.replace(",", ".");
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    const actualNumber = display.textContent.replace(",", ".");
    const result = eval(`${previousNumber}${operator}${actualNumber}`); //template string, utilizando craze
    const displayResult = result.toString().replace(".", ",");
    newNumber = true;
    previousNumber = actualNumber;
    updateDisplay(displayResult);
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    const result = display.textContent.replace(",", ".") * -1;
    const displayResult = result.toString().replace(".", ",");
    updateDisplay(displayResult);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const addDecimal = () => {
    if (!newNumber) {
        updateDisplay(",");
    } 
}

document.querySelector("#decimal").addEventListener("click", addDecimal);