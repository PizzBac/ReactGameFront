import { DistributeCards, Card } from './card/Card';
import Coin from './coin/Coin';
import Turn from '../../gameMechanism/Turn';
import { LoadPlayersData } from '../../gameMechanism/ExchangeServerInfo';
import { useEffect, useState } from 'react';

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
          id: i,
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
  function savePlayersData(players, turn, action, obstructingPlayer, doubtingPlayer) {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('turn', turn.toString());
    localStorage.setItem('action', action);
    localStorage.setItem('obstructingPlayer', obstructingPlayer);
    localStorage.setItem('doubtingPlayer', doubtingPlayer);
  }

  let players = LoadPlayersData();

  if (!players) {
    players = CreatePlayers();
    players = DistributeCards(players);
    const turn = 0;
    const action = null;
    const obstructingPlayer = null;
    const doubtingPlayer = null;
    savePlayersData(players, turn, action, obstructingPlayer, doubtingPlayer);
    players = LoadPlayersData();
  }

  useEffect(() => {
    players = LoadPlayersData();

    return () => {
      // cleanup function
      // 이전에 등록된 useEffect의 부수 효과를 정리
    };
  });

  return (
    <>
      {players ? (
        players.map((player) => (
          <div key={player.player.id + 1} className={`player player${player.player.id + 1} ${activate === true ? "active" : ""}`}>
            <div className={`cardSet ${activate === true ? "active" : ""}`}>
              <p className={`card-p${player.player.id + 1} playerId ${activate === true ? "active" : ""}`}># {player.player.nickName}</p>
              <Card player={player.player} activate={activate} loginPlayerNumber={loginPlayerNumber} />
            </div>
            <Coin player={player.player} activate={activate} />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      {players ? (
        <Turn howManyPlayer={players.length} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Player;