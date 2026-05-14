// --- TO-DO LIST LOGIC ---
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";

function renderTodos() {
    todoList.innerHTML = "";
    const filtered = todos.filter(t => {
        if (currentFilter === "active") return !t.completed;
        if (currentFilter === "completed") return t.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.className = todo.completed ? "completed" : "";
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        li.dataset.id = todo.id;
        todoList.appendChild(li);
    });
    updateStats();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    todos.push({ id: Date.now(), text: input.value, completed: false });
    input.value = "";
    renderTodos();
});

todoList.addEventListener("click", (e) => {
    const id = Number(e.target.closest("li").dataset.id);
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
    } else if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
    }
    renderTodos();
});

filters.forEach(btn => {
    btn.onclick = () => {
        filters.forEach(f => f.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    };
});

clearCompletedBtn.onclick = () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
};

function updateStats() {
    const left = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${left} items left`;
}

// --- DAILY CHALLENGES ---
// Day 1: Color Changer
document.getElementById("color-changer").onclick = () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.querySelectorAll("h1, h2, h3").forEach(h => h.style.color = randomColor);
};

// Day 2: Dynamic Creator
let pCount = 0;
document.getElementById("element-creator").onclick = () => {
    pCount++;
    const p = document.createElement("p");
    p.innerHTML = `Paragraph #${pCount} <button onclick="this.parentElement.remove()">X</button>`;
    document.body.appendChild(p);
};

// Day 3: Image Toggle
document.getElementById("image-toggle").onclick = () => {
    const img = document.querySelector("#image-container img");
    img.style.display = img.style.display === "none" ? "block" : "none";
};

// Day 4: Content Copier
document.getElementById("copy-btn").onclick = () => {
    document.getElementById("target").textContent = document.getElementById("source").textContent;
};

// Day 5: Dark Mode
document.getElementById("dark-toggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
};