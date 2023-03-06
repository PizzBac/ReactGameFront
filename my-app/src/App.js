import './App.css';
import './reset.css';
import ChatWindows from "./chatWindows";

function App() {
  return (
    
    <div className="page">




      <div className="GameBoard">
        <div className="console">
            
        </div>


        <div className="player player1">
            <div className="cardSet">
              <p className="playerId"># Player 1</p>
              <img className="card cardFirst" src={ require('./images/assassin.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/duke.png') } alt="duke" />
            </div>
        </div>

        <div className="player player2">
            <div className="cardSet">
              <p className="playerId"># Player 2</p>
              <img className="card cardFirst" src={ require('./images/assassin.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/contessa.png') } alt="duke" />
            </div>
        </div>

        <div className="player player3">
            <div className="cardSet">
              <p className="playerId"># Player 3</p>
              <img className="card cardFirst" src={ require('./images/captin.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/contessa.png') } alt="duke" />
            </div>
        </div>

        <div className="player player4">
            <div className="cardSet">
              <p className="playerId"># Player 4</p>
              <img className="card cardFirst" src={ require('./images/contessa.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/contessa.png') } alt="duke" />
            </div>
        </div>

        <div className="player player5">
            <div className="cardSet">
              <p className="playerId"># Player 5</p>
              <img className="card cardFirst" src={ require('./images/assassin.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/duke.png') } alt="duke" />
            </div>
        </div>

        <div className="player player6">
            <div className="cardSet">
              <p className="playerId"># Player 6</p>
              <img className="card cardFirst" src={ require('./images/captin.png') } alt="assassin" />
              <img className="card cardSecond" src={ require('./images/captin.png') } alt="duke" />
            </div>
        </div>



      </div>

      <div className="sideSection">
        <div className="img hintBox">
          <span className="hintTitle">게임 힌트</span>
        </div>
        <ChatWindows />
      </div>




    </div>
  );
}

export default App;
