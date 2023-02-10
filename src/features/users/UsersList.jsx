import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";
import { useGetUsersQuery } from "./usersApiSlice";
import { useGetConversationsQuery } from "../conversation/conversationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../components/User";
import { useMemo } from "react";

const UsersList = () => {
  const room = useSelector(selectCurrentRoom);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(room);
  const {
    data: conversations,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
  } = useGetConversationsQuery(room);

  let content;

  const unreadCount = () => {
    let sum = 0;
    if (isSuccess && isSuccessC) {
      for (const [key, value] of Object.entries(conversations.entities)) {
        sum += value.unreadMessages;
      }
    }

    return sum;
  };

  const unreadMessages = useMemo(unreadCount, [conversations]);

  const navigate = useNavigate();
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess && isSuccessC) {
    content = (
      <section className="users-list">
        <div className="users-list-header">
          <div className="notification-count">{unreadMessages}</div>
          <h1>Contacts</h1>
        </div>

        <ul className="users-list">
          {users.map((user, i) => {
            if (user.username != currentUser.username)
              return (
                <User
                  key={user.id}
                  user={user}
                  conversation={
                    conversations.entities[
                      `${room}_${user.username}_${currentUser.username}`
                    ]
                  }
                />
              );
          })}
        </ul>
      </section>
    );
  }

  return content;
};

export default UsersList;
