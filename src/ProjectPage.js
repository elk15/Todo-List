import Utilities from './Utils';

export default class ProjectPage {
    static for(project, projectIndex) {
        let projectPageClass;
        switch (projectIndex) {
        case 1:
            projectPageClass = ProjectPageToday;
            break;
        case 2:
            projectPageClass = ProjectPageThisWeek;
            break;
        default:
            projectPageClass = ProjectPage;
            break;
        }
        return new projectPageClass(project, projectIndex);
    }

    static register(candicate) {
        ProjectPage.registry.unshift(candicate);
    }

    static projectSection = Utilities.getElement('.project');

    static projectTitle = Utilities.getElement('.project-title');

    static taskList = Utilities.getElement('.tasks');

    static sortModal = Utilities.getElement('.sort-modal');

    static deleteModal = Utilities.getElement('.delete-modal');

    constructor(project, projectIndex) {
        this.project = project;
        this.projectIndex = projectIndex;
    }

    setProjectTitle() {
        ProjectPage.projectTitle.firstChild.innerHTML = this.project.title;
    }

    createSortBtns() {
        ProjectPage.sortModal.innerHTML = '<span class="sort-dueDate">Due Date</span><span class="sort-priority">Priority</span>';
    }

    createDeleteBtns() {
        ProjectPage.deleteModal.innerHTML = '<span class="delete-completed">Delete Completed</span><span class="delete-all">Delete All</span>';
    }

    getProjectTasks() {
        return this.project.getTasks();
    }

    updateTaskAmount() {
        const taskAmountSpan = Utilities.getElement(`#amount-${this.projectIndex}`);
        taskAmountSpan.innerHTML = this.project.getTasksAmount();
    }

    createListItemIcon(task) {
        const priorityColors = ['', '#d1453b', '#eb8909', '#246fe0', '#474545'];
        const icon = document.createElement('div');
        icon.classList.add('check');
        icon.innerHTML = `<i class="fa-regular ${task.isCompleted ? 'fa-circle-check' : 'fa-circle'}  fa-lg" style="color: ${priorityColors[task.priority]};"></i>`;
        return icon;
    }

    createListItem(task, index) {
        const li = document.createElement('li');
        const icon = this.createListItemIcon(task);
        li.dataset.index = index;
        li.appendChild(icon);
        if (task.isCompleted) {
            li.classList.add('completed');
        }
        li.innerHTML += `<div class="task-main"><div class="task-title"><h3>${task.title}</h3> ${task.getDueDate()}</div>
        <div>${task.description}</div> </div>`;
        return li;
    }

    createTasksList() {
        let i = 0;
        ProjectPage.taskList.innerHTML = '';
        this.getProjectTasks().forEach((task) => {
            if (task !== 0) {
                ProjectPage.taskList.appendChild(this.createListItem(task, i));
            }
            i += 1;
        });
    }

    createAddTaskBtn() {
        const addBtnDiv = Utilities.getElement('.add-task');
        addBtnDiv.innerHTML = '<button><span>+</span>Add task</button>';
    }

    updatePage() {
        this.createTasksList();
        this.handleChecks();
        this.updateTaskAmount();
    }

    handleChecks() {
        const checks = Utilities.getElements('.check');

        checks.forEach((check) => {
            const taskIndex = check.parentElement.dataset.index;

            check.addEventListener('mouseover', () => {
                check.firstChild.classList.remove('fa-circle');
                check.firstChild.classList.add('fa-circle-check');
            });

            check.addEventListener('mouseout', () => {
                if (!this.project.findTask(taskIndex).isCompleted) {
                    check.firstChild.classList.remove('fa-circle-check');
                    check.firstChild.classList.add('fa-circle');
                }
            });

            check.addEventListener('click', () => {
                this.project.findTask(taskIndex).completeTask();
                check.parentElement.classList.add('completed');
                check.firstChild.classList.remove('fa-circle');
                check.firstChild.classList.add('fa-circle-check');
            });
        });
    }

    handleSortMenu() {
        const dueDateBtn = Utilities.getElement('.sort-dueDate');
        const priorityBtn = Utilities.getElement('.sort-priority');

        dueDateBtn.addEventListener('click', () => {
            this.project.sortByDueDate();
            this.updatePage();
        });

        priorityBtn.addEventListener('click', () => {
            this.project.sortByPriority();
            this.updatePage();
        });
    }

    handleDeleteCompleted() {
        const deleteCompletedBtn = Utilities.getElement('.delete-completed');
        deleteCompletedBtn.addEventListener('click', () => {
            this.project.deleteCompleted();
            this.updatePage();
        });
    }

    handleDeleteAll() {
        const deleteAllBtn = Utilities.getElement('.delete-all');
        deleteAllBtn.addEventListener('click', () => {
            this.project.deleteAll();
            this.updatePage();
        });
    }

    attachEventListeners() {
        this.handleChecks();
        this.handleSortMenu();
        this.handleDeleteCompleted();
        this.handleDeleteAll();
    }

    initializePage() {
        this.setProjectTitle();
        this.createTasksList();
        this.createSortBtns();
        this.createDeleteBtns();
        this.createAddTaskBtn();
        this.updateTaskAmount();
        this.attachEventListeners();
    }
}

ProjectPage.registry = [ProjectPage];

class ProjectPageToday extends ProjectPage {
    setProjectTitle() {
        ProjectPage.projectTitle.firstChild.innerHTML = 'Today';
    }

    getProjectTasks() {
        return this.project.getTodaysTasks();
    }

    updateTaskAmount() {
        const taskAmountSpan = Utilities.getElement(`#amount-${this.projectIndex}`);
        taskAmountSpan.innerHTML = this.project.getTodaysTasksAmount();
    }

    handleDeleteAll() {
        const deleteAllBtn = Utilities.getElement('.delete-all');
        deleteAllBtn.addEventListener('click', () => {
            this.project.deleteTodaysTasks();
            this.updatePage();
        });
    }
}

ProjectPage.register(ProjectPageToday);

class ProjectPageThisWeek extends ProjectPage {
    setProjectTitle() {
        ProjectPage.projectTitle.firstChild.innerHTML = 'This Week';
    }

    getProjectTasks() {
        return this.project.getThisWeeksTasks();
    }

    updateTaskAmount() {
        const taskAmountSpan = Utilities.getElement(`#amount-${this.projectIndex}`);
        taskAmountSpan.innerHTML = this.project.getThisWeeksTasksAmount();
    }

    handleDeleteAll() {
        const deleteAllBtn = Utilities.getElement('.delete-all');
        deleteAllBtn.addEventListener('click', () => {
            this.project.deleteThisWeeksTasks();
            this.updatePage();
        });
    }
}

ProjectPage.register(ProjectPageThisWeek);
