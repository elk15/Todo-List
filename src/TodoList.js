import Project from './Project';

const TodoList = (() => {
    const inbox = new Project('Inbox');

    inbox.addTask('Go to amusement park', 'Yay', '2023-6-7', 4);
    inbox.addTask('Read', 'More books', '2023-6-8', 3);
    inbox.addTask('Program', '', '2023-6-9', 1);
    inbox.addTask('Clean', 'Misery', '2023-6-7', 1);
    inbox.addTask('Study', 'Yay', '2023-5-26', 2);
    inbox.addTask('Go to amusement park', 'Yay', '2023-5-30', 3);

    const projects = [inbox, inbox.getTodaysTasks(), inbox.getThisWeeksTasks()];

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
        addProject,
        deleteProject,
        renameProject,
        findProject,
        getProjects,
    };
})();

export default TodoList;
