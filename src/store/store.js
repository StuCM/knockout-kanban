import ko from 'knockout';
import { setState, getState } from 'knockout-store';

const state = {
    boards: [
        {id: 1, title: 'To Do', tasks: ko.observableArray([]) },
        {id: 2, title: 'In Progress', tasks: ko.observableArray([]) },
        {id: 3, title: 'Done', tasks: ko.observableArray([]) },
    ],
    addTask(task, boardName) {
        const board = this.boards.find(board => board.title === boardName);
        if (!board) {
            throw new Error(`Board ${boardName} not found`);
        }
        board.tasks.push(task);
    },
    removeTask(task, boardName) {
        const board = this.boards.find(board => board.title === boardName);
        if (!board) {
            throw new Error(`Board ${boardName} not found`);
        }
        board.tasks.remove(task);
    }
};

setState(state);

//add task to a board
function addTask(task, boardName) {
    const board = state.boards.find(board => board.title === boardName);
    if (!board) {
        throw new Error(`Board ${boardName} not found`);
    }
    board.tasks.push(task);
};

//remove task from a board
function removeTask(task, boardName) {
    const board = state.boards.find(board => board.title === boardName);
    if (!board) {
        throw new Error(`Board ${boardName} not found`);
    }
    board.tasks.remove(task);
}

export { state, addTask, removeTask };