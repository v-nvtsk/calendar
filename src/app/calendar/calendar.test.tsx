import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import { Calendar } from "./calendar";

jest.mock("../../api/firebase/firebase.ts");
jest.mock("../../components/calendar-controls/calendar-controls");
jest.mock("../../components/calendar-content");

describe("Calendar page", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Calendar />
          </MemoryRouter>
        </Provider>,
      ),
    );

    expect(component.container).toBeInTheDocument();

    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });
});
