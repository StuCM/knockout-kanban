import ko from 'knockout';
import { setState, getState } from 'knockout-store';
import { getTasksFromDb } from './fetchApi.js';

const state = {
    boards: [
        {id: 1, title: 'To Do', tasks: ko.observableArray([]) },
        {id: 2, title: 'In Progress', tasks: ko.observableArray([]) },
        {id: 3, title: 'Done', tasks: ko.observableArray([]) },
    ],
};

setState(state);
console.log("State", getState())

//add task to a board
function addTask(task, boardId) {
    const board = state.boards.find(board => board.id === parseInt(boardId));
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    board.tasks.push(task);
};

//remove task from a board
function removeTask(task, boardId) {
    const board = state.boards.find(board => board.id === parseInt(boardId));
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    board.tasks.remove(task);
}

async function fetchTasks() {
    const tasks = await getTasksFromDb();
    tasks.forEach(task => {
        addTask(task, task.board);
    });
}

fetchTasks();
console.log("State", state.boards[0].tasks() )

export { state, addTask, removeTask };