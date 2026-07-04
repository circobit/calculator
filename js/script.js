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


// 'All Clear' button
const allClearButton = document.getElementById("allClear");
// Mouseover
allClearButton.addEventListener('mouseover', function() {
	allClearButton.style.backgroundColor = "rgb(182, 85, 85)";
});
// Mouseout
allClearButton.addEventListener('mouseout', function() {
	allClearButton.style.backgroundColor = "rgb(172, 4, 4)";
});


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
let waitingForSecondNumber = false;
let writingSecondNumer = false;


// Operate function
function operate(operator, num1, num2) {
	if (operator == "+") {
		return add(num1, num2);
	} else if (operator == "-") {
		return subtract(num1, num2);
	} else if (operator == "x") {
		return multiply(num1, num2);
	} else if (operator == "÷") {
		return divide(num1, num2);
	};
};


// Event listeners to write numbers in display
// Get display element
const displayElement = document.getElementById("display");
// Add eventListener to number buttons
numberButtons.forEach((element) => element.addEventListener('click', function() {
	if (displayElement.textContent == "0" || waitingForSecondNumber == true) {
		waitingForSecondNumber = false;
		writingSecondNumer = true;
		displayElement.textContent = element.textContent;
	} else {
		// Set limits to don't allow user to exceed the amount of characters in the display
		if (displayElement.textContent.length < 8) {
			displayElement.textContent = displayElement.textContent + element.textContent;
		};
	};
}));


// Add eventListeners to operator buttons to store values in vars
operatorButtons.forEach((element) => element.addEventListener('click', function() {
	if (waitingForSecondNumber == false) {
		num1Input = displayElement.textContent;
	}
	waitingForSecondNumber = true;
	operatorInput = element.textContent;
}));


// Add eventListener to equal button to perform operation and show result
equalButton.addEventListener('click', function() {
	num2Input = displayElement.textContent;
	let result = operate(operatorInput, +num1Input, +num2Input);

	// Convert result to string to check length and cap the output 
	// to the max allowed by the display
	resultString = result.toString()
	resultStringCut = "";
	if (resultString.length > 8) {
		resultStringCut = resultString.slice(0, 8);
		displayElement.textContent = resultStringCut;
	} else {
		displayElement.textContent = resultString;
	}

	waitingForSecondNumber = false;
});


// Add eventListener to allClear button to clean all numbers
allClearButton.addEventListener('click', function() {
	let num1Input = null;
	let num2Input = null;
	let operatorInput = "";
	let waitingForSecondNumber = false;
	displayElement.textContent = 0;
});


// Add eventListener for clear button to remove the last digit
clearButton.addEventListener('click', function() {
	if (displayElement.textContent != 0 && displayElement.textContent.length > 1) {
		console.log("Condition taken");
		displayElement.textContent = displayElement.textContent.slice(0, -1);
	} else {
		displayElement.textContent = 0;
	}
});