import {
  startConnecting,
  connectionEstablished,
  receiveAllMessages,
  receiveMessage,
  submitMessage,
  endConnection,
  setReadMessages,
} from "./chatSlice";
import { updateStatus } from "../auth/authSlice";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

const chatMiddleware = (store) => {
  let stompClient;

  return (next) => (action) => {
    const isConnectionEstablished = store.getState().chat.isConnected;
    if (startConnecting.match(action) && !isConnectionEstablished) {
      const connect = () => {
        let sockJS = new SockJS("http://localhost:9090/ws");
        stompClient = Stomp.over(sockJS);
        stompClient.connect(
          {
            username: store.getState().auth.user.username,
            room: store.getState().auth.room,
          },
          onConnected,
          onError
        );
      };

      const onConnected = () => {
        store.dispatch(connectionEstablished());
        if (stompClient?.connected) {
          //get message notifications
          stompClient.subscribe(
            `/user/${store.getState().auth.user.username}/messages/${
              store.getState().auth.room
            }`,
            onMessageReceived
          );

          stompClient.subscribe(
            `/user/${store.getState().auth.user.username}/read_messages/${
              store.getState().auth.room
            }`,
            () => {
              store.dispatch({
                type: `api/invalidateTags`,
                payload: ["Conversation"],
              });
            }
          );

          //get updates on users joining/changing status
          stompClient.subscribe(
            "/get_user_updates/" + store.getState().auth.room,
            onUserUpdate
          );

          stompClient.send(
            `/app/user_update/${store.getState().auth.room}`,
            {},
            JSON.stringify({
              idroom: store.getState().auth.room,
              username: store.getState().auth.user.username,
              status: "ONLINE",
            })
          );
        }
      };

      const onError = (err) => {
        console.log(err);
      };

      connect();

      const onMessageReceived = (data) => {
        store.dispatch({
          type: `api/invalidateTags`,
          payload:
            data.sender === store.getState().auth.user.username
              ? ["Message"]
              : ["Conversation", "Message"],
        });
      };

      const onUserUpdate = (data) => {
        let response = JSON.parse(data.body);
        //invalidates the User tag to refetch the userlist

        if (response.username !== store.getState().auth.user.username) {
          store.dispatch({
            type: `api/invalidateTags`,
            payload: ["User"],
          });
        } else if (response.status === "OFFLINE") {
          stompClient?.disconnect(() => console.log("disconnecting.."), {});
          store.dispatch(endConnection());
        }
      };
    }

    if (setReadMessages.match(action) && stompClient?.connected) {
      stompClient.send(
        "/app/read_messages/" +
          store.getState().auth.user.username +
          "/" +
          store.getState().auth.room,
        {},
        JSON.stringify(action.payload)
      );
    }

    if (endConnection.match(action) && stompClient?.connected) {
      stompClient?.disconnect(() => console.log("disconnecting.."), {});
    }

    if (submitMessage.match(action) && isConnectionEstablished) {
      stompClient.send("/app/message", {}, JSON.stringify(action.payload));
    }
    if (updateStatus.match(action)) {
      stompClient.send(
        `/app/user_update/${store.getState().auth.room}`,
        {},
        JSON.stringify({
          idroom: store.getState().auth.room,
          username: store.getState().auth.user.username,
          status: action.payload.status,
        })
      );
    }

    next(action);
  };
};

export default chatMiddleware;
