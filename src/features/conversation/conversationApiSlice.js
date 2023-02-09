import { apiSlice } from "../../app/api/apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (room) => `/api/chat/user/conversations/${room}`,
      providesTags: ["Conversation"],
    }),
  }),
});

export const { useGetConversationsQuery } = conversationApiSlice;
