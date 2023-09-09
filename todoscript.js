const inputField = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");

const addContainer = document.getElementById("addContainer");
const lastLi = document.getElementById("lastLi");
const itemLeft = document.getElementById("itemLeft");
const clearCompleted = document.getElementById("clearCompleted");
const removeAll = document.getElementById("removeAll");

let totalItems = 0;
let doneMarkedItems = [];

// input interaction styling

inputField.addEventListener("keyup", changeButtonColor);
inputField.addEventListener("input", resetButtonColor);

function changeButtonColor() {
  if (inputField.value !== "") {
    addButton.style.color = "rgba(255, 255, 255, 0.7)";
  }
}

function resetButtonColor() {
  if (inputField.value === "") {
    addButton.style.color = "rgba(255, 255, 255, 0.35)";
  }
}

// functionality

inputField.addEventListener("keydown", function (enterEvent) {
  if (enterEvent.key === "Enter") {
    enterEvent.preventDefault();
    addButton.click();
  }
});

addButton.addEventListener("click", () => {
  if (inputField.value !== "") {
    inputField.style.color = "ffffff";
  }
  if (inputField.value == "") {
    alert("Enter something to add it to the list!");
    return;
  }

  let clicked = false;

  let createdLi = document.createElement("li");
  createdLi.className = "liItem";
  createdLi.id = "totalItems";

  addContainer.appendChild(createdLi);

  let label = document.createElement("label");
  label.className = "container";
  createdLi.appendChild(label);

  let todoInput = document.createElement("input");
  todoInput.className = "checkBox";
  todoInput.setAttribute("type", "checkbox");
  label.appendChild(todoInput);

  let checkSpan = document.createElement("span");
  checkSpan.className = "checkmark";
  label.appendChild(checkSpan);

  // checkbox activation

  checkSpan.addEventListener("click", () => {
    if (!clicked) {
      toDoSpan.className = "toDoSpanDone";
      clicked = true;
      doneMarkedItems.push(createdLi.id);

      updateLocalStorage();
    } else {
      toDoSpan.className = "toDoSpan";
      clicked = false;
      let doneItemsIndex = doneMarkedItems.indexOf(createdLi.id);
      doneItemsIndex.splice(doneItemsIndex, createdLi.id);

      updateLocalStorage();
    }
  });

  let toDoSpan = document.createElement("span");
  toDoSpan.className = "toDoSpan";
  toDoSpan.innerText = inputField.value;
  createdLi.appendChild(toDoSpan);

  inputField.value = "";
  totalItems++;
  resetButtonColor();

  updateLocalStorage();

  let oneItem = `${totalItems} item left`;
  let severalItems = `${totalItems} items left`;
  itemLeft.innerText = `${totalItems > 1 ? severalItems : oneItem}`;
});

// Update Local Storage

function updateLocalStorage() {
  localStorage.setItem("storageItems", JSON.stringify(doneMarkedItems));
}

// Remove All Event (clear all)

removeAll.addEventListener("click", removeFullList);

function removeFullList() {
  const addContainerChildren = Array.from(addContainer.children);

  function removeLiWithDelay() {
    if (addContainerChildren.length > 0) {
      const childToRemove = addContainerChildren.pop();
      addContainer.removeChild(childToRemove);
      setTimeout(removeLiWithDelay, 30);
    }
  }

  removeLiWithDelay();
  totalItems = 0;
  itemLeft.innerText = `${totalItems} items left`;
}
