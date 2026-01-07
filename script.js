const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');
let draggedItem = null;

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener('drag', (e) => {
        draggedItem = task;
    });

});

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
        
    });
}
allowDrop(todo);
allowDrop(progress);
allowDrop(done);
