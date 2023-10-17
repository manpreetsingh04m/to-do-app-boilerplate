// input tag
var inputText = document.getElementById("input");

// Add button tag
var subBtn = document.getElementById("button");

// Reset button
var resetBtn = document.getElementById("reset");

// Todo List
var toDoListTag = document.getElementById("todolist");

// arr to store all todo list element
var todoArr = [];

// When add button is clicked
subBtn.addEventListener("click", addItemToArray);

// If input is in focus and the enter is clicked then also it should add again
inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addItemToArray();
  }
});

// Reset button event
resetBtn.addEventListener("click", function () {
  todoArr = [];
  display();
});

function addItemToArray() {
  // Pushing the thing to array
  if (inputText.value !== "") {
    todoArr.push(inputText.value);
  }
  // removing the earlier text when put
  inputText.value = "";
  display();
}

function display() {
  // Clear previous content
  toDoListTag.innerHTML = "";

  // map through array
  todoArr.map((curr, i) => {
    // Structure of Li tag
    var listItem = `<li id="item${i}">
      <div>${curr}</div>
      <div>
        <span onclick="deleteItem(${i})">&times;</span>
        <span>|</span>
        <span onclick="editItem(${i})">Edit</span>
      </div>
    </li>`;
    toDoListTag.innerHTML += listItem;
  });
}

function deleteItem(index) {
  // Delete the element
  todoArr.splice(index, 1);
  display();
}

function editItem(i) {
  // Prompt Added to add
  var listItem = document.getElementById("item" + i);
  // Insert the value to array after edit
  var text = todoArr[i];
  listItem.innerHTML = `
    <input id="edit${i}" style="width: 300px; padding: 3px; border:none" type="text" value="${text}" placeholder="Enter Here" />
    <button id="editSubmit${i}" style="padding: 5px 30px; border: 5px solid #7055d3; font-size: medium;">Update</button>`;

  // Get editing Html Input
  var editInput = document.getElementById("edit" + i);
  // Get Editing Html text above submit button
  var editSubmit = document.getElementById("editSubmit" + i);

  // Focus on Input
  editInput.focus();

  editInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      todoArr[i] = editInput.value;
      localStorage.setItem("todoList", JSON.stringify(todoArr));
      display();
    }
  });

  // On submit button
  editSubmit.onclick = () => {
    todoArr[i] = editInput.value;
    localStorage.setItem("todoList", JSON.stringify(todoArr));
    display();
  };

  editInput.onblur = function () {
    todoArr[i] = editInput.value;
    localStorage.setItem("todoList", JSON.stringify(todoArr));
    display();
  };
}