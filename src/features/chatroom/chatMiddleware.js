import {
  startConnecting,
  connectionEstablished,
  receiveAllMessages,
  receiveMessage,
  submitMessage,
} from "./chatSlice";
import { updateStatus } from "../auth/authSlice";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

const chatMiddleware = (store) => {
  let socket;
  let stompClient;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;
    if (startConnecting.match(action) && !isConnectionEstablished) {
      const connect = () => {
        let sockJS = new SockJS("http://localhost:8080/ws");
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

        //get message notifications
        stompClient.subscribe(
          "/user/" + store.getState().auth.user + "/queue/messages",
          onMessageReceived
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
      };

      const onError = (err) => {
        console.log(err);
        alert(err);
      };

      const onMessageReceived = (data) => {
        console.log(data);
      };

      const onUserUpdate = (data) => {
        let response = JSON.parse(data.body);
        //invalidates the User tag to refetch the userlist
        if (response.username !== store.getState().auth.user)
          store.dispatch({
            type: `api/invalidateTags`,
            payload: ["User"],
          });
      };
      connect();
    }

    if (submitMessage.match(action) && isConnectionEstablished) {
      socket.emit("send_message", action.payload.content);
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
