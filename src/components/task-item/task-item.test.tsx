import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TaskItem } from "./task-item";

describe("TaskItem", () => {
  const testItem = {
    id: "testId",
    creationDate: new Date().valueOf(),
    status: true,
    taskTitle: "Task title",
    description: "Task description",
    startDate: new Date().valueOf(),
    tags: "tag, string",
  };
  it("should render component", () => {
    const component = render(
      <BrowserRouter>
        <TaskItem itemData={testItem} onEdit={() => {}} onDelete={() => {}} onCheck={() => {}} />
      </BrowserRouter>,
    );

    expect(component.container).toBeInTheDocument();

    expect(screen.getAllByRole("checkbox")[0]).toBeInTheDocument();
    expect(screen.getByText(/Task title/i)).toBeInTheDocument();
    expect(screen.getByText(/tag/i)).toBeInTheDocument();
    expect(screen.getByText(/string/i)).toBeInTheDocument();
    expect(screen.getByText(/✏️/i)).toBeInTheDocument();
    expect(screen.getByText(/🗑️/i)).toBeInTheDocument();

    component.rerender(
      <BrowserRouter>
        <TaskItem itemData={{ ...testItem, id: undefined }} onEdit={() => {}} onDelete={() => {}} onCheck={() => {}} />
      </BrowserRouter>,
    );

    expect(screen.queryByText(/Task title/i)).not.toBeInTheDocument();

    component.rerender(
      <BrowserRouter>
        <TaskItem itemData={{ ...testItem, tags: "" }} onEdit={() => {}} onDelete={() => {}} onCheck={() => {}} />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/tag/i)).not.toBeInTheDocument();
  });

  it("should call onEdit", async () => {
    const mockFn = jest.fn();
    render(
      <BrowserRouter>
        <TaskItem itemData={testItem} onEdit={mockFn} onDelete={() => {}} onCheck={() => {}} />
      </BrowserRouter>,
    );

    const editBtn = screen.getByText(/✏️/i);
    expect(editBtn).toBeInTheDocument();
    await editBtn.click();
    expect(mockFn).toHaveBeenCalled();
  });

  it("should call onDelete", async () => {
    const mockFn = jest.fn();
    render(
      <BrowserRouter>
        <TaskItem itemData={testItem} onEdit={() => {}} onDelete={mockFn} onCheck={() => {}} />
      </BrowserRouter>,
    );
    const deleteBtn = screen.getByText(/🗑️/i);
    expect(deleteBtn).toBeInTheDocument();
    await deleteBtn.click();
    expect(mockFn).toHaveBeenCalled();
  });

  it("should call onCheck", async () => {
    const mockFn = jest.fn();
    render(
      <BrowserRouter>
        <TaskItem itemData={testItem} onEdit={() => {}} onDelete={() => {}} onCheck={mockFn} />
      </BrowserRouter>,
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).toBeInTheDocument();
    await checkbox.click();
    expect(mockFn).toHaveBeenCalled();
  });
});
