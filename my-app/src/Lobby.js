import React from "react";
import './css/Lobby.css';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Lobby() {
    const navigate = useNavigate();
    const location = useLocation();

    const [howManyPlayer, setHowManyPlayer] = useState(3);
    const [loginPlayerNum, setLoginPlayerNum] = useState(3);

    const { loginPlayerId, loginPlayerNickname } = location.state;
    console.log('state', location.state);

    const GameStart = (event) => {
        event.preventDefault();
        navigate('/game', {
            state: {
                howManyPlayer: howManyPlayer,
                loginPlayerId: loginPlayerId,
                loginPlayerNum: loginPlayerNum,
                loginPlayerNickname: loginPlayerNickname,
            },
        });
    }
    const LoginBtn = (event) => {
        event.preventDefault();
        navigate("/Login");
    }

    return (

        
        <div className="LobbyBody">
            <div>
            
            <h1 className="LobbyTitle">로비</h1>
            
           <h3 className="SubTitle1">원하는 인원수를 선택하세요
            
          
            <select
                value={howManyPlayer} // 현재 선택한 값을 표시
                onChange={(e) => setHowManyPlayer(parseInt(e.target.value))} // 선택한 값을 저장
            >
                {[...Array(5)].map((_, i) => (
                    <option value={i +1}>{i+2}인방</option>
                ))}
            </select></h3><br />
           <h3 className="SubTitle2">자신의 위치를 선택하세요
            <select
                value={loginPlayerNum}
                onChange={(ev) => setLoginPlayerNum(parseInt(ev.target.value))}
            >
                {[...Array(6)].map((_, i) => (
                    <option value={i + 1}>{i + 1}번</option>
                ))}
                
            </select></h3>
            <button className="GameStart" onClick={GameStart}>게임 스타트</button>
            <button className="GoLogin" onClick={LoginBtn}>로그아웃</button>
        </div>
</div>
);
}

export default Lobby;