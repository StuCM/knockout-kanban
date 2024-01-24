import ko from 'knockout';
import { setState, getState } from 'knockout-store';
import { getTasksFromDb } from './fetchApi.js';

const state = {
    boards: ko.observableArray([
        {id: 1, title: 'To Do', tasks: ko.observableArray([]) },
        {id: 2, title: 'In Progress', tasks: ko.observableArray([]) },
        {id: 3, title: 'Done', tasks: ko.observableArray([]) },
    ]),
};

setState(state);

//add task to a board
function addTask(task, boardId) {
    if(!boardId) { return }
    const board = state.boards().find(board => board.id === parseInt(boardId));
    console.log("add task", state.boards(), boardId)
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    board.tasks.push(task);
};

function updateTask(taskId, newTitle, newBoard) {
    const board = state.boards().find(board => board.id === parseInt(newBoard));
    let task = board.tasks[taskId];
    if (task) {
        task.title = newTitle;
        task.board = newBoard;
    }
};

//remove task from a board
function removeTask(taskId, boardId) {
    const board = state.boards().find(board => board.id === parseInt(boardId));
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    const task = board.tasks().find(task => task.id == taskId);
    board.tasks.remove(task);
}

async function fetchTasks() {
    const tasks = await getTasksFromDb();
    if (!tasks) {
        return;
    }
    tasks.forEach(task => {
        addTask(task, task.board);
    });
}

export { state, addTask, removeTask, fetchTasks, updateTask };