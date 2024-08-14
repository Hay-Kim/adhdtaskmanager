// script.js

let userPoints = 0;
let userLevel = 1;

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadUserStats();
});

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

function addTodoItem(todoText, completed = false) {
    // 기존 코드 생략

    const completeTaskButton = document.createElement('button');
    completeTaskButton.textContent = 'Complete';
    completeTaskButton.addEventListener('click', function() {
        if (!checkbox.checked) {
            checkbox.checked = true;
            newTodo.classList.add('completed');
            updatePoints(5);
        }
    });

    newTodo.appendChild(completeTaskButton);
    todoList.appendChild(newTodo);
    saveTodos();
}
