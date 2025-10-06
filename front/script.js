const API_BASE = "http://localhost:4000/api/tasks";
let tasks = [];
let filter = "all";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter-btn");

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => e.key === "Enter" && addTask());
clearCompletedBtn.addEventListener("click", clearCompleted);
filters.forEach((f) => {
  f.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    f.classList.add("active");
    filter = f.dataset.filter;
    render();
  });
});

// Fetch all tasks from backend
async function fetchTasks() {
  const res = await fetch(API_BASE);
  tasks = await res.json();
  render();
}

async function addTask() {
  const text = input.value.trim();
  if (!text) return input.focus();

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const newTask = await res.json();
  tasks.push(newTask);
  input.value = "";
  render();
}

async function toggleComplete(id, completed) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  const updated = await res.json();
  tasks = tasks.map((t) => (t._id === id ? updated : t));
  render();
}

async function editTask(id) {
  const t = tasks.find((x) => x._id === id);
  const li = document.querySelector(`[data-id='${id}']`);
  const span = li.querySelector("span");

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = t.text;
  inputEdit.className = "edit-input";
  span.replaceWith(inputEdit);
  inputEdit.focus();

  inputEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEdit();
  });
  inputEdit.addEventListener("blur", finishEdit);

  async function finishEdit() {
    const newText = inputEdit.value.trim();
    if (newText && newText !== t.text) {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      const updated = await res.json();
      tasks = tasks.map((x) => (x._id === id ? updated : x));
    }
    render();
  }
}

async function deleteTask(id) {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  tasks = tasks.filter((t) => t._id !== id);
  render();
}

async function clearCompleted() {
  const completedTasks = tasks.filter((t) => t.completed);
  for (const t of completedTasks) {
    await fetch(`${API_BASE}/${t._id}`, { method: "DELETE" });
  }
  tasks = tasks.filter((t) => !t.completed);
  render();
}

function render() {
  list.innerHTML = "";
  let filtered = tasks;
  if (filter === "active") filtered = tasks.filter((t) => !t.completed);
  if (filter === "completed") filtered = tasks.filter((t) => t.completed);

  if (filtered.length === 0) {
    list.innerHTML = `<li class="empty">No tasks found</li>`;
    taskCount.textContent = "0 tasks left";
    return;
  }

  filtered.forEach((t) => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = t._id;

    li.innerHTML = `
      <span class="${t.completed ? "completed" : ""}">${t.text}</span>
      <button class="complete-btn" onclick="toggleComplete('${t._id}', ${t.completed})">✅</button>
      <button class="edit-btn" onclick="editTask('${t._id}')">✏️</button>
      <button class="delete-btn" onclick="deleteTask('${t._id}')">🗑️</button>
    `;
    list.appendChild(li);
  });

  const active = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${active} task${active !== 1 ? "s" : ""} left`;
}

fetchTasks();
