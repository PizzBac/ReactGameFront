import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../css/reset.css';
import '../css/Game.css';
import Console from './gameBoard/Console';
import Inner from './gameBoard/Inner';
import CardDistribution from './gameBoard/Card/CardDistribution';
import HintBox from './HintBox';
import ChatWindows from "./chat/ChatWindows";
import ChangeTurn from './ChangeTurn';

function Game() {

  const navigate = useNavigate();
  const location = useLocation(); // 값을 전달 받기 위한 훅
  console.log('state', location.state);
  const { howManyPlayer, loginPlayerId, loginPlayerNum, loginPlayerNickname } = location.state;

  const LobbyBtn = (event) => {
    event.preventDefault();
    navigate('/Lobby', {
      state: {
        loginPlayerId: loginPlayerId,
      },
    });
  }

  // -> CardDistribution.js 연결
  const [howManyPlayers, setHowManyPlayers] = useState(howManyPlayer);

  // 입장한 플레이어 번호에 따라서 본인 카드만 앞면이 보이게 설정
  const [loginPlayerNumber, setLoginPlayerNumber] = useState(loginPlayerNum);

  //   const [playerTurn, setPlayerTurn] = useState(1);
  // // ChangeTurn에서 값을 전달받기 위한 함수
  // function updatePlayerTurn(value) {
  //   setPlayerTurn(value);
  // }

  return (
    <div className="page">
      <button onClick={LobbyBtn}>로비로 이동</button>
      <ChangeTurn loginPlayerNumber={loginPlayerNumber} />

      <div className="GameBoard">
        <Console />
        <Inner />
        <CardDistribution howManyPlayers={howManyPlayers} loginPlayerNumber={loginPlayerNumber} loginPlayerNickname={loginPlayerNickname} />
      </div>

      <div className="sideSection">
        <HintBox />
        <ChatWindows loginPlayerNickname={loginPlayerNickname} />
      </div>
    </div >
  );
}

export default Game;