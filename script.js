// creating heading  for displaying-------------
let textContainer = document.createElement("div");
textContainer.classList.add("textContainer");
let h1 = document.createElement("h1");
h1.id = "title";
h1.textContent = "DOM Task 01";
let p = document.createElement("p");
p.id = "description";
p.textContent = "Pagination in DOM Manipulation";
textContainer.append(h1, p);
// console.log(textContainer);
// console.log(textContainer.innerHTML);

// creating Buttons for displaying-------------
let DomWrapper = document.createElement("div");
DomWrapper.classList.add("wrapper");

let paginationBtnOne = document.createElement("div");
paginationBtnOne.classList.add("paginationBtn", "one");
let firstBtn = document.createElement("a");
firstBtn.textContent = "First";
firstBtn.setAttribute("data-set", "fir");
let prevBtn = document.createElement("a");
prevBtn.textContent = "Previous";
prevBtn.setAttribute("data-set", "pre");
paginationBtnOne.append(firstBtn, prevBtn);

let DompaginationNumber = document.createElement("div");
DompaginationNumber.id = "paginationNumber";

let paginationBtnTwo = document.createElement("div");
paginationBtnTwo.classList.add("paginationBtn", "two");
let nextBtn = document.createElement("a");
nextBtn.textContent = "Next";
nextBtn.setAttribute("data-set", "nxt");
let lastBtn = document.createElement("a");
lastBtn.textContent = "Last";
lastBtn.setAttribute("data-set", "lst");
paginationBtnTwo.append(nextBtn, lastBtn);

DomWrapper.append(paginationBtnOne, DompaginationNumber, paginationBtnTwo);

// console.log(DomWrapper);
// console.log(DomWrapper.innerHTML);

// creating table for displaying-------------

let TableContainer = document.createElement("div");
TableContainer.classList.add("container");
let DomTable = document.createElement("table");
DomTable.id = "list";

TableContainer.appendChild(DomTable);

// console.log(TableContainer);
// console.log(TableContainer.innerHTML);

//Appending all create html element in body

document.body.append(textContainer, DomWrapper, TableContainer);

//getting required data through DOM API function & creating function for manipulating DOM
let paginationNumbers = document.getElementById("paginationNumber");
let list = document.getElementById("list");
let wrapper = document.querySelector(".wrapper");

//fetching data from url as json

const req = new XMLHttpRequest();
req.open(
  "GET",
  "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json"
);
req.send();
req.addEventListener("load", request);
function request() {
  //received data stored in data
  let data = JSON.parse(this.responseText);
  let currentPage = 1;
  let rows = 10;
  //Displaying data in browser as table using list id
  function DisplayList(data, list, rows, currentPage) {
    list.innerHTML = `
      <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>`;
    currentPage--;
    let start = rows * currentPage;
    let end = start + rows;
    let paginatedItems = data.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let tr = document.createElement("tr");
      tr.classList.add("item");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      td1.textContent = item.id;
      td2.textContent = item.name;
      td3.textContent = item.email;
      tr.append(td1, td2, td3);
      list.appendChild(tr);
    }
  }
  //Displaying page no in browser as per data retrived from url
  function SetupPagination(data, paginationNumbers, rows) {
    paginationNumbers.innerHTML = "";
    let page_count = Math.ceil(data.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, data);
      paginationNumbers.appendChild(btn);
    }
  }
  //Creating button element & updaing its style & adding onclick event to update table list
  function PaginationButton(page, data) {
    let button = document.createElement("a");
    button.classList.add("page");
    button.innerText = page;
    if (currentPage == page) button.classList.add("active");
    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(data, list, rows, currentPage);
      let allBtn = document.querySelectorAll(".page");
      allBtn.forEach((e) => e.classList.remove("active"));
      button.classList.add("active");
    });
    return button;
  }
  //adding onclick event to rest of the buttons;
  function updateBtn(currentPage) {
    let allBtn = document.querySelectorAll(".page");
    allBtn.forEach((e) => e.classList.remove("active"));
    allBtn[currentPage - 1].classList.add("active");
    DisplayList(data, list, rows, currentPage);
  }
  wrapper.addEventListener("click", (e) => {
    if (e.target.dataset.set == "fir") {
      if (currentPage != 1) {
        currentPage = 1;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "lst") {
      if (currentPage != 10) {
        currentPage = 10;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "pre") {
      if (currentPage != 1) {
        currentPage--;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "nxt") {
      if (currentPage != 10) {
        currentPage++;
        updateBtn(currentPage);
      }
    }
  });
  // both of update/displaying function called for loading in onload time
  DisplayList(data, list, rows, currentPage);
  SetupPagination(data, paginationNumbers, rows);
}