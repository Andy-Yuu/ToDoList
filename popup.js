var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var inputText = document.getElementById('item');
var liLength = document.getElementsByTagName('li');

//delete event
itemList.addEventListener('click', removeItem);
//form submit
document.querySelector('#addForm').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    	e.preventDefault();
    	addItem();
    }
});

//add item
function addItem(e) {
	//create delete button element
	var deleteBtn = document.createElement('button');

	//add classes to btn
	deleteBtn.className = "btn delete btn-img";

	//create span element with editable attribute
	var editSpan = document.createElement('span');
	var attribute = document.createAttribute('contenteditable');
	attribute.value = "true";
	editSpan.setAttributeNode(attribute);

	//create li element
	var li = document.createElement('li');

	//add class
	li.className = 'list-group-item';

	//append button to li
	li.appendChild(deleteBtn);

	//get input value
	var newItem = document.getElementById('item').value;

	//add span to li
	li.appendChild(editSpan);

	//add text node with input value to span
	editSpan.appendChild(document.createTextNode(newItem));

	//append li to list
	itemList.appendChild(li);

	//reset text box to nothing
	inputText.value = "";

	chrome.browserAction.setBadgeText({text: JSON.stringify(liLength.length)});

}

//remove item
function removeItem(e) {
	if (e.target.classList.contains('delete')) {
		var li = e.target.parentElement;
		itemList.removeChild(li);

		chrome.browserAction.setBadgeText({text: JSON.stringify(liLength.length)});
	}

}

//save data 
function saveData() {

	var arrItems = [];
	var list = document.getElementsByClassName('list-group-item');

	for (let i = 0; i < list.length; i++) {
		arrItems.push(list[i].innerText);
	}

	localStorage.setItem("my_data", JSON.stringify(arrItems));
}

//to load saved data when clicking popup icon
window.onload = function() {
	var retrievedData = JSON.parse(localStorage.getItem("my_data"));

	//console.log(retrievedData);
	//console.log(itemList.children);

	for (let i = 0; i < retrievedData.length; i++) {

		if (retrievedData[i] != itemList.children[i]) {
			//create delete button element
			var deleteBtn = document.createElement('button');

			//add classes to btn
			deleteBtn.className = "btn delete btn-img";

			//create span element with editable attribute
			var editSpan = document.createElement('span');
			var attribute = document.createAttribute('contenteditable');
			attribute.value = "true";
			editSpan.setAttributeNode(attribute);

			//create li element
			var li = document.createElement('li');

			//add class
			li.className = 'list-group-item';

			//append button to li
			li.appendChild(deleteBtn);

			//append span to li
			li.appendChild(editSpan);

			//add text node with input value
			editSpan.appendChild(document.createTextNode(retrievedData[i]));

			//append li to list
			itemList.appendChild(li);
		}

	}

	chrome.browserAction.setBadgeText({text: JSON.stringify(liLength.length)});


};

//saves data when closing popup 
//replaces submit button
window.onunload = function() {
	saveData();
}

//ignores error for retrieveddata being null when first launched
window.onerror = function(){
   return true;
}
