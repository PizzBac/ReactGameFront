// 메시지 전송
const message = (G, ctx, id, content) => {
  G.chat.push({ id, content });
  // TODO: 채팅과 게임 상태 데이터를 데이터베이스에 저장 (메모리를 차지하지 않도록 함)
  if (G.chat.length > 35) {
    G.chat.shift();
  }
};

// 플레이어 이름 변경
const changeNames = (G, ctx, playerList) => {
  for (let i = 0; i < playerList.length; i++) {
    G.players[i].name = playerList[i].name;
  }
};

/*---- TODO: 이르게 떠나기 ---- */
// 턴 종료
const endTurn = (G, ctx) => {
  ctx.events.endTurn();
};

// 다시 플레이
const playAgain = (G, ctx, id) => {
  G.gameOver.playAgain.push(id);
};

// 방 나가기
const leave = (G, ctx, id) => {
  const index = G.gameOver.playAgain.indexOf(id);
  if (index > -1) {
    G.gameOver.playAgain.splice(index, 1);
  }
  G.gameOver.left.push(id);
};

// 새로운 방 만들기
const setNewRoom = (G, ctx, roomID) => {
  G.gameOver.newRoomID = roomID;
};

export { message, changeNames, endTurn, playAgain, leave, setNewRoom };
