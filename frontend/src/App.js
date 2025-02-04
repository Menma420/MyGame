import React, { useState } from "react";
import GameRoom from "./GameRoom";
import socket from "./socket";

function App() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 6).toUpperCase(); // Generate random room ID
    setRoomId(newRoomId);
    socket.emit("create-room", { roomId: newRoomId, username });
    setJoined(true);
  };

  const joinRoom = () => {
    if (roomId && username) {
      socket.emit("join-room", { roomId, username });
      setJoined(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!joined ? (
        <div>
          <h1>Welcome to the Card Game</h1>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <button onClick={createRoom}>Create Room</button>
          <br /><br />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <GameRoom roomId={roomId} username={username} />
      )}
    </div>
  );
}

export default App;
