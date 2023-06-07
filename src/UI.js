import Utilities from './Utils';
import TodoList from './TodoList';
import ProjectPage from './ProjectPage';

const UI = (() => {
    const pages = [ProjectPage.for(TodoList.inbox, 0), ProjectPage.for(TodoList.inbox, 1),
        ProjectPage.for(TodoList.inbox, 2)];

    const navItems = Utilities.getElements('.nav-item');

    const removeSelectedFromAll = () => {
        navItems.forEach((navItem) => {
            navItem.classList.remove('selected');
        });
    };

    const updateTaskAmount = () => {
        for (let i = 0; i < pages.length; i += 1) {
            pages[i].updateTaskAmount();
        }
    };

    const closeAddTaskModal = () => {
        for (let i = 0; i < pages.length; i += 1) {
            pages[i].closeAddTaskModal();
        }
    };

    const handleDeleteCompleted = () => {
        const deleteBtn = Utilities.getElement('.delete-completed');

        deleteBtn.addEventListener('click', () => {
            updateTaskAmount();
            handleEditTaskBtns();
            handleDeleteTask();
        });
    };

    const handleDeleteAll = () => {
        const deleteBtn = Utilities.getElement('.delete-all');

        deleteBtn.addEventListener('click', () => {
            updateTaskAmount();
            handleEditTaskBtns();
            handleDeleteTask();
        });
    };

    const handleDeleteTask = () => {
        const deleteBtns = Utilities.getElements('.delete-task-btn');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                updateTaskAmount();
                handleEditTaskBtns();
                handleDeleteTask();
            });
        });
    };

    const handleSubmitTaskBtn = () => {
        const submitTaskBtn = Utilities.getElement('.submit-task');
        submitTaskBtn.addEventListener('click', () => {
            updateTaskAmount();
            handleEditTaskBtns();
            handleDeleteTask();
        });
    };

    const handleEditTaskBtns = () => {
        const editTaskBtns = Utilities.getElements('.edit-task-btn');
        editTaskBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', () => {
                const updateBtn = Utilities.getElement('.edit-task');
                updateBtn.addEventListener('click', () => {
                    updateTaskAmount();
                    handleEditTaskBtns();
                    handleDeleteTask();
                });

                const cancelBtn = Utilities.getElement('.cancel-edit-task');
                cancelBtn.addEventListener('click', () => {
                    handleEditTaskBtns();
                    handleDeleteTask();
                });
            });
        });
    };

    const handleSortBtns = () => {
        const sortDueDateBtn = Utilities.getElement('.sort-dueDate');
        sortDueDateBtn.addEventListener('click', () => {
            handleEditTaskBtns();
            handleDeleteTask();
        });
        const sortPriorityBtn = Utilities.getElement('.sort-priority');
        sortPriorityBtn.addEventListener('click', () => {
            handleEditTaskBtns();
            handleDeleteTask();
        });
    };

    const attachEventListeners = () => {
        handleDeleteAll();
        handleDeleteCompleted();
        handleDeleteTask();
        handleSubmitTaskBtn();
        handleEditTaskBtns();
        handleSortBtns();
    };

    const controlPageNavigation = () => {
        navItems.forEach((navItem) => {
            navItem.addEventListener('click', () => {
                closeAddTaskModal();
                pages[navItem.id].initializePage();
                removeSelectedFromAll();
                navItem.classList.add('selected');
                attachEventListeners();
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
        attachEventListeners();
    };

    return {
        initializeUI,

    };
})();

export default UI;
