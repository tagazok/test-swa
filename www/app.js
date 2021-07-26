
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

const taskform = document.querySelector('#newTaskForm');
const taskList = document.querySelector('#tasksList');
const empty = document.querySelector('#empty')
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


async function getTasks() {
    const response = await fetch('/api/tasks');
    const payload = await response.json();
    console.log(payload);

    if (payload.response.task) {
        for (const task of payload.response.tasks) {
            taskList.appendChild(generateTask(task))
        }
}
}

function generateTask(task) {
    const tmpl = `
    <li class="task-item" id="${task.id}">
        <label>
            <input type="checkbox" ${task.status}>
            <p>${task.label}</p>
        </label>
    </li>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    return fragment;
}

getTasks();