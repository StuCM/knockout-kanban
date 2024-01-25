import ko from 'knockout';
import { connect } from 'knockout-store';
import { addTask, updateTask } from '../../store/store.js';
import { addTaskToDb, updateTaskInDb } from '../../store/fetchApi.js';

function ColumnViewModel(params) {
    const self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.tasks = ko.computed(() => {
        const board = params.boards().find(board => board.title === self.title());
        return board ? board.tasks() : [];
    });
    self.newTaskTitle = ko.observable('');

    self.addTask = async function() {
        if (self.newTaskTitle() === '') {
            return;
        }
        //create a new task and generate id
        const task = {
            id: new Date().getTime(),
            title: self.newTaskTitle(),
            board: self.id(),
        };
        //reset the input field
        self.newTaskTitle('');
        //update the store
        addTask(task, self.id());
        //update the database
        try {
            await addTaskToDb(task);
        } catch (error) {
            console.error('Error', error);
        }
    }

    self.handleDragStart = function(event) {
        return;
    }

    self.handleDragOver = function(event) {
        return;
    }

    self.handleDrop = function(_column, event) {
        event.preventDefault();
        //get the task data
        const taskData = event.dataTransfer.getData('text/plain');
        const task = JSON.parse(taskData);
        //update the store
        updateTask(task.id, task.title, self.id());
        //update the database
        try {
            updateTaskInDb(task.id, {title: task.title, board: self.id()});
        } catch (error) {
            console.error('Error', error);
        }
        
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