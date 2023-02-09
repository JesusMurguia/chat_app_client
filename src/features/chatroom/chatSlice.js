import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
  activeContact: null,
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
    updateActiveContact: (state, action) => {
      state.activeContact = action.payload;
    },
    endConnection: (state, action) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
    setReadMessages: (state, action) => {
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
  updateActiveContact,
  endConnection,
  setReadMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
export const selectIsConnected = (state) => state.chat.isConnected;
export const selectActiveContact = (state) => state.chat.activeContact;
