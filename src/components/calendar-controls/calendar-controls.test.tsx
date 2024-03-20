import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { CalendarControls } from "./calendar-controls";

describe("CalendarControls", () => {
  const user = userEvent.setup();

  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["month", "year"]}
              setActiveView={() => {}}
              onPrev={() => {}}
              onNext={() => {}}
              onToday={() => {}}
              onSearch={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();

    const todayBtn = component.getByRole("button", { name: /today/i });
    expect(todayBtn).toBeInTheDocument();
    const buttons = screen.queryAllByRole("button", {});
    expect(buttons.length).toBe(4);
    const prevBtn = buttons[1];
    expect(prevBtn.classList.contains("btnPrev")).toBe(true);
    const nextBtn = buttons[2];
    expect(nextBtn.classList.contains("btnNext")).toBe(true);
    const searchBtn = buttons[3];
    expect(searchBtn.classList.contains("btn")).toBe(true);

    const combobox = component.getByRole("combobox") as HTMLSelectElement;
    expect(combobox).toBeInTheDocument();
    expect(combobox.value).toBe("year");
  });

  it("should call setActiveView", async () => {
    const mockedFn = jest.fn();
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["year", "month"]}
              setActiveView={mockedFn}
              onPrev={() => {}}
              onNext={() => {}}
              onToday={() => {}}
              onSearch={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const combobox = component.getByRole("combobox") as HTMLSelectElement;
    expect(combobox).toBeInTheDocument();
    expect(combobox.value).toBe("year");
    await user.selectOptions(combobox, "month");
    expect(mockedFn).toHaveBeenCalled();
    expect(mockedFn).toHaveBeenCalledWith("month");
  });

  it("should call onPrev", async () => {
    const mockedFn = jest.fn();
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["month", "year"]}
              setActiveView={() => {}}
              activeView="year"
              onPrev={mockedFn}
              onNext={() => {}}
              onToday={() => {}}
              onSearch={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const buttons = screen.queryAllByRole("button", {});
    expect(buttons.length).toBe(4);
    const prevBtn = buttons[1];
    expect(prevBtn.classList.contains("btnPrev")).toBe(true);
    await user.click(prevBtn);
    expect(mockedFn).toHaveBeenCalled();
  });

  it("should call onNext", async () => {
    const mockedFn = jest.fn();
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["month", "year"]}
              setActiveView={() => {}}
              activeView="year"
              onPrev={() => {}}
              onNext={mockedFn}
              onToday={() => {}}
              onSearch={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const buttons = screen.queryAllByRole("button", {});
    expect(buttons.length).toBe(4);
    const nextBtn = buttons[2];
    expect(nextBtn.classList.contains("btnNext")).toBe(true);
    await user.click(nextBtn);
    expect(mockedFn).toHaveBeenCalled();
  });

  it("should call onToday", async () => {
    const mockedFn = jest.fn();
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["month", "year"]}
              setActiveView={() => {}}
              activeView="year"
              onPrev={() => {}}
              onNext={() => {}}
              onToday={mockedFn}
              onSearch={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const todayBtn = component.getByRole("button", { name: /today/i });
    await user.click(todayBtn);
    expect(mockedFn).toHaveBeenCalled();
  });

  it("should call onSearch", async () => {
    const mockedFn = jest.fn();
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarControls
              controlsTitle="testTitle"
              views={["month", "year"]}
              setActiveView={() => {}}
              activeView="year"
              onPrev={() => {}}
              onNext={() => {}}
              onToday={() => {}}
              onSearch={mockedFn}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const searchInput = component.getByPlaceholderText("search") as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    await user.type(searchInput, "test");
    expect(searchInput.value).toBe("test");

    const buttons = screen.queryAllByRole("button", {});
    expect(buttons.length).toBe(4);
    const searchBtn = buttons[3];
    expect(searchBtn.classList.contains("btn")).toBe(true);
    await user.click(searchBtn);
    expect(mockedFn).toHaveBeenCalled();
  });
});
