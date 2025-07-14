let taskList = document.getElementById("task-list");
let addTaskButton = document.getElementById("add-task-button");
let noTasksMessage = document.getElementById("no-tasks");

let getTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // Track current filter

// Initial render
renderTasks();

// Add event listeners for filter buttons
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("header button");

  filterButtons[0].addEventListener("click", () => setFilter("all"));
  filterButtons[1].addEventListener("click", () => setFilter("completed"));
  filterButtons[2].addEventListener("click", () => setFilter("active"));
});

// Set filter
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// Filter tasks based on current filter
function getFilteredTasks() {
  switch (currentFilter) {
    case "completed":
      return getTasks.filter((task) => task.completed);
    case "active":
      return getTasks.filter((task) => !task.completed);
    default:
      return getTasks;
  }
}

//render all saved tasks from localStorage
function renderTasks() {
  // Clear existing tasks before rendering
  taskList.innerHTML =
    '<p id="no-tasks" class="hidden text-gray-500 text-2xl">No tasks available</p>';
  noTasksMessage = document.getElementById("no-tasks");

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    noTasksMessage.classList.remove("hidden");
    noTasksMessage.textContent =
      currentFilter === "all"
        ? "No tasks available"
        : currentFilter === "completed"
        ? "No completed tasks"
        : "No active tasks";
  } else {
    noTasksMessage.classList.add("hidden");
  }

  filteredTasks.forEach((task) => {
    const originalIndex = getTasks.findIndex((t) => t === task);

    let taskItem = document.createElement("div");
    taskItem.className =
      "flex flex-row items-center justify-between w-full p-5 bg-gray-700 hover:py-10 transition-all duration-200 ease-in-out";

    let taskText = document.createElement("h3");
    taskText.textContent = task.title;
    taskText.className = "text-white text-3xl";
    taskText.style.textDecoration = task.completed ? "line-through" : "none";

    // crud buttons for each task
    let taskBtns = document.createElement("div");
    taskBtns.className = "flex flex-row items-center gap-5";

    // Check button to mark task as completed
    let checkButton = document.createElement("button");
    checkButton.innerText = task.completed ? "Completed" : "Active";
    checkButton.className = task.completed
      ? "block text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      : "block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

    checkButton.onclick = () => {
      getTasks[originalIndex].completed = !getTasks[originalIndex].completed;
      localStorage.setItem("tasks", JSON.stringify(getTasks));
      renderTasks(); // Re-render instead of reload
    };

    // Edit button to modify the task
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className =
      "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
    editButton.onclick = () => {
      let newTask = prompt("Edit your task:", task.title);
      if (newTask !== null && newTask.trim() !== "") {
        getTasks[originalIndex].title = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(getTasks));
      }
      renderTasks(); // Re-render instead of reload
    };

    // Delete button to remove the task
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className =
      "block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
    deleteButton.onclick = () => {
      getTasks.splice(originalIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(getTasks));
      renderTasks(); // Re-render instead of reload
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
  renderTasks(); // Re-render instead of reload
}
