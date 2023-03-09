import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './css/reset.css';
import './css/Game.css';
import ChatWindows from "./ChatWindows";
import CardDistribution from './gameMechanism/CardDistribution';
import ChangeTurn from './gameMechanism/ChangeTurn';

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
        <div className="console">
          <div class="color1"></div>
          <div class="color2"></div>
          <div class="color3"></div>
          <div class="color4"></div>
          <div class="color5"></div>
          <div class="color6">
            <div class="timer"><span>00:00</span></div>
          </div>
        </div>
        <div class="inner">
          <div class="action1"><span>쿠</span></div>
          <div class="action2"><span>원조</span></div>
          <div class="action3"><span>소득</span></div>
        </div>
        <CardDistribution howManyPlayers={howManyPlayers} loginPlayerNumber={loginPlayerNumber} loginPlayerNickname={loginPlayerNickname} />
      </div>

      <div className="sideSection">
        <div className="img hintBox">
          <span className="hintTitle">게임 힌트</span>
          <div className="hintTextBox">
            <p className="hintText">사령관 카드 능력으로 상대방 코인 2개를 가져올 수 있습니다.</p>
            <p className="hintText">외교관 카드 능력으로 상대방이 코인 2개를 강탈 하는 것을 막을 수 있습니다.</p>
            <p className="hintText">은행에서 코인 1개를 가져올 수 있습니다.</p>
          </div>
        </div>
        <ChatWindows loginPlayerNickname={loginPlayerNickname}/>
      </div>
    </div >
  );
}

export default Game;