import ko from 'knockout';
import { state } from '../../store/store.js';

export default function ColumnViewModel(params) {
    this.title = ko.observable(params.title);
    this.tasks = ko.computed(() => {
        const board = state.boards.find(board => board.title === this.title());
        return board ? board.tasks() : [];
    })
    console.log("Tasks", this.tasks())
}