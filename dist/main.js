"use strict";
const todoList = document.getElementById("lists");
const inputListEle = document.getElementById("inputList");
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
    const inputList = inputListEle.value;
    addNewList(inputList);
    inputListEle.value = "";
    saveItems();
});
function addNewList(text) {
    // check box
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const li = document.createElement("li");
    li.textContent = text;
    checkBox.addEventListener("change", () => {
        li.classList.toggle("done", checkBox.checked);
        saveItems();
    });
    // remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");
    removeBtn.addEventListener("click", () => {
        listBox.remove();
        saveItems();
    });
    // list div
    const listBox = document.createElement("div");
    listBox.classList.add("listBox");
    listBox.appendChild(checkBox);
    listBox.appendChild(li);
    listBox.appendChild(removeBtn);
    // append div to ul
    todoList.appendChild(listBox);
}
function saveItems() {
    let todoItems = [];
    // select all divs in ul
    const listItems = todoList.querySelectorAll(".listBox");
    listItems.forEach((div) => {
        // need to check div.children[0] is checkBox
        const checkBoxEle = div.children[0];
        let isChecked = checkBoxEle.checked;
        // could be null, used js logical operator
        let liContent = div.children[1].textContent || "";
        todoItems.push({ isChecked, text: liContent });
    });
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
window.addEventListener("load", () => {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        const todoItems = JSON.parse(savedItems);
        todoItems.forEach((item) => {
            addNewList(item.text);
            const listBox = todoList.lastElementChild;
            const checkBox = listBox.children[0];
            checkBox.checked = item.isChecked;
            listBox.children[1].classList.toggle("done", item.isChecked);
        });
    }
});
