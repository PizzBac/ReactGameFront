import './css/reset.css';
import './css/Game.css';
import ChatWindows from "./ChatWindows";
import { useState, useEffect } from 'react';
import CardFrontBack from './gameMechanism/CardFrontBack';
import CardDistribution from './gameMechanism/CardDistribution';
import { useNavigate } from "react-router-dom";

function Game() {

  // 버튼을 작동시키기 위한 activate 상태 추가해서 버튼 클릭하면 작동
  // 추후 게임 시작 시 자동으로 카드 분배되도록 변경해야 함
  const [activate, setActivate] = useState(false);
  const navigate = useNavigate(); //로비로 이동시키기는 navigate함수를 사용하기 위해 사용함.

  const handleClick = () => {
    setActivate((prev) => !prev);
  };
  
  const LobbyBtn = (event) => {
    event.preventDefault();
    navigate("/Lobby");
  }

  // 입장 플레이어 수 반영하도록 수정해야 함
  // const [howManyPlayers, setHowManyPlayers] = useState(Math.floor(Math.random() * 6 + 1));
  const [howManyPlayers, setHowManyPlayers] = useState(6);
  console.log("플레이어 숫자 " + howManyPlayers);

  // 플레이어 번호에 따라서 앞뒷면 보이는 게 다르게 할 예정
  // const [playerNumber, setPlayerNumber] = useState(0);
  // const playerNumberCheck = (event) => {
  //   setPlayerNumber(parseInt(event.target.value));
  // }
  // useEffect(() => {
  //   console.log(playerNumber);
  // }, [playerNumber]);

  return (
    <div className="page">
      {/* 게임 메커니즘 작동용 버튼. 나중에 전부 삭제 후 자동으로 돌아가도록 설정해야 함 */}
      <button onClick={handleClick}>Activate</button>
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
        <CardDistribution howManyPlayers={howManyPlayers} activate={activate} />
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
      </div>
    </div >
  );
}

export default Game;