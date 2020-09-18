var items = localStorage.getItem("texts");

items = JSON.parse(items);

var list = null;

window.onload = function() {
	list = document.getElementById("list");

	document.getElementById("upload-input").addEventListener("change", handleFileUploaded, false);

	for (var i = 0; i < items.length; i++) {
		expandInputBoxes(items[i]);
	}
	setDownload();
}

function removeItem(item) {
	list.removeChild(item);
	setDownload();
}

function saveList() {
	var values = getValues()

	localStorage.setItem("texts", JSON.stringify(values));
}

function getValues() {
	var boxes = document.getElementsByClassName("item-box");
	var values = [];
	for (i = 0; i < boxes.length; i++) {
		values.push(boxes[i].value);
	}
	return values
}

function addItem() {
	expandInputBoxes("");
	setDownload();
}

function inputBoxChanged() {
	setDownload();
}

function clearList() {
	list.innerHTML = "";
}

function expandInputBoxes(value) {
	var div = document.createElement("div");
	div.setAttribute("class", "item");
	list.appendChild(div);

	var button = document.createElement("button");
	button.setAttribute("onclick", "removeItem(this.parentElement)");
	button.setAttribute("class", "icon-button")
	var t = document.createElement("i")
	t.setAttribute("class", "far fa-minus-square")
	button.appendChild(t);
	div.appendChild(button);
	
	var inputBox = document.createElement("input");
	inputBox.setAttribute("class", "item-box");
	inputBox.setAttribute("type", "text");
	inputBox.setAttribute("onchange", "inputBoxChanged()");
	inputBox.value = value;
	div.appendChild(inputBox);

	div.appendChild(document.createElement("br"));
}

function downloadList() {
	document.getElementById("download-link").click()
}

function uploadList() {
	document.getElementById("upload-input").click()
}

function setDownload() {
	var values = getValues();
	var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(values));
	var button = document.getElementById("download-link");
	button.setAttribute("href", data);
	button.setAttribute("download", "data.json");
}

function handleFileUploaded(event) {
	const reader = new FileReader();
	reader.onload = handleFileLoad;
	reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
	list.innerHTML = "";
	var content = event.target.result;
	var values = JSON.parse(content);

	for (i = 0; i < values.length; i++) {
		expandInputBoxes(values[i]);
	}
}