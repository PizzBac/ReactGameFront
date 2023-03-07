
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Players, YourPlayer, BottomBar, AnnouncementArea, ChatLogSettings } from "./components";
import "./Board.css";

const Board = (props) => {
  const [revealDeck, setRevealDeck] = useState(false); // revealDeck 상태값 초기화

  // player 0 has to set the player's actual screen names due to the way boardgame.io works
  useEffect(() => { // 컴포넌트 업데이트 될 때마다 실행되는 useEffect 훅
    if (props.playerID === "0") { // 플레이어 아이디가 0인 경우
      props.moves.changeNames(props.gameMetadata); // 플레이어 이름 변경 메소드 실행
    }
  }, [props.playerID, props.moves, props.gameMetadata]); // 배열 인자에 의해 실행되는 조건 제한

  return (
    <div className="game-container">
      <Players {...props} /> // Players 컴포넌트 사용
      <div className="your-container">
        <div className="your-player-container">
          <YourPlayer {...props} /> // YourPlayer 컴포넌트 사용
        </div>
        <div className="messages-actions-container">
          <AnnouncementArea {...props} /> // AnnouncementArea 컴포넌트 사용
          <BottomBar {...props} revealDeck={revealDeck} /> // BottomBar 컴포넌트 사용
        </div>
        <div className="cls-col">
          <ChatLogSettings {...props} revealDeck={revealDeck} setRevealDeck={setRevealDeck} /> // ChatLogSettings 컴포넌트 사용
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  G: PropTypes.any.isRequired, // G 속성 값이 필수
  ctx: PropTypes.any.isRequired, // ctx 속성 값이 필수
  moves: PropTypes.any.isRequired, // moves 속성 값이 필수
  playerID: PropTypes.string.isRequired, // playerID 속성 값이 필수
  gameMetadata: PropTypes.any.isRequired, // gameMetadata 속성 값이 필수
};

export default Board; // Board 컴포넌트 내보내기
