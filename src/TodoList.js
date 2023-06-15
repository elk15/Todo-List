import { parse } from 'date-fns';
import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');

    // inbox.addTask('Go to amusement park', 'Yay', '2023-6-7', 4);
    // inbox.addTask('Read', 'More books', '2023-6-8', 3);
    // inbox.addTask('Program', '', '2023-6-9', 1);
    // inbox.addTask('Clean', 'Misery', '2023-6-7', 1);
    // inbox.addTask('Study', 'Yay', '2023-5-26', 2);
    // inbox.addTask('Go to amusement park', 'Yay', '2023-5-30', 3);

    const userProjects = [];

    const addProject = (title, color) => {
        userProjects.push(new Project(title, color));
    };

    const deleteProject = (index) => {
        userProjects.splice(index, 1);
    };

    const renameProject = (index, newTitle) => {
        userProjects[index].changeProjectTitle(newTitle);
    };

    const findProject = (index) => userProjects[index];

    const getProjects = () => userProjects;

    const getLastProject = () => userProjects[userProjects.length - 1];

    const restoreData = (data) => {
        if (data != null) {
            data.Inbox.forEach((task) => {
                inbox.addTask(task[0], task[1], parse(task[2], 'dd/MMM/yyyy', new Date()), task[3], task[4]);
            });
            const projectTitles = Object.keys(data);
            projectTitles.forEach((title) => {
                if (title !== 'Inbox') {
                    addProject(title, data[title].color);
                    data[title].tasks.forEach((task) => {
                        getLastProject().addTask(task[0], task[1], parse(task[2], 'dd/MMM/yyyy', new Date()), task[3], task[4]);
                    });
                }
            });
        }
    };

    return {
        inbox,
        addProject,
        deleteProject,
        renameProject,
        findProject,
        getProjects,
        getLastProject,
        restoreData,
    };
})();

export default TodoList;
