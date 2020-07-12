import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setNotifications(oldNotifications => [data, ...oldNotifications]);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <p>
      <div>Notifications:</div>
      {notifications.map((notification) => <div>{notification}</div>)}
    </p>
  );
}

export default App;
