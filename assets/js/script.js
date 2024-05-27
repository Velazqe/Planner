document.getElementById('addTaskBtn').addEventListener('click', function() {
    document.getElementById('taskModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('taskModal').style.display = 'none';
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDesc = document.getElementById('taskDesc').value;
    const taskDate = document.getElementById('taskDate').value;

    addTask(taskName, taskDesc, taskDate);
    document.getElementById('taskModal').style.display = 'none';
});

function addTask(name, desc, date) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.setAttribute('ondragstart', 'drag(event)');
    task.setAttribute('ondragend', 'dragEnd(event)');
    task.id = `task${Date.now()}`;

    const dueDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = dueDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let backgroundColor;
    if (dayDiff >= 2) {
        backgroundColor = 'grey';
    } else if (dayDiff === 1) {
        backgroundColor = 'yellow';
    } else {
        backgroundColor = 'red';
    }

    task.style.backgroundColor = backgroundColor;

    const due = dayDiff < 0 ? 'past due' : (dayDiff === 0 ? 'due today' : `${dayDiff} day(s) left`);
    task.innerHTML = `
        <p class="task-title">${name}</p>
        <p class="task-desc">${desc}</p>
        <p class="due-date">${due}</p>
        <p class="date">${date}</p>
        <button class="delete-btn" onclick="deleteTask(this.parentNode)">Delete</button>
    `;

    document.getElementById('todo').appendChild(task);
    saveTasks();
}

function deleteTask(task) {
    task.remove();
    saveTasks();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.cursor = 'grabbing';
}

function dragEnd(ev) {
    ev.target.style.cursor = 'grab';
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    if (ev.target.classList.contains('column')) {
        ev.target.appendChild(task);
    } else {
        ev.target.closest('.column').appendChild(task);
    }
    task.style.cursor = 'grab';
    saveTasks();
}

function saveTasks() {
    const tasks = { todo: [], progress: [], done: [] };
    
    document.querySelectorAll('#todo .task').forEach(task => tasks.todo.push(serializeTask(task)));
    document.querySelectorAll('#progress .task').forEach(task => tasks.progress.push(serializeTask(task)));
    document.querySelectorAll('#done .task').forEach(task => tasks.done.push(serializeTask(task)));
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;

    tasks.todo.forEach(taskData => document.getElementById('todo').appendChild(deserializeTask(taskData)));
    tasks.progress.forEach(taskData => document.getElementById('progress').appendChild(deserializeTask(taskData)));
    tasks.done.forEach(taskData => document.getElementById('done').appendChild(deserializeTask(taskData)));
}

function serializeTask(task) {
    return {
        id: task.id,
        name: task.querySelector('.task-title').textContent,
        desc: task.querySelector('.task-desc').textContent,
        date: task.querySelector('.date').textContent,
        backgroundColor: task.style.backgroundColor
    };
}

function deserializeTask(taskData) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.setAttribute('ondragstart', 'drag(event)');
    task.setAttribute('ondragend', 'dragEnd(event)');
    task.id = taskData.id;
    task.style.backgroundColor = taskData.backgroundColor;

    const dueDate = new Date(taskData.date);
    const currentDate = new Date();
    const timeDiff = dueDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const due = dayDiff < 0 ? 'past due' : (dayDiff === 0 ? 'due today' : `${dayDiff} day(s) left`);
    task.innerHTML = `
        <p class="task-title">${taskData.name}</p>
        <p class="task-desc">${taskData.desc}</p>
        <p class="due-date">${due}</p>
        <p class="date">${taskData.date}</p>
        <button class="delete-btn" onclick="deleteTask(this.parentNode)">Delete</button>
    `;

    return task;
}

document.addEventListener('DOMContentLoaded', loadTasks);
