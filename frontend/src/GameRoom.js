import React, { useEffect, useState } from "react";
import socket from "./socket";

const GameRoom = ({ roomId, username }) => {
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join-room", { roomId, username });

    socket.on("room-updated", (data) => {
      setPlayers(data.players);
    });

    socket.on("game-update", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.off("room-updated");
      socket.off("game-update");
    };
  }, [roomId, username]);

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      <h2>Players:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <h2>Game Log:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameRoom;
