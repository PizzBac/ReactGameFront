// actions 폴더에서 helper.js, intermediary.js, main.js 파일에서 export한 함수들을 가져온다.
import { logTurn, logStats, resetResponses, checkForWinner } from "./logic/actions/helper";
import {
  prepAction,
  setTarget,
  setHand,
  revealCard,
  loseCardAndShuffle,
  continueTurn,
} from "./logic/actions/intermediary";
import { income, coup, executeAction, allow, block, initiateChallenge } from "./logic/actions/main";
// actions 폴더에서 misc.js 파일에서 export한 함수들을 가져온다.
import { message, changeNames, endTurn, leave, playAgain, setNewRoom } from "./logic/actions/misc";
// initializer.js 파일에서 export한 함수들을 가져온다.
import { initializeGame, getPlayOrder } from "./logic/initializer";
// messageBuilder.js 파일에서 export한 함수들을 가져온다.
import { getTurnMsg } from "./logic/messageBuilder";
// config.js 파일에서 GAME_NAME 변수를 가져온다.
import { GAME_NAME } from "../config";

/* ---- Setup ---- */
// numPlayers를 파라미터로 받아 deck과 players 객체를 반환하는 initializeGame 함수를 호출한다.
const setup = ({ numPlayers }) => {
  const { deck, players } = initializeGame(numPlayers);

  // 게임 상태 G를 초기화한다.
  return {
    deck: deck,
    players: players,
    winner: { name: "", id: "-1" },
    gameOver: {
      playAgain: [],
      left: [],
      newRoomID: "",
    },
    turnLog: {
      action: "",
      player: {},
      successful: false,
      target: {},
      blockedBy: {},
      challenge: {},
      responses: resetResponses(numPlayers),
      exchange: {},
    },
    statistics: [
      ["income", 0, "—", "—", "—"],
      ["foreign aid", 0, 0, 0, "—"],
      ["coup", 0, 0, "—", "—"],
      ["tax", 0, 0, "—", 0],
      ["assassinate", 0, 0, 0, 0],
      ["steal", 0, 0, 0, 0],
      ["exchange", 0, 0, "—", 0],
    ],
    chat: [],
  };
};

// 게임 객체 Coup를 export한다.
export const Coup = {
  name: `${GAME_NAME}`, // 게임의 이름
  minPlayers: 2, // 최소 플레이어 수
  maxPlayers: 8, // 최대 플레이어 수
  setup: setup, // 게임 상태 초기화 함수
  turn: { // 턴 관리
    onBegin: (G, ctx) => { // 턴이 시작될 때 실행되는 함수
      logTurn(G.turnLog, "", {}, false, {}, {}, {}, resetResponses(ctx.numPlayers), {}); // 턴 로그 초기화
      ctx.events.setActivePlayers({ currentPlayer: "action", others: "idle" }); // 활성 플레이어 설정
    },
    onEnd: (G, ctx) => { // 턴이 끝날 때 실행되는 함수
      logStats(G.turnLog, G.statistics); // 게임 통계 업데이트
      G.chat.push({ id: "-1", content: getTurnMsg(G.turnLog), successful: G.turnLog.successful }); // 채팅 기록 업데이트
      checkForWinner(G); // 승자 체크
    },
    order: { // 플레이어 순서
      first: (G, ctx) => 0, // 첫 번째 플레이어
      next: ({ players }, { numPlayers, playOrder, playOrderPos }) => { // 다음 플레이어
        for (let i = 1; i <= numPlayers; i++) { // 플레이어 수만큼 반복
          const nextIndex = (playOrderPos + i) % numPlayers; // 다음 인덱스 계산
          const nextPlayer = playOrder[nextIndex]; // 다음 플레이어 계산
          if (!players[nextPlayer].isOut) { // 다음 플레이어가 out이 아니라면
            return nextIndex; // 다음 인덱스 반환
          }
        }
      },
      playOrder: (G, { numPlayers }) => getPlayOrder(numPlayers), // 플레이어 순서 계산
    },
    stages: { // 턴의 단계
      action: { // 행동 단계
        moves: { // 가능한 움직임
          income,
          prepAction,
          coup,
          setTarget,
          setHand,
          executeAction,
          continueTurn,
          endTurn,
          changeNames,
          leave,
          playAgain,
          message,
          setNewRoom,
        },
      },
      block: { // 블록 단계
        moves: { allow, block, message },
      },
      challenge: { // 도전 단계
        moves: { allow, initiateChallenge, revealCard, message },
      },
      blockOrChallenge: { // 블록 또는 도전 단계
        moves: { allow, block, initiateChallenge, revealCard, message },
      },
      revealCard: { // 카드 공개 단계
        moves: { revealCard, executeAction, continueTurn, endTurn, message },
      },
      loseCard: { // 카드 상실 단계
        moves:
