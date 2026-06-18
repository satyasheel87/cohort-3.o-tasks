// ============================================================
//  script.js — Task Manager | DOM Explorer Assignment
//  Author: Satyasheel
//
//  Topics covered:
//  1. DOM Manipulation (createElement, append, remove, etc.)
//  2. Attributes vs Properties
//  3. Event Handling (addEventListener)
//  4. Event Delegation (single listener on parent)
//  5. Event Propagation (Bubbling & Capturing)
//  6. Theme Toggle (classList, dataset, setAttribute)
//  7. Bonus: Search, Filter, LocalStorage, Stats
// ============================================================


// ─────────────────────────────────────────────────────────────
// SECTION 1: Grab references to important DOM elements
// ─────────────────────────────────────────────────────────────

const addTaskBtn = document.getElementById("addTaskBtn");
const taskTitleInput = document.getElementById("taskTitle");
const taskCategoryEl = document.getElementById("taskCategory");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const clearAllBtn = document.getElementById("clearAllBtn");

// Stats elements
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// A unique ID counter for tasks
let taskIdCounter = 0;


// ─────────────────────────────────────────────────────────────
// SECTION 2: ATTRIBUTES vs PROPERTIES — Live Demo in Console
//
//  inputEl.value
//    → This is a DOM PROPERTY. It gives the CURRENT live value
//      that the user has typed into the field.
//
//  inputEl.getAttribute("value")
//    → This is the HTML ATTRIBUTE. It reflects the initial value
//      set in the HTML (value="My Default Task").
//      It does NOT update as the user types.
//
//  Try this in DevTools console:
//    taskTitleInput.value              → current typed value
//    taskTitleInput.getAttribute("value") → "My Default Task" always
// ─────────────────────────────────────────────────────────────

console.log("--- Attributes vs Properties Demo ---");
console.log("Initial attribute value:", taskTitleInput.getAttribute("value"));
console.log("Initial property value:", taskTitleInput.value);
console.log("These are the same right now, but type something in the input and run them again!");


// ─────────────────────────────────────────────────────────────
// SECTION 3: Load tasks from LocalStorage on page load (Bonus)
// ─────────────────────────────────────────────────────────────

function loadFromStorage() {
  const saved = localStorage.getItem("taskflow_tasks");
  if (!saved) return;
  const tasks = JSON.parse(saved);
  tasks.forEach(task => renderTaskCard(task));
  updateStats();
}

function saveToStorage() {
  const cards = taskList.querySelectorAll(".task-card");
  const tasks = [];
  cards.forEach(card => {
    tasks.push({
      id: card.dataset.id,
      title: card.querySelector(".task-title").textContent,
      category: card.dataset.category,
      status: card.dataset.status,
    });
  });
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
}


// ─────────────────────────────────────────────────────────────
// SECTION 4: Create and Render a Task Card
//
//  Uses: createElement(), createTextNode(), append(), appendChild()
//        setAttribute(), dataset
// ─────────────────────────────────────────────────────────────

function renderTaskCard(task) {
  // Remove empty state message if it exists
  if (emptyState && emptyState.parentNode) {
    emptyState.remove(); // ← uses remove()
  }

  // ── createElement() to build the card structure ──
  const card = document.createElement("div");
  card.className = "task-card";

  // setAttribute() — setting custom data attributes
  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  // dataset can also be used (equivalent to setAttribute for data-*)
  // card.dataset.id = task.id;   ← same result, different syntax

  if (task.status === "completed") {
    card.classList.add("completed");
  }

  // ── Task Body ──
  const body = document.createElement("div");
  body.className = "task-body";

  // createTextNode() — creates a text node (safe, no XSS risk)
  const titleEl = document.createElement("p");
  titleEl.className = "task-title";
  const titleText = document.createTextNode(task.title);
  titleEl.appendChild(titleText); // appendChild()

  // Meta row: category badge + status badge
  const meta = document.createElement("div");
  meta.className = "task-meta";

  const catBadge = document.createElement("span");
  catBadge.className = `badge badge-${task.category}`;
  catBadge.textContent = categoryLabel(task.category);

  const statusBadge = document.createElement("span");
  statusBadge.className = "task-status-badge";
  statusBadge.textContent = task.status === "completed" ? "✅ Done" : "⏳ Pending";

  meta.append(catBadge, statusBadge); // append() — adds multiple nodes at once

  body.append(titleEl, meta);

  // ── Action Buttons ──
  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-edit";
  editBtn.textContent = "✏️ Edit";
  editBtn.dataset.action = "edit"; // using dataset for action type

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn btn-success";
  completeBtn.textContent = task.status === "completed" ? "↩️ Undo" : "✔ Done";
  completeBtn.dataset.action = "complete";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "🗑 Del";
  deleteBtn.dataset.action = "delete";

  actions.append(editBtn, completeBtn, deleteBtn);

  // ── Assemble card ──
  card.append(body, actions);

  // prepend() — newer tasks go on top instead of bottom
  taskList.prepend(card);

  updateStats();
}


