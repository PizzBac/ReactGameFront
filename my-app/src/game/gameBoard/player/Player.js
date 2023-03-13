import { DistributeCards, Card } from './card/Card';
import Coin from './coin/Coin';

function Player(props) {
  const { activate, howManyPlayer, loginPlayerNumber, loginPlayerNickname } = props;

  function CreatePlayers() {
    const players = [];
    for (let i = 0; i < howManyPlayer; i++) {
      let name = `플레이어 ${i + 1}의 닉네임`;
      if (i + 1 === loginPlayerNumber) {
        name = loginPlayerNickname;
      }
      players.push({
        table: "룸에서 입장할 때 전달받아야 하는 값",
        player: {
          id: i + 1,
          name,
          hand: [],
          coins: 2,
          myTurn: false,
          isDoubt: false,
          isObstructed: false,
          isOut: false,
        }
      });
    }
    return players;
  }
  
  // 값 저장
  function savePlayersData(players) {
    localStorage.setItem('players', JSON.stringify(players));
  }

  // 값을 불러오는 함수
  function loadPlayersData() {
    const players = localStorage.getItem('players');
    return players ? JSON.parse(players) : null;
  }

  let players = loadPlayersData();
  if (!players) {
    players = CreatePlayers();
    DistributeCards(players);
  }

  console.log("Player.js - 플레이어 정보");
  console.log(players);

  savePlayersData(players);

  return (
    <div>
      <Turn players={players} howManyPlayer={players.length} />
      {players.map((player) => (
        <div key={player.player.id} className={`player player${player.player.id} ${activate === true ? "active" : ""}`}>
          <div className={`cardSet ${activate === true ? "active" : ""}`}>
            <p className={`card-p${player.player.id} playerId ${activate === true ? "active" : ""}`}># {player.player.name}</p>
            <Card player={player.player} activate={activate} loginPlayerNumber={loginPlayerNumber} />
          </div>
          <Coin player={player.player} activate={activate} />
        </div>
      ))}
    </div>
  )
}

export default Player;