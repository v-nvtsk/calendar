import { getByDisplayValue, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Dropdown } from "./dropdown";

describe("Dropdown", () => {
  function setup(jsx: JSX.Element) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("should render with data", () => {
    const component = render(<Dropdown items={["1", "2", "3"]} selected="1" changeHandler={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(3);
    expect(getByDisplayValue(component.container, "1")).toBeDefined();
    expect((screen.getByRole("option", { name: "1" }) as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByRole("option", { name: "2" }) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole("option", { name: "3" }) as HTMLOptionElement).selected).toBe(false);
  });

  it("should call callback on value change", async () => {
    const changeHandler = jest.fn();
    const { user } = setup(
      <Dropdown items={["year", "month", "date"]} selected="year" changeHandler={changeHandler} />,
    );

    const combobox = screen.getByRole("combobox") as HTMLSelectElement;
    expect(screen.getByRole("option", { name: "date" })).toBeInTheDocument();

    await act(async () => user.selectOptions(combobox, "date"));
    expect(changeHandler).toHaveBeenCalledWith("date");
  });
});