// ─────────────────────────────────────────────────────────────
// SECTION 5: Add Task — Form Submission Logic
// ─────────────────────────────────────────────────────────────

function addTask() {
  // Reading property (live value the user typed)
  const title = taskTitleInput.value.trim();

  // getAttribute() would give us the original HTML default, NOT what's typed
  // console.log(taskTitleInput.getAttribute("value")); // still "My Default Task"

  if (!title) {
    taskTitleInput.style.borderColor = "var(--danger)";
    taskTitleInput.focus();
    setTimeout(() => (taskTitleInput.style.borderColor = ""), 1200);
    return;
  }

  taskIdCounter++;
  const task = {
    id: `task-${taskIdCounter}-${Date.now()}`,
    title: title,
    category: taskCategoryEl.value,
    status: "pending",
  };

  renderTaskCard(task);
  saveToStorage();

  // Reset input
  taskTitleInput.value = "";
  taskTitleInput.focus();
}

// addEventListener() for Add button
addTaskBtn.addEventListener("click", addTask);

// Also allow pressing Enter in the title input
taskTitleInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});


// ─────────────────────────────────────────────────────────────
// SECTION 6: Event Delegation
//
//  Instead of adding separate click listeners to EVERY task card's
//  buttons, we attach ONE listener to the parent (#taskList).
//
//  When any button inside #taskList is clicked, the event BUBBLES UP
//  to #taskList. We then check what was actually clicked using
//  e.target and e.target.closest() to find the right card.
//
//  Benefits:
//  ✔ Works for dynamically added tasks (no need to re-add listeners)
//  ✔ Uses far fewer event listeners → better performance
// ─────────────────────────────────────────────────────────────

taskList.addEventListener("click", function (e) {
  // Find the button that was clicked (e.target might be an icon inside button)
  const btn = e.target.closest("[data-action]");
  if (!btn) return; // click was not on an action button

  // Walk up to find the parent task card
  const card = btn.closest(".task-card");
  if (!card) return;

  const action = btn.dataset.action; // getAttribute alternative

  if (action === "delete") {
    handleDelete(card);
  } else if (action === "complete") {
    handleComplete(card, btn);
  } else if (action === "edit") {
    handleEdit(card);
  }
});


// ─────────────────────────────────────────────────────────────
// SECTION 7: Task Action Handlers
//
//  Uses: remove(), setAttribute(), replaceWith(), before(), after()
// ─────────────────────────────────────────────────────────────

function handleDelete(card) {
  // Animate out before removing
  card.style.opacity = "0";
  card.style.transform = "translateX(30px)";
  card.style.transition = "all 0.25s ease";

  setTimeout(() => {
    card.remove(); // ← remove() method
    checkEmptyState();
    updateStats();
    saveToStorage();
  }, 250);
}

