// 카드 분배 등의 기능 서버에서 구현해야 함

import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardDistribution(props) {
  const { activate, howManyPlayer, loginPlayerNumber, loginPlayerNickname } = props;

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

  // Fisher-Yates shuffle
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const cards = ['assassin', 'assassin', 'assassin', 'contessa', 'contessa', 'contessa', 'duke', 'duke', 'duke', 'ambassador', 'ambassador', 'ambassador', 'captain', 'captain', 'captain'];
  shuffleCards(cards);

  // 입장 플레이어 수에 따라서 플레이어 생성
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

  // 카드 분배
  // pop() : 배열에서 마지막 요소를 제거하고 그 값을 반환하는 JavaScript 배열 메서드
  function distributeCards(players) {
    for (let i = 0; i < players.length; i++) {
      players[i].hand.push({
        type: cards.pop(),
        image: cardImages[cards[cards.length - 1]],
      });
      players[i].hand.push({
        type: cards.pop(),
        image: cardImages[cards[cards.length - 1]],
      });
    }
  }

  distributeCards(players);

  return (
    <div>
      <Card players={players} activate={activate} loginPlayerNumber={loginPlayerNumber} />
    </div>
  );
}

export default CardDistribution;