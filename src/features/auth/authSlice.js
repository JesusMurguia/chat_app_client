import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, room: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, room } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.room = room;
    },
    logOut: (state, action) => {
      state.token = null;
      state.room = null;
      state.user = null;
    },
    updateStatus: (state, action) => {
      state.user.status = action.payload.status;
    },
  },
});

export const { setCredentials, logOut, updateStatus } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentRoom = (state) => state.auth.room;
