import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "./app";

jest.mock("../api/firebase/firebase.ts");

describe("App", () => {
  it("should render root", async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter basename={"/"}>
            <App />
          </BrowserRouter>
        </Provider>,
      ),
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    const linkSignIn = screen.getByText(/sign in/i);
    expect(header).toContainElement(linkSignIn);

    await act(async () => linkSignIn.click());
    expect(screen.getAllByText(/sign in/i)).toHaveLength(3);
  });
});
