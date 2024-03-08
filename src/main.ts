const todoList = document.getElementById("lists") as HTMLUListElement;
const inputListEle = document.getElementById("inputList") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const listDate = document.getElementById("listDate") as HTMLElement;
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

const dbList: {
  [key: string]: { date: Date; isChecked: boolean; content: string };
}[] = [];
// {
//   savedDate: { date: new Date(), isChecked: true, content: "Example 1" },
// },
// const dbList: { savedDate: Date; isChecked: boolean; content: string }[] = [];

// date formatting function
function formattingDate(date: Date): string {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// onload
document.addEventListener("DOMContentLoaded", () => {
  listDate.innerHTML = formattingDate(today);
});

// get selected date's list
document.addEventListener("click", () => {
  listDate.innerHTML = formattingDate(calendar.selectedDate);
});

addBtn.addEventListener("click", () => {
  const inputList = inputListEle.value;
  inputListEle.value = "";
});
// --------------------------------------------------------------------------------------------
// addBtn.addEventListener("click", (e) => {
//   const inputList = inputListEle.value;
//   addNewList(inputList);
//   inputListEle.value = "";
//   saveItems();
// });

// function addNewList(text: string) {
//   // check box
//   const checkBox = document.createElement("input") as HTMLInputElement;
//   checkBox.type = "checkbox";
//   const li = document.createElement("li") as HTMLLIElement;
//   li.textContent = text;
//   checkBox.addEventListener("change", () => {
//     li.classList.toggle("done", checkBox.checked);
//     saveItems();
//   });

//   // remove button
//   const removeBtn = document.createElement("button") as HTMLButtonElement;
//   removeBtn.textContent = "Remove";
//   removeBtn.classList.add("removeBtn");
//   removeBtn.addEventListener("click", () => {
//     listBox.remove();
//     saveItems();
//   });

//   // list div
//   const listBox = document.createElement("div") as HTMLDivElement;
//   listBox.classList.add("listBox");
//   listBox.appendChild(checkBox);
//   listBox.appendChild(li);
//   listBox.appendChild(removeBtn);

//   // append div to ul
//   todoList.appendChild(listBox);
// }

// function saveItems() {
//   let todoItems: { isChecked: boolean; text: string; savedDate: Date }[] = [];

//   // select all divs in ul
//   const listItems = todoList.querySelectorAll(".listBox");

//   // save date
//   const listDate = calendar.selectedDate;
//   // console.log(listDate);

//   listItems.forEach((div) => {
//     // need to check div.children[0] is checkBox
//     const checkBoxEle = div.children[0];
//     let isChecked: boolean = (checkBoxEle as HTMLInputElement).checked;

//     // could be null, used js logical operator
//     let liContent: string = div.children[1].textContent || "";
//     todoItems.push({ isChecked, text: liContent, savedDate: listDate });
//   });
//   // for (let i = 0; i < todoItems.length; i++) {
//   //   console.log(`${i}: ${todoItems[i].savedDate}`);
//   // }
//   localStorage.setItem("todoItems", JSON.stringify(todoItems));
// }

// window.addEventListener("load", () => {
//   const savedItems = localStorage.getItem("todoItems");
//   if (savedItems) {
//     const todoItems: { isChecked: boolean; text: string; savedDate: Date }[] =
//       JSON.parse(savedItems);

//     todoItems.forEach((item) => {
//       addNewList(item.text);
//       const listBox = todoList.lastElementChild as HTMLDivElement;
//       const checkBox = listBox.children[0] as HTMLInputElement;
//       checkBox.checked = item.isChecked;
//       listBox.children[1].classList.toggle("done", item.isChecked);
//     });
//   }
// });
