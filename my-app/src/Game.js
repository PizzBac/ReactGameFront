import './css/reset.css';
import './css/Game.css';
import ChatWindows from "./ChatWindows";

function App() {
  return (
    <div className="page">
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

        <div className="player player1">
          <div className="cardSet">
            <p className="playerId"># Player 1</p>
            <img className="card card-p1 cardFirst" src={require('./css/images/contessa.png')} alt="assassin" />
            <img className="card card-p1 cardSecond" src={require('./css/images/duke.png')} alt="duke" />
          </div>
          <div class="coin-set">
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className="player player2">
          <div className="cardSet">
            <p className="playerId"># Player 2</p>
            <img className="card card-p2 cardFirst" src={require('./css/images/assassin.png')} alt="assassin" />
            <img className="card card-p2 cardSecond" src={require('./css/images/contessa.png')} alt="duke" />
          </div>
          <div class="coin-set">
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className="player player3">
          <div className="cardSet">
            <p className="playerId"># Player 3</p>
            <img className="card card-p3 cardFirst" src={require('./css/images/captin.png')} alt="assassin" />
            <img className="card card-p3 cardSecond" src={require('./css/images/back.png')} alt="duke" />
          </div>
          <div class="coin-set">
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className="player player4">
          <div className="cardSet">
            <p className="playerId"># Player 4</p>
            <img className="card card-p4 cardFirst" src={require('./css/images/contessa.png')} alt="assassin" />
            <img className="card card-p4 cardSecond" src={require('./css/images/ambassador.png')} alt="duke" />
          </div>
          <div class="coin-set">
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>5</span>
          </div>
        </div>

        <div className="player player5">
          <div className="cardSet">
            <p className="playerId"># Player 5</p>
            <img className="card card-p5 cardFirst" src={require('./css/images/back.png')} alt="assassin" />
            <img className="card card-p5 cardSecond" src={require('./css/images/duke.png')} alt="duke" />
          </div>
          <div class="coin-set">
            <img className="img coin" src={require("./css/images/coin.png")} alt="coin" />
            <span>3</span>
          </div>
        </div>

        <div className="player player6">
          <div className="cardSet">
            <p className="playerId"># Player 6</p>
            <img className="card card-p6 cardFirst" src={require('./css/images/captin.png')} alt="assassin" />
            <img className="card card-p6 cardSecond" src={require('./css/images/back.png')} alt="duke" />
          </div>
          <div class="coin-set">
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
