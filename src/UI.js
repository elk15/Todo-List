import Utilities from './Utils';
import TodoList from './TodoList';

const projectPage = (project) => {
    const page = document.createElement('div');
    page.classList.add('project');

    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    page.appendChild(projectTitle);

    const taskList = document.createElement('ul');
    taskList.classList.add('tasks');
    page.appendChild(taskList);

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
        projectTitle.innerHTML = `<h2>${project.title}</h2>`;
        projectTitle.appendChild(groupBtns());
    };

    const createListItemIcon = (task) => {
        const priorityColors = ['', '#d1453b', '#eb8909', '#246fe0', '#474545'];
        const icon = document.createElement('div');
        icon.classList.add('check');
        icon.innerHTML = `<i class="fa-regular fa-circle fa-lg" style="color: ${priorityColors[task.priority]};"></i>`;
        return icon;
    };

    const createListItem = (task, index) => {
        const li = document.createElement('li');
        const icon = createListItemIcon(task);
        li.dataset.index = index;
        li.appendChild(icon);
        li.innerHTML += `</div> <div class="task-main"><div class="task-title"><h3>${task.title}</h3> ${task.getDueDate()}</div>
        <div>${task.description}</div> </div>`;
        return li;
    };

    const createTasksList = () => {
        let i = 0;
        project.getTasks().forEach((task) => {
            taskList.appendChild(createListItem(task, i));
            i += 1;
        });
        console.log('Task list created');
    };

    const createAddTaskBtn = () => {
        const btn = document.createElement('button');
        btn.classList.add('add-task');
        btn.innerHTML += '<span>+</span> Add task';
        btn.addEventListener('click', () => {
            console.log('Click');
        });
        page.appendChild(btn);
    };

    const initializePage = () => {
        createHeader();
        createTasksList();
        createAddTaskBtn();
        return page;
    };

    const handleChecks = () => {
        const checks = document.querySelectorAll('.check');

        checks.forEach((check) => {
            const taskIndex = check.parentElement.dataset.index;

            check.addEventListener('mouseover', () => {
                check.firstChild.classList.remove('fa-circle');
                check.firstChild.classList.add('fa-circle-check');
            });
            check.addEventListener('mouseout', () => {
                if (!project.findTask(taskIndex).isCompleted) {
                    console.log(!project.findTask(taskIndex).isCompleted);
                    check.firstChild.classList.remove('fa-circle-check');
                    check.firstChild.classList.add('fa-circle');
                }
            });

            check.addEventListener('click', () => {
                project.findTask(taskIndex).completeTask();
                check.parentElement.classList.add('completed');
                check.firstChild.classList.remove('fa-circle');
                check.firstChild.classList.add('fa-circle-check');
            });
        });
    };

    return {
        initializePage,
        handleChecks,
    };
};

const UI = (() => {
    const currentPage = projectPage(TodoList.inbox).initializePage();

    const todayAmount = Utilities.getElement('.amount-today');
    const inboxAmount = Utilities.getElement('.amount-inbox');
    inboxAmount.innerHTML = TodoList.inbox.getTasksAmount();
    todayAmount.innerHTML = TodoList.getTodaysTasks().getTasksAmount();

    const initializeUI = () => {
        projectPage(TodoList.inbox).handleChecks();
    };

    return {
        currentPage,
        initializeUI,
    };
})();

export default UI;
