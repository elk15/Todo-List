import { isToday, isThisWeek } from 'date-fns';
import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');
    const today = inbox.getTasks().filter((task) => isToday(task.dueDate));
    const thisWeek = inbox.getTasks().filter((task) => isThisWeek(task.dueDate));
    const userProjects = [];
})();
