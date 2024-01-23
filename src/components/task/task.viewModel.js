import ko from 'knockout';
import { removeTask } from '../../store/store.js';

export default function TaskViewModel(params) {
    var self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.boardId = ko.observable(params.boardId);

    console.log("BoardId", self.boardId())

    self.handleRemoveTask = function(task) {
        removeTask(self.id(), self.boardId());
    }
}