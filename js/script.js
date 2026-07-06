// Buttons objects

const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const allClearButton = document.getElementById("allClear");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");


//==== Basic operations ====//

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

// Operate function
function operate(operator, num1, num2) {
	if (operator == "+") {
		return add(num1, num2);
	} else if (operator == "-") {
		return subtract(num1, num2);
	} else if (operator == "x" || operator == "*") {
		return multiply(num1, num2);
	} else if (operator == "÷" || operator == "/") {
		return divide(num1, num2);
	};
};


//==== State variables ====//

let num1Input = null;
let num2Input = null;
let operatorInput = "";
let latestResult = null;
let waitingForSecondNumber = false;
let writingSecondNumer = false;
let isDotInserted = false;
let isInErrorState = false;
let equalExecuted = false;


//==== Display elements to modify ====//

// Get display element
const displayElement = document.getElementById("display");
// Span to show scientific notation to don't overflow the display
const inlineDisplaySpan = document.getElementById("inlineDisplay");


//==== Functions to be called by event listeners ====//

// Perform operation
function performOperation() {
	if (isInErrorState == true) {
		return;
	}
	let result = operate(operatorInput, +num1Input, +num2Input);
	// Use .toPrecision() to make the result not overflow the display if
	// it's longer than 7 digits
	resultString = result.toString();
	resultStringLength = resultString.length;
	if (resultString.length > 8) {
		resultString = result.toPrecision(6);
	};
	// Check if resultString includes "e+" to put it in the span 
	// of id #inlineDisplay to assign it a lower size to the tree 
	// characters "e+X". The objetive is to avoid overflow in the display.
	if (resultString.includes("e+")) {
		indexOfE = resultString.indexOf("e");
		digitsAfterE = resultString.slice(indexOfE);
		resultString = resultString.slice(0, indexOfE);
		displayElement.textContent = resultString;
		inlineDisplaySpan.textContent = digitsAfterE;
	} else {
		displayElement.textContent = resultString;
	};
	latestResult = result;
	writingSecondNumer = false;
	isDotInserted = false;
	num1Input = result.toString();
	num2Input = null;
	operatorInput = "";
	equalExecuted = true;
}


// numberButtons listener function
function numberListener(element) {
	// Enter in error state if user attempts to insert a number
	// into another number with scientific notation
	if (inlineDisplaySpan.textContent.includes("e+") && equalExecuted == true && operatorInput == "") {
		// Print state vars at the moment of this error
		isInErrorState = true;
		inlineDisplaySpan.textContent = "";
		displayElement.textContent = "ERROR!";
		return;
	}
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	// If operands and latestResult are not stored, it means we are starting from scratch
	// and we have to start storing the first number
	} else if (num1Input == null && num2Input == null && waitingForSecondNumber == false) {
		num1Input = element.textContent;
		displayElement.textContent = num1Input;
	// If first operand exists and we're waiting for second number,
	// store first number of num2Input
	} else if (num1Input != null && num2Input == null && waitingForSecondNumber == true) {
		// Raise error in attempts to populate num2Input without operator (After an equal operation)
		if (operatorInput == "") {
			isInErrorState = true;
			inlineDisplaySpan.textContent = "";
			displayElement.textContent = "ERROR!";
			return;
		};
		num2Input = element.textContent;
		displayElement.textContent = num2Input;
		writingSecondNumer = true;
	} else {
		// Set limits to don't allow user to exceed the amount of characters in the display
		if (displayElement.textContent.length < 8) {
			// If dot (.) is inserted and a number in scientific notation is on
			// the screen, enter in error state.
			if (element.textContent == "." && inlineDisplaySpan.textContent.includes("e+")) {
				isInErrorState = true;
				displayElement.textContent = "ERROR!";
			// If the button pressed is dot (.), check wether there's already a dot inserted
			// and block the possibility to add more than one dot. Differentiate between first and second
			// operand to know where to write the dot.
			} else if (element.textContent == "." && writingSecondNumer == false && isDotInserted == false) {
				num1Input = num1Input + element.textContent;
				displayElement.textContent = num1Input;
				isDotInserted = true;
			} else if (element.textContent == "." && writingSecondNumer == true && isDotInserted == false) {
				num2Input = num2Input + element.textContent;
				displayElement.textContent = num2Input;
				isDotInserted = true;
			// If the element is a number
			} else if (element.textContent != ".") {
				// Check if the operand to continue writing is the first one or the second one
				if (num1Input != null && num2Input == null && waitingForSecondNumber == false) {
					num1Input = num1Input + element.textContent;
					displayElement.textContent = num1Input;
				} else if (num1Input != null && num2Input != null && writingSecondNumer == true) {
					num2Input = num2Input + element.textContent;
					displayElement.textContent = num2Input;
				};
			};
		};
	};
	inlineDisplaySpan.textContent = "";
}


