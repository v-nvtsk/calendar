import { render } from "@testing-library/react";
import { act } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import MonthView from "./month";

describe("Calendar page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MonthView year={2024} month={1} tasks={[]} />
            );
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
