import { apiSlice } from "../../app/api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) =>
        `/api/chat/messages/${data.idroom}?receiver=${data.username}`,
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesQuery } = messageApiSlice;
