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
  name: `${GAME_NAME}`,
  minPlayers: 2,
  maxPlayers: 8,
  setup: setup,
  turn: {
    onBegin: (G, ctx) => {
      // 현재 턴의 상태를 초기화한다.
      logTurn(G.turnLog, "", {}, false, {}, {}, {}, resetResponses(ctx.numPlayers), {});
      // 액션 단계는 현재 턴의 플레이어가 활성화되고, idle 단계는 다른 모든 플레이어가 활성화된다.
      ctx.events.setActivePlayers({ currentPlayer: "action", others: "idle" });
    },
    onEnd: (G, ctx) => {
      // 현재 턴의 로그와 통계를 기록한다.
      logStats(G.turnLog, G.statistics);
      // 현재 턴의 로그를 채팅방에 추가하고, 이번 턴에 성공
