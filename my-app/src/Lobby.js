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
            
            <h1 className="LobbyTitle">[로비]</h1>
            
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

            {/* <div className="img hintBox"> */}
          <span className="hintTitle">게임 힌트</span>
          <div className="hintTextBox">
            <p className="hintText">사령관 카드 능력으로 상대방 코인 2개를 가져올 수 있습니다.</p>
            <p className="hintText">외교관 카드 능력으로 상대방이 코인 2개를 강탈 하는 것을 막을 수 있습니다.</p>
            <p className="hintText">은행에서 코인 1개를 가져올 수 있습니다.</p>
          </div>
        {/* </div> */}
        </div>
</div>
);
}

export default Lobby;