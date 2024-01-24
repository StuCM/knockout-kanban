import ko from 'knockout';
import { connect } from 'knockout-store';
import { addTask } from '../../store/store.js';
import { addTaskToDb } from '../../store/fetchApi.js';

function ColumnViewModel(params) {
    var self = this;
    console.log(params.title)
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.tasks = ko.computed(() => {
        const board = params.boards().find(board => board.title === self.title());
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

function mapStateToParams({ boards }) {
    return { boards };
}

export default connect(mapStateToParams)(ColumnViewModel);