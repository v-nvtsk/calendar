import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import firebase from "../../api/firebase/firebase";
import { dateTimeLocaltoInput } from "../../helpers";
import { store } from "../../store";
import { TaskAddForm } from "./task-add-form";

describe("Task-Add-Form", () => {
  it("should render the component", async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <TaskAddForm />
        </Provider>,
      ),
    );

    const textboxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    const taskTitle = textboxes.filter((el) => el.name === "taskTitle");
    expect(taskTitle.length).toBe(1);
    expect(taskTitle[0]).toBeInTheDocument();

    const description = textboxes.filter((el) => el.name === "description");
    expect(description.length).toBe(1);
    expect(description[0]).toBeInTheDocument();

    const tags = textboxes.filter((el) => el.name === "tags");
    expect(tags.length).toBe(1);
    expect(tags[0]).toBeInTheDocument();

    const dateInput = screen.getByLabelText(/event date and time:/i) as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();
    expect(dateInput.value).toBe("");

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should submit valid data", async () => {
    jest.mock("../../api/firebase/firebase.ts");
    const mockCreate = jest.fn();
    jest.spyOn(firebase, "create").mockImplementation(mockCreate);

    const item = {
      taskTitle: "task 1",
      description: "some description",
      status: false,
      startDate: new Date("2024-01-01").valueOf(),
      tags: "tag 1, tag 2",
    };

    render(
      <Provider store={store}>
        <TaskAddForm />
      </Provider>,
    );

    const group = screen.getByRole("group", { name: /add task/i });
    const taskTitleEl = within(group).getByRole("textbox", { name: /title:/i }) as HTMLInputElement;
    const descriptionEl = within(group).getByRole("textbox", { name: /task description:/i }) as HTMLInputElement;
    const dateEl = within(group).getByLabelText(/event date and time:/i) as HTMLInputElement;
    const tagsEl = within(group).getByRole("textbox", { name: /tags/i }) as HTMLInputElement;
    const btn = within(group).getByRole("button", { name: /add/i });

    await userEvent.clear(taskTitleEl);
    await userEvent.type(taskTitleEl, item.taskTitle);
    expect(taskTitleEl).toHaveValue(item.taskTitle);

    await userEvent.clear(descriptionEl);
    await userEvent.type(descriptionEl, item.description);
    expect(descriptionEl).toHaveValue(item.description);

    await userEvent.clear(dateEl);

    const d = new Date(item.startDate);
    dateTimeLocaltoInput(d);

    await userEvent.type(dateEl, `${dateTimeLocaltoInput(d)}`);
    expect(dateEl).toHaveValue(`${dateTimeLocaltoInput(d)}`);

    await userEvent.clear(tagsEl);
    await userEvent.type(tagsEl, item.tags);
    expect(tagsEl).toHaveValue(item.tags);

    await userEvent.click(btn);
    await expect(mockCreate).toHaveBeenCalledWith("tasks", expect.objectContaining(item));
  });

  it("should not submit invalid data", async () => {
    jest.mock("../../api/firebase/firebase.ts");
    const mockCreate = jest.fn();
    jest.spyOn(firebase, "create").mockImplementation(mockCreate);

    render(
      <Provider store={store}>
        <TaskAddForm />
      </Provider>,
    );

    const form = document.querySelector("form");

    const group = screen.getByRole("group", { name: /add task/i });
    const taskTitleEl = within(group).getByRole("textbox", { name: /title:/i }) as HTMLInputElement;
    const dateEl = within(group).getByLabelText(/event date and time:/i) as HTMLInputElement;
    const btn = within(group).getByRole("button", { name: /add/i });

    await userEvent.click(btn);
    await expect(mockCreate).not.toHaveBeenCalled();
    expect(form?.reportValidity()).toBe(false);
    expect(taskTitleEl.validity.valid).toBe(false);
    expect(dateEl.validity.valid).toBe(false);
  });
});
