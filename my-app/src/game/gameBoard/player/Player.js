import { DistributeCards, Card } from './card/Card';
import Coin from './coin/Coin';

function Player(props) {
  const { activate, howManyPlayer, loginPlayerNumber, loginPlayerNickname } = props;

  // 입장 플레이어 수에 따라서 플레이어 생성
  function CreatePlayers() {
    const players = [];
    for (let i = 0; i < howManyPlayer; i++) {
      let name = `Player ${i + 1}`;
      if (i + 1 === loginPlayerNumber) {
        name = loginPlayerNickname;
      }
      players.push({
        id: i + 1,
        name,
        hand: [],
        coins: 2,
        isOut: false,
      });
    }
    return players;
  }

  const players = CreatePlayers();
  DistributeCards(players);
  

  return (
    <div>
      {/* <Turn players={players} howManyPlayer={players.length} /> */}
      {players.map((player) => (
        <div key={player.id} className={`player player${player.id} ${activate === true ? "active" : ""}`}>
          <div className={`cardSet ${activate === true ? "active" : ""}`}>
            <p className={`card-p${player.id} playerId ${activate === true ? "active" : ""}`}># {player.name}</p>
            <Card player={player} activate={activate} loginPlayerNumber={loginPlayerNumber} />
          </div>
          <Coin player={player} activate={activate} />
        </div>
      ))}
    </div>
  )
}

export default Player;