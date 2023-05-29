import Utilities from './Utils';
import TodoList from './TodoList';

const projectPage = (project, projectIndex) => {
    const projectTitle = Utilities.getElement('.project-title');
    const taskList = Utilities.getElement('.tasks');

    const getProjectTitle = () => {
        if (projectIndex === 1) {
            projectTitle.firstChild.innerHTML = 'Today';
        } else if (projectIndex === 2) {
            projectTitle.firstChild.innerHTML = 'This Week';
        } else {
            projectTitle.firstChild.innerHTML = project.title;
        }
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

    const getProjectTasks = () => {
        if (projectIndex === 1) {
            return TodoList.getTodaysTasks();
        }
        if (projectIndex === 2) {
            console.log(TodoList.getThisWeeksTasks());
            return TodoList.getThisWeeksTasks();
        }
        return project.getTasks();
    };

    const updateTaskAmount = () => {
        const taskAmountSpan = Utilities.getElement(`#amount-${projectIndex}`);
        let amount = 0;
        if (projectIndex === 1 || projectIndex === 2) {
            const tasks = getProjectTasks();
            for (let i = 0; i < tasks.length; i += 1) {
                if (tasks[i] !== 0) {
                    amount += 1;
                }
            }
        } else {
            amount = project.getTasksAmount();
        }
        taskAmountSpan.innerHTML = amount;
    };

    const createTasksList = () => {
        let i = 0;
        taskList.innerHTML = '';
        const tasks = getProjectTasks();
        tasks.forEach((task) => {
            if (task !== 0) {
                taskList.appendChild(createListItem(task, i));
            }
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
            console.log(project.getTasks());
            createTasksList();
            handleChecks();
            updateTaskAmount();
        });

        deleteAllBtn.addEventListener('click', () => {
            project.deleteAll();
            createTasksList();
            handleChecks();
            updateTaskAmount();
        });
    };

    const initializePage = () => {
        getProjectTitle();
        createTasksList();
        updateTaskAmount();
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
    const pages = [projectPage(TodoList.inbox, 0), projectPage(TodoList.inbox, 1),
        projectPage(TodoList.inbox, 2)];

    const navItems = Utilities.getElements('.nav-item');
    const projects = TodoList.getProjects();

    const removeSelectedFromAll = () => {
        navItems.forEach((navItem) => {
            navItem.classList.remove('selected');
        });
    };

    const controlPageNavigation = () => {
        navItems.forEach((navItem) => {
            navItem.addEventListener('click', () => {
                pages[navItem.id].initializePage();
                removeSelectedFromAll();
                navItem.classList.add('selected');
                console.log(projects[navItem.id]);
            });
        });
    };

    const updateTaskAmount = () => {
        for (let i = 0; i < projects.length; i += 1) {
            let amountSpan = Utilities.getElement(`#amount-${i}`);
            if (i === 1 || i === 2) {
                const tasks = TodoList.getProjects()[i];
                let amount = 0;
                for (let j = 0; j < tasks.length; j += 1) {
                    if (tasks[j] !== 0) {
                        amount += 1;
                    }
                }
                amountSpan.innerHTML = amount;
            } else {
                amountSpan.innerHTML = projects[i].getTasksAmount();
            }
        }
    };

    // const watchForClicks = () => {
    //     document.addEventListener('click', () => {
    //         updateTaskAmount();
    //     });
    // };

    const initializeUI = () => {
        pages[0].initializePage();
        document.getElementById('0').classList.add('selected');
        controlPageNavigation();
        updateTaskAmount();
    };

    return {
        initializeUI,

    };
})();

export default UI;
