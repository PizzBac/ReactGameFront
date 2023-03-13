import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../css/reset.css';
import '../css/Game.css';
import { GameToLobby } from '../Navigation';
import Console from './gameBoard/Console';
import Inner from './gameBoard/Inner';
import Player from './gameBoard/player/Player';
import HintBox from './HintBox';
import ChatWindows from "./chat/ChatWindows";
import Turn from './gameMechanism/Turn';

function Game() {

  const navigate = useNavigate();
  const location = useLocation(); // 값을 전달 받기 위한 훅
  console.log('state', location.state);
  const { howManyPlayer, loginPlayerId, loginPlayerNum, loginPlayerNickname } = location.state;

  // 게임 시작 시 자동으로 카드 분배 애니메이션 작동 스테이트
  // 매번 다시 렌더링되지 않으려면 가장 상위 컴포넌트에 있어야 함
  const [activate, setActivate] = useState(false);
  useEffect(() => {
    setActivate((prev) => !prev);
  }, []);

  // 입장한 플레이어 좌석 번호에 따라서 본인 카드만 앞면이 보이게 설정
  const [loginPlayerNumber, setLoginPlayerNumber] = useState(loginPlayerNum);

  return (
    <div className="page">
      <GameToLobby navigate={navigate} loginPlayerId={loginPlayerId} loginPlayerNumber={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} />

      <div className="GameBoard">
        <Console />
        <Inner />
        <Player activate={activate} howManyPlayer={howManyPlayer} loginPlayerNumber={loginPlayerNumber} loginPlayerNickname={loginPlayerNickname} />
      </div>

      <div className="sideSection">
        <HintBox />
        <ChatWindows loginPlayerId={loginPlayerId} loginPlayerNickname={loginPlayerNickname} />
      </div>
    </div >
  );
}

export default Game;