let display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.textContent = expression || '0';
}

function appendNumber(num) {
  expression += num;
  updateDisplay();
}

function appendDot() {
  if (expression === '' || /[+\-*/]$/.test(expression)) {
    expression += '0.';
  } else {
    // Avoid multiple dots in the same number
    const parts = expression.split(/[\+\-\*\/]/);
    if (!parts[parts.length - 1].includes('.')) {
      expression += '.';
    }
  }
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function appendOperator(op) {
  if (expression === '') return;

  // Avoid duplicate operators
  if (/[+\-*/]$/.test(expression)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function calculate() {
  try {
    if (expression === '') return;
    let result = eval(expression);
    expression = result.toString();
  } catch {
    expression = 'Error';
  }
  updateDisplay();
}

function toggleSign() {
  if (expression === '') return;
  const parts = expression.split(/([+\-*/])/);
  let last = parts.pop();
  if (last) {
    last = (parseFloat(last) * -1).toString();
    expression = parts.join('') + last;
  }
  updateDisplay();
}

function percentage() {
  if (expression === '') return;
  const parts = expression.split(/([+\-*/])/);
  let last = parts.pop();
  if (last) {
    last = (parseFloat(last) / 100).toString();
    expression = parts.join('') + last;
  }
  updateDisplay();
}

function deleteLast() {
  if (expression !== '') {
    expression = expression.slice(0, -1);
    updateDisplay();
  }
}

