import { state, addTask, removeTask } from "../src/store/store";

describe("store state tests", () => {
    it("adds a task to a board", () => {
        const task = { id: 1, title: "test task" };
        addTask(task, "To Do");
        const todoBoard = state.boards.find(board => board.title === "To Do");
        expect(todoBoard.tasks()).toContain(task);
    });

    it("removes a task from a board", () => {
        const task = { id: 1, title: "test task" };
        addTask(task, "To Do");
        removeTask(task, "To Do");
        const todoBoard = state.boards.find(board => board.title === "To Do");
        expect(todoBoard.tasks()).not.toContain(task);
    });
});