import { Card } from "../cards";
import { returnToDeck, updateIsOut } from "./helper";
import { executeAction } from "./main";

/* ---- Intermediary Actions ---- */

// Update turnLog as soon as player selects an action, and prepare as necessary (updating active players, setting up ambassador's drawn cards)
const prepAction = (G, ctx, action) => {
  G.turnLog.action = action; // G.turnLog의 action을 선택한 action으로 갱신
  const { name, id } = G.players[ctx.currentPlayer];
  G.turnLog.player = { name, id }; // G.turnLog의 player를 현재 턴인 플레이어로 갱신
  // blockable actions
  if (action === "foreign aid") { // "foreign aid" action은 blockable action
    ctx.events.setActivePlayers({
      currentPlayer: "idle",
      others: "block", // block 가능한 플레이어를 현재 턴이 아닌 플레이어로 설정
    });
  }
  // (ONLY) challengable actions
  else if (action === "exchange" || action === "tax") { // "exchange"와 "tax" action은 challenge 가능한 action
    ctx.events.setActivePlayers({
      currentPlayer: "idle",
      others: "challenge", // challenge 가능한 플레이어를 현재 턴이 아닌 플레이어로 설정
    });
    // successful exchange를 위해 준비
    // deck의 맨 위 카드부터 뽑아옴
    G.turnLog.exchange.drawnCards = [
      { ...G.deck[G.deck.length - 1], id: 2 },
      { ...G.deck[G.deck.length - 2], id: 3 },
    ];
  }
};

// Character actions: coup, steal, assassinate
const setTarget = (G, ctx, target) => {
  G.turnLog.target = target; // G.turnLog의 target을 선택한 target으로 갱신
  if (G.turnLog.action === "steal" || G.turnLog.action === "assassinate") { // "steal"과 "assassinate" action은 block 또는 challenge 가능한 action
    if (G.turnLog.action === "assassinate") {
      // assassin이 target을 선택한 후, coins을 3 차감시킴
      G.players[ctx.currentPlayer].coins -= 3;
    }
    ctx.events.setActivePlayers({
      // steal과 assassinate은 block 또는 challenge가 가능함
      all: "idle",
      value: {
        [target.id]: "blockOrChallenge", // 선택한 target을 block 또는 challenge 가능한 상태로 설정
      },
    });
  }
};

// Character action: exchange, choose one card at a time
const setHand = (G, ctx, cardID) => {
  const { hand } = G.players[ctx.currentPlayer];
  const { newHand } = G.turnLog.exchange;
  if (!newHand.includes(cardID)) {
    let index = newHand.findIndex((card) => card === ""); // 다음 사용 가능한 카드 (0 또는 1)를 찾음
    newHand[index] = cardID 
  };
    
    // 카드 선택이 끝나면, 플레이어의 핸드를 업데이트합니다.
if (!newHand.includes("")) {
const oldHand = [];
for (let i = 0; i < hand.length; i++) {
const { character, front } = hand[i];
oldHand.push({ character, front });
}
for (let i = 0; i < newHand.length; i++) {
const newCardID = newHand[i];
if (newCardID !== -1) {
// -1은 카드가 폐기되었음을 나타냅니다.
const newCard =
newCardID < 2 // 원래의 핸드 또는 뽑은 두 카드에서 업데이트해야 할 위치를 확인합니다.
? oldHand[newCardID]
: G.turnLog.exchange.drawnCards[newCardID - 2];
hand[i].character = newCard.character;
hand[i].front = newCard.front;
}
}
// 선택하지 않은 카드를 덱에 반환합니다.
let notUsed = [];
for (let i = 0; i <= 1; i++) {
if (!hand[i].discarded) {
notUsed.push(i);
}
}
notUsed.push(2);
notUsed.push(3);
// notUsed는 선택 가능한 모든 카드를 포함합니다. 이제 선택되지 않은 카드만 선택합니다.
let i = notUsed.length;
while (i--) {
if (newHand.includes(notUsed[i])) {
notUsed.splice(i, 1);
}
}
}
  
  // 카드 선택이 끝나면, 플레이어의 핸드를 업데이트합니다.
if (!newHand.includes("")) {
const oldHand = [];
for (let i = 0; i < hand.length; i++) {
const { character, front } = hand[i];
oldHand.push({ character, front });
}
for (let i = 0; i < newHand.length; i++) {
const newCardID = newHand[i];
if (newCardID !== -1) {
// -1은 카드가 폐기되었음을 나타냅니다.
const newCard =
newCardID < 2 // 원래의 핸드 또는 뽑은 두 카드에서 업데이트해야 할 위치를 확인합니다.
? oldHand[newCardID]
: G.turnLog.exchange.drawnCards[newCardID - 2];
hand[i].character = newCard.character;
hand[i].front = newCard.front;
}
}
// 선택하지 않은 카드를 덱에 반환합니다.
let notUsed = [];
for (let i = 0; i <= 1; i++) {
if (!hand[i].discarded) {
notUsed.push(i);
}
}
notUsed.push(2);
notUsed.push(3);
// notUsed는 선택 가능한 모든 카드를 포함합니다. 이제 선택되지 않은 카드만 선택합니다.
let i = notUsed.length;
while (i--) {
if (newHand.includes(notUsed[i])) {
notUsed.splice(i, 1);
}
}
}
  
  
  
  
  
  
  
  
  // 만약 player가 암살 당하면
if (
  G.turnLog.action === "assassinate" &&
  playerID === G.turnLog.target.id &&
  ctx.activePlayers[playerID] === "loseCard"
) {
  // player가 out이 된 경우
  if (G.players[playerID].isOut) {
    ctx.events.endTurn();
  } else {
    // 플레이어가 challenge에 실패하고 힘을 잃게 된 경우, 두번째 암살이 이루어짐
    ctx.events.setActivePlayers({
      all: "idle",
      value: {
        [playerID]: "loseAssassinate",
      },
    });
  }
}
// player가 교환이나 세금을 시도하고, challenge에 실패한 경우 (ambassador 카드를 성공적으로 드러낸 경우)
else if (
  G.turnLog.action === "exchange" &&
  Object.keys(G.turnLog.challenge) !== 0 &&
  !G.turnLog.challenge.successful
) {
  // 새로운 덱으로 redraw (ambassador를 덱으로 다시 반환한 후)
  // 게임 시작시 덱에 최소한 2개의 카드가 있으므로, out of bounds에 대한 가능성이 없음
  G.turnLog.exchange.drawnCards = [    { ...G.deck[G.deck.length - 1], id: 2 },
    { ...G.deck[G.deck.length - 2], id: 3 },
  ];
  executeAction(G, ctx);
  ctx.events.setActivePlayers({
    currentPlayer: "action",
    others: "idle",
  });
}
// player가 coup을 받거나 challenge에 실패한 경우
else if (
  G.turnLog.action === "coup" ||
  ctx.activePlayers[playerID].includes("lose")
) {
  ctx.events.endTurn();
}

// challenge의 승자는 새로운 카드를 뽑음 (정확한 카드를 드러낸 후)
const newCard = G.players[G.turnLog.challenge.challenged.id].hand[G.turnLog.challenge.revealedCard.id];
newCard.character = G.turnLog.challenge.swapCard.character;
newCard.front = G.turnLog.challenge.swapCard.front;
// challenge에 실패한 사람은 카드를 한 장 내려줘야 함
ctx.events.setActivePlayers({
  all: "idle",
  value: {
    [G.turnLog.challenge.challenger.id]: "loseCard",
  },
});
