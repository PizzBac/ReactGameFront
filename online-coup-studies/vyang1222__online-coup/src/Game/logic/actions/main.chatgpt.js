// 플레이어가 수입 행동을 취할 때 사용되는 함수
const income = (G, ctx) => {
G.players[ctx.currentPlayer].coins++; // 플레이어의 코인 수 증가

const { name, id } = G.players[ctx.currentPlayer];
logTurn(G.turnLog, "income", { name, id }, true); // 로그 업데이트
ctx.events.endTurn(); // 턴 종료
};

// 플레이어가 쿠우 행동을 취할 때 사용되는 함수
const coup = (G, ctx, targetCharacter) => {
G.turnLog.target.character = targetCharacter; // 쿠우 대상 캐릭터 업데이트
G.players[ctx.currentPlayer].coins -= 7; // 쿠우를 위한 7코인 감소
// 타겟 플레이어의 손에 쿠우 대상 캐릭터 카드가 있는지 확인
let indexes = [];
const hand = G.players[G.turnLog.target.id].hand;
for (let i = 0; i < hand.length; i++) {
const card = hand[i];
if (!card.discarded && card.character === targetCharacter) {
indexes.push(i);
}
}
const hasCard = indexes.length > 0; // 카드가 있으면 true
G.turnLog.successful = hasCard; // 쿠우가 성공적으로 수행되었는지 나타내는 값 업데이트
if (hasCard) {
// 대상 플레이어가 쿠우 대상 캐릭터 카드를 중복으로 가지고 있으면, 무작위로 하나를 선택하여 버림
const index = indexes.length === 2 ? Math.round(Math.random()) : indexes[0];
loseCardAndShuffle(G, ctx, G.turnLog.target.id, index); // 카드를 버리고 셔플
}
ctx.events.endTurn(); // 턴 종료
};

// 게임 내 행동이 수행될 때 사용되는 함수
const executeAction = (G, ctx) => {
if (G.turnLog.action === "foreign aid") {
G.players[ctx.currentPlayer].coins += 2; // 코인 수 증가
if (Object.keys(G.turnLog.blockedBy).length !== 0) {
ctx.events.endTurn(); // 이전에 블락이 있었으면 턴 종료
}
} else if (G.turnLog.action === "tax") {
G.players[ctx.currentPlayer].coins += 3; // 코인 수 증가
} else if (G.turnLog.action === "exchange") {
G.turnLog.exchange.newHand = getNewHand(G.players[ctx.currentPlayer].hand); // 새로운 빈 손을 준비
// 이미 drawnCards가 설정되어 있으므로, 간단히 뽑기만 하면 됨
G.deck.pop();
G.deck.pop();
} // 수갑 카드를 사용한 경우, 대상 플레이어가 이미 패배한 경우 해당 턴 종료
// 그렇지 않은 경우, 대상 플레이어는 자신의 수갑 카드를 버리도록 한다.
else if (G.turnLog.action === "assassinate") {
if (G.players[G.turnLog.target.id].isOut) {
ctx.events.endTurn();
} else {
ctx.events.setActivePlayers({
all: "idle",
value: {
[G.turnLog.target.id]: "loseAssassinate",
},
});
}
}

// 훔치기 카드를 사용한 경우, 대상 플레이어의 동전 수에 따라 해당 턴 내에 두 개의 동전을 훔치거나 가능한 한 많은 동전을 훔친다.
else if (G.turnLog.action === "steal") {
if (G.players[G.turnLog.target.id].coins < 2) {
// 동전을 0개 또는 1개 훔치는 것도 가능하며, 플레이어의 최소 동전 수는 0개이다.
G.players[ctx.currentPlayer].coins += G.players[G.turnLog.target.id].coins;
G.players[G.turnLog.target.id].coins = 0;
} else {
G.players[ctx.currentPlayer].coins += 2;
G.players[G.turnLog.target.id].coins -= 2;
}
}
};

// can "allow" for foreign aid and any character action
const allow = (G, ctx, playerID) => {
const oneOnOneActions = ["assassinate", "steal"]; // only the targeted player can respond

// 해당 playerID가 행동을 허용한 것으로 저장
G.turnLog.responses[playerID] = "allow";

if (ctx.currentPlayer === playerID) {
// 만약 다른 플레이어가 당신의 행동을 막았지만, 당신이 그 막음을 허용한다면 (그래서 당신의 행동은 실패), 턴 종료
ctx.events.endTurn();
} else if (oneOnOneActions.includes(G.turnLog.action)) {
// 타겟 플레이어가 당신의 행동을 허용한 경우
G.turnLog.successful = true;
executeAction(G, ctx);
if (G.turnLog.action === "steal") {
ctx.events.endTurn();
}
} else if (
// foreign aid인 경우, 모든 플레이어가 허용을 한 경우 행동을 성공으로 처리하고, 곧바로 다음 단계로 이동
G.turnLog.responses.filter((response) => response === "allow").length ===
getNumAlivePlayers(G) - 1
) {
G.turnLog.successful = true;
executeAction(G, ctx);
// foreign aid, tax와 같이 즉시 적용되는 행동인 경우, 턴 종료, 아닌 경우 다음 단계로 이동
const immediateActions = ["foreign aid", "tax"];
if (immediateActions.includes(G.turnLog.action)) {
ctx.events.endTurn();
} else {
ctx.events.setActivePlayers({
currentPlayer: "action",
others: "idle",
});
}
}
};

