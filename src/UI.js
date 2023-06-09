import Utilities from './Utils';
import TodoList from './TodoList';
import ProjectPage from './ProjectPage';
import Storage from './Storage';

const UI = (() => {
    const pages = [ProjectPage.for(TodoList.inbox, 0), ProjectPage.for(TodoList.inbox, 1),
        ProjectPage.for(TodoList.inbox, 2)];

    const removeSelectedFromAll = () => {
        const navItems = Utilities.getElements('.nav-item');
        navItems.forEach((navItem) => {
            navItem.classList.remove('selected');
        });
    };

    const deleteProjectPage = (index) => {
        pages.splice(index, 1);
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
            Storage.saveToStorage();
        });
    };

    const handleDeleteAll = () => {
        const deleteBtn = Utilities.getElement('.delete-all');

        deleteBtn.addEventListener('click', () => {
            updateTaskAmount();
            handleEditTaskBtns();
            handleDeleteTask();
            Storage.saveToStorage();
        });
    };

    const handleDeleteTask = () => {
        const deleteBtns = Utilities.getElements('.delete-task-btn');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                updateTaskAmount();
                handleEditTaskBtns();
                handleDeleteTask();
                Storage.saveToStorage();
            });
        });
    };

    const handleSubmitTaskBtn = () => {
        const submitTaskBtn = Utilities.getElement('.submit-task');
        submitTaskBtn.addEventListener('click', () => {
            updateTaskAmount();
            handleEditTaskBtns();
            handleDeleteTask();
            Storage.saveToStorage();
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
                    Storage.saveToStorage();
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
            Storage.saveToStorage();
        });
        const sortPriorityBtn = Utilities.getElement('.sort-priority');
        sortPriorityBtn.addEventListener('click', () => {
            handleEditTaskBtns();
            handleDeleteTask();
            Storage.saveToStorage();
        });
    };

    const handleShowProjectModalBtn = () => {
        const addProjectBtn = Utilities.getElement('.open-project-modal');
        addProjectBtn.addEventListener('click', () => {
            Utilities.showElement('.add-project-modal');
            Utilities.showElement('.overlay');
        });
    };

    const handleColorsModal = () => {
        const colorBtn = Utilities.getElement('#project-color');
        colorBtn.addEventListener('click', () => {
            Utilities.toggleElement('.color-modal');
        });
        const colorSpans = Utilities.getElements('.color-option');
        colorSpans.forEach((span) => {
            span.addEventListener('click', () => {
                colorBtn.innerHTML = span.innerHTML;
                colorBtn.dataset.color = span.dataset.color;
                Utilities.hideElement('.color-modal');
            });
        });
    };

    const handleAddProjectModal = () => {
        handleColorsModal();
        const cancelBtn = Utilities.getElement('.cancel-add-project');
        const addBtn = Utilities.getElement('.add-project');
        const nameInput = Utilities.getElement('#project-title');
        const colorInput = Utilities.getElement('#project-color');

        addBtn.addEventListener('click', () => {
            if (nameInput.value !== '') {
                TodoList.addProject(nameInput.value, colorInput.dataset.color);
                const project = TodoList.getLastProject();
                addUserProject(project);
                Storage.saveToStorage();
                Utilities.hideElement('.add-project-modal');
                Utilities.hideElement('.overlay');
                nameInput.value = '';
                colorInput.innerHTML = '<i class="fa-solid fa-circle" style="color: #C0C0C0;"></i> Silver';
                colorInput.dataset.color = '#C0C0C0';
            }
        });

        cancelBtn.addEventListener('click', () => {
            Utilities.hideElement('.add-project-modal');
            Utilities.hideElement('.overlay');
            nameInput.value = '';
            colorInput.innerHTML = '<i class="fa-solid fa-circle" style="color: #C0C0C0;"></i> Silver';
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

    const loadPage = (navItem) => {
        closeAddTaskModal();
        if (navItem.id < pages.length) {
            pages[navItem.id].initializePage();
        }
        removeSelectedFromAll();
        navItem.classList.add('selected');
        attachEventListeners();
    };

    const controlPageNavigation = () => {
        const navItems = Utilities.getElements('.nav-item');
        navItems.forEach((navItem) => {
            if (navItem.id < 3) {
                navItem.addEventListener('click', () => loadPage(navItem));
            }
        });
    };

    const toggleMiniMenu = (name) => {
        const btn = Utilities.getElement(`.${name}`);

        btn.addEventListener('click', () => {
            Utilities.toggleElement(`.${name}-modal`);
        });

        document.addEventListener('click', (e) => {
            if (e.target !== Utilities.getElement(`.${name}`)) {
                Utilities.hideElement(`.${name}-modal`);
            }
        });
    };

    const toggleNavBar = () => {
        const toggleBtn = Utilities.getElement('.toggle-navbar');
        const sidebar = Utilities.getElement('.sidebar');
        toggleBtn.addEventListener('click', () => {
            if (sidebar.style.width == '0px') {
                sidebar.style.width = '250px';
                sidebar.style.padding = '10px';
            } else {
                sidebar.style.width = '0px';
                sidebar.style.padding = '0px';
            }
        });
    };

    const addUserProject = (project) => {
        pages.push(ProjectPage.for(project, pages.length));
        const projectsUl = Utilities.getElement('.projects');
        const newLi = document.createElement('li');
        newLi.classList.add('nav-item');
        newLi.id = pages.length - 1;
        newLi.innerHTML = `<div class="group"><i class="fa-solid fa-circle" style="color: ${project.getColor()};"></i> ${project.getTitle()} <button class="delete-project"><i class="fa-solid fa-eraser" style="color: #888a85;"></i></button></div> <span id="amount-${newLi.id}">0</span>`;
        newLi.addEventListener('click', () => loadPage(newLi));
        const deleteBtn = newLi.querySelector('.delete-project');
        deleteBtn.addEventListener('click', () => {
            TodoList.deleteProject(newLi.id - 3);
            deleteProjectPage(newLi.id);
            Storage.saveToStorage();
            pages[0].initializePage();
            appendUserProjects();
        });
        projectsUl.appendChild(newLi);
    };

    const appendUserProjects = () => {
        const projects = Utilities.getElement('.projects');
        projects.innerHTML = '';
        pages.splice(3);
        TodoList.getProjects().forEach((project) => addUserProject(project));
    };

    const initializeUI = () => {
        appendUserProjects();
        pages[0].initializePage();
        document.getElementById('0').classList.add('selected');
        toggleMiniMenu('sort');
        toggleMiniMenu('delete');
        controlPageNavigation();
        updateTaskAmount();
        attachEventListeners();
        handleShowProjectModalBtn();
        handleAddProjectModal();
        toggleNavBar();
    };

    return {
        initializeUI,

    };
})();

export default UI;
