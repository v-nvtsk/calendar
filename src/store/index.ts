import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthState, authSlice } from "./authSlice";
import { CalendarState, calendarSlice } from "./calendarSlice";

export type StoreRootState = {
  auth: AuthState;
  calendar: CalendarState;
};

const appReducer = combineReducers({
  auth: authSlice.reducer,
  calendar: calendarSlice.reducer,
});

const reducerProxy = (state: any, action: { type: string; payload: any }) => {
  if (action.type === "logout/LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
