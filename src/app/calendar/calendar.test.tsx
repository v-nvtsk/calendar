import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { Calendar } from "./calendar";

describe("Calendar page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Calendar />
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
