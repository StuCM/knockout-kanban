import ko from 'knockout';
import { removeTask, updateTask } from '../../store/store.js';
import { deleteTaskFromDb, updateTaskInDb } from '../../store/fetchApi.js';
import { connect, getState } from 'knockout-store';

function TaskViewModel(params) {
    var self = this;
    const state = getState();
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.boardId = ko.observable(params.boardId);
    self.isEditing = ko.observable(false);
    self.taskSizeLarge = ko.computed(() => {
        return state().taskSizeLarge();
    })
    self.isFocused = ko.observable(false);

    self.updateBoardId = ko.computed(() => {
        let task;
        //find the task in the state
        state().boards().some(board => {
            task = board.tasks().find(t => t.id == self.id());
            if (task) {
                self.boardId(board.id); //update the boardId
                return true;
            }
        });
    });
    
    self.handleRemoveTask = function() {
        //update the store
        removeTask(self.id(), self.boardId());
        //update the database
        try {
            deleteTaskFromDb(self.id());
        } catch (error) {
            console.error('Error', error);
        }
        
    }

    self.handleEditTask = function() {
        //update the store
        updateTask(self.id(), self.title(), self.boardId());
        //update the database
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