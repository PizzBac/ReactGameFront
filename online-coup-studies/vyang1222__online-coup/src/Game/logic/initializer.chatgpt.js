
import { cards } from "./cards"; // 카드 정보를 불러옴

export const initializeGame = (numPlayers) => { // 게임 초기화 함수
  const deck = []; // 카드 덱 배열
  const players = []; // 플레이어 배열
  let numDuplicates = numPlayers <= 6 ? 3 : 4; // 플레이어 수에 따라 카드 중복 개수 조절

  // 카드 덱 배열 생성
  cards.forEach((card) => {
    for (let i = 0; i < numDuplicates; i++) {
      deck.push(card);
    }
  });

  shuffle(deck); // 덱 셔플

  // 플레이어 배열 생성
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      name: "", // 플레이어 이름
      isOut: false, // 게임에서 탈락했는지 여부
      hand: [
        { ...deck.pop(), discarded: false, id: 0 },
        { ...deck.pop(), discarded: false, id: 1 },
      ], // 플레이어가 소유한 카드
      coins: 2, // 플레이어가 보유한 코인 개수
      id: `${i}`, // 플레이어 고유 ID
    });
  }

  return { deck, players }; // 덱과 플레이어 배열 반환
};

export const getPlayOrder = (numPlayers) => {
  const playOrder = Array(numPlayers)
    .fill()
    .map((_, i) => "" + i);
  shuffle(playOrder); // 플레이어 순서 셔플
  return playOrder;
};

export const shuffle = (arr) => { // 배열을 셔플하는 함수
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
