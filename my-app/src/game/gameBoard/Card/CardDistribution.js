// 카드 분배 등의 기능 서버에서 구현해야 함

import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardDistribution(props) {
  const { howManyPlayers, loginPlayerNumber, loginPlayerNickname } = props;

  // 게임 시작 시 자동으로 카드 분배
  const [activate, setActivate] = useState(false);
  useEffect(() => {
    setActivate((prev) => !prev);
  }, []);

  // 카드 이미지 설정
  const cardImages = {
    assassin: {
      front: require("../../../css/images/assassin.png"),
      back: require("../../../css/images/back.png"),
    },
    contessa: {
      front: require("../../../css/images/contessa.png"),
      back: require("../../../css/images/back.png"),
    },
    duke: {
      front: require("../../../css/images/duke.png"),
      back: require("../../../css/images/back.png"),
    },
    ambassador: {
      front: require("../../../css/images/ambassador.png"),
      back: require("../../../css/images/back.png"),
    },
    captain: {
      front: require("../../../css/images/captain.png"),
      back: require("../../../css/images/back.png"),
    },
  };

  // 입장 플레이어 수에 따라서 플레이어 생성
  // 입장 플레이어 닉네임 반영 필요
  const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
    { id: 6, name: 'Player 6' },
  ].splice(0, howManyPlayers);

  players.forEach((player) => {
    if (player.id === loginPlayerNumber) {
      player.name = loginPlayerNickname;
    }
  });

  // 카드 셔플
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const cards = ['assassin', 'assassin', 'assassin', 'contessa', 'contessa', 'contessa', 'duke', 'duke', 'duke', 'ambassador', 'ambassador', 'ambassador', 'captain', 'captain', 'captain'];
  shuffleCards(cards);

  // vyang initializer 참고 필요
  // 카드, 분배
  function distributeCards(players) {
    players.forEach((player) => {
      player.hand = cards.splice(0, 2).map((card) => ({
        type: card,
        image: cardImages[card],
      }));
    });
    return players;
  }

  // for (let i = 0; i < numPlayers; i++) {
  //   players.push({
  //     name: "",
  //     isOut: false,
  //     hand: [
  //       { ...deck.pop(), discarded: false, id: 0 },
  //       { ...deck.pop(), discarded: false, id: 1 },
  //     ],
  //     coins: 2,
  //     id: `${i}`,
  //   });
  // }

  distributeCards(players);

  return (
    <div>
      <Card players={players} activate={activate} loginPlayerNumber={loginPlayerNumber} />
    </div>
  );
}

export default CardDistribution;