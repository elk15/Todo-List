import TodoList from './TodoList';

export default class Storage {
    static getData() {
        const data = {};
        data.Inbox = [];
        TodoList.inbox.getTasks().forEach((task) => {
            const tempArray = [];
            tempArray.push(task.title);
            tempArray.push(task.description);
            tempArray.push(task.getDueDate());
            tempArray.push(task.priority);
            tempArray.push(task.isCompleted);
            data.Inbox.push(tempArray);
        });

        TodoList.getProjects().forEach((project) => {
            data[project.getTitle()] = { color: project.getColor(), tasks: [] };
            project.getTasks().forEach((task) => {
                const tempArray = [];
                tempArray.push(task.title);
                tempArray.push(task.description);
                tempArray.push(task.getDueDate());
                tempArray.push(task.priority);
                tempArray.push(task.isCompleted);
                data[project.getTitle()].tasks.push(tempArray);
            });
        });
        console.log(data);
        return data;
    }

    static storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException
                // everything except Firefox
                && (e.code === 22
                    // Firefox
                    || e.code === 1014
                    // test name field too, because code might not be present
                    // everything except Firefox
                    || e.name === 'QuotaExceededError'
                    // Firefox
                    || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
                    // acknowledge QuotaExceededError only if there's something already stored
                    && storage
                    && storage.length !== 0
            );
        }
    }

    static saveToStorage() {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem('TodoList-session', JSON.stringify(this.getData()));
        } else {
            console.log('Local storage isn\'t supported');
        }
    }

    static retrieveData() {
        if (this.storageAvailable('localStorage')) {
            return JSON.parse(localStorage.getItem('TodoList-session'));
        }
        console.log('Local storage isn\'t supported');
        return null;
    }
}
