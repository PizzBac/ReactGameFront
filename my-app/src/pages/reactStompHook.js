import React, { useState } from 'react';
import { useSubscription, useStompClient } from 'react-stomp-hooks';
import { StompSessionProvider } from 'react-stomp-hooks';

function App({ subscription, destination, headers, body }) {
  const stompClient = useStompClient();
  const [receivedMessage, setReceivedMessage] = useState("");
  
  useSubscription(subscription, (str) => {
    console.log(str.body);
    // const object = JSON.parse(str.body);
    setReceivedMessage(str.body);
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (stompClient) {
      stompClient.publish({
        destination,
        headers,
        body,
      });
    } else {
      console.log("stompClient is null");
    } // 통신이 안되면.
  }

  return (
    <div>
    <button onClick={handleSubmit}>서버로 메세지 보내기(통신)</button>
    <p>Received message: {receivedMessage}</p>
    </div>
  );
}

function MyApp() {
  const subscription = "/user/lobby";
  const destination = "/app/game";
  const headers = {"lobbyName": "RoomTest"};
  const body = "Income";

  return (
    <StompSessionProvider url="ws://javaspringbootcoupgamebackend-env.eba-2u3en2tr.ap-northeast-2.elasticbeanstalk.com/ws">
      <App subscription={subscription} destination={destination} headers={headers} body={body} />
    </StompSessionProvider>
  );
}

export default MyApp;
