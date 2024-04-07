import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "../../api/calendar.types";
import { HoursList } from "./hours-list";

describe("hours-list", () => {
  function setup(jsx: JSX.Element) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("should render", () => {
    const { unmount, container } = setup(<HoursList isToday tasks={[]} renderItem={() => <></>} />);
    expect(container).toBeInTheDocument();
    unmount();
  });

  it("should call render callback", () => {
    const testItem = {
      id: "id_1",
      taskTitle: "test title",
      description: "test description",
      status: true,
      creationDate: new Date().valueOf(),
      startDate: new Date().valueOf(),
      tags: "tag1, tag2",
    };

    const renderFn = jest.fn().mockImplementation((task: TodoItem) => <li key={task.id}></li>);

    const { unmount } = setup(<HoursList isToday tasks={[testItem]} renderItem={renderFn} />);

    expect(renderFn).toHaveBeenCalledWith(testItem);
    unmount();
  });
});
