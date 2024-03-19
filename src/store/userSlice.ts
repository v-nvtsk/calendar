import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../api/firebase";
import firebase from "../api/firebase/firebase";

export interface UserState {
  isLoading: boolean;
  errorState: string;
  user: UserData | null;
}

const initialState: UserState = {
  isLoading: false,
  errorState: "",
  user: null,
};

export const getData = createAsyncThunk("user/getData", async (_, { rejectWithValue }) => {
  try {
    const result = await firebase.getUserData();
    if (!result) throw new Error("Could not get user data");
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state: UserState) => {
        const userState = state;
        userState.isLoading = true;
        return userState;
      })
      .addCase(getData.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
        const userState = state;
        userState.user = action.payload;
        userState.isLoading = false;
        userState.errorState = "";
        return userState;
      })
      .addCase(getData.rejected, (state: UserState, { payload }) => {
        const userState = state;
        userState.isLoading = false;
        userState.errorState = payload as string;
        return userState;
      });
  },
});
