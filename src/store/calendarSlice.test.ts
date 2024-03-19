import { store } from ".";
import { TodoItem } from "../api/calendar.types";
import firebase from "../api/firebase/firebase";
import { create, deleteTask, read, update } from "./calendarSlice";

jest.mock("../api/firebase/firebase.ts");

describe("Calendar", () => {
  const testTodoItem: TodoItem = {
    id: "test_id",
    type: "task",
    creationDate: new Date().valueOf(),
    startDate: new Date().valueOf(),
    description: "test_description",
    tags: "tag1, tag2",
    taskTitle: "test_title",
    status: false,
  };

  beforeEach(async () => {
    jest.spyOn(firebase, "create").mockResolvedValue(testTodoItem.id);
    jest.spyOn(firebase, "read").mockResolvedValue([testTodoItem]);
    jest.spyOn(firebase, "update").mockResolvedValue({ ...testTodoItem, id: testTodoItem.id! });
    jest.spyOn(firebase, "delete").mockResolvedValue(undefined);
  });

  afterEach(async () => {
    jest.spyOn(firebase, "read").mockResolvedValue([]);
    await store.dispatch(read({}));
  });

  describe("create", () => {
    it("should add todo item", async () => {
      await store.dispatch(create({ ...testTodoItem }));
      const result = store.getState().calendar;
      expect(result.items.length).toBe(1);
      expect(result.items[0]).toEqual(testTodoItem);
    });

    it("should set errorState if create fails", async () => {
      jest.spyOn(firebase, "create").mockResolvedValue(undefined);
      await store.dispatch(create({ ...testTodoItem }));
      expect(store.getState().calendar.errorState).toEqual("Task is not created");
    });
  });

  describe("update", () => {
    it("should update todo item", async () => {
      expect(store.getState().calendar.items.length).toBe(0);

      const item1 = { ...testTodoItem, id: "test_id-1" };
      const item2 = { ...testTodoItem, id: "test_id-2" };

      jest.spyOn(firebase, "create").mockResolvedValue(item1.id);
      await store.dispatch(create({ ...item1 }));
      expect((await store.getState()).calendar.items.length).toBe(1);

      jest.spyOn(firebase, "create").mockResolvedValue(item2.id);
      await store.dispatch(create(item2));
      expect((await store.getState()).calendar.items.length).toBe(2);

      const updatedItem1 = {
        startDate: new Date().valueOf(),
        description: "test_description-edited",
        tags: "tag1, tag2, edited",
        taskTitle: "test_title-edited",
        status: true,
      };

      jest.spyOn(firebase, "update").mockResolvedValue({ ...item1, ...updatedItem1 });
      await store.dispatch(update({ id: item1.id, ...updatedItem1 }));
      const resultState = store.getState().calendar;
      expect(resultState.items.length).toBe(2);
      expect(resultState.items[0]).toEqual({ ...item1, ...updatedItem1 });
      expect(resultState.items[1]).toEqual(item2);
    });

    it("should set errorState if create fails", async () => {
      jest.spyOn(firebase, "update").mockResolvedValue(undefined);
      await store.dispatch(update({ ...testTodoItem, id: "3" }));
      expect(store.getState().calendar.errorState).toEqual("Can not update task");
    });
  });

  describe("read", () => {
    it("should read todo items", async () => {
      const newItem = {
        id: "test_id-2",
        creationDate: new Date().valueOf() + 1000,
        startDate: new Date().valueOf(),
        description: "test_description-edited",
        tags: "tag1, tag2, edited",
        taskTitle: "test_title-edited",
        status: true,
      };
      expect(store.getState().calendar.items.length).toBe(0);
      jest.spyOn(firebase, "create").mockResolvedValue(newItem.id);
      await store.dispatch(create({ ...newItem }));
      expect(store.getState().calendar.items.length).toBe(1);
      const result = store.getState().calendar.items[0];
      expect(result).toEqual(newItem);
    });

    it("should set errorState if read fails", async () => {
      jest.spyOn(firebase, "read").mockReturnValueOnce(Promise.reject(new Error("Error read task")));
      await store.dispatch(read({}));
      expect(store.getState().calendar.errorState).toEqual("Error read task");
    });
  });

  describe("delete", () => {
    it("should delete todo item", async () => {
      jest.spyOn(firebase, "create").mockResolvedValue(testTodoItem.id);
      await store.dispatch(create({ ...testTodoItem }));
      const initialResult = store.getState().calendar;
      expect(initialResult.items.length).toBe(1);

      jest.spyOn(firebase, "delete").mockResolvedValue(undefined);
      await store.dispatch(deleteTask(testTodoItem.id!));
      const result = store.getState().calendar;
      expect(result.items.length).toBe(0);
    });

    it("should set errorState if delete fails", async () => {
      jest.spyOn(firebase, "delete").mockReturnValueOnce(Promise.reject(new Error("Error delete task")));
      await store.dispatch(deleteTask(testTodoItem.id!));
      expect(store.getState().calendar.errorState).toEqual("Error delete task");
    });
  });
});
