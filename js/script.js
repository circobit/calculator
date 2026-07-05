//==== Event listeners to highlight buttons on mouseover ====//

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
let latestResult = null;
let waitingForSecondNumber = false;
let writingSecondNumer = false;
let isDotInserted = false;
let isInErrorState = false;
let equalExecuted = false;


// Get display element
const displayElement = document.getElementById("display");
// Span to show scientific notation to don't overflow the display
const inlineDisplaySpan = document.getElementById("inlineDisplay");


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
	waitingForSecondNumber = true;
	isDotInserted = false;
	num1Input = result;
	num2Input = null;
	operatorInput = "";
}


// Span to show scientific notation to don't overflow the display
const inlineDisplaySpan = document.getElementById("inlineDisplay");


// Event listeners to write numbers in display
// Get display element
const displayElement = document.getElementById("display");
// Add eventListener to number buttons
numberButtons.forEach((element) => element.addEventListener('click', function() {
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	} else if (displayElement.textContent == "0" || waitingForSecondNumber == true) {
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
				if (inlineDisplaySpan.textContent != "") {
					// Raise error state if the user tries to insert a number over a scientific notation number
					displayElement.textContent = "ERROR!";
					isInErrorState = true;
				} else {
					displayElement.textContent = displayElement.textContent + element.textContent;
				};
			};
		};
	};
	inlineDisplaySpan.textContent = "";
}));


// Add eventListeners to operator buttons to store values in vars
operatorButtons.forEach((element) => element.addEventListener('click', function() {
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	// Check if num1Input is inserted. If not, populate num1Input with first number
	// and set latestResult to that number to reflect the latest result;
	} else if (num1Input == null && latestResult == null) {
		num1Input = +displayElement.textContent;
		// latestResults can be what it's shown in display because the first number
		// will never be in scientific notation and, hence, won't be split in both
		// display spans.
		latestResult = +displayElement.textContent;
		// Since the first number is inserted, we indicate that we are waiting for
		// the second number
		waitingForSecondNumber = true;
	// If the latestResult is stored and also num1Input and num2Input are null,
	// it means we are operating over a result. Store latestResult as num1Input
	} else if (num1Input == null && num2Input == null && latestResult != null) {
		num1Input = latestResult;
		waitingForSecondNumber = true;
	// If the values of num1Input and what's on the display are different,
	// the value on display must be stored as num2Input, perform the
	// operation and show the latestResult in the display
	} else if (num1Input != displayElement.textContent) {
		performOperation();
	};
	// Store operatorInput
	operatorInput = element.textContent;
	isDotInserted = false;
}));


// Add eventListener to equal button to perform operation and show result
equalButton.addEventListener('click', () => performOperation());


// Add eventListener to allClear button to clean all numbers
allClearButton.addEventListener('click', function() {
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
});


// Add eventListener for clear button to remove the last digit
clearButton.addEventListener('click', function() {
	// Do nothing if it's in errorState (Just AC can work in that scenario)
	if (isInErrorState == true) {
		return;
	} else if (displayElement.textContent != 0 && displayElement.textContent.length > 1) {
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