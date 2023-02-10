import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const conversationsAdapter = createEntityAdapter({});

const initialState = conversationsAdapter.getInitialState();

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (room) => `/api/chat/user/conversations/${room}`,
      transformResponse: (responseData) =>
        conversationsAdapter.setAll(initialState, responseData),
      providesTags: ["Conversation"],
    }),
  }),
});

export const { useGetConversationsQuery } = conversationApiSlice;
