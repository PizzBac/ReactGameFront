import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './css/Lobby.css';
import { useState } from "react";

function User({userData}){

    return(
        <tr>
            <td className="tdFirst">{userData.name}</td>
            <td className="tdSecond">{userData.email}</td>
        </tr>
    )
}
function UserList(){

    const navigate=useNavigate();
    const location= useLocation();

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
    const users = [
        {email:'100', name:'1채널'},
        {email:'200', name:'2채널'},
        {email:'300', name:'3채널'},
        {email:'4900', name:'4채널'},
        {email:'4900', name:'5채널'},
        {email:'4900', name:'6채널'}
    ];

    return(
        <div className="BackGround">
            <div>
                <h1 className="LobbyTitle">Welcome to the Coup!</h1>
                <div>
                    <h1 className="imgdoor"></h1>
                    <h3 className="SubTitle1">원하는 인원수를 선택하세요
                        <select
                            value={howManyPlayer} // 현재 선택한 값을 표시
                            onChange={(e) => setHowManyPlayer(parseInt(e.target.value))} // 선택한 값을 저장
                        >
                            {[...Array(5)].map((_, i) => (
                                <option key={i+2} value={i + 2}>{i + 2}인방</option>
                            ))}
                        </select></h3><br />
                    <h3 className="SubTitle2">자신의 위치를 선택하세요
                        <select
                            value={loginPlayerNum}
                            onChange={(ev) => setLoginPlayerNum(parseInt(ev.target.value))}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i+1} value={i + 1}>{i + 1}번</option>
                            ))}
                        </select></h3>
                    <button className="GameStart" onClick={GameStart}>Game Start</button>
                    <button className="GoLogin" onClick={LoginBtn}>로그아웃</button>
                
                <button className="Setting" onClick={LoginBtn}>환경설정</button>
                </div>
      
        </div>
        </div>

    );
                            }
export default UserList;