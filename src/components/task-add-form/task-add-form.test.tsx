import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../store";
import { TaskAddForm } from "./task-add-form";

describe("Task-Add-Form", () => {
  it("should render the component", async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <TaskAddForm />
        </Provider>,
      ),
    );

    const textboxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    const taskTitle = textboxes.filter((el) => el.name === "taskTitle");
    expect(taskTitle.length).toBe(1);
    expect(taskTitle[0]).toBeInTheDocument();

    const description = textboxes.filter((el) => el.name === "description");
    expect(description.length).toBe(1);
    expect(description[0]).toBeInTheDocument();

    const tags = textboxes.filter((el) => el.name === "tags");
    expect(tags.length).toBe(1);
    expect(tags[0]).toBeInTheDocument();

    const dateInput = screen.getByLabelText(/event date and time:/i) as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();
    expect(dateInput.value).toBe("");

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it.skip("should call the create action when the form is submitted", async () => {
    const mockCreate = jest.fn().mockResolvedValue({});

    const create = createAsyncThunk("calendar/create", async () => {
      mockCreate();
    });

    const mockCalendarSlice = createSlice({
      name: "calendar",
      initialState: {
        items: [],
      },
      reducers: {
        create: mockCreate,
      },
      extraReducers: (builder) => {
        builder.addCase(create.fulfilled, () => {});
      },
    });

    const mockStore = configureStore({
      reducer: {
        calendar: mockCalendarSlice.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    const component = await act(async () =>
      render(
        <Provider store={mockStore}>
          <TaskAddForm />
        </Provider>,
      ),
    );

    const textboxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    const taskTitle = textboxes.filter((el) => el.name === "taskTitle")[0];
    taskTitle.value = "test title";

    const description = textboxes.filter((el) => el.name === "description")[0];
    description.value = "test description";

    const tags = textboxes.filter((el) => el.name === "tags")[0];
    tags.value = "test tags";

    const dateInput = screen.getByLabelText(/event date and time:/i) as HTMLInputElement;
    dateInput.value = "2022-01-01T00:00";

    const form = component.container.querySelector("#task-add-form") as HTMLFormElement;
    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(mockCreate).toHaveBeenCalled();
    const resultState = await act(() => store.getState().calendar.items);
    expect(resultState.length).toBe(1);

    expect(dateInput.value === "").toBe(true);
  });
});
