let taskList = document.getElementById("task-list");
let addTaskButton = document.getElementById("add-task-button");
let noTasksMessage = document.getElementById("no-tasks");

let getTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Initial render
renderTasks();

//render all saved tasks from localStorage
function renderTasks() {
  // Clear existing tasks before rendering
  taskList.innerHTML =
    '<p id="no-tasks" class="hidden text-gray-500 text-2xl">No tasks available</p>';
  noTasksMessage = document.getElementById("no-tasks");

  if (getTasks.length === 0) {
    noTasksMessage.classList.remove("hidden");
  } else {
    noTasksMessage.classList.add("hidden");
  }
  getTasks.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.className =
      "flex flex-row items-center justify-between w-full p-5 bg-gray-700 hover:py-10 transition-all duration-200 ease-in-out";

    let taskText = document.createElement("h3");
    taskText.textContent = task.title;
    taskText.className = "text-white text-3xl";

    // crud buttons for each task
    let taskBtns = document.createElement("div");
    taskBtns.className = "flex flex-row items-center gap-5";

    // Check button to mark task as completed
    let checkButton = document.createElement("button");
    checkButton.innerText = task.completed ? "Completed" : "Active";
    checkButton.className = task.completed
      ? "block text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      : "block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
    taskText.style.textDecoration = task.completed ? "line-through" : "none";

    checkButton.onclick = () => {
      getTasks[index].completed = !getTasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(getTasks));
      window.location.reload();
    };

    // Edit button to modify the task
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className =
      "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
    editButton.onclick = () => {
      let newTask = prompt("Edit your task:", task.title);
      if (newTask !== null && newTask.trim() !== "") {
        getTasks[index].title = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(getTasks));
      }
      window.location.reload();
    };

    // Delete button to remove the task
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className =
      "block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
    deleteButton.onclick = () => {
      getTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(getTasks));
      window.location.reload();
    };

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskBtns);
    taskBtns.appendChild(checkButton);
    taskBtns.appendChild(editButton);
    taskBtns.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}
function addTask() {
  let taskInput = document.getElementById("task-input").value;
  if (taskInput.trim() === "") {
    alert("Please enter a task.");
    return;
  }
  getTasks.push({ title: taskInput.trim(), completed: false });
  localStorage.setItem("tasks", JSON.stringify(getTasks));
  document.getElementById("task-input").value = "";
  window.location.reload();
}
