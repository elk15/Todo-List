import { isToday, isThisWeek } from 'date-fns';
import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');

    inbox.addTask('Read', 'More books', '2023-5-29', 3);
    inbox.addTask('Program', '', '2023-5-27', 1);
    inbox.addTask('Clean', 'Misery', '2023-5-29', 1);
    inbox.addTask('Study', 'Yay', '2023-5-26', 2);
    inbox.addTask('Go to amusement park', 'Yay', '2023-5-30', 3);
    inbox.addTask('Go to amusement park', 'Yay', '2023-5-31', 4);

    const getTodaysTasks = () => {
        const tasks = inbox.getTasks();
        let todaysTasks = [];
        for (let i = 0; i < tasks.length; i += 1) {
            if (isToday(tasks[i].dueDate)) {
                todaysTasks[i] = tasks[i];
            } else {
                todaysTasks[i] = 0;
            }
        }
        return todaysTasks;
    };

    const getThisWeeksTasks = () => {
        const tasks = inbox.getTasks();
        let thisWeeksTasks = [];
        for (let i = 0; i < tasks.length; i += 1) {
            if (isThisWeek(tasks[i].dueDate)) {
                thisWeeksTasks[i] = tasks[i];
            } else {
                thisWeeksTasks[i] = 0;
            }
        }
        return thisWeeksTasks;
    };

    const projects = [inbox, getTodaysTasks(), getThisWeeksTasks()];

    const addProject = (title) => {
        projects.push(new Project(title));
    };

    const deleteProject = (index) => {
        projects.splice(index, 1);
    };

    const renameProject = (index, newTitle) => {
        projects[index].changeProjectTitle(newTitle);
    };

    const findProject = (index) => projects[index];

    const getProjects = () => projects;

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
