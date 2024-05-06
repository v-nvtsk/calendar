import { render } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { WeekView } from "./week";

describe("Week", () => {
  it("should render WeekView", async () => {
    const task = {
      id: "1",
      creationDate: 0,
      taskTitle: "title",
      description: "description for title",
      startDate: new Date(2024, 0, 1).getTime(),
      endDate: new Date().getTime(),
      status: true,
      tags: "tag1,tag2",
    };

    const component = await act(async () =>
      render(
        <MemoryRouter>
          <WeekView year={2024} week={1} tasks={[task]} />
        </MemoryRouter>,
      ),
    );

    expect(component.container).toBeInTheDocument();
  });
});
