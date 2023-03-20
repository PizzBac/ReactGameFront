import React, { useState, useEffect } from 'react';
import { SaveDeckData } from '../../../gameMechanism/ExchangeServerInfo';

// 카드 이미지 설정
export const cardImages = {
  assassin: {
    front: require("../../../../css/images/assassin.png"),
    back: require("../../../../css/images/back.png"),
  },
  contessa: {
    front: require("../../../../css/images/contessa.png"),
    back: require("../../../../css/images/back.png"),
  },
  duke: {
    front: require("../../../../css/images/duke.png"),
    back: require("../../../../css/images/back.png"),
  },
  ambassador: {
    front: require("../../../../css/images/ambassador.png"),
    back: require("../../../../css/images/back.png"),
  },
  captain: {
    front: require("../../../../css/images/captain.png"),
    back: require("../../../../css/images/back.png"),
  },
};

// Fisher-Yates shuffle
export function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function DistributeCards(players) {

  const deck = ['assassin', 'assassin', 'assassin', 'contessa', 'contessa', 'contessa', 'duke', 'duke', 'duke', 'ambassador', 'ambassador', 'ambassador', 'captain', 'captain', 'captain'];
  shuffleDeck(deck);

  // 카드 분배
  // pop() : 배열에서 마지막 요소를 제거하고 그 값을 반환하는 JavaScript 배열 메서드
  for (let i = 0; i < players.length; i++) {
    players[i].player.hand.push({
      type: deck.pop(),
      image: cardImages[deck[deck.length - 1]],
      isOpen: false,
    });
    players[i].player.hand.push({
      type: deck.pop(),
      image: cardImages[deck[deck.length - 1]],
      isOpen: false,
    });
  }

  SaveDeckData(deck);

  return players;
}

export function Card(props) {
  const { player, activate, loginPlayerNumber } = props;

  return (
    <div>
      {player.hand.map((card, index) => (
        <img
          key={index}
          className={`card card-p${player.id + 1} card${index + 1} ${activate === true ? "active" : ""}`}
          src={
            (player.id + 1 === loginPlayerNumber || player.hand[index].isOpen === true)
              ? card.image.front
              : card.image.back
          }
          alt="card"
        />
      ))}
    </div>
  );
}