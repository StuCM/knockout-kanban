import { state, addTask, removeTask } from "../src/store/store";
import { getTasksFromDb } from "../src/store/fetchApi";

describe("store state tests", () => {
    it("adds a task to a board", () => {
        const task = { id: 1, title: "test task" };
        addTask(task, 1);
        const todoBoard = state.boards.find(board => board.id === 1);
        expect(todoBoard.tasks()).toContain(task);
    });

    it("removes a task from a board", () => {
        const task = { id: 1, title: "test task" };
        addTask(task.id, 1);
        removeTask(task.id, 1);
        const todoBoard = state.boards.find(board => board.id === 1);
        expect(todoBoard.tasks()).not.toContain(task);
    });
});

jest.mock("../src/store/fetchApi", () => ({
    getTasksFromDb: jest.fn()
}));

describe("fetch tests", () => {
    it("gets a task by id", async () => {
        const taskId = 1;
        const mockTask = {id: taskId, title: "test task", board: 1};
        getTasksFromDb.mockResolvedValue(mockTask);
        
        expect(mockTask).toHaveProperty("id", taskId);
    })
})