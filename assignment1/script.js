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
      const li = document.createElement('li');
      li.textContent = taskText;

      const deleteButton = document.createElement('span');
      deleteButton.textContent = 'x';
      deleteButton.className = 'delete';
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
      });

      li.appendChild(deleteButton);
      taskList.appendChild(li);
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
      tasks.push(task.textContent.slice(0, -1)); // Remove the 'x' from the task text
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.textContent = taskText;

      const deleteButton = document.createElement('span');
      deleteButton.textContent = 'x';
      deleteButton.className = 'delete';
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
      });

      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
});
