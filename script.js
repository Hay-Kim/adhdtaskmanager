document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadUserStats();
});

document.getElementById('add-todo').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
    }
});

function addTodoItem(todoText, completed = false) {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.classList.add(completed ? 'completed' : '');

    const todoContent = document.createElement('span');
    todoContent.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
        saveTodos();
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        newTodo.classList.toggle('completed', checkbox.checked);
        saveTodos();
    });

    newTodo.appendChild(checkbox);
    newTodo.appendChild(todoContent);
    newTodo.appendChild(deleteButton);

    todoList.appendChild(newTodo);
    saveTodos();
}

function saveTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = [];
    todoList.childNodes.forEach(item => {
        const todoText = item.querySelector('span').textContent;
        const completed = item.querySelector('input').checked;
        todos.push({ text: todoText, completed });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoItem(todo.text, todo.completed));
}

let userPoints = 0;
let userLevel = 1;
let focusTimer;
let isFocusMode = false;

function updatePoints(points) {
    userPoints += points;
    if (userPoints >= userLevel * 10) {
        userLevel++;
        alert(`Congratulations! You've reached level ${userLevel}`);
    }
    saveUserStats();
    displayUserStats();
}

function saveUserStats() {
    localStorage.setItem('userPoints', userPoints);
    localStorage.setItem('userLevel', userLevel);
}

function loadUserStats() {
    userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    userLevel = parseInt(localStorage.getItem('userLevel')) || 1;
    displayUserStats();
}

function displayUserStats() {
    document.getElementById('user-points').textContent = `Points: ${userPoints}`;
    document.getElementById('user-level').textContent = `Level: ${userLevel}`;
}

function startFocusMode(duration = 25) {
    if (isFocusMode) return;

    isFocusMode = true;
    focusTimer = duration * 60;
    document.getElementById('focus-timer').textContent = `Focus Time: ${duration}:00`;

    const focusInterval = setInterval(() => {
        if (focusTimer <= 0) {
            clearInterval(focusInterval);
            isFocusMode = false;
            alert('Focus session completed!');
            document.getElementById('focus-timer').textContent = '';
            return;
        }
        focusTimer--;
        const minutes = Math.floor(focusTimer / 60);
        const seconds = focusTimer % 60;
        document.getElementById('focus-timer').textContent = `Focus Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function stopFocusMode() {
    isFocusMode = false;
    clearInterval(focusTimer);
    document.getElementById('focus-timer').textContent = '';
}

document.getElementById('start-focus').addEventListener('click', () => startFocusMode(25));
document.getElementById('stop-focus').addEventListener('click', stopFocusMode);
