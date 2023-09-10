const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        ${taskText}
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);

    // Save tasks in local storage
    saveTasksToLocalStorage();

    taskInput.value = "";
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);

    // Save tasks in local storage
    saveTasksToLocalStorage();
}

// Load tasks from local storage when the page loads
window.addEventListener("load", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            ${taskText}
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
});

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map((taskItem) => {
        return taskItem.textContent.replace("Delete", "").trim();
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
