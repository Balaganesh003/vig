document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');
  const clearTasksButton = document.getElementById('clearTasksButton');

  // Load tasks from local storage
  loadTasks();

  // Add task event
  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Clear all tasks event
  clearTasksButton.addEventListener('click', clearAllTasks);

  // Add task function
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      createTaskElement(taskText);
      taskInput.value = '';
      saveTasks();
    }
  }

  // Clear all tasks function
  function clearAllTasks() {
    taskList.innerHTML = '';
    saveTasks();
  }

  // Save tasks to local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
      tasks.push(task.querySelector('.task-text').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  }

  // Create task element
  function createTaskElement(taskText) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';
    li.appendChild(span);

    const editButton = document.createElement('span');
    editButton.textContent = 'edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', () => editTask(span, li));
    li.appendChild(editButton);

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }

  // Edit task function
  function editTask(taskTextElement, taskElement) {
    const currentText = taskTextElement.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    taskElement.insertBefore(input, taskTextElement);
    taskElement.removeChild(taskTextElement);

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const newText = input.value.trim();
        if (newText !== '') {
          taskTextElement.textContent = newText;
          taskElement.insertBefore(taskTextElement, input);
          taskElement.removeChild(input);
          saveTasks();
        }
      }
    });

    input.addEventListener('blur', () => {
      const newText = input.value.trim();
      if (newText !== '') {
        taskTextElement.textContent = newText;
        taskElement.insertBefore(taskTextElement, input);
        taskElement.removeChild(input);
        saveTasks();
      }
    });

    input.focus();
  }
});
