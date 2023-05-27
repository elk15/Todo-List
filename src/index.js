import TodoList from './TodoList';

TodoList.inbox.addTask('Read', 'More books', '2023-5-26', 3);
TodoList.inbox.addTask('Program', 'Fun', '2023-5-27', 1);
TodoList.inbox.addTask('Clean', 'Misery', '2023-5-27', 1);
TodoList.inbox.addTask('Study', 'Yay', '2023-5-26', 2);
TodoList.inbox.addTask('Go to amusement park', 'Yay', '2023-6-29', 3);

TodoList.addProject('Make website');
TodoList.addProject('Bake a cake');
TodoList.renameProject(0, 'Build Application');
console.log(TodoList.getProjects());

const project1 = TodoList.findProject(0);
project1.addTask('Program', 'Fun', '2023-5-27', 1);
