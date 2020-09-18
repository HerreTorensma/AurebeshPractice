var textInput = null;
var aurebeshText = null;
var output = null;

var randomItem = null;
var canContinue = false;

var textsStorage = localStorage.getItem("texts")
if (textsStorage == null) {
	localStorage.setItem("texts", JSON.stringify(defaultTexts))
}
var texts = JSON.parse(localStorage.getItem("texts"));

window.onload = function() {
	textInput = document.getElementById("text-input");
	aurebeshText = document.getElementById("aurebesh-text");
	output = document.getElementById("output");
	chooseNewText();

	// Execute a function when the user releases a key on the keyboard
	textInput.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			if (canContinue === false) {
				document.getElementById("submit-text").click();
			} else {
				chooseNewText()
			}
		}
	});
}

function submitText() {
	// textInput.select()
	var text = textInput.value;
	
	// textInput.disabled = true;

	if (text == randomItem) {
		output.innerHTML = "True. The right answer was ".concat(randomItem, ".");
	} else {
		output.innerHTML = "False. The right answer was ".concat(randomItem, ".");
	}

	canContinue = true;
	
}

function chooseNewText() {
	canContinue = false;
	textInput.value = "";
	output.innerHTML = "Please enter a translation"
	
	randomItem = texts[Math.floor(Math.random() * texts.length)];
	
	aurebeshText.innerHTML = randomItem
	textInput.select()
}