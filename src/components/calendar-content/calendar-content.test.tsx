import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { CalendarContent } from "./calendar-content";

describe("CalendarContent", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarContent
              items={[]}
              view="year"
              setViewTitle={() => null}
              onEdit={() => null}
              year={2024}
              month={0}
              date={0}
              week={1}
              onCheck={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });

  it("should render with view", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CalendarContent
              items={[]}
              view="year"
              setViewTitle={() => null}
              onEdit={() => null}
              year={2024}
              month={0}
              date={0}
              week={1}
              onCheck={() => {}}
            />
          </BrowserRouter>
        </Provider>,
      ),
    );

    screen.getByText(/january/i);
    screen.getByText(/february/i);
    screen.getByText(/march/i);
    screen.getByText(/april/i);
    screen.getByText(/may/i);
    screen.getByText(/june/i);
    screen.getByText(/july/i);
    screen.getByText(/august/i);
    screen.getByText(/september/i);
    screen.getByText(/october/i);
    screen.getByText(/november/i);
    screen.getByText(/december/i);

    expect(component.container).toBeInTheDocument();
  });
});
