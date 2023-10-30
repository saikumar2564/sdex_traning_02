const form = document.getElementById("task-form");
const table = document.querySelector("table");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const userId = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const completed = document.getElementById("completed").checked;

  const newRow = table.insertRow();

  const cellUserId = newRow.insertCell(0);
  const cellId = newRow.insertCell(1);
  const cellTitle = newRow.insertCell(2);
  const cellCompleted = newRow.insertCell(3);

  cellUserId.innerHTML = userId;
  cellId.innerHTML = generateRandomId();
  cellTitle.innerHTML = title;
  cellCompleted.innerHTML = completed ? "Yes" : "No";
  
  // Change the font color based on the checkbox state
  cellCompleted.className = completed ? "completed-yes" : "completed-no";

  form.reset();
});

function generateRandomId() {
    const min = 10;
    const max = 99;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId;
}