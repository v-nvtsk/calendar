import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Filter, TodoItem, UpdateTodoItem } from "../api/calendar.types";
import { WithId } from "../api/firebase";
import firebase from "../api/firebase/firebase";

export type CalendarState = {
  isLoading: boolean;
  errorState: string;
  items: TodoItem[];
  filteredItems: TodoItem[];
};

const initialState: CalendarState = {
  isLoading: false,
  errorState: "",
  items: [],
  filteredItems: [],
};

export const read = createAsyncThunk("calendar/read", async (filter: Filter, { rejectWithValue }) => {
  try {
    const objResult = await firebase.read("tasks", filter);
    const result = Object.entries(objResult).map(([key, value]) => ({ ...value, id: key }));
    return result
      .sort((a, b) => a.creationDate - b.creationDate)
      .filter((task: TodoItem) => {
        if (filter.text && (!task.taskTitle.includes(filter.text) || !task.description.includes(filter.text)))
          return false;
        if (filter.tagText && !task.tags.includes(filter.tagText)) return false;
        return true;
      });
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const create = createAsyncThunk("calendar/create", async (payload: TodoItem, { rejectWithValue }) => {
  try {
    const id = await firebase.create("tasks", payload);
    if (!id) throw new Error("Task is not created");
    return { ...payload, id };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const update = createAsyncThunk("calendar/update", async (payload: UpdateTodoItem, { rejectWithValue }) => {
  try {
    const result = await firebase.update("tasks", payload);
    if (!result) throw new Error("Can not update task");
    return result as WithId<TodoItem>;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk("calendar/delete", async (id: string, { rejectWithValue }) => {
  try {
    await firebase.delete("tasks", id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(read.pending, (state: CalendarState) => {
        const calendarState = state;
        calendarState.isLoading = true;
        calendarState.errorState = "";
      })
      .addCase(read.fulfilled, (state: CalendarState, action: PayloadAction<TodoItem[] | {}>) => {
        if (Array.isArray(action.payload)) {
          const calendarState = state;
          calendarState.isLoading = false;
          calendarState.items = [...action.payload];
        }
      })
      .addCase(read.rejected, (state: CalendarState, { payload }) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.errorState = payload as string;
      })
      .addCase(create.pending, (state: CalendarState) => {
        const calendarState = state;
        calendarState.isLoading = true;
        calendarState.errorState = "";
      })
      .addCase(create.fulfilled, (state: CalendarState, action: PayloadAction<TodoItem>) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.items.push(action.payload);
      })
      .addCase(create.rejected, (state: CalendarState, { payload }) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.errorState = payload as string;
      })
      .addCase(update.pending, (state: CalendarState) => {
        const calendarState = state;
        calendarState.isLoading = true;
        calendarState.errorState = "";
      })
      .addCase(update.fulfilled, (state: CalendarState, action: PayloadAction<WithId<TodoItem>>) => {
        const calendarState = state;
        calendarState.isLoading = false;
        const index = calendarState.items.findIndex((el: TodoItem) => el.id === action.payload.id);
        calendarState.items[index] = { ...calendarState.items[index], ...action.payload };
      })
      .addCase(update.rejected, (state: CalendarState, { payload }) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.errorState = payload as string;
      })
      .addCase(deleteTask.pending, (state: CalendarState) => {
        const calendarState = state;
        calendarState.isLoading = true;
        calendarState.errorState = "";
      })
      .addCase(deleteTask.fulfilled, (state: CalendarState, action: PayloadAction<string>) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.items = calendarState.items.filter((el: TodoItem) => el.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state: CalendarState, { payload }) => {
        const calendarState = state;
        calendarState.isLoading = false;
        calendarState.errorState = payload as string;
      });
  },
});
