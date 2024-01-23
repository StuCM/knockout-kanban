import ko from 'knockout';
import { state, removeTask } from '../../store/store.js';

export default function ColumnViewModel(params) {
    var self = this;
    self.title = ko.observable(params.title);
    self.id = ko.observable(params.id);
    self.tasks = ko.computed(() => {
        const board = state.boards.find(board => board.title === this.title());
        return board ? board.tasks() : [];
    });

    console.log("Tasks", this.tasks())
}