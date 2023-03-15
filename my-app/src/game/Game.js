import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../css/reset.css';
import '../css/Game.css';
import { GameToLobby } from '../Navigation';
import Console from './gameBoard/Console';
import Player from './gameBoard/player/Player';
import HintBox from './HintBox';
import ChatWindows from "./chat/ChatWindows";
import Banker from './banker';
// import Turn from './gameMechanism/Turn';
import ScrollToTop from './scrollTop';
import { StompSessionProvider } from 'react-stomp-hooks';

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
    <StompSessionProvider url={'ws://javaspringbootcoupgamebackend-env.eba-2u3en2tr.ap-northeast-2.elasticbeanstalk.com/ws'}
    debug={(str) => {
      console.log(str);
    }}
    >
    <div className="page">
      <div className="gameHeader">
        <div className="lobbyButton">
          <GameToLobby navigate={navigate} loginPlayerId={loginPlayerId} loginPlayerNumber={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} />
        </div>
        <div className="temp-div">
          <button className="tmp-btn start">스타트</button>
          <button className="tmp-btn server">서버로 전송</button>
          <button className="tmp-btn turnButton">턴 바꾸기</button>
          <button className="tmp-btn messageButton">메세지 바꾸기</button>  
        </div>
        <button className="fabicon img"></button>
      </div>
      <Banker/>
      <div className="deck">
        <img className="card card-dummy img"></img>
        <p className="remain-card">남은 카드: 5</p>
      </div>
      <div className="GameBoard">
        <Console />
      </div>
      <div className="timezone">
        시간이 흘러갑니다 ~~~
        {/* <Progress value={5} max={10} /> */}
      </div>
      
      <Player activate={activate} howManyPlayer={howManyPlayer} loginPlayerNumber={loginPlayerNumber} loginPlayerNickname={loginPlayerNickname} />

      <div className="sideSection">
        <HintBox />
        <ChatWindows loginPlayerId={loginPlayerId} loginPlayerNickname={loginPlayerNickname} />
      </div>
    </div >
    </StompSessionProvider>
    </ScrollToTop>
  );
}

export default Game;