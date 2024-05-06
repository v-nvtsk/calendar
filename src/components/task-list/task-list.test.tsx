import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { TaskList } from "./task-list";

describe("TaskList", () => {
  const testItem = {
    id: "id_1",
    taskTitle: "test title",
    description: "test description",
    status: true,
    creationDate: new Date().valueOf(),
    startDate: new Date().valueOf(),
    tags: "tag1, tag2",
  };

  it("should render", async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <TaskList tasks={[testItem]} onEdit={() => {}} />
          </BrowserRouter>
        </Provider>,
      ),
    );
  });

  it("should run callback onEdit", async () => {
    const mockOnEdit = jest.fn();
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList test-id="test-id" tasks={[testItem]} onEdit={mockOnEdit} />
        </BrowserRouter>
      </Provider>,
    );

    const btnEdit = component.container.querySelector(".btnEdit") as HTMLButtonElement;
    expect(btnEdit).toBeDefined();

    await userEvent.click(btnEdit);
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
