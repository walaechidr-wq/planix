let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");
let timeInput = document.getElementById("timeInput");
let error = document.getElementById("error");
let addSound = document.getElementById("addSound");

// Load tasks on page load
window.onload = function () {
  loadTasks();
};


function addTask() {
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText === "") {
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  const taskObj = {
    text: taskText,
    time: taskTime,
    done: false
  };

  let tasks = getTasksFromStorage();
  tasks.push(taskObj);
  saveTasksToStorage(tasks);

  renderTasks();
  taskInput.value = "";
  timeInput.value = "";
  addSound.play();
}

// Get tasks from localStorage
function getTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load and display tasks
function loadTasks() {
  renderTasks();
}

// Display tasks in the list
function renderTasks() {
  taskList.innerHTML = "";
  const tasks = getTasksFromStorage();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const taskTextSpan = document.createElement("span");
    taskTextSpan.innerHTML = task.text;
    if (task.time) {
      const timeSpan = document.createElement("span");
      timeSpan.className = "task-time";
      timeSpan.innerText = ` [${task.time}]`;
      taskTextSpan.appendChild(timeSpan);
    }

    if (task.done) {
      taskTextSpan.classList.add("done");
    }

    checkbox.onclick = () => {
      tasks[index].done = checkbox.checked;
      saveTasksToStorage(tasks);
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "❌";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasksToStorage(tasks);
      renderTasks();
    };

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(taskTextSpan);

    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
const cofetti=()=>{
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });

};
// Fonction pour générer un nombre aléatoire dans une plage
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Fonction qui lance les confettis 🎉
function launchConfetti() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: Math.floor(randomInRange(50, 100)),
    origin: { y: 0.6 },
  });
}

// Fonction qui vérifie si toutes les tâches sont cochées
function checkAllTasksCompleted() {
  const checkboxes = document.querySelectorAll('.task-checkbox'); // change si tu as une autre classe
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  if (allChecked && checkboxes.length > 0) {
    launchConfetti();
  }
}

// Attacher l'écouteur à toutes les checkboxes au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.task-checkbox');

  checkboxes.forEach(cb => {
    cb.addEventListener('change', checkAllTasksCompleted);
  });
});