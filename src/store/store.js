import ko from 'knockout';
import { setState, getState } from 'knockout-store';
import { getTasksFromDb } from './fetchApi.js';

const state = {
    boards: ko.observableArray([
        {id: 1, title: 'To Do', tasks: ko.observableArray([]) },
        {id: 2, title: 'In Progress', tasks: ko.observableArray([]) },
        {id: 3, title: 'Done', tasks: ko.observableArray([]) },
    ]),
    taskSizeLarge: ko.observable(false),
};

setState(state);

//add task to a board
function addTask(task, boardId) {
    if(!boardId) { return }
    const board = state.boards().find(board => board.id === parseInt(boardId));
    if (!board) {
        throw new Error(`Board ${boardId} not found`);
    }
    board.tasks.push(task);
};

function updateTask(taskId, newTitle, newBoardId) {
    const currentBoard = state.boards().find(board => board.tasks().some(task => task.id === taskId));
    if (!currentBoard) {
        throw new Error(`Task ${taskId} not found`);
    }

    const task = currentBoard.tasks().find(task => task.id === taskId);

    task.title = newTitle;

    if (currentBoard.id === parseInt(newBoardId)) {
        return;
    }

    const newBoard = state.boards().find(board => board.id === parseInt(newBoardId));
    if (!newBoard) {
        throw new Error(`Board ${newBoardId} not found`);
    }

    currentBoard.tasks.remove(task);

    newBoard.tasks.push(task);
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

function toggleTaskSizeLarge(value) {
    state.taskSizeLarge(value);
}

export { state, addTask, removeTask, fetchTasks, updateTask, toggleTaskSizeLarge };