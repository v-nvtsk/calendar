import React from "react";
import { TodoItem } from "../../api/calendar.types";
import { dateTimeLocaltoInput } from "../../helpers";
import styles from "./styles.module.css";

type PropsType = {
  task: TodoItem;
  onEdit: (data: Partial<TodoItem>) => void;
};

type FormElements = {
  startDate: HTMLInputElement;
  endDate: HTMLInputElement;
  taskTitle: HTMLInputElement;
  description: HTMLTextAreaElement;
  tags: HTMLInputElement;
};

export function TaskEditForm({ task, onEdit }: PropsType) {
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const taskEditForm = form.elements as unknown as FormElements;
    const startDate = new Date(taskEditForm.startDate.value).getTime();
    const endDate = new Date(taskEditForm.endDate.value).getTime();
    const taskTitle = taskEditForm.taskTitle.value;
    const description = taskEditForm.description.value;
    const tags = taskEditForm.tags.value;
    onEdit({ taskTitle, description, startDate, endDate, tags });
  };

  return (
    <div>
      <form id="task-edit" onSubmit={onSubmit}>
        <div className={styles.editGroup}>
          <label className={styles.label} htmlFor="taskTitle">
            Task title
          </label>
          <input className={styles.input} type="text" name="taskTitle" id="taskTitle" defaultValue={task.taskTitle} />
        </div>
        <div className={styles.editGroup}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            rows={3}
            className={styles.input}
            name="description"
            id="description"
            defaultValue={task.description}
          />
        </div>

        <div className={styles.editGroup}>
          <label className={styles.label} htmlFor="startDate">
            Start date
          </label>
          <input
            className={styles.input}
            type="datetime-local"
            name="startDate"
            id="startDate"
            defaultValue={dateTimeLocaltoInput(new Date(task.startDate))}
          />
        </div>

        <div className={styles.editGroup}>
          <label className={styles.label} htmlFor="endDate">
            End date
          </label>
          <input
            className={styles.input}
            type="datetime-local"
            name="endDate"
            id="endDate"
            defaultValue={dateTimeLocaltoInput(new Date(task.endDate!))}
          />
        </div>

        <div className={styles.editGroup}>
          <label className={styles.label} htmlFor="tags">
            Tags
          </label>
          <input className={styles.input} type="text" name="tags" id="tags" defaultValue={task.tags} />
        </div>

        <input className={styles.btn} type="submit" value="Save task" />
      </form>
    </div>
  );
}
