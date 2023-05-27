import { parse, compareAsc } from 'date-fns';
import Task from './Task';

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    changeProjectTitle(newTitle) {
        this.title = newTitle;
    }

    addTask(title, description, dueDate, priority) {
        let parsedDate = dueDate;
        if (typeof dueDate === 'string') {
            parsedDate = parse(dueDate, 'yyyy-MM-dd', new Date());
        }
        this.tasks.push(new Task(title, description, parsedDate, priority));
    }

    findTask(index) {
        return this.tasks[index];
    }

    changeTaskTitle(index, newTitle) {
        this.tasks[index].changeTitle(newTitle);
    }

    changeTaskDescription(index, newDescription) {
        this.tasks[index].changeDescription(newDescription);
    }

    changeTaskDueDate(index, newDueDate) {
        const parsedDate = parse(newDueDate, 'yyyy-MM-dd', new Date());
        this.tasks[index].changeDueDate(parsedDate);
    }

    changeTaskPriority(index, newPriority) {
        this.tasks[index].changePriority(newPriority);
    }

    completeTask(index) {
        if (!this.tasks[index].isCompleted) {
            this.tasks[index].completeTask();
        }
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    deleteCompleted() {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
    }

    deleteAll() {
        this.tasks = [];
    }

    getTasks() {
        return this.tasks;
    }

    sortByPriority() {
        this.tasks.sort((a, b) => a.priority - b.priority);
    }

    sortByDueDate() {
        this.tasks.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
    }

    getTasksAmount() {
        return this.tasks.length;
    }
}
