import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startConnecting: (state, action) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state, action) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload.message);
    },
    submitMessage: (state, action) => {
      return;
    },
  },
});

export const {
  startConnecting,
  connectionEstablished,
  receiveAllMessages,
  receiveMessage,
  submitMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
export const selectIsConnected = (state) => state.chat.isConnected;
