import { isToday, isThisWeek } from 'date-fns';
import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');
    const userProjects = [];

    const getTodaysTasks = () => {
        const tasks = inbox.getTasks().filter((task) => isToday(task.dueDate));
        const todayInbox = new Project('Today');
        tasks.forEach((task) => {
            todayInbox.addTask(task.title, task.description, task.dueDate, task.priority);
        });
        return todayInbox;
    };

    const getThisWeeksTasks = () => {
        const tasks = inbox.getTasks().filter((task) => isThisWeek(task.dueDate));
        const thisWeekInbox = new Project('This Week');
        tasks.forEach((task) => {
            thisWeekInbox.addTask(task.title, task.description, task.dueDate, task.priority);
        });
        return thisWeekInbox;
    };

    const addProject = (title) => {
        userProjects.push(new Project(title));
    };

    const deleteProject = (index) => {
        userProjects.splice(index, 1);
    };

    const renameProject = (index, newTitle) => {
        userProjects[index].changeProjectTitle(newTitle);
    };

    const findProject = (index) => userProjects[index];

    const getProjects = () => userProjects;

    return {
        inbox,
        getTodaysTasks,
        getThisWeeksTasks,
        addProject,
        deleteProject,
        renameProject,
        findProject,
        getProjects,
    };
})();

export default TodoList;
