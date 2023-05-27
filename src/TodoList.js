import { isToday, isThisWeek } from 'date-fns';
import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');
    const userProjects = [];

    inbox.addTask('Read', 'More books', '2023-5-26', 3);
    inbox.addTask('Program', 'Fun', '2023-5-27', 1);
    inbox.addTask('Clean', 'Misery', '2023-5-27', 1);
    inbox.addTask('Study', 'Yay', '2023-5-26', 2);
    inbox.addTask('Go to amusement park', 'Yay', '2023-6-29', 3);

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
