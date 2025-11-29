// variables
let history = null;
let current = 0;
const operators = /[+\-*/]/;

// elements
const button = document.querySelector(".buttons");
const currentValue = document.querySelector("#current");
const historyValue = document.querySelector("#history");

// events
button.addEventListener("click", (e) => {
  const value = e.target;
  current = value.value;

  // operand keys
  if (value.matches(".buttons__item--operand")) {
    if (currentValue.textContent === "0") {
      currentValue.textContent = current;
    } else {
      currentValue.textContent += current;
    }
    return;
  }

  // operator keys
  if (value.matches(".buttons__item--operator")) {
    // check for consecutive operator
    if (checkConsecutiveOperators(currentValue.textContent)) {
      if (operators.test(current)) {
        const operator = currentValue.textContent.match(operators);
        const parts = currentValue.textContent.split(operators);
        if (parts[1] === "") {
          return;
        } else {
          operate(parts, operator[0]);
          return;
        }
      }
      const parts = currentValue.textContent.split(operators);
      console.log(parts);
      if (parts[1] === "") {
        currentValue.textContent += current;
        return;
      } else {
        console.log(parts[1]);
        if (checkConsecutiveDecimal(parts[1])) {
          return;
        } else {
          currentValue.textContent += current;
          return;
        }
      }
    }
    if (checkConsecutiveDecimal(currentValue.textContent)) {
      if (current === ".") {
        return;
      }
    }
    currentValue.textContent += current;
    return;
  }

  // delete key
  if (value.matches("#delete")) {
    if (currentValue.textContent.length === 1) {
      currentValue.textContent = "0";
      return;
    }
    currentValue.textContent = currentValue.textContent.slice(0, -1);
    return;
  }

  // clear key
  if (value.matches("#clear")) {
    currentValue.textContent = "0";
    historyValue.textContent = "";
    return;
  }

  // equals
  if (value.matches("#equals")) {
    const operator = currentValue.textContent.match(operators);
    const parts = currentValue.textContent.split(operators);
    if (parts[1] === "") {
      return;
    }
    if (parts.length === 1) {
      return;
    }
    operate(parts, operator[0]);
    return;
  }
});

// check consecutive operator
function checkConsecutiveOperators(value) {
  // check for consecutive operators
  if (operators.test(value)) {
    return true;
  } else {
    return false;
  }
}

// check consecutive decimal
function checkConsecutiveDecimal(value) {
  return value.includes(".");
}

// --------------- operations

// addition
function add(a, b) {
  let sum = a + b;
  historyValue.textContent = currentValue.textContent;
  currentValue.textContent = parseFloat(sum.toFixed(1));
}

// subtraction
function subtract(a, b) {
  let difference = a - b;
  historyValue.textContent = currentValue.textContent;
  currentValue.textContent = parseFloat(difference.toFixed(1));
}

// multiplication
function multiply(a, b) {
  let product = a * b;
  historyValue.textContent = currentValue.textContent;
  currentValue.textContent = parseFloat(product.toFixed(1));
}

// divition
function divide(a, b) {
  let quotient = a / b;
  if (b === 0) {
    alert("Error dividing with zero");
    return;
  }
  historyValue.textContent = currentValue.textContent;
  currentValue.textContent = parseFloat(quotient.toFixed(1));
}

// operate
function operate(splited, operator) {
  let operandA = parseFloat(splited[0]);
  let operandB = parseFloat(splited[1]);
  if (operator === "+") {
    add(operandA, operandB);
  } else if (operator === "-") {
    subtract(operandA, operandB);
  } else if (operator === "*") {
    multiply(operandA, operandB);
  } else {
    divide(operandA, operandB);
  }
}
