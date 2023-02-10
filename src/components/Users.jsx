import React from "react";
import { SearchBar } from "./SearchBar";
import UsersList from "../features/users/UsersList";

const Users = () => {
  return (
    <section className="users">
      <SearchBar />
      <UsersList />
    </section>
  );
};

export default Users;
