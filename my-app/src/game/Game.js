import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../css/reset.css';
import '../css/Game.css';
import { GameToLobby } from '../Navigation';
import Console from './gameBoard/Console';
import Player from './gameBoard/player/Player';
import HintBox from './HintBox';
import ChatWindows from "./chat/ChatWindows";
// import Turn from './gameMechanism/Turn';
import ScrollToTop from './scrollTop';

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
    <ScrollToTop>
    <div className="page">
      <div className="gameHeader">
        <div className="lobbyButton">
          <GameToLobby navigate={navigate} loginPlayerId={loginPlayerId} loginPlayerNumber={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} />
        </div>
        <button className="fabicon img"></button>
      </div>
      <div className="banker">게임 방송 메세지</div>
      <div className="GameBoard">
        <Console />
      </div>
      <Player activate={activate} howManyPlayer={howManyPlayer} loginPlayerNumber={loginPlayerNumber} loginPlayerNickname={loginPlayerNickname} />

      <div className="sideSection">
        <HintBox />
        <ChatWindows loginPlayerNickname={loginPlayerNickname} />
      </div>
    </div >
    </ScrollToTop>
  );
}

<div className="hexagon">
        
</div>

export default Game;