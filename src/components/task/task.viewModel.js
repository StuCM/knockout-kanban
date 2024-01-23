import ko from 'knockout';
import { removeTask, updateTask } from '../../store/store.js';
import { deleteTaskFromDb, updateTaskInDb } from '../../store/fetchApi.js';

export default function TaskViewModel(params) {
    var self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.boardId = ko.observable(params.boardId);
    self.isEditing = ko.observable(false);

    console.log("BoardId", self.boardId())

    self.handleRemoveTask = function(task) {
        removeTask(self.id(), self.boardId());
        deleteTaskFromDb(self.id());
    }

    self.handleEditTask = function(task) {
        updateTask(self.id(), self.title(), self.boardId());
        updateTaskInDb(self.id(), {title: self.title(), board: self.boardId()});
    }
}