import { render, screen } from "@testing-library/react";
import { act } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { DayView } from "./day";

describe("DayView", () => {
  it("should render", async () => {
    const testItem = {
      id: "id_1",
      taskTitle: "test title",
      description: "test description",
      status: true,
      creationDate: new Date().valueOf(),
      startDate: new Date().valueOf(),
      tags: "tag1, tag2",
    };
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <DayView year={2024} month={1} date={1} tasks={[testItem]} onEdit={() => {}} onCheck={() => {}} />
          </BrowserRouter>
        </Provider>,
      ),
    );
    expect(component.container).toBeInTheDocument();
    expect(component.container.querySelectorAll(".hour").length).toBe(24);
  });

  it("should scroll to current hour", async () => {
    const testItem = {
      id: "id_1",
      taskTitle: "test title",
      description: "test description",
      status: true,
      creationDate: new Date().valueOf(),
      startDate: new Date().valueOf(),
      tags: "tag1, tag2",
    };
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <DayView
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              date={new Date().getDate()}
              tasks={[testItem]}
              onEdit={() => {}}
              onCheck={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    await act(() =>
      component.rerender(
        <Provider store={store}>
          <BrowserRouter>
            <DayView
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              date={new Date().getDate()}
              tasks={[testItem]}
              onEdit={() => {}}
              onCheck={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container.querySelector("#currentHour")).toBeInTheDocument();

    jest.advanceTimersByTime(500);
    Promise.resolve();
    expect(global.setTimeout).toHaveBeenCalled();
    expect(scrollIntoViewMock).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("should run callbacks", async () => {
    const testItem = {
      id: "id_1",
      taskTitle: "test title",
      description: "test description",
      status: true,
      creationDate: new Date("2024-03-20").valueOf(),
      startDate: new Date("2024-03-20").valueOf(),
      tags: "tag1, tag2",
    };
    const editMock = jest.fn();
    const checkMock = jest.fn();
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <DayView
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              date={new Date().getDate()}
              tasks={[testItem]}
              onEdit={editMock}
              onCheck={checkMock}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );
    const editBtn = component.container.querySelector(".btnEdit") as HTMLButtonElement;
    expect(editBtn).toBeInTheDocument();
    editBtn.click();
    expect(editMock).toHaveBeenCalled();

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).toBeInTheDocument();
    checkbox.click();
    expect(checkMock).toHaveBeenCalled();
  });
});
