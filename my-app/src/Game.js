import './css/reset.css';
import './css/Game.css';
import ChatWindows from "./ChatWindows";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function App() {

  
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


  const [playerNumber, setplayerNumber] = useState(0);
  const playerNumberCheck = (event) => {
    // 플레이어 번호에 따라서 앞뒷면 보이는 게 다르게 할 예정
    setplayerNumber(event.target.value);
  }

  useEffect(() => {
    console.log(playerNumber);
  }, [playerNumber]);

  return (
    <div className="page">
      <button onClick={handleClick}>Activate</button>
      <button onClick={LobbyBtn}>로비로 이동</button>
      {/* <button onClick={playerNumberCheck} value="0">manager</button>
      <button onClick={playerNumberCheck} value="1">player1</button>
      <button onClick={playerNumberCheck} value="2">player2</button>
      <button onClick={playerNumberCheck} value="3">player3</button>
      <button onClick={playerNumberCheck} value="4">player4</button>
      <button onClick={playerNumberCheck} value="5">player5</button>
      <button onClick={playerNumberCheck} value="6">player6</button> */}
      {/* <div className="dropdown">
        <button className="dropbtn">Player {playerNumber || "Select"}</button>
        <div className="dropdown-content">
          <button onClick={playerNumberCheck} value="0">Manager</button>
          <button onClick={playerNumberCheck} value="1">Player 1</button>
          <button onClick={playerNumberCheck} value="2">Player 2</button>
          <button onClick={playerNumberCheck} value="3">Player 3</button>
          <button onClick={playerNumberCheck} value="4">Player 4</button>
          <button onClick={playerNumberCheck} value="5">Player 5</button>
          <button onClick={playerNumberCheck} value="6">Player 6</button>
        </div>
      </div> */}

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

        <div className={`player player1 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p1 playerId ${activate ? "active" : ""}`}># Player 1</p>
            <img
              className={`card card-p1 cardFirst ${activate ? "active" : ""}`}
              src={require("./css/images/contessa.png")}
              alt="assassin"
            />
            <img
              className={`card card-p1 cardSecond ${activate ? "active" : ""}`}
              src={require("./css/images/duke.png")}
              alt="duke"
            />
          </div>
          <div className={`coin-set coin-set1 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className={`player player2 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p2 playerId ${activate ? "active" : ""}`}># Player 2</p>
            <img className={`card card-p2 cardFirst ${activate ? "active" : ""}`} src={require('./css/images/assassin.png')} alt="assassin" />
            <img className={`card card-p2 cardSecond ${activate ? "active" : ""}`} src={require('./css/images/contessa.png')} alt="duke" />
          </div>
          <div className={`coin-set coin-set2 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className={`player player3 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p3 playerId ${activate ? "active" : ""}`}># Player 3</p>
            <img className={`card card-p3 cardFirst ${activate ? "active" : ""}`} src={require('./css/images/captin.png')} alt="assassin" />
            <img className={`card card-p3 cardSecond ${activate ? "active" : ""}`} src={require('./css/images/back.png')} alt="duke" />
          </div>
          <div className={`coin-set coin-set3 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className={`player player4 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p4 playerId ${activate ? "active" : ""}`}># Player 4</p>
            <img className={`card card-p4 cardFirst ${activate ? "active" : ""}`} src={require('./css/images/contessa.png')} alt="assassin" />
            <img className={`card card-p4 cardSecond ${activate ? "active" : ""}`} src={require('./css/images/ambassador.png')} alt="duke" />
          </div>
          <div className={`coin-set coin-set4 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className={`player player5 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p5 playerId ${activate ? "active" : ""}`}># Player 5</p>
            <img className={`card card-p5 cardFirst ${activate ? "active" : ""}`} src={require('./css/images/back.png')} alt="assassin" />
            <img className={`card card-p5 cardSecond ${activate ? "active" : ""}`} src={require('./css/images/duke.png')} alt="duke" />
          </div>
          <div className={`coin-set coin-set5 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>3</span>
          </div>
        </div>

        <div className={`player player6 ${activate ? "active" : ""}`}>
          <div className={`cardSet ${activate ? "active" : ""}`}>
            <p className={`card-p6 playerId ${activate ? "active" : ""}`}># Player 6</p>
            <img className={`card card-p6 cardFirst ${activate ? "active" : ""}`} src={require('./css/images/captin.png')} alt="assassin" />
            <img className={`card card-p6 cardSecond ${activate ? "active" : ""}`} src={require('./css/images/back.png')} alt="duke" />
          </div>
          <div className={`coin-set coin-set6 ${activate ? "active" : ""}`}>
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>
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
    </div>
  );
}

export default App;