// operatorButtons listener function
function operatorListener(element) {
	// Indicate that the operation is not anymore a result of the equal operator
	equalExecuted = false;
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	// Check if num1Input is and latestResult are absent. 
	// In such case, do nothing.
	} else if (num1Input == null && latestResult == null) {
		return;
	// If both operands are present, perform operation and
	// set num1Input to latestResult
	} else if (num1Input != null && num2Input == null) {
		operatorInput = element.textContent;
		waitingForSecondNumber = true;
	} else if (num1Input != null && num2Input != null && operatorInput != "") {
		performOperation();
	};
	// Store operatorInput
	operatorInput = element.textContent;
	isDotInserted = false;
};


// clearAll function
function clearAll() {
	num1Input = null;
	num2Input = null;
	operatorInput = "";
	latestResult = null;
	waitingForSecondNumber = false;
	isDotInserted = false;
	isInErrorState = false;
	equalExecuted = false;
	displayElement.textContent = 0;
	inlineDisplaySpan.textContent = "";
};


// clear function
function clear() {
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	// If the user tries to delete a number from a number in scientific notation,
	// enter in error state and show it on the display
	} else if (inlineDisplaySpan.textContent.includes("e+")) {
		isInErrorState = true;
		inlineDisplaySpan.textContent = "";
		displayElement.textContent = "ERROR!";
	// Check if the operand to delete the digit from is the first one
	} else if (num1Input != null && num2Input == null && waitingForSecondNumber == false) {
		// If the last value to remove is a dot, set isDotInserted to false
		if (num1Input.slice(-1) == ".") {
			isDotInserted = false;
		}
		num1Input = num1Input.slice(0, -1);
		displayElement.textContent = num1Input;
	// Check if the operand to delete the digit from is the second one
	} else if (num1Input != null && num2Input != null && writingSecondNumer == true) {
		// If the last value to remove is a dot, set isDotInserted to false
		if (num2Input.slice(-1) == ".") {
			isDotInserted = false;
		}
		num2Input = num2Input.slice(0, -1);
		displayElement.textContent = num2Input;
	}
};


// keyboard listener function
function keyboardListener(element) {
	// Vars to check operator and numbers
	const numbers = "0123456789.,";
	const operators = "*/+-";
	// Create object to populate it with the textContent.
	// It will be passed to the functions for them to identify 
	// if it's a number or an operator.
	const eventObj = { textContent: element.key };
	// Derivate the event to the corresponding function 
	// based on the key value
	// Operator keys
	if (operators.includes(eventObj.textContent)) {
		operatorListener(eventObj);
	};
	// Number keys
	if (numbers.includes(eventObj.textContent)) {
		numberListener(eventObj);
	};
	// Backspace - clear()
	if (eventObj.textContent == "Backspace") {
		clear();
	};
	// Escape - clearAll()
	if (eventObj.textContent == "Escape") {
		clearAll();
	};
	// Equal
	if (eventObj.textContent == "Enter") {
		performOperation();
	};
};


//==== Event listeners to store numbers and run operations ====//

// Event listeners to number buttons to store and show the operands
numberButtons.forEach((element) => element.addEventListener('click', () => numberListener(element)));

// Add eventListeners to operator buttons to store values in vars
operatorButtons.forEach((element) => element.addEventListener('click', () => operatorListener(element)));

// Add eventListener to equal button to perform operation and show result
equalButton.addEventListener('click', () => performOperation());

// Add eventListener to allClear button to clean all numbers
allClearButton.addEventListener('click', () => clearAll());

// Add eventListener for clear button to remove the last digit
clearButton.addEventListener('click', () => clear());


//==== Event listeners of keyboard ====//

document.addEventListener('keydown', () => keyboardListener(event));