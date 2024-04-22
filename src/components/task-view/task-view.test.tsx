import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskView } from "./task-view";

describe("TaskView", () => {
  const date = new Date(2024, 0, 1, 0, 0, 0, 0).getTime();
  it("should render", async () => {
    const task = {
      id: "1",
      creationDate: 0,
      taskTitle: "title",
      description: "description for title",
      startDate: date,
      endDate: new Date().getTime(),
      status: true,
      tags: "tag1,tag2",
    };

    const mockEdit = jest.fn();
    const mockCheck = jest.fn();
    const component = render(<TaskView task={task} onEdit={mockEdit} onCheck={mockCheck} />);
    expect(component.container).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText(/description:/i)).toBeInTheDocument();
    expect(screen.getByText(/description for title/i)).toBeInTheDocument();
    expect(screen.getByText(/Start:/i)).toBeInTheDocument();
    expect(screen.getByText(new Date(date).toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(/End:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tag1/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tag2/i })).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /edit/i });
    expect(btn).toBeInTheDocument();
    expect(btn.innerHTML).toBe("Edit");

    await userEvent.click(btn);
    expect(mockEdit).toHaveBeenCalled();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(mockCheck).toHaveBeenCalled();
  });

  it("should render startDate if no EndDate", async () => {
    const task = {
      id: "1",
      creationDate: 0,
      taskTitle: "title",
      description: "description for title",
      startDate: new Date(2024, 0, 1, 0, 0, 0, 0).getTime(),
      status: true,
      tags: "tag1,tag2",
    };

    const mockEdit = jest.fn();
    const mockCheck = jest.fn();
    const component = render(<TaskView task={task} onEdit={mockEdit} onCheck={mockCheck} />);
    expect(component.container).toBeInTheDocument();

    expect(screen.getByText(/Start:/i)).toBeInTheDocument();
    expect(screen.queryAllByText(new Date(date).toLocaleString())).toHaveLength(2);
  });
});
