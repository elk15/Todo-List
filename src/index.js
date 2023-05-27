import Project from './Project';

const inbox = new Project('Inbox');

inbox.addTask('clean', 'all the house', '2023-10-11', 1);
inbox.addTask('program', 'fun', '2023-10-12', 3);
inbox.addTask('read', 'yay', '2023-12-23', 2);
inbox.addTask('watch tv', 'yay', '2023-9-11', 2);

console.log(inbox.getTasks());
console.log(inbox.getTasksAmount());
