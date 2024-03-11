"use strict";
const todoList = document.getElementById("lists");
const inputListEle = document.getElementById("inputList");
const addBtn = document.getElementById("addBtn");
const listDate = document.getElementById("listDate");
const today = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const dbList = [];
// date formatting function
function formattingDate(date) {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
// onload
document.addEventListener("DOMContentLoaded", () => {
    listDate.innerHTML = formattingDate(today);
    loadFromLocalStorage();
});
// ----------------------------------------------------------------
function loadFromLocalStorage() {
    const savedItems = localStorage.getItem("dbList");
    if (savedItems) {
        const todoItems = JSON.parse(savedItems);
        todoItems.forEach((item) => {
            item.date = new Date(item.date);
        });
        dbList.push(...todoItems);
    }
}
// onload
document.addEventListener("DOMContentLoaded", () => {
    listDate.innerHTML = formattingDate(today);
    showData(dbList, calendar.selectedDate);
});
// ----------------------------------------------------------------
// get selected date's list
document.addEventListener("click", (e) => {
    if (e.target.closest(".day")) {
        listDate.innerHTML = formattingDate(calendar.selectedDate);
        showData(dbList, calendar.selectedDate);
    }
});
addBtn.addEventListener("click", () => {
    addData(calendar.selectedDate, false, inputListEle.value);
    inputListEle.value = "";
    showData(dbList, calendar.selectedDate);
});
function addData(selectedDate, isChecked, content) {
    const newItem = {
        date: selectedDate,
        isChecked: isChecked,
        content: content,
    };
    dbList.push(newItem);
    localStorage.setItem("dbList", JSON.stringify(dbList));
}
function showData(db, selectedDate) {
    // erase previous data and show selected date's data
    todoList.innerHTML = "";
    db.forEach((item) => {
        const index = dbList.findIndex((dbItem) => dbItem === item);
        if (formattingDate(selectedDate) === formattingDate(item.date)) {
            // contains checkbox, li, removeBtn
            const listBox = document.createElement("div");
            listBox.classList.add("listBox");
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.name = "checkBox";
            const li = document.createElement("li");
            li.textContent = item.content;
            if (index !== -1) {
                checkBox.checked = dbList[index].isChecked;
                if (checkBox.checked === true) {
                    li.classList.add("done");
                }
            }
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("removeBtn");
            // append elements to listBox
            listBox.appendChild(checkBox);
            listBox.appendChild(li);
            listBox.appendChild(removeBtn);
            // append div to ul
            todoList.appendChild(listBox);
            // add checkbox event listener after listBox is fully created and appended
            checkBox.addEventListener("change", () => {
                // item.isChecked = checkBox.checked;
                if (index !== -1) {
                    dbList[index].isChecked = checkBox.checked;
                }
                li.classList.toggle("done", checkBox.checked);
                localStorage.setItem("dbList", JSON.stringify(dbList));
            });
            // remove button event listener
            removeBtn.addEventListener("click", () => {
                listBox.remove();
                // Remove the item from dbList array
                if (index !== -1) {
                    dbList.splice(index, 1);
                    showData(dbList, selectedDate); // Update displayed data
                }
                localStorage.setItem("dbList", JSON.stringify(dbList));
            });
        }
    });
}
// --------------------------------------------------------------------------------------------
