import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { Auth } from "./auth";

describe("Calendar page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
