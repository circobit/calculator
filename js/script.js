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


// State variables
let num1Input = null;
let num2Input = null;
let operatorInput = "";
let waitingForSecondNumber = false;
let writingSecondNumer = false;
let isDotInserted = false;


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
			// Check if the button pressed is Dot (.)
			// If it is Dot, check wether there's already a dot inserted
			// and block the possibility to add more than one dot
			if (element.textContent == "." && isDotInserted == false && element.textContent != "C") {
				displayElement.textContent = displayElement.textContent + element.textContent;
				isDotInserted = true;
			} else if (element.textContent != "." && element.textContent != "C") {
				displayElement.textContent = displayElement.textContent + element.textContent;
			};
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
	isDotInserted = false;
}));


// Add eventListener to equal button to perform operation and show result
const inlineDisplaySpan = document.getElementById("inlineDisplay");

equalButton.addEventListener('click', function() {
	num2Input = displayElement.textContent;
	let result = operate(operatorInput, +num1Input, +num2Input);
	// Use .toPrecision() to make the result not overflow the display
	preciseResult = result.toPrecision(6);
	// Check if preciseResult includes "e+" to put it in the span 
	// of id #inlineDisplay to assign it a lower size to the tree 
	// characters "e+X". The objetive is to fit more numbers in the display
	if (preciseResult.includes("e+")) {
		lastThreeDigits = preciseResult.slice(-3);
		console.log(`lastThreeDigits: ${lastThreeDigits}`);
		console.log(`preciseResultBefore: ${preciseResult}`);
		preciseResult = preciseResult.slice(0, -3);
		displayElement.textContent = preciseResult;
		inlineDisplaySpan.textContent = lastThreeDigits;
		console.log(`preciseResultAfter: ${preciseResult}`);
	} else {
		displayElement.textContent = preciseResult;
	};
	waitingForSecondNumber = false;
	isDotInserted = false;
});


// Add eventListener to allClear button to clean all numbers
allClearButton.addEventListener('click', function() {
	num1Input = null;
	num2Input = null;
	peratorInput = "";
	waitingForSecondNumber = false;
	isDotInserted = false;
	displayElement.textContent = 0;
	inlineDisplaySpan.textContent = "";
});


// Add eventListener for clear button to remove the last digit
clearButton.addEventListener('click', function() {
	if (displayElement.textContent != 0 && displayElement.textContent.length > 1) {
		// If the last value to remove is a dot, set isDotInserted to false
		if (displayElement.textContent.slice(-1) == ".") {
			isDotInserted = false;
		};
		displayElement.textContent = displayElement.textContent.slice(0, -1);
	} else {
		displayElement.textContent = 0;
	}
	inlineDisplaySpan.textContent = "";
});