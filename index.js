// const form = document.getElementById("task-form");
// const table = document.querySelector("table");
// let tableBody=document.getElementById("tableBody")
// const url = "https://mock-api-template-q6lp.onrender.com/users";
// window.addEventListener("load", () => {
//   fetchdata()
// });
// function fetchdata(){
//   fetch(url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       displaydata(data);
//     });
// }
// function displaydata(data) {
//   tableBody.innerHTML=null
//   data.forEach((element) => {

//      const newRow = document.createElement("tr")

    
//     const cellUserId=document.createElement("td")
//     const cellId=document.createElement("td")
//     const cellpalce=document.createElement("td")
//     const cellTitle=document.createElement("td")
//     const cellCompleted=document.createElement("td")
//     const cellDelete=document.createElement("td")


//     cellUserId.innerHTML = element.userid;
//     cellId.innerHTML = element.id;
//     cellpalce.innerHTML = element.place;
//     cellTitle.innerHTML = element.title;
//     cellCompleted.innerHTML = element.completed ? true : false;
//     cellDelete.textContent = "delete";
//     cellDelete.style.backgroundColor = "red";
//     cellDelete.style.color = "white";
//     cellDelete.style.cursor = "pointer";
//     if (cellCompleted.innerText==="true") {
//       cellCompleted.style.backgroundColor = "green";
//       cellCompleted.style.color = "white";
//     } else {
//       cellCompleted.style.backgroundColor = "red";
//       cellCompleted.style.color = "white";
//     }
//     newRow.append(cellUserId,cellId,cellpalce,cellTitle,cellCompleted,cellDelete)
//     tableBody.append(newRow)
//   });
// }
// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const userid = document.getElementById("userId").value;
//   const title = document.getElementById("title").value;
//   const place = document.getElementById("place").value;
//   const completed = document.getElementById("completed").checked;
//   let obj = {
//     userid,
//     title,
//     place,
//     completed,
//   };
//   fetch(url, {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(obj),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       fetchdata()
//       // displaydata(data);
//     });

//   // const newRow = table.insertRow();

//   // const cellUserId = newRow.insertCell(0);
//   // const cellId = newRow.insertCell(1);
//   // const cellpalce=newRow.insertCell(2)
//   // const cellTitle = newRow.insertCell(3);
//   // const cellCompleted = newRow.insertCell(4);

//   // cellUserId.innerHTML = userId;
//   // cellId.innerHTML = generateRandomId();
//   // cellpalce.innerHTML=place;
//   // cellTitle.innerHTML = title;
//   // cellCompleted.innerHTML = completed ? true : false;
//   // if(completed){
//   //   cellCompleted.style.backgroundColor="green";
//   //   cellCompleted.style.color="white"
//   // }
//   // else{
//   //   cellCompleted.style.backgroundColor="red"
//   //   cellCompleted.style.color="white"
//   // }

//   // cellCompleted.className = completed ? "completed-yes" : "completed-no";

//   form.reset();
// });

const form = document.getElementById("task-form");
const table = document.querySelector("table");
let tableBody = document.getElementById("tableBody");
const url = "https://mock-api-template-q6lp.onrender.com/users";
const updateTaskForm=document.getElementById("update-task-form");
window.addEventListener("load", () => {
  fetchdata();
});

function fetchdata() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displaydata(data);
    });
    
}

function displaydata(data) {
  tableBody.innerHTML = null;
  data.forEach((element) => {
    const newRow = document.createElement("tr");

    const cellUserId = document.createElement("td");
    const cellId = document.createElement("td");
    const cellplace = document.createElement("td");
    const cellTitle = document.createElement("td");
    const cellCompleted = document.createElement("td");
    const cellDelete = document.createElement("td");
    const cellUpdate =document.createElement("td");

    cellUserId.innerHTML = element.userid;
    cellId.innerHTML = element.id;
    cellplace.innerHTML = element.place;
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
      const place = document.getElementById("updatePlace");
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

    newRow.append(cellUserId, cellId, cellplace, cellTitle, cellCompleted, cellDelete,cellUpdate);
    tableBody.append(newRow);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userid = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const place = document.getElementById("place").value;
  const completed = document.getElementById("completed").checked;
  let obj = {
    userid,
    title,
    place,
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
  const place = document.getElementById("updatePlace").value;
  const completed = document.getElementById("updateCompleted").checked;
  let obj = {
    userid,
    title,
    place,
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

