
async function getTasks() {
    const response = await fetch('/api/tasks');
    const payload = await response.json();
}

async function getUser() {
    const response = await fetch('/api/users');
    const payload = await response.json();
    console.log(payload);
    const { clientPrincipal } = payload;
    return clientPrincipal;
}
getUser();

const taskform = document.querySelector('#new_task_form');
const taskList = document.querySelector('#tasksList');

taskform.addEventListener('submit', async (e) => {

    e.preventDefault();
    const newTaskInput = taskform.elements.new_task_input;

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({label: newTaskInput.value})
    });
    const payload = await response.json();
    console.log(payload);
    const task = generateTask(payload.task);

    taskList.appendChild(task);

    newTaskInput.value = '';
});


function generateTask(task) {
    const tmpl = `
    <div class="task-${task.id}">
        ${task.label}
    </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    return fragment;
}
