import Utilities from './Utils';
import TodoList from './TodoList';
import ProjectPage from './ProjectPage';

const UI = (() => {
    const pages = [ProjectPage.for(TodoList.inbox, 0), ProjectPage.for(TodoList.inbox, 1),
        ProjectPage.for(TodoList.inbox, 2)];

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
            });
        });
    };

    const updateTaskAmount = () => {
        for (let i = 0; i < projects.length; i += 1) {
            let amountSpan = Utilities.getElement(`#amount-${i}`);
            if (i === 1 || i === 2) {
                let tasks = i === 1 ? TodoList.inbox.getTodaysTasks() : TodoList.inbox.getThisWeeksTasks();
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

    const handleDeleteBtns = () => {
        const deleteBtns = Utilities.getElements('[class^="delete-"]');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                updateTaskAmount();
            });
        });
    };

    const toggleMiniMenu = (name) => {
        const btn = Utilities.getElement(`.${name}`);

        btn.addEventListener('click', () => {
            Utilities.showElement(`.${name}-modal`);
        });

        document.addEventListener('click', (e) => {
            if (e.target !== Utilities.getElement(`.${name}`)) {
                Utilities.hideElement(`.${name}-modal`);
            }
        });
    };

    const initializeUI = () => {
        pages[0].initializePage();
        document.getElementById('0').classList.add('selected');
        toggleMiniMenu('sort');
        toggleMiniMenu('delete');
        controlPageNavigation();
        updateTaskAmount();
        handleDeleteBtns();
    };

    return {
        initializeUI,

    };
})();

export default UI;
