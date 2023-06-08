import {
    parse, compareAsc, isToday, isThisWeek,
} from 'date-fns';
import Task from './Task';

export default class Project {
    constructor(title, color = null) {
        this.title = title;
        this.color = color;
        this.tasks = [];
    }

    changeProjectTitle(newTitle) {
        this.title = newTitle;
    }

    getTitle() {
        return this.title;
    }

    getColor() {
        return this.color;
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

    deleteTodaysTasks() {
        this.tasks = this.tasks.filter((task) => !isToday(task.dueDate));
    }

    deleteThisWeeksTasks() {
        this.tasks = this.tasks.filter((task) => !isThisWeek(task.dueDate));
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

    getTodaysTasks() {
        let todaysTasks = [];
        for (let i = 0; i < this.tasks.length; i += 1) {
            if (isToday(this.tasks[i].dueDate)) {
                todaysTasks[i] = this.tasks[i];
            } else {
                todaysTasks[i] = 0;
            }
        }
        return todaysTasks;
    }

    getThisWeeksTasks() {
        let thisWeeksTasks = [];
        for (let i = 0; i < this.tasks.length; i += 1) {
            if (isThisWeek(this.tasks[i].dueDate)) {
                thisWeeksTasks[i] = this.tasks[i];
            } else {
                thisWeeksTasks[i] = 0;
            }
        }
        return thisWeeksTasks;
    }

    getTasksAmount() {
        return this.tasks.length;
    }

    getTodaysTasksAmount() {
        let amount = 0;
        const tasks = this.getTodaysTasks();
        for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i] !== 0) {
                amount += 1;
            }
        }
        return amount;
    }

    getThisWeeksTasksAmount() {
        let amount = 0;
        const tasks = this.getThisWeeksTasks();
        for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i] !== 0) {
                amount += 1;
            }
        }
        return amount;
    }

    sortByPriority() {
        this.tasks.sort((a, b) => a.priority - b.priority);
    }

    sortByDueDate() {
        this.tasks.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
    }
}
