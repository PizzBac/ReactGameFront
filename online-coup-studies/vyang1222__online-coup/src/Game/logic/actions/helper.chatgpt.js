// initializer 모듈에서 shuffle 함수를 import 합니다.
import { shuffle } from "../initializer";

// 한 줄로 turnLog를 업데이트하는 함수입니다.
const logTurn = (turnLog, action, player, successful, target, blockedBy, challenge, responses, exchange) => {
  // turnLog 객체의 각 속성들을 입력값으로 업데이트합니다.
  turnLog.action = action;
  turnLog.player = player;
  turnLog.successful = successful;
  turnLog.target = target;
  turnLog.blockedBy = blockedBy;
  turnLog.challenge = challenge;
  turnLog.responses = responses;
  turnLog.exchange = exchange;
};

// 통계 정보를 업데이트하는 함수입니다.
const logStats = (turnLog, statistics) => {
  // 행동(action)이 존재하는 통계 정보 배열(statistics)에서 해당 행동의 인덱스를 찾습니다.
  let i = 0;
  while (i < statistics.length && statistics[i][0] !== turnLog.action) {
    i++;
  }
  let row = statistics[i];
  if (turnLog.successful) {
    // 해당 행동이 성공했다면, 성공횟수(successes)를 1 증가시킵니다.
    row[1]++;
  } else {
    // 해당 행동이 실패했다면, 실패횟수(failures)를 1 증가시킵니다.
    row[2]++;
  }
  if (turnLog.blockedBy && Object.keys(turnLog.blockedBy).length !== 0) {
    // 해당 행동이 블록되었다면, 블록횟수(blocks)를 1 증가시킵니다.
    row[3]++;
  }
  if (
    turnLog.challenge &&
    Object.keys(turnLog.challenge).length !== 0 &&
    turnLog.player.id === turnLog.challenge.challenged.id
  ) {
    // 해당 행동이 도전되었다면, 도전횟수(challenges)를 1 증가시킵니다. (단, 캐릭터의 카운터액션에 대한 도전은 제외)
    row[4]++;
  }
};

// 각 플레이어의 턴 내 반응 정보(responses)를 초기화하는 함수입니다.
const resetResponses = (numPlayers) => {
  const responses = [];
  for (let i = 0; i < numPlayers; i++) {
    responses[i] = "";
  }
  return responses;
};

// 플레이어의 카드 상황에 따라 isOut 값을 업데이트하는 함수입니다.
const updateIsOut = (player) => {
  if (player.hand.filter((card) => !card.discarded).length === 0) {
    // 플레이어가 가진 모든 카드가 버려졌다면(isOut), isOut 값을 true로 업데이트합니다.
    player.isOut = true;
  }
};

// 게임에서 생존한 플레이어의 수를 반환하는 함수
const getNumAlivePlayers = (G) => {
return G.players.filter((player) => !player.isOut).length;
};

// 승자를 판별하고 G.winner 객체를 업데이트하는 함수
const checkForWinner = (G) => {
const playersAlive = G.players.filter((player) => !player.isOut);
if (playersAlive.length === 1) {
// 한 명의 플레이어만 생존했다면 게임이 끝남
G.winner.name = playersAlive[0].name;
G.winner.id = playersAlive[0].id;
}
};

// 카드를 덱으로 반환하는 함수 (교환하거나 카드를 버릴 때 사용)
const returnToDeck = (G, cards) => {
cards.forEach((card) => {
G.deck.push(card);
});
shuffle(G.deck);
};

// 턴의 기록을 로깅하고 턴 로그 객체를 업데이트하는 함수
const logTurn = (turnLog, action, target, successful, blockedBy, challenge, response, responseOptions) => {
turnLog.action = action;
turnLog.target = target;
turnLog.successful = successful;
turnLog.blockedBy = blockedBy;
turnLog.challenge = challenge;
turnLog.response = response;
turnLog.responseOptions = responseOptions;
};

// 턴에서 일어난 액션의 결과를 로깅하고 G.statistics 객체를 업데이트하는 함수
const logStats = (turnLog, stats) => {
if (turnLog.action === "income" && turnLog.successful) {
stats.income++;
} else if (turnLog.action === "foreign aid" && turnLog.successful) {
stats.foreignAid++;
} else if (turnLog.action === "coup") {
stats.coups++;
} else if (turnLog.action === "assassinate") {
stats.assassinates++;
} else if (turnLog.action === "exchange") {
stats.exchanges++;
} else if (turnLog.action === "steal") {
stats.steals++;
} else if (turnLog.action === "tax" && turnLog.successful) {
stats.tax++;
}
};

// 턴 로그 객체의 응답 관련 속성들을 초기화하는 함수
const resetResponses = (numPlayers) => {
return { [numPlayers]: [] };
};

export {
logTurn,
logStats,
resetResponses,
updateIsOut,
getNumAlivePlayers,
checkForWinner,
returnToDeck,
};



