import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { YearView } from "./year";

describe("YearView", () => {
  it("should render", async () => {
    const component = await act(async () =>
      render(
        <MemoryRouter>
          <YearView year={2024} tasks={[]} />
        </MemoryRouter>,
      ),
    );
    expect(component.container).toBeInTheDocument();
  });
});
