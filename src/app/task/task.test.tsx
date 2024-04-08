import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { TaskView } from "./task";

describe("Task", () => {
  it("should render", async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <TaskView />
          </BrowserRouter>
        </Provider>,
      ),
    );
  });
});
