import { render } from "@testing-library/react";
import { act } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import { Auth } from "./auth";

describe("Auth page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Auth />
          </MemoryRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
