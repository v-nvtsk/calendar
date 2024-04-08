import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import firebase from "../../api/firebase/firebase";
import { store } from "../../store";
import { Task } from "./task";

jest.spyOn(firebase, "read").mockImplementation(() =>
  Promise.resolve({
    "12345": {
      id: "12345",
      taskTitle: "task title",
      description: "",
      startDate: 0,
      endDate: 0,
      tags: [],
    },
  }),
);

describe("Task", () => {
  const paths = [
    {
      name: "view",
      path: "/task/view?id=12345",
    },
    {
      name: "edit",
      path: "/task/edit?id=12345",
    },
  ];
  const LocationDisplay = () => {
    const location = useLocation();

    return <div data-testid="location-display">{location.pathname}</div>;
  };

  Promise.all(
    paths.map((path) =>
      it(`should render task-${path.name}`, async () => {
        const component = await act(async () =>
          render(
            <Provider store={store}>
              <MemoryRouter initialEntries={[path.path]}>
                <Routes>
                  <Route path="/task/:action?" element={<Task />} />
                </Routes>
                <LocationDisplay />
              </MemoryRouter>
            </Provider>,
          ),
        );
        expect(component.container).toBeInTheDocument();

        if (path.name === "edit") {
          const btn = screen.getByRole("button", { name: /save task/i });
          expect(btn).toBeInTheDocument();
          jest.spyOn(firebase, "update");
          await userEvent.click(btn);
          expect(firebase.update).toHaveBeenCalled();
          expect(screen.getByTestId("location-display")).toHaveTextContent("/task/view");
        } else if (path.name === "view") {
          const btn = screen.getByRole("button", { name: /edit/i });
          expect(btn).toBeInTheDocument();
          await userEvent.click(btn);
          expect(screen.getByTestId("location-display")).toHaveTextContent("/task/edit");
        }
      }),
    ),
  );
});
