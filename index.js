
const form = document.getElementById("task-form");
const table = document.querySelector("table");
let tableBody = document.getElementById("tableBody");
const url = "https://mock-api-template2-qp8w.onrender.com/users";
const updateTaskForm=document.getElementById("update-task-form");
const pageWrapper=document.getElementById("page-wrapper")
window.addEventListener("load", () => {
  fetchdata();
});

function fetchdata() {
  fetch(`${url}?_page=${1}&_limit=20`)
    .then((res) => {
      const totalUsers = res.headers.get("X-Total-Count")
      const availablePages = Math.ceil(totalUsers/20);
      createButtons(availablePages);
      return res.json();
    })
    .then((data) => {
      // console.log(data); 
      displaydata(data);
    });
    
}

function fetchDataOnClick(page=1){
  fetch(`${url}?_page=${page}&_limit=20`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displaydata(data);
    });
}

function createButtons(pagesLength){

  const pages = []

  for(let i=1; i<=pagesLength; i++)
  {
    pages.push(`<button class="page-btn" data-id=${i}>${i}</button>`);
  }
  pageWrapper.innerHTML=pages.join("")
  
  const pagebtn=document.getElementsByClassName("page-btn")

  for(let i of pagebtn){
    i.addEventListener("click",(e) => {
      fetchDataOnClick(e.target.dataset.id)
      console.log(e.target.dataset.id)
    })
  }
}

function displaydata(data) { 
  tableBody.innerHTML = null;
  data.forEach((element) => {
    const newRow = document.createElement("tr");

    const cellUserId = document.createElement("td");
    const cellId = document.createElement("td");
    const cellTitle = document.createElement("td");
    const cellCompleted = document.createElement("td");
    const cellDelete = document.createElement("td");
    const cellUpdate =document.createElement("td");

    cellUserId.innerHTML = element.userid;
    cellId.innerHTML = element.id;
    cellTitle.innerHTML = element.title;
    cellCompleted.innerHTML = element.completed ? true : false;
    cellDelete.textContent = "delete";
    cellUpdate.textContent ="update";
    cellDelete.style.backgroundColor = "red";
    cellDelete.style.color = "white";
    cellDelete.style.cursor = "pointer";

    if (cellCompleted.innerText === "true") {
      cellCompleted.style.backgroundColor = "green";
      cellCompleted.style.color = "white";
    } else {
      cellCompleted.style.backgroundColor = "red";
      cellCompleted.style.color = "white";
    }

    cellDelete.addEventListener("click", async ()=> {
      const confirmDelete = confirm("Are you sure you want to delete this row?");
      if (confirmDelete) {
        let response=await fetch(url+"/"+`${element.id}`,{method: "DELETE"})
        console.log(response)
        fetchdata()
      }
    });
    cellUpdate.addEventListener('click',async ()=>{
      const updateId=document.getElementById("updateId");
      const userid = document.getElementById("updateUserId");
      const title = document.getElementById("updateTitle");
      const completed = document.getElementById("updateCompleted");
      updateId.value=element.id
      userid.value=element.userid
      title.value=element.title
      place.value=element.place
      if(element.completed){
        completed.checked=true
      }else{
        completed.checked=false
      }
    })

    newRow.append(cellUserId, cellId,cellTitle, cellCompleted, cellDelete,cellUpdate);
    tableBody.append(newRow);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userid = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const completed = document.getElementById("completed").checked;
  let obj = {
    userid,
    title,
    completed,
  };
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchdata();
    });
    alert("user created successfully")

  form.reset();
});
// update
updateTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const updateId=document.getElementById("updateId").value;
  const userid = document.getElementById("updateUserId").value;
  const title = document.getElementById("updateTitle").value;
  const completed = document.getElementById("updateCompleted").checked;
  let obj = {
    userid,
    title,
    completed,
  };
  console.log(obj);
  fetch(url+"/"+`${updateId}`,{
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchdata();
    });
    alert("update  successfully")
  console.log("clicked")

  form.reset();
});


