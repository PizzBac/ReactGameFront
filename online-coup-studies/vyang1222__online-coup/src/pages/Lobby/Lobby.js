import React from "react";
import "./Lobby.scss";

// Lobby is the parent component. Home and Room are the children components.
const Lobby = (props) => {
  return (
    <div className="lobby-container">
      <div className="game-title">online coup</div>
      {props.children}
      <div className="game-info">
        Based on the original Coup board game by Indie Boards & Cards.
      </div>
    </div>
  );
};

export default Lobby;
