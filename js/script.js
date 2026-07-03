// Event listeners to highlight buttons

// Operator buttons
const operatorButtons = document.querySelectorAll(".operator");
// Mouseover
operatorButtons.forEach((element) => element.addEventListener('mouseover', function() {
	if (element.textContent != "=") {
		element.style.backgroundColor = "rgb(249, 173, 66)";
	}
}));
// Mouseout
operatorButtons.forEach((element) => element.addEventListener('mouseout', function() {
	if (element.textContent != "=") {
		element.style.backgroundColor = "rgb(226, 142, 26)";
	}
}));


// Number buttons
const numberButtons = document.querySelectorAll(".number");
// Mouseover
numberButtons.forEach((element) => element.addEventListener('mouseover', function() {
	element.style.backgroundColor = "rgb(61, 61, 70)";
}));
// Mouseout
numberButtons.forEach((element) => element.addEventListener('mouseout', function() {
	element.style.backgroundColor = "rgb(45, 45, 62)";
}));


// Clear button
const clearButton = document.getElementById("clear");
// Mouseover
clearButton.addEventListener('mouseover', function() {
	clearButton.style.backgroundColor = "rgb(182, 85, 85)";
});
// Mouseout
clearButton.addEventListener('mouseout', function() {
	clearButton.style.backgroundColor = "rgb(172, 4, 4)";
});


// Equal button
const equalButton = document.getElementById("equal");
// Mouseover
equalButton.addEventListener('mouseover', function() {
	equalButton.style.backgroundColor = "rgb(127, 172, 231)";
});
// Mouseout
equalButton.addEventListener('mouseout', function() {
	equalButton.style.backgroundColor = "rgb(89, 154, 239)";
});


//==== Calculator logic ====//

// Add
function add(num1, num2) {
	return num1 + num2;
};

// Subtract
function subtract(num1, num2) {
	return num1 - num2;
};

// Multiply
function multiply(num1, num2) {
	return num1 * num2;
};

// Divide
function divide(num1, num2) {
	return num1 / num2;
};


// Vars
let num1Input = null;
let num2Input = null;
let operatorInput = "";


// Operate function
function operate(operator, num1, num2) {
	if (operator == "add") {
		return add(num1, num2);
	} else if (operator == "subtract") {
		return subtract(num1, num2);
	} else if (operator == "multiply") {
		return multiply(num1, num2);
	} else if (operator == "divide") {
		return divide(num1, num2);
	};
};


// Event listeners to write numbers in display
// Get display element
const displayElement = document.getElementById("display");
// Add eventListener to number buttons
numberButtons.forEach((element) => element.addEventListener('click', function() {
	if (displayElement.textContent == "0") {
		displayElement.textContent = element.textContent;
	} else {
		displayElement.textContent = displayElement.textContent + element.textContent;
	};
}));


