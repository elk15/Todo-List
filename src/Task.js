import { format } from 'date-fns';

export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
    }

    getDueDate() {
        return format(this.dueDate, 'dd/MMM/yyyy');
    }

    getReverseDueDate() {
        return format(this.dueDate, 'yyyy-MM-dd');
    }

    completeTask() {
        this.isCompleted = true;
    }

    changeTitle(newTitle) {
        this.title = newTitle;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }
}
