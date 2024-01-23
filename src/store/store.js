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
function removeTask(taskId, boardId) {
    const board = state.boards.find(board => board.id === parseInt(boardId));
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    const task = board.tasks().find(task => task.id == taskId);
    board.tasks.remove(task);
}

async function fetchTasks() {
    const tasks = await getTasksFromDb();
    tasks.forEach(task => {
        addTask(task, task.board);
    });
}

export { state, addTask, removeTask, fetchTasks };