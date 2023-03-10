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
        <div className="Mothertable">
        <div className="table">
        <table>
            <thead>
                <tr>
                    <th className="channel">CHN</th>
                    <th>접속자 <div className="Present">12341242134</div> </th>
                </tr>
            </thead>
            <tbody>
              {users.map((user)=>(
                <User userData={user}/>
              ))}
            </tbody>
        </table>
        
        <button className="GameStart" onClick={GameStart}>Game Start</button>
                    <button className="GoLogin" onClick={LoginBtn}>로그아웃</button>
                    <button className="Setting" onClick={LoginBtn}>환경설정</button>
      
        </div>
        </div>

    );
};
export default UserList;