import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');

    inbox.addTask('Go to amusement park', 'Yay', '2023-6-7', 4);
    inbox.addTask('Read', 'More books', '2023-6-8', 3);
    inbox.addTask('Program', '', '2023-6-9', 1);
    inbox.addTask('Clean', 'Misery', '2023-6-7', 1);
    inbox.addTask('Study', 'Yay', '2023-5-26', 2);
    inbox.addTask('Go to amusement park', 'Yay', '2023-5-30', 3);

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

    return {
        inbox,
        addProject,
        deleteProject,
        renameProject,
        findProject,
        getProjects,
        getLastProject,
    };
})();

export default TodoList;
