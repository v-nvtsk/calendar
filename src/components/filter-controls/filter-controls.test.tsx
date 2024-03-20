import { render, screen } from "@testing-library/react";
import { dateFromInputValue, dateToInputValue } from "../../helpers";
import { TaskFilterForm } from "./filter-controls";

describe("FilterControls", () => {
  const testFilter = {
    dateFrom: dateFromInputValue("2024-01-01"),
    dateTo: dateFromInputValue("2024-01-02"),
    text: "test",
    status: true,
    tagText: "test tag",
  };

  it("should render with initial value", () => {
    const component = render(<TaskFilterForm onFilter={() => {}} filter={testFilter} />);
    expect(component.container).toBeInTheDocument();

    const dateFrom = screen.getByText("From date:").nextSibling as HTMLInputElement;
    const dateTo = screen.getByText("To date:").nextSibling as HTMLInputElement;
    const search = screen.getByPlaceholderText("Search") as HTMLInputElement;
    const tags = screen.getByPlaceholderText("Tags") as HTMLInputElement;
    const status = screen.getByRole("combobox") as HTMLSelectElement;

    expect(dateFrom.name === "dateFrom").toBe(true);
    expect(dateFrom.value).toEqual(dateToInputValue(testFilter.dateFrom));
    expect(dateTo.name === "dateTo").toBe(true);
    expect(dateTo.value).toEqual(dateToInputValue(testFilter.dateTo));

    expect(search).toBeInTheDocument();
    expect(search.value).toEqual(testFilter.text);
    expect(tags).toBeInTheDocument();
    expect(tags.value).toEqual(testFilter.tagText);
    expect(status).toBeInTheDocument();
    expect(status.value).toEqual(testFilter.status ? "1" : "0");
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("should render with no initial value", () => {
    const component = render(<TaskFilterForm onFilter={() => {}} filter={{}} />);
    expect(component.container).toBeInTheDocument();

    const dateFrom = screen.getByText("From date:").nextSibling as HTMLInputElement;
    const dateTo = screen.getByText("To date:").nextSibling as HTMLInputElement;
    const search = screen.getByPlaceholderText("Search") as HTMLInputElement;
    const tags = screen.getByPlaceholderText("Tags") as HTMLInputElement;
    const status = screen.getByRole("combobox") as HTMLSelectElement;
    expect(dateFrom.value).toBe("");
    expect(dateTo.value).toBe("");

    expect(search.value).toBe("");
    expect(tags.value).toBe("");
    expect(status.value).toBe("");
  });

  it("should submit filter", async () => {
    const mockFn = jest.fn();
    render(<TaskFilterForm onFilter={mockFn} filter={{}} />);

    const filter = screen.getByRole("button", { name: "Filter" });

    const dateFrom = screen.getByText("From date:").nextSibling as HTMLInputElement;
    const dateTo = screen.getByText("To date:").nextSibling as HTMLInputElement;
    const search = screen.getByPlaceholderText("Search") as HTMLInputElement;
    const tags = screen.getByPlaceholderText("Tags") as HTMLInputElement;
    const status = screen.getByRole("combobox") as HTMLSelectElement;

    dateFrom.value = dateToInputValue(testFilter.dateFrom);
    dateTo.value = dateToInputValue(testFilter.dateTo);
    search.value = testFilter.text;
    tags.value = testFilter.tagText;
    status.value = testFilter.status ? "1" : "0";

    await filter.click();
    expect(mockFn).toHaveBeenCalledWith(testFilter);
  });

  it("should clear form", async () => {
    const mockFn = jest.fn();
    render(<TaskFilterForm onFilter={mockFn} filter={{}} />);

    const clearBtn = screen.getByText("Clear");
    const dateFrom = screen.getByText("From date:").nextSibling as HTMLInputElement;
    const dateTo = screen.getByText("To date:").nextSibling as HTMLInputElement;
    const search = screen.getByPlaceholderText("Search") as HTMLInputElement;
    const tags = screen.getByPlaceholderText("Tags") as HTMLInputElement;
    const status = screen.getByRole("combobox") as HTMLSelectElement;

    dateFrom.value = dateToInputValue(testFilter.dateFrom);
    dateTo.value = dateToInputValue(testFilter.dateTo);
    search.value = testFilter.text;
    tags.value = testFilter.tagText;
    status.value = testFilter.status ? "1" : "0";

    await clearBtn.click();
    expect(mockFn).toHaveBeenCalledWith({});
    expect(dateFrom.value).toBe("");
    expect(dateTo.value).toBe("");

    expect(search.value).toBe("");
    expect(tags.value).toBe("");
    expect(status.value).toBe("");
  });
});
