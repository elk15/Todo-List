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

    const handleDeleteBtns = () => {
        const deleteBtns = Utilities.getElements('[class^="delete-"]');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                updateTaskAmount();
            });
        });
    };

    const handleSubmitTaskBtn = () => {
        const submitTaskBtn = Utilities.getElement('.submit-task');
        submitTaskBtn.addEventListener('click', () => {
            updateTaskAmount();
        });
    };

    const controlPageNavigation = () => {
        navItems.forEach((navItem) => {
            navItem.addEventListener('click', () => {
                pages[navItem.id].initializePage();
                removeSelectedFromAll();
                navItem.classList.add('selected');
                handleSubmitTaskBtn();
                handleDeleteBtns();
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
        handleSubmitTaskBtn();
    };

    return {
        initializeUI,

    };
})();

export default UI;
