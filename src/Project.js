import { parse, compareAsc } from 'date-fns';
import Task from './Task';

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(title, description, dueDate, priority) {
        const parsedDate = parse(dueDate, 'yyyy-MM-dd', new Date());
        this.tasks.push(new Task(title, description, parsedDate, priority));
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
        this.tasks.splice(index);
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
