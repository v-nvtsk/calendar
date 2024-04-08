import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../store";
import { Profile } from "./profile";

describe("Profile page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <Profile />
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
