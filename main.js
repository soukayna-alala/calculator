const equalsSign = document.querySelector(".equalsSign");
const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operator");
const calculatorDisplay = document.querySelector("h1");
const clearBtn = document.querySelector(".clear");

let firstValue = null;
let secondValue = null;
let operator = null;

equalsSign.addEventListener("click", equals);

numberBtns.forEach((i) => {
  i.addEventListener("click", numberHandler);
});
operatorBtns.forEach((i) => {
  i.addEventListener("click", operatorHandler);
});

clearBtn.addEventListener("click", resetAllBtn);
function operatorHandler(event) {
  operator = event.target.value;
}
function equals() {
  let total = null;

  if (firstValue && secondValue && operator) {
    switch (operator) {
      case "+": {
        total = Number(firstValue) + Number(secondValue);
        break;
      }
      case "-": {
        total = Number(firstValue) - Number(secondValue);
        break;
      }
      case "*": {
        total = Number(firstValue) * Number(secondValue);
        break;
      }
      case "/": {
        total = Number(firstValue) / Number(secondValue);
        break;
      }
    }
    updateCalculatorDisplay(total);
  }
}

function numberHandler(event) {
  if (!operator) {
    if (!firstValue) {
      firstValue = event.target.value;
    } else {
      firstValue += event.target.value;
    }
    updateCalculatorDisplay(firstValue);
  } else {
    if (!secondValue) {
      secondValue = event.target.value;
    } else {
      secondValue += event.target.value;
    }
    updateCalculatorDisplay(secondValue);
  }
}

/**
 * this function will take a string parameter
 * and then will display this value on the browser
 */
function updateCalculatorDisplay(value) {
  calculatorDisplay.textContent = `${value}`;
}

function resetAllBtn() {
  firstValue = null;
  secondValue = null;
  operator = null;
  calculatorDisplay.textContent = "0";
}