// can "block" for foreign aid, assassinate and steal
const block = (G, ctx, playerID, character) => {
  G.turnLog.responses[playerID] = "block";
  if (Object.keys(G.turnLog.blockedBy).length === 0) {
    G.turnLog.blockedBy = { name: G.players[playerID].name, id: playerID };
  }

  if (G.turnLog.action === "steal") {
    // steal 액션에 대한 block 처리
    if (!G.turnLog.blockedBy.hasOwnProperty("character")) {
      G.turnLog.blockedBy.character = "";
    } else {
      G.turnLog.blockedBy.character = character;
      // steal 액션이 block되면 challenge로 이동
      ctx.events.setActivePlayers({
        currentPlayer: "challenge",
        others: "idle",
      });
    }
  } else {
    if (G.turnLog.action === "assassinate") {
      // assassinate 액션에 대한 block 처리
      G.turnLog.blockedBy.character = "Contessa";
    } else {
      // foreign aid 액션에 대한 block 처리
      G.turnLog.blockedBy.character = "Duke";
    }
    // block된 액션에 대한 challenge로 이동
    ctx.events.setActivePlayers({
      currentPlayer: "challenge",
      others: "idle",
    });
  }
};

const initiateChallenge = (G, ctx, playerID) => {
  G.turnLog.responses[playerID] = "challenge";
  const isBlocked = Object.keys(G.turnLog.blockedBy).length !== 0;
  const challengedID = isBlocked ? G.turnLog.blockedBy.id : ctx.currentPlayer;
  G.turnLog.challenge = {
    challenger: { name: G.players[playerID].name, id: playerID },
    challenged: { name: G.players[challengedID].name, id: challengedID },
    characters: getChallengeCharacters(G, isBlocked),
    successful: false,
    loser: {},
    revealedCard: {},
    swapCard: {},
  };

  // challenge 당하는 플레이어에게 카드 공개를 위한 revealCard 액션 부여
  ctx.events.setActivePlayers({
    all: "idle",
    value: {
      [challengedID]: "revealCard",
    },
  });
};

// 수입
const income = (G, ctx) => {
G.players[ctx.currentPlayer].coins += 1;
ctx.events.endTurn();
};

// 쿠우
const coup = (G, ctx, targetID) => {
if (G.players[ctx.currentPlayer].coins >= 7 && G.players[targetID].isOut === false) {
G.players[ctx.currentPlayer].coins -= 7;
G.players[targetID].isOut = true;
ctx.events.endTurn();
} else {
return INVALID_MOVE;
}
};

// 행동 실행
const executeAction = (G, ctx) => {
if (G.turnLog.action === "income") {
G.players[ctx.currentPlayer].coins += 1;
ctx.events.endTurn();
} else if (G.turnLog.action === "foreign aid") {
G.players[ctx.currentPlayer].coins += 2;
ctx.events.setActivePlayers({
currentPlayer: "action",
others: "block",
});
} else if (G.turnLog.action === "coup") {
coup(G, ctx, G.turnLog.target.id);
} else if (G.turnLog.action === "tax") {
G.players[ctx.currentPlayer].coins += 3;
ctx.events.endTurn();
} else if (G.turnLog.action === "exchange") {
G.players[ctx.currentPlayer].hand = G.deck.slice(0, 2);
G.deck = G.deck.slice(2, G.deck.length).concat(G.players[ctx.currentPlayer].hand.filter((card) => !card.discarded));
G.players[ctx.currentPlayer].hand = getNewHand(G.players[ctx.currentPlayer].hand);
ctx.events.setActivePlayers({
currentPlayer: "exchange",
others: "waiting",
});
} else if (G.turnLog.action === "assassinate") {
G.players[ctx.currentPlayer].coins -= 3;
ctx.events.setActivePlayers({
currentPlayer: "action",
others: "block",
});
} else if (G.turnLog.action === "steal") {
G.players[ctx.currentPlayer].coins += 2;
ctx.events.setActivePlayers({
currentPlayer: "action",
others: "block",
});
}
};

// 외부 차단은 외교와 살해, 도둑질에서 가능합니다.
const block = (G, ctx, playerID, character) => {
G.turnLog.responses[playerID] = "block";
if (Object.keys(G.turnLog.blockedBy).length === 0) {
G.turnLog.blockedBy = { name: G.players[playerID].name, id: playerID };
}

if (G.turnLog.action === "steal") {
if (!G.turnLog.blockedBy.hasOwnProperty("character")) {
G.turnLog.blockedBy.character = "";
} else {
G.turnLog.blockedBy.character = character;
ctx.events.setActivePlayers({
currentPlayer: "challenge",
others: "idle",
});
}
} else {
if (G.turnLog.action === "assassinate") {
G.turnLog.blockedBy.character = "Contessa";
} else {
// action === foreign aid
G.turnLog.blockedBy.character = "Duke";
}
ctx.events.setActivePlayers({
currentPlayer: "challenge",
others: "idle",
});
}
};

// 도전을 시작합니다.
const initiateChallenge = (G, ctx, playerID) => {
G.turnLog.responses[playerID



