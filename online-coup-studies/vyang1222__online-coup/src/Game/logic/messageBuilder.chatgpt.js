
// 이 함수는 게임에서 한 턴이 끝난 후 채팅에 출력할 메시지를 생성하는 함수입니다.
export const getTurnMsg = (turnLog) => {
  // 성공적으로 행동을 수행했는지 여부에 따라 success 변수를 초기화합니다.
  let success = turnLog.successful ? "성공적으로 " : "실패하였습니다. ";
  // 수입을 받는 행동의 경우, success 변수를 초기화하지 않습니다.
  if (turnLog.action === "income") {
    success = "";
  }
  
  let target = "";
  // 대상이 있는 행동인 경우, target 변수를 초기화합니다.
  if (turnLog.action === "coup") {
    target = ` ${turnLog.target.name}에게 ${turnLog.target.character} 카드를 사용하여`;
  } else if (turnLog.action === "assassinate") {
    target = ` ${turnLog.target.name}에게`;
  } else if (turnLog.action === "steal") {
    target = ` ${turnLog.target.name}으로부터 돈을 빼앗아`;
  }

  // 만약 상대방이 행동을 블록했다면 addendum 변수에 해당 내용을 추가합니다.
  let addendum = ".";
  if (turnLog.blockedBy && Object.keys(turnLog.blockedBy).length !== 0) {
    addendum += `\n⚒ ${turnLog.blockedBy.name}님이 ${turnLog.blockedBy.character} 카드를 사용하여 블록했습니다.`;
  }
  // 만약 도전이 있었다면 addendum 변수에 해당 내용을 추가합니다.
  if (turnLog.challenge && Object.keys(turnLog.challenge).length !== 0) {
    const challengeSuccess = turnLog.challenge.successful ? "성공" : "실패";
    addendum += `\n⚔ ${turnLog.challenge.challenger.name}님이 ${turnLog.challenge.challenged.name}님을 도전하여 ${challengeSuccess}했습니다.`;
  }

  // 최종적으로 출력할 메시지를 생성합니다.
  const turnMsg = `${turnLog.player.name}님이 ${success}${turnLog.action}${turnLog.action === "tax" ? "es" : "s"}${target}${addendum}`;

  return turnMsg;
};
