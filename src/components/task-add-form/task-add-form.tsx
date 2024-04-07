import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { create } from "../../store/calendarSlice";
import "./style.css";

export function TaskAddForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (ev: FormEvent) => {
    ev.preventDefault();
    const taskAddForm = ev.target as HTMLFormElement;
    if (taskAddForm.checkValidity()) {
      const getElement = (name: string) => taskAddForm.elements[name as keyof typeof taskAddForm.elements];
      const taskTitleEl = getElement("taskTitle") as HTMLInputElement;
      const descriptionEl = getElement("description") as HTMLInputElement;
      const startDateEl = getElement("startDate") as HTMLInputElement;
      const taskTagsEl = getElement("tags") as HTMLInputElement;

      const startDate = new Date(startDateEl.value).valueOf();
      dispatch(
        create({
          creationDate: Date.now(),
          status: false,
          taskTitle: taskTitleEl.value,
          description: descriptionEl.value,
          startDate,
          tags: taskTagsEl.value,
        }),
      );

      taskAddForm.reset();
    }
  };

  return (
    <form id="task-add-form" className="task-add" onSubmit={submitHandler}>
      <fieldset className="task-add__fieldset">
        <legend>Add task</legend>
        <div className="task-add__group">
          <label className="task-add__label" htmlFor="taskTitle">
            Title:
          </label>
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            className="task-add__input-title"
            placeholder="Enter task title..."
            required
          />
        </div>
        <div className="task-add__group">
          <label className="task-add__label" htmlFor="description">
            Task description:
          </label>
          <textarea
            name="description"
            id="description"
            className="task-add__input-description"
            placeholder="Enter task description..."
          />
        </div>
        <div className="task-add__group">
          <label className="task-add__label" htmlFor="startDate">
            Event date and time:
          </label>
          <input type="datetime-local" name="startDate" id="startDate" className="task-add__input-date" required />
        </div>
        <div className="task-add__group">
          <label className="task-add__label" htmlFor="tags">
            Tags:
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="task-add__input-tags"
            placeholder="Enter comma separated tags"
          />
        </div>
        <div className="task-add__group">
          <button type="submit" className="task-add__btn-add">
            Add
          </button>
        </div>
      </fieldset>
    </form>
  );
}
