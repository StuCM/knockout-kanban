import ko from 'knockout';
import { setState } from 'knockout-store';
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
    //get the current board
    const currentBoard = state.boards().find(board => board.tasks().some(task => task.id === taskId));
    if (!currentBoard) {
        throw new Error(`Task ${taskId} not found`);
    }
    //get the task
    const task = currentBoard.tasks().find(task => task.id === taskId);
    //update the title
    task.title = newTitle;
    //check if the board has changed
    if (currentBoard.id === parseInt(newBoardId)) {
        return;
    }
    //get the new board
    const newBoard = state.boards().find(board => board.id === parseInt(newBoardId));
    if (!newBoard) {
        throw new Error(`Board ${newBoardId} not found`);
    }
    //update to the correct board
    currentBoard.tasks.remove(task);

    newBoard.tasks.push(task);
};

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