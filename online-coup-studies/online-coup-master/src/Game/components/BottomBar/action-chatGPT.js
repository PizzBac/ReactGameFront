import React from "react"; // React를 불러옴
import classNames from "classnames"; // CSS 클래스 이름을 조건부로 지정하기 위한 라이브러리를 불러옴
import "./Actions.scss"; // Actions 컴포넌트를 위한 CSS 파일을 불러옴

const Actions = ({ G, ctx, playerID, moves }) => { // Actions 컴포넌트를 정의함. G, ctx, playerID, moves는 Props
const yourPlayer = G.players[playerID]; // 현재 플레이어의 정보를 G에서 가져옴
const isYourTurn = ctx.currentPlayer === playerID; // 현재 턴이 해당 플레이어의 턴인지를 판단하는 변수를 생성함

// 게임 규칙에 따른 액션 가능 여부를 나타내는 변수들을 생성함
const canCoup = yourPlayer.coins >= 7;
const mustCoup = yourPlayer.coins >= 10;
const canAssassinate = yourPlayer.coins >= 3;
const done = ctx.currentPlayer === G.turnLog.player.id || G.winner.id !== "-1"; // 현재 액션을 선택할 수 없는 경우(done)를 판단함

const income = () => { // income 액션을 선택했을 때 호출되는 함수
moves.income();
};

const prepAction = (action) => { // 다른 액션들을 선택했을 때 호출되는 함수
moves.prepAction(action);
};
}
