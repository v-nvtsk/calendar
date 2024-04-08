import { TodoItem } from "../api/calendar.types";

export function groupTasksByHour(tasks: TodoItem[]): TodoItem[][] {
  return tasks.reduce((acc, task) => {
    const taskStartHour = new Date(task.startDate).getHours();
    if (acc[taskStartHour] === undefined) acc[taskStartHour] = [];
    acc[taskStartHour].push(task);

    return acc;
  }, Array(24));
}
