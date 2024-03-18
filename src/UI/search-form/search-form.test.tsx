import { RenderResult, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { SearchForm } from "./search-form";

describe("SearchForm", () => {
  let component;
  let container: RenderResult["container"];
  const testClassName = "testClassName";

  it("should create markup", () => {
    component = render(<SearchForm onSubmit={() => {}} className={testClassName} />);
    container = component.container;

    const form = container.querySelector(`form.${testClassName}`);
    expect(form).toBeDefined();
    const inputField = screen.getByPlaceholderText("search");
    expect(inputField).toBeDefined();
    const btn = screen.getByRole("button");
    expect(btn).toBeDefined();
  });

  it("should create form with default class", () => {
    component = render(<SearchForm onSubmit={() => {}} />);
    container = component.container;
    expect(component.container.querySelector("form.searchForm")).toBeDefined();
  });

  it("should submit", async () => {
    const callback = jest.fn();
    component = await act(async () => render(<SearchForm onSubmit={callback} className="searchForm" />));
    container = component.container;
    const inputField = (await screen.findByPlaceholderText("search")) as HTMLInputElement;
    const btn = await screen.findByRole("button");
    await btn.click();

    expect(callback).toHaveBeenCalledWith("");
    await act(async () => userEvent.type(inputField, "test"));
    expect(inputField.value).toEqual("test");
    await btn.click();
    expect(callback).toHaveBeenCalledWith("test");
  });
});
