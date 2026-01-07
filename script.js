//this is uncompleted code for a drag-and-drop task management system with modal functionality

let allTasks = [];

const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');
let draggedItem = null;
const tasks = document.querySelectorAll('.task');
const columns = [todo,progress,done]
tasks.forEach(task => {
    task.addEventListener('drag', (e) => {
        draggedItem = task;
    });

});
function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');

        allTasks[col.id] = Array.from(tasks).map(task => ({
            title: task.querySelector('h3').innerText,
            description: task.querySelector('p').innerText
        }));

        col.querySelector('.lift').innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}


function addTask(column, title, description) {
    if (title.trim() !== '') {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = `<h3>${title}</h3><p>${description}</p><button>Delete</button>`;

        newTask.addEventListener('drag', () => {
            draggedItem = newTask;
        });

        column.appendChild(newTask);
        modal.classList.remove('show');

        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    }
}


function allowDrop(ev) {
    ev.addEventListener('dragenter', (e) => {
        e.preventDefault();
        ev.classList.add('hover-over');
    });
    ev.addEventListener('dragleave', (e) => {
        e.preventDefault();
        ev.classList.remove('hover-over');
    });
    ev.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    ev.addEventListener('drop', (e) => {
        e.preventDefault();
        ev.appendChild(draggedItem);
        ev.classList.remove('hover-over');
    updateTaskCount();
        
    });
}
allowDrop(todo);
allowDrop(progress);
allowDrop(done);

// Modal Functionality
const addBtn = document.getElementById('add-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modal = document.querySelector('.modal');
const saveTaskBtn = document.getElementById('save-task-btn');

addBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');  
});

saveTaskBtn.addEventListener('click', () => {
    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;    
  addTask(todo, taskTitle, taskDesc);
    updateTaskCount();
});

