import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskEditForm } from "./task-edit-form";

describe("TaskEditForm", () => {
  const item = {
    id: "1",
    taskTitle: "task 1",
    description: "some description",
    creationDate: new Date("2024-01-01").valueOf(),
    status: false,
    startDate: new Date("2024-01-01").valueOf(),
    endDate: new Date("2024-01-02").valueOf(),
    tags: "tag 1, tag 2",
  };

  it("should render", async () => {
    const component = render(<TaskEditForm task={item} onChange={() => {}} />);
    expect(component.container).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /task title/i }));
    expect(screen.getByRole("textbox", { name: /description/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i));
    expect(screen.getByLabelText(/end date/i));
    expect(screen.getByRole("textbox", { name: /tags/i }));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should submit changed item", async () => {
    const mockOnEdit = jest.fn();

    const updates = {
      taskTitle: "new title",
      description: "new description",
      startDate: new Date("2024-01-01").valueOf(),
      endDate: new Date("2024-01-02").valueOf(),
      tags: "new tags",
    };

    render(<TaskEditForm task={item} onChange={mockOnEdit} />);

    const taskTitleEl = screen.getByRole("textbox", { name: /task title/i }) as HTMLInputElement;
    const descriptionEl = screen.getByRole("textbox", { name: /description/i }) as HTMLInputElement;
    const tagsEl = screen.getByRole("textbox", { name: /tags/i }) as HTMLInputElement;

    await userEvent.clear(taskTitleEl);
    await userEvent.type(taskTitleEl, updates.taskTitle);
    expect(taskTitleEl).toHaveValue(updates.taskTitle);

    await userEvent.clear(descriptionEl);
    await userEvent.type(descriptionEl, updates.description);
    expect(descriptionEl).toHaveValue(updates.description);

    await userEvent.clear(tagsEl);
    await userEvent.type(tagsEl, updates.tags);
    expect(tagsEl).toHaveValue(updates.tags);

    await userEvent.click(screen.getByText(/save task/i));
    expect(mockOnEdit).toHaveBeenCalledWith(updates);
  });
});
