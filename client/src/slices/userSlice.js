import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: {
      email: "",
      displayName: "",
    },
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
