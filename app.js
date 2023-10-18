const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
function sendNumberValue(number) {
  //Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  //If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstValue, secondNumber) => firstValue / secondNumber,
  "*": (firstValue, secondNumber) => firstValue * secondNumber,
  "+": (firstValue, secondNumber) => firstValue + secondNumber,
  "-": (firstValue, secondNumber) => firstValue - secondNumber,
  "=": (firstValue, secondNumber) => secondNumber,
};
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign first value if there is no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}
// add Event listeners for numbers, operators, decimal buttons.
inputBtns.forEach((inputBtns) => {
  if (inputBtns.classList.length === 0) {
    inputBtns.addEventListener("click", () => sendNumberValue(inputBtns.value));
  } else if (inputBtns.classList.contains("operator")) {
    inputBtns.addEventListener("click", () => useOperator(inputBtns.value));
  } else if (inputBtns.classList.contains("decimal")) {
    inputBtns.addEventListener("click", () => addDecimal());
  }
});

//reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

//event listener
clearBtn.addEventListener("click", resetAll);
