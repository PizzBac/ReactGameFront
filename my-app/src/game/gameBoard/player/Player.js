import { DistributeCards, Card } from './card/Card';
import Coin from './coin/Coin';
import Turn from '../../gameMechanism/Turn';

function Player(props) {
  const { activate, howManyPlayer, loginPlayerNumber, loginPlayerNickname } = props;

  function CreatePlayers() {
    const players = [];
    for (let i = 0; i < howManyPlayer; i++) {
      let nickName = `플레이어 ${i + 1}의 닉네임`;
      if (i + 1 === loginPlayerNumber) {
        nickName = loginPlayerNickname;
      }
      players.push({
        table: "룸에서 입장할 때 전달받아야 하는 값",
        player: {
          id: i + 1,
          nickName,
          hand: [],
          coins: 2,
          isLogin: false,
          myTurn: false,
          actionType: "대기",
          isDoubt: false,
          doubtButtonPressedTime: Infinity,
          isObstructing: false,
          obstructButtonPressedTime: Infinity,
          isBluffing: false,
          isOut: false,
        }
      });
    }
    return players;
  }
  
  // 값 저장
  function savePlayersData(players, turn, action, obstructingPlayer) {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('turn', turn.toString());
    localStorage.setItem('action', action);
    localStorage.setItem('obstructingPlayer', obstructingPlayer);
  }

  // 값을 불러오는 함수
  function loadPlayersData() {
    const players = localStorage.getItem('players');
    return players ? JSON.parse(players) : null;
  }

  let players = loadPlayersData();
  if (!players) {
    players = CreatePlayers();
    players = DistributeCards(players);
    const turn = 0;
    const action = null;
    const obstructingPlayer = null;
    savePlayersData(players, turn, action, obstructingPlayer);
    players = loadPlayersData();
  }

  return (
    <div>
      {players.map((player) => (
        <div key={player.player.id} className={`player player${player.player.id} ${activate === true ? "active" : ""}`}>
          <div className={`cardSet ${activate === true ? "active" : ""}`}>
            <p className={`card-p${player.player.id} playerId ${activate === true ? "active" : ""}`}># {player.player.nickName}</p>
            <Card player={player.player} activate={activate} loginPlayerNumber={loginPlayerNumber} />
          </div>
          <Coin player={player.player} activate={activate} />
        </div>
      ))}
      <Turn howManyPlayer={players.length} />
    </div>
  )
}

export default Player;