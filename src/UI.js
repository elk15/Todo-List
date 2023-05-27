import Utilities from './Utils';
import TodoList from './TodoList';

const projectPage = (project) => {
    const page = document.createElement('div');
    page.classList.add('project');

    const createListItemIcon = (task) => {
        const priorityColors = ['', '#d1453b', '#eb8909', '#246fe0', '#f3f3f3'];
        if (task.isComplete) {
            return `<i class="fa-regular fa-circle-check fa-lg" style="color: ${priorityColors[task.priority]};"></i>`;
        }
        return `<i class="fa-regular fa-circle fa-lg" style="color: ${priorityColors[task.priority]};"></i>`;
    };

    const createListItem = (task) => {
        const li = document.createElement('li');
        li.innerHTML = `<div>${createListItemIcon(task)}</div> <div class="task-main"><div class="task-title"><h3>${task.title}</h3> ${task.getDueDate()}</div>
        <div>${task.description}</div> </div>`;
        return li;
    };

    const createTasksList = () => {
        const ul = document.createElement('ul');
        ul.classList.add('tasks');
        project.getTasks().forEach((task) => {
            ul.appendChild(createListItem(task));
        });
        page.appendChild(ul);
    };

    const createBtn = (text, c) => {
        const btn = document.createElement('button');
        btn.innerHTML = `${text} <i class="fa-solid fa-angle-down" style="color: #2e3436;"></i>`;
        btn.class = c;
        return btn;
    };

    const groupBtns = () => {
        const div = document.createElement('div');
        div.classList.add('btns');
        const sortByBtn = createBtn('Sort By', 'sort');
        div.appendChild(sortByBtn);
        const deleteBtn = createBtn('Delete', 'delete');
        div.appendChild(deleteBtn);
        return div;
    };

    const createHeader = () => {
        const div = document.createElement('div');
        div.classList.add('project-title');
        div.innerHTML = `<h2>${project.title}</h2>`;
        div.appendChild(groupBtns());
        page.appendChild(div);
    };

    const createAddTaskBtn = () => {
        const btn = document.createElement('button');
        btn.classList.add('add-task');
        btn.innerHTML += '<span>+</span> Add task';
        page.appendChild(btn);
    };

    createHeader();
    createTasksList();
    createAddTaskBtn();

    return {
        page,
    };
};

const UI = (() => {
    const todayAmount = Utilities.getElement('.amount-today');
    const inboxAmount = Utilities.getElement('.amount-inbox');
    inboxAmount.innerHTML = TodoList.inbox.getTasksAmount();
    todayAmount.innerHTML = TodoList.getTodaysTasks().getTasksAmount();

    console.log(TodoList.inbox.getTasks());
    const inboxPage = projectPage(TodoList.inbox).page;

    return {
        inboxPage,
    };
})();

export default UI;
