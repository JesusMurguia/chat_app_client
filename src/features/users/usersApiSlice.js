import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (room) => `/api/chat/room/users/${room}`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
