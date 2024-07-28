import { StoreRootState } from "..";

export const authState = (state: StoreRootState) => state.auth;

export const userData = (state: StoreRootState) => state.user;

export const calendarState = (state: StoreRootState) => state.calendar;
