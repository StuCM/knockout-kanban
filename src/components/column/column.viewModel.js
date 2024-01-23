import ko from 'knockout';
import { state, addTask } from '../../store/store.js';
import { addTaskToDb } from '../../store/fetchApi.js';

export default function ColumnViewModel(params) {
    var self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.tasks = ko.computed(() => {
        const board = state.boards.find(board => board.title === this.title());
        return board ? board.tasks() : [];
    });
    self.newTaskTitle = ko.observable('');

    self.generateId = function() {
        return Date.now();
    }

    self.addTask = async function() {
        const task = {
            title: self.newTaskTitle(),
            board: self.id(),
        };
        const newTask = await addTaskToDb(task)
        addTask(newTask, self.id());
        self.newTaskTitle('');
    }

}