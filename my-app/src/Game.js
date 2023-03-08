import './css/reset.css';
import './css/Game.css';
import ChatWindows from "./ChatWindows";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CardDistribution from './gameMechanism/CardDistribution';

function Game() {

  // 게임 시작 시 자동으로 카드 분배
  const [activate, setActivate] = useState(false);
  useEffect(() => {
    setActivate((prev) => !prev);
    console.log("카드 분배");
  }, []);

  const navigate = useNavigate(); //로비로 이동시키기는 navigate함수를 사용하기 위해 사용함.
  const LobbyBtn = (event) => {
    event.preventDefault();
    navigate("/Lobby");
  }

  // 입장 플레이어 수 반영하도록 수정해야 함
  // -> CardDistribution.js 연결
  // const [howManyPlayers, setHowManyPlayers] = useState(Math.floor(Math.random() * 6 + 1));
  const [howManyPlayers, setHowManyPlayers] = useState(6);

  // 입장한 플레이어 번호에 따라서 앞뒷면 보이는 게 다르게 할 예정
  const [loginPlayerNumber, setLoginPlayerNumber] = useState(1);
  const LoginPlayerNumberCheck = (event) => {
    // setLoginPlayerNumber();
  }

  return (
    <div className="page">
      <button onClick={LobbyBtn}>로비로 이동</button>

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
        <CardDistribution howManyPlayers={howManyPlayers} activate={activate} loginPlayerNumber={loginPlayerNumber}/>
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
        <ChatWindows />
      </div>
    </div >
  );
}

export default Game;