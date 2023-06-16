import UI from './UI';
import TodoList from './TodoList';
import Storage from './Storage';

const data = Storage.retrieveData();
TodoList.restoreData(data);

UI.initializeUI();
