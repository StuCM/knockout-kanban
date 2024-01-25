import ko from 'knockout';
import { connect } from 'knockout-store';
import { addTask, updateTask } from '../../store/store.js';
import { addTaskToDb, updateTaskInDb } from '../../store/fetchApi.js';

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

    self.handleDragStart = function(event) {
        return;
    }

    self.handleDragOver = function(event) {
        
    }

    self.handleDrop = function(column, event) {
        event.preventDefault();
        const taskData = event.dataTransfer.getData('text/plain');
        const task = JSON.parse(taskData);
        console.log("drop", task)
        updateTask(task.id, task.title, self.id());
        updateTaskInDb(task.id, {title: task.title, board: self.id()});
    }

    self.generateColorFromId = function() {
        const id = self.id();
        const hashedId = id * 2654438762 % 2**32; // Knuth's multiplicative method
        const hue = hashedId % 361;
        return `hsl(${hue}, 100%, 82%)`;
    }
    self.color = ko.observable(self.generateColorFromId());
}

function mapStateToParams({ boards }) {
    return { boards };
}

export default connect(mapStateToParams)(ColumnViewModel);