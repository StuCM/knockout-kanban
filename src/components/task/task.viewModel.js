import ko from 'knockout';
import { removeTask, updateTask } from '../../store/store.js';
import { deleteTaskFromDb, updateTaskInDb } from '../../store/fetchApi.js';
import { connect, getState } from 'knockout-store';

function TaskViewModel(params) {
    const state = getState();
    var self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.boardId = ko.observable(params.boardId);
    self.isEditing = ko.observable(false);
    self.taskSizeLarge = ko.computed(() => {
        return state().taskSizeLarge();
    })
    self.isFocused = ko.observable(false);

    self.taskInState = ko.computed(() => {
        let task;
        state().boards().some(board => {
            task = board.tasks().find(t => t.id == self.id());
            if (task) {
                self.boardId(board.id);
                return true; // stop searching once the task is found
            }
        });
        console.log(self.boardId());
        return task;
    });
    
    self.handleRemoveTask = function() {
        removeTask(self.id(), self.boardId());
        try {
            deleteTaskFromDb(self.id());
        } catch (error) {
            console.error('Error', error);
        }
        
    }

    self.handleEditTask = function() {
        console.log("edit task", self.boardId())
        updateTask(self.id(), self.title(), self.boardId());
        console.log(self.id(), self.title(), self.boardId())
        try {
            updateTaskInDb(self.id(), {title: self.title(), board: self.boardId()});
        } catch (error) {
            console.error('Error', error);
        }
        
    }

    self.handleDragStart = function(task, event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', ko.toJSON(task));
        return true;
    }
}

function mapStateToParams({ taskSizeLarge }) {
    return { taskSizeLarge };
}

export default connect(mapStateToParams)(TaskViewModel);    