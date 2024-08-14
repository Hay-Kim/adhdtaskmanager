// script.js
document.getElementById('add-todo').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
    }
});

function addTodoItem(todoText) {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');

    const todoContent = document.createElement('span');
    todoContent.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            todoContent.style.textDecoration = 'line-through';
        } else {
            todoContent.style.textDecoration = 'none';
        }
    });

    newTodo.appendChild(checkbox);
    newTodo.appendChild(todoContent);
    newTodo.appendChild(deleteButton);

    todoList.appendChild(newTodo);
}
