import React from "react";
import './css/Lobby.css';
import { useNavigate, useLocation } from "react-router-dom";

function Lobby() {

    const navigate = useNavigate();
    const GameStart = (event) => {
        event.preventDefault();
        navigate('/game', {
            state: {
              howManyPlayer: 3,
            },
          });
    }
    const LoginBtn = (event) => {
        event.preventDefault();
        navigate("/Login");
    }

    return (
        <div>
            <h1 className="LobbyTitle">로비</h1>
            <button className="GameStart" onClick={GameStart}>게임시작</button>
            <button className="GoLogin" onClick={LoginBtn}>로그인 창으로 이동</button>
        </div>
    );
}

export default Lobby;