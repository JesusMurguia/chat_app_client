import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";
import { useGetUsersQuery } from "./usersApiSlice";
import { useSelector } from "react-redux";

const UsersList = () => {
  const room = useSelector(selectCurrentRoom);
  const currentUser = useSelector(selectCurrentUser);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(room);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section>
        <h1>Users List</h1>
        <ul>
          {users.map((user, i) => {
            if (user.username != currentUser)
              return (
                <li key={user.id}>
                  {user.username} {user.status}
                </li>
              );
          })}
        </ul>
      </section>
    );
  }

  return content;
};

export default UsersList;