function handleComplete(card, btn) {
  // Read current status using getAttribute()
  const currentStatus = card.getAttribute("data-status");

  if (currentStatus === "pending") {
    // setAttribute() — update the data attribute
    card.setAttribute("data-status", "completed");
    card.classList.add("completed");
    btn.textContent = "↩️ Undo";

    // Update the status badge text
    const statusBadge = card.querySelector(".task-status-badge");
    statusBadge.textContent = "✅ Done";

  } else {
    card.setAttribute("data-status", "pending");
    card.classList.remove("completed");
    btn.textContent = "✔ Done";

    const statusBadge = card.querySelector(".task-status-badge");
    statusBadge.textContent = "⏳ Pending";
  }

  updateStats();
  saveToStorage();
}

function handleEdit(card) {
  const titleEl = card.querySelector(".task-title");
  const currentTitle = titleEl.textContent;

  // Create an input to replace the title text
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = currentTitle;

  // replaceWith() — swap the title paragraph with the edit input
  titleEl.replaceWith(editInput);
  editInput.focus();
  editInput.select();

  function saveEdit() {
    const newTitle = editInput.value.trim() || currentTitle;

    // Rebuild the title element
    const newTitleEl = document.createElement("p");
    newTitleEl.className = "task-title";
    newTitleEl.textContent = newTitle;

    // replaceWith() again — swap input back to paragraph
    editInput.replaceWith(newTitleEl);

    saveToStorage();
  }

  // Save on Enter or when focus leaves
  editInput.addEventListener("keydown", e => { if (e.key === "Enter") saveEdit(); });
  editInput.addEventListener("blur", saveEdit);
}


// ─────────────────────────────────────────────────────────────
// SECTION 8: Theme Toggle
//
//  Uses: classList.toggle(), setAttribute(), dataset
//  The current theme is stored in: <html data-theme="dark/light">
// ─────────────────────────────────────────────────────────────

themeToggle.addEventListener("click", function () {
  const html = document.documentElement;

  // Read current theme from data attribute
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // setAttribute to update the theme
  html.setAttribute("data-theme", newTheme);

  // Also update the button's own dataset (for demo purposes)
  themeToggle.dataset.theme = newTheme;

  // Update button text
  themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Persist theme in localStorage
  localStorage.setItem("taskflow_theme", newTheme);
});

// Restore saved theme on load
function restoreTheme() {
  const saved = localStorage.getItem("taskflow_theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.dataset.theme = "dark";
    themeToggle.textContent = "☀️ Light Mode";
  }
}


// ─────────────────────────────────────────────────────────────
// SECTION 9: Search & Filter (Bonus Features)
// ─────────────────────────────────────────────────────────────

searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = filterCategory.value;

  const cards = taskList.querySelectorAll(".task-card");
  let anyVisible = false;

  cards.forEach(card => {
    const title = card.querySelector(".task-title").textContent.toLowerCase();
    const cardCat = card.dataset.category; // using dataset

    const matchesSearch = !query || title.includes(query);
    const matchesCategory = category === "all" || cardCat === category;

    if (matchesSearch && matchesCategory) {
      card.style.display = "";
      anyVisible = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide empty state
  const existing = taskList.querySelector(".empty-state");
  if (!anyVisible && !existing) {
    const msg = document.createElement("p");
    msg.className = "empty-state filter-empty";
    msg.textContent = "No tasks match your search / filter.";
    taskList.append(msg); // append()
  } else if (anyVisible && existing && existing.classList.contains("filter-empty")) {
    existing.remove();
  }
}


// ─────────────────────────────────────────────────────────────
// SECTION 10: Clear All Tasks (Bonus)
//
//  Uses DocumentFragment for efficient DOM insertion
// ─────────────────────────────────────────────────────────────

clearAllBtn.addEventListener("click", function () {
  if (!taskList.querySelector(".task-card")) return;

  const confirmed = window.confirm("Are you sure you want to delete ALL tasks?");
  if (!confirmed) return;

  // Remove all task cards
  taskList.querySelectorAll(".task-card").forEach(c => c.remove());

  // Using DocumentFragment to add multiple elements efficiently
  // (here we just add back the empty state, but Fragment demo is below)
  const fragment = new DocumentFragment(); // ← DocumentFragment bonus
  const msg = document.createElement("p");
  msg.className = "empty-state";
  msg.id = "emptyState";
  msg.textContent = "No tasks yet. Add your first task above! 🚀";
  fragment.append(msg);
  taskList.append(fragment);

  localStorage.removeItem("taskflow_tasks");
  updateStats();
});


// ─────────────────────────────────────────────────────────────
// SECTION 11: Stats Counter
// ─────────────────────────────────────────────────────────────

function updateStats() {
  const cards = taskList.querySelectorAll(".task-card");
  const completed = taskList.querySelectorAll(".task-card.completed");
  const pending = cards.length - completed.length;

  totalCount.textContent = cards.length;
  pendingCount.textContent = pending;
  completedCount.textContent = completed.length;
}


// ─────────────────────────────────────────────────────────────
// SECTION 12: Empty State Check
// ─────────────────────────────────────────────────────────────

function checkEmptyState() {
  const cards = taskList.querySelectorAll(".task-card");
  if (cards.length === 0) {
    const msg = document.createElement("p");
    msg.className = "empty-state";
    msg.id = "emptyState";
    msg.textContent = "No tasks yet. Add your first task above! 🚀";
    taskList.append(msg);
  }
}


// ─────────────────────────────────────────────────────────────
// SECTION 13: EVENT PROPAGATION DEMO
//
//  BUBBLING: Events travel UP the DOM tree.
//    Click order: Child → Parent → Grandparent
//
//  CAPTURING: Events travel DOWN the DOM tree.
//    Click order: Grandparent → Parent → Child
//
//  The 3rd argument in addEventListener() controls this:
//    addEventListener("click", handler, false)  → Bubbling (default)
//    addEventListener("click", handler, true)   → Capturing
// ─────────────────────────────────────────────────────────────

const bubbleLog = document.getElementById("bubbleLog");
const captureLog = document.getElementById("captureLog");

// ── BUBBLING setup ──
const gpBubble = document.getElementById("grandparent");
const parBubble = document.getElementById("parent-box");
const chBubble = document.getElementById("child-btn");

function logBubble(who) {
  const time = new Date().toLocaleTimeString();
  bubbleLog.textContent += `[${time}] 🔼 ${who} fired (bubbling up)\n`;
}

// useCapture = false → BUBBLING (child fires first, then bubbles up)
gpBubble.addEventListener("click", () => logBubble("Grandparent"), false);
parBubble.addEventListener("click", () => logBubble("Parent"), false);
chBubble.addEventListener("click", () => {
  bubbleLog.textContent = ""; // clear log on new click
  logBubble("Child");
}, false);

// ── CAPTURING setup ──
const gpCap = document.getElementById("grandparent-cap");
const parCap = document.getElementById("parent-cap");
const chCap = document.getElementById("child-cap");

function logCapture(who) {
  const time = new Date().toLocaleTimeString();
  captureLog.textContent += `[${time}] 🔽 ${who} fired (capturing down)\n`;
}

let captureCleared = false;

// useCapture = true → CAPTURING (grandparent fires first, then goes down)
gpCap.addEventListener("click", (e) => {
  captureLog.textContent = ""; // clear on new grandparent click
  logCapture("Grandparent");
}, true);
parCap.addEventListener("click", () => logCapture("Parent"), true);
chCap.addEventListener("click", () => logCapture("Child"), true);


// ─────────────────────────────────────────────────────────────
// SECTION 14: Helper — Category Label
// ─────────────────────────────────────────────────────────────

function categoryLabel(cat) {
  const map = {
    work: "💼 Work",
    personal: "🏠 Personal",
    study: "📚 Study",
    health: "💪 Health",
    other: "📌 Other",
  };
  return map[cat] || cat;
}


// ─────────────────────────────────────────────────────────────
// SECTION 15: Initialize
// ─────────────────────────────────────────────────────────────

restoreTheme();
loadFromStorage();

console.log("✅ Task Manager initialized!");
console.log("💡 Tip: Try taskTitleInput.value vs taskTitleInput.getAttribute('value') in console.");
