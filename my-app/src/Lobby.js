import React from "react";
import './css/Lobby.css';
import { useNavigate } from "react-router-dom";

function Lobby() {

    const navigate =useNavigate();

    const GameStart = (event) => {
        event.preventDefault();
        navigate("/Game");
    }
  
        const LoginBtn = (event) => {
            event.preventDefault();
            navigate("/Login");
        }
    
    return (
        <div>
           <button className="GameStart" onClick={GameStart}>게임시작</button>
           <button className="GameStart" onClick={LoginBtn}>로그인 창으로 이동</button> 
      </div>
    );
  }
  
  export default Lobby;