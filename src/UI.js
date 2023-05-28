import Utilities from './Utils';
import TodoList from './TodoList';

const projectPage = (project) => {
    const projectTitle = Utilities.getElement('.project-title');
    const taskList = Utilities.getElement('.tasks');

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

    const initializePage = () => {
        createTasksList();
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

    const toggleSortMenu = () => {
        const sortBtn = Utilities.getElement('.sort');
        sortBtn.addEventListener('click', () => {
            Utilities.showElement('.sort-modal');
        });

        document.addEventListener('click', (e) => {
            if (e.target !== Utilities.getElement('.sort')) {
                Utilities.hideElement('.sort-modal');
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

    const toggleDeleteMenu = () => {
        const deleteBtn = Utilities.getElement('.delete');
        deleteBtn.addEventListener('click', () => {
            Utilities.showElement('.delete-modal');
        });

        document.addEventListener('click', (e) => {
            if (e.target !== Utilities.getElement('.delete')) {
                Utilities.hideElement('.delete-modal');
            }
        });
    };

    const handleDeleteMenu = () => {
        const deleteCompletedBtn = Utilities.getElement('.delete-completed');
        const deleteAllBtn = Utilities.getElement('.delete-all');

        deleteCompletedBtn.addEventListener('click', () => {
            project.deleteCompleted();
            createTasksList();
            handleChecks();
        });

        deleteAllBtn.addEventListener('click', () => {
            project.deleteAll();
            createTasksList();
            handleChecks();
        });
    };

    const attachEventListeners = () => {
        handleChecks();
        toggleSortMenu();
        handleSortMenu();
        toggleDeleteMenu();
        handleDeleteMenu();
    };

    return {
        initializePage,
        attachEventListeners,
    };
};

const UI = (() => {
    const todayAmount = Utilities.getElement('.amount-today');
    const inboxAmount = Utilities.getElement('.amount-inbox');
    inboxAmount.innerHTML = TodoList.inbox.getTasksAmount();
    todayAmount.innerHTML = TodoList.getTodaysTasks().getTasksAmount();

    const initializeUI = () => {
        projectPage(TodoList.inbox).initializePage();
        projectPage(TodoList.inbox).attachEventListeners();
    };

    return {
        initializeUI,
    };
})();

export default UI;
