import React from "react";
import "./Lobby.css";

//Lobby is the parent component. Home and Room are the children components
//로비가 부모 컴포넌트고 홈이랑 룸이 자식 컴포넌트다. 즉 로비가 바뀌면 다 바뀜

function Lobby(props){
  return(
    <div className="lobby-container">
      <div className="game-title">online coup</div>
      {props.children}
      {/*props는 전달하기 위해 사용하는 객체이다. React에서 props로 전달받은 자식 컴포넌트(children)를 렌더링하는 방법 중 하나이다.*/}
      <div className="game-info">
        Based on the original Coup board game by Indie Boards & Cards.
      </div>
    </div>
  );
};

export default Lobby;