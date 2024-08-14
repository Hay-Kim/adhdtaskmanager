<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="todo-container">
        <h1>Todo List</h1>
        <p id="user-points">Points: 0</p>
        <p id="user-level">Level: 1</p>
        <input type="text" id="todo-input" placeholder="Enter a new task">
        <button id="add-todo">Add Task</button>
        <ul id="todo-list"></ul>

        <p id="focus-timer"></p>
        <button id="start-focus">Start Focus Mode</button>
        <button id="stop-focus">Stop Focus Mode</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
