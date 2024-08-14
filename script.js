document.addEventListener('DOMContentLoaded', loadTodos);

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
