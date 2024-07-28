import { RenderResult, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { SearchForm } from "./search-form";

describe("SearchForm", () => {
  let component;
  let container: RenderResult["container"];
  const testClassName = "testClassName";

  it.skip("should create markup", async () => {
    component = await act(async () => render(<SearchForm onSubmit={() => {}} className={testClassName} />));
    container = component.container;

    const form = container.querySelector(`form.${testClassName}`);
    expect(form).toBeDefined();
    const inputField = screen.getByPlaceholderText("search");
    expect(inputField).toBeDefined();
    const btn = screen.getByRole("button");
    expect(btn).toBeDefined();
  });

  it.skip("should create form with default class", async () => {
    component = await act(async () => render(<SearchForm onSubmit={() => {}} />));
    container = component.container;
    expect(component.container.querySelector("form.searchForm")).toBeDefined();
  });

  it.skip("should submit", async () => {
    const callback = jest.fn();
    component = await act(async () => render(<SearchForm onSubmit={callback} className="searchForm" />));
    container = component.container;
    const inputField = (await screen.findByPlaceholderText("search")) as HTMLInputElement;
    const btn = await screen.findByRole("button");
    await act(async () => userEvent.click(btn));

    expect(callback).toHaveBeenCalledWith("");
    await act(async () => userEvent.type(inputField, "test"));
    expect(inputField.value).toEqual("test");
    await act(async () => userEvent.click(btn));
    expect(callback).toHaveBeenCalledWith("test");
  });
});
