const form = document.getElementById('taskform');
const tableBody = document.getElementById('tablebody');

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        createTaskRow(task.name, task.time, task.duration);
      });
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

function createTaskRow(name, time, duration) {
  const tableRow = document.createElement('tr');

  const nameCell = document.createElement('td');
  const timeCell = document.createElement('td');
  const durationCell = document.createElement('td');
  const deleteCell = document.createElement('td');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete"; // Set button text

  nameCell.textContent = name;
  timeCell.textContent = time;
  durationCell.textContent = duration;

  deleteButton.addEventListener('click', function() {
    // Remove the task row from the table
    tableRow.parentNode.removeChild(tableRow);

    // Update tasks in local storage
    updateTasksInLocalStorage();
  });

  deleteCell.appendChild(deleteButton);

  tableRow.appendChild(nameCell);
  tableRow.appendChild(timeCell);
  tableRow.appendChild(durationCell);
  tableRow.appendChild(deleteCell);

  tableBody.appendChild(tableRow);
}

function updateTasksInLocalStorage() {
  const taskRows = tableBody.querySelectorAll('tr');
  const tasks = [];
  taskRows.forEach(row => {
    const cells = row.querySelectorAll('td:not(:last-child)'); // Exclude delete cell
    tasks.push({
      name: cells[0].textContent,
      time: cells[1].textContent,
      duration: cells[2].textContent
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const time = document.getElementById('time').value;
  const duration = document.getElementById('duration').value;

  createTaskRow(name, time, duration);
  updateTasksInLocalStorage()
  saveTasks();

  form.reset();
});

// Load tasks from local storage on page load
loadTasks();

