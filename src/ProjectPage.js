import { th } from 'date-fns/locale';
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
        icon.dataset.color = priorityColors[task.priority];
        icon.dataset.priority = task.priority;
        icon.classList.add('check');
        icon.innerHTML = `<i class="fa-regular ${task.isCompleted ? 'fa-circle-check' : 'fa-circle'}  fa-lg" style="color: ${priorityColors[task.priority]};"></i>`;
        return icon;
    }

    createListItem(task, index) {
        const li = document.createElement('li');
        li.classList.add('task');
        const icon = this.createListItemIcon(task);
        li.dataset.index = index;
        li.appendChild(icon);
        if (task.isCompleted) {
            li.classList.add('completed');
        }
        li.innerHTML += `<h3 class="task-title">${task.title}</h3> 
                        <div class="task-btns hide">
                        <button class="edit-task-btn"><i class="fa-regular fa-pen-to-square" style="color: #888a85;"></i></button>
                        <button class="delete-task-btn"><i class="fa-regular fa-trash-can" style="color: #888a85;"></i></button>
                        </div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-due-date" data-date="${task.getReverseDueDate()}">${task.getDueDate()}</div>`;
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
        const addBtnDiv = Utilities.getElement('.add-task-btn');
        addBtnDiv.innerHTML = '<button><span>+</span>Add task</button>';
    }

    getCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    getTaskModal(purpose) {
        return `<div>
                <input type="text" name="taskName" id="taskName" placeholder="Task name" maxlength="35">
                <input type="text" name="description" id="description" placeholder="Description (optional)" maxlength="50">
                <div>
                    <input type="date" id="dueDate" name="due-date" value="${this.getCurrentDate()}">
                    <button class="set-priority" data-priority-number="4"><i class="fa-regular fa-flag" style="color: #474545;"></i> Priority 4</button>
                </div>
                <div>
                    <button class="cancel-${purpose}-task cancel-btn">Cancel</button>
                    <button class="${purpose}-task add-btn">${purpose === 'edit' ? 'Update' : 'Add'} task</button>
                </div>
                <div class="priority-modal hide">
                <div>
                    <span class="priority-option" data-priority-number="1"><i class="fa-regular fa-flag" style="color: #d1453b;"></i> Priority 1</span>
                    <span class="priority-option" data-priority-number="2"><i class="fa-regular fa-flag" style="color: #eb8909;"></i> Priority 2</span>
                    <span class="priority-option" data-priority-number="3"><i class="fa-regular fa-flag" style="color: #246fe0;"></i> Priority 3</span>
                    <span class="priority-option" data-priority-number="4"><i class="fa-regular fa-flag" style="color: #474545;"></i> Priority 4</span>
                </div>
                </div>
                </div>`;
    }

    createAddTaskModal() {
        const addTaskDiv = Utilities.getElement('.add-task');
        addTaskDiv.innerHTML = this.getTaskModal('submit');
    }

    updatePage() {
        this.createTasksList();
        this.handleChecks();
        this.updateTaskAmount();
        this.editTasks();
        this.deleteTasks();
        this.toggleTasksBtns();
    }

    handleCheck(check) {
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
            check.parentElement.querySelector('.task-title').classList.add('completed');
            check.parentElement.querySelector('.task-description').classList.add('completed');
            check.parentElement.querySelector('.task-due-date').classList.add('completed');
            check.firstChild.classList.remove('fa-circle');
            check.firstChild.classList.add('fa-circle-check');
        });
    }

    handleChecks() {
        const checks = Utilities.getElements('.check');

        checks.forEach((check) => {
            this.handleCheck(check);
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

    handleAddTaskBtn() {
        const addTaskBtn = Utilities.getElement('.add-task-btn').firstChild;
        addTaskBtn.addEventListener('click', () => {
            Utilities.hideElement('.add-task-btn');
            Utilities.showElement('.add-task');
        });
    }

    closeAddTaskModal() {
        Utilities.showElement('.add-task-btn');
        Utilities.hideElement('.add-task');
        Utilities.getElement('#taskName').value = '';
        Utilities.getElement('#description').value = '';
        Utilities.getElement('#dueDate').value = this.getCurrentDate();
        Utilities.getElement('.set-priority').dataset.priorityNumber = 4;
        Utilities.getElement('.set-priority').innerHTML = '<i class="fa-regular fa-flag" style="color: #474545;"></i> Priority 4';
    }

    handleAddTaskModal() {
        const titleInput = Utilities.getElement('#taskName');
        const descriptionInput = Utilities.getElement('#description');
        const dueDateInput = Utilities.getElement('#dueDate');
        const priorityInput = Utilities.getElement('.set-priority');
        const cancelBtn = Utilities.getElement('.cancel-submit-task');
        const submitBtn = Utilities.getElement('.submit-task');

        cancelBtn.addEventListener('click', () => {
            this.closeAddTaskModal();
        });

        submitBtn.addEventListener('click', () => {
            if (titleInput.value !== '') {
                this.project.addTask(
                    titleInput.value,
                    descriptionInput.value,
                    dueDateInput.value,
                    priorityInput.dataset.priorityNumber,
                );
                this.updatePage();
                this.closeAddTaskModal();
            }
        });
    }

    handlePriorityBtn() {
        const priorityBtn = Utilities.getElement('.set-priority');
        priorityBtn.addEventListener('click', () => {
            Utilities.toggleElement('.priority-modal');
        });
    }

    handlePriorityModal() {
        const prioritySpans = Utilities.getElements('.priority-option');
        const priorityInput = Utilities.getElement('.set-priority');
        prioritySpans.forEach((span) => {
            span.addEventListener('click', () => {
                priorityInput.innerHTML = span.innerHTML;
                priorityInput.dataset.priorityNumber = span.dataset.priorityNumber;
                Utilities.hideElement('.priority-modal');
            });
        });
    }

    toggleTaskBtns(task) {
        const btns = task.querySelector('.task-btns');
        task.addEventListener('mouseover', () => {
            btns.classList.remove('hide');
        });
        task.addEventListener('mouseout', () => {
            btns.classList.add('hide');
        });
    }

    toggleTasksBtns() {
        const tasks = Utilities.getElements('.task');
        tasks.forEach((task) => {
            this.toggleTaskBtns(task);
        });
    }

    editTask(btn) {
        btn.addEventListener('click', () => {
            let { index } = btn.parentElement.parentElement.dataset;
            let task = btn.parentElement.parentElement;
            const editDiv = document.createElement('div');
            editDiv.classList.add('edit-task');
            editDiv.innerHTML = this.getTaskModal('edit');
            editDiv.querySelector('#taskName').value = task.querySelector('.task-title').innerHTML;
            editDiv.querySelector('#description').value = task.querySelector('.task-description').innerHTML;
            editDiv.querySelector('#dueDate').value = task.querySelector('.task-due-date').dataset.date;
            let check = task.querySelector('.check');
            editDiv.querySelector('.set-priority').innerHTML = `<i class="fa-regular fa-flag" style="color: ${check.dataset.color};"></i> Priority ${check.dataset.priority}`;
            editDiv.querySelector('.set-priority').dataset.priority = check.dataset.priority;
            editDiv.querySelector('.set-priority').addEventListener('click', () => {
                editDiv.querySelector('.priority-modal').classList.toggle('hide');
            });
            editDiv.querySelectorAll('.priority-option').forEach((span) => {
                span.addEventListener('click', () => {
                    editDiv.querySelector('.set-priority').innerHTML = span.innerHTML;
                    editDiv.querySelector('.set-priority').dataset.priority = span.dataset.priorityNumber;
                    editDiv.querySelector('.priority-modal').classList.add('hide');
                });
            });
            editDiv.querySelector('.cancel-btn').addEventListener('click', () => {
                this.updatePage();
            });
            editDiv.querySelector('.edit-task').addEventListener('click', () => {
                this.project.changeTaskTitle(index, editDiv.querySelector('#taskName').value);
                this.project.changeTaskDescription(index, editDiv.querySelector('#description').value);
                this.project.changeTaskDueDate(index, editDiv.querySelector('#dueDate').value);
                this.project.changeTaskPriority(index, editDiv.querySelector('.set-priority').dataset.priority);
                this.updatePage();
            });
            task.style.display = 'block';
            task.innerHTML = '';
            task.appendChild(editDiv);
        });
    }

    editTasks() {
        const editBtns = Utilities.getElements('.edit-task-btn');
        editBtns.forEach((btn) => {
            this.editTask(btn);
        });
    }

    deleteTask(btn) {
        btn.addEventListener('click', () => {
            let { index } = btn.parentElement.parentElement.dataset;
            this.project.deleteTask(index);
            this.updatePage();
        });
    }

    deleteTasks() {
        const deleteBtns = Utilities.getElements('.delete-task-btn');
        deleteBtns.forEach((btn) => {
            this.deleteTask(btn);
        });
    }

    attachEventListeners() {
        this.handleChecks();
        this.editTasks();
        this.deleteTasks();
        this.toggleTasksBtns();
        this.handleSortMenu();
        this.handleDeleteCompleted();
        this.handleDeleteAll();
        this.handleAddTaskBtn();
        this.handleAddTaskModal();
        this.handlePriorityBtn();
        this.handlePriorityModal();
    }

    initializePage() {
        this.setProjectTitle();
        this.createTasksList();
        this.createSortBtns();
        this.createDeleteBtns();
        this.createAddTaskBtn();
        this.createAddTaskModal();
        this.updateTaskAmount();
        this.attachEventListeners();
    }
}

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
