import Utilities from './Utils';
import TodoList from './TodoList';

const projectPage = (project, projectIndex) => {
    const projectTitle = Utilities.getElement('.project-title');
    const taskList = Utilities.getElement('.tasks');

    const taskAmount = Utilities.getElement(`#amount-${projectIndex}`);
    taskAmount.innerHTML = project.getTasksAmount();

    const updateAmount = () => {
        taskAmount.innerHTML = project.getTasksAmount();
    };

    projectTitle.firstChild.innerHTML = project.title;

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
        taskList.innerHTML = '';
        project.getTasks().forEach((task) => {
            taskList.appendChild(createListItem(task, i));
            i += 1;
        });
    };

    const handleChecks = () => {
        const checks = Utilities.getElements('.check');

        checks.forEach((check) => {
            const taskIndex = check.parentElement.dataset.index;

            check.addEventListener('mouseover', () => {
                check.firstChild.classList.remove('fa-circle');
                check.firstChild.classList.add('fa-circle-check');
            });
            check.addEventListener('mouseout', () => {
                if (!project.findTask(taskIndex).isCompleted) {
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

    const toggleMiniMenu = (name) => {
        const sortBtn = Utilities.getElement(`.${name}`);
        sortBtn.addEventListener('click', () => {
            Utilities.showElement(`.${name}-modal`);
        });

        document.addEventListener('click', (e) => {
            if (e.target !== Utilities.getElement(`.${name}`)) {
                Utilities.hideElement(`.${name}-modal`);
            }
        });
    };

    const handleSortMenu = () => {
        const dueDateBtn = Utilities.getElement('.sort-dueDate');
        const priorityBtn = Utilities.getElement('.sort-priority');

        dueDateBtn.addEventListener('click', () => {
            project.sortByDueDate();
            createTasksList();
            handleChecks();
        });

        priorityBtn.addEventListener('click', () => {
            project.sortByPriority();
            createTasksList();
            handleChecks();
        });
    };

    const handleDeleteMenu = () => {
        const deleteCompletedBtn = Utilities.getElement('.delete-completed');
        const deleteAllBtn = Utilities.getElement('.delete-all');

        deleteCompletedBtn.addEventListener('click', () => {
            project.deleteCompleted();
            createTasksList();
            handleChecks();
            updateAmount();
        });

        deleteAllBtn.addEventListener('click', () => {
            project.deleteAll();
            createTasksList();
            handleChecks();
            updateAmount();
        });
    };

    const initializePage = () => {
        createTasksList();
        handleChecks();
        toggleMiniMenu('sort');
        toggleMiniMenu('delete');
        handleSortMenu();
        handleDeleteMenu();
    };

    return {
        initializePage,
    };
};

const UI = (() => {
    const initializeUI = () => {
        projectPage(TodoList.inbox, 0).initializePage();
    };

    return {
        initializeUI,
    };
})();

export default UI;
