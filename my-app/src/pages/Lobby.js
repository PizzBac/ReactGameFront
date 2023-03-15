import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Lobby.css';
import { useState, useEffect } from "react";
import { ToGame } from "../Navigation";
import WaitingRoom1 from "./WaitingRoom1";
import WaitingRoom2 from "./WaitingRoom2";
import WaitingRoom3 from "./WaitingRoom3";
import WaitingRoom4 from "./WaitingRoom4";
import WaitingRoom5 from "./WaitingRoom5";
import WaitingRoom6 from "./WaitingRoom6";

function Lobby(){
    //모든 테이블들을 다 독립적으로 만들어 주기 위해서 const를 6개 선언했다.(방이 6개임)
    const [count1, setCount1] =useState(parseInt(localStorage.getItem('count1') || 0));
    const [count2, setCount2] =useState(parseInt(localStorage.getItem('count2') || 0));
    const [count3, setCount3] =useState(parseInt(localStorage.getItem('count3') || 0));
    const [count4, setCount4] =useState(parseInt(localStorage.getItem('count4') || 0));
    const [count5, setCount5] =useState(parseInt(localStorage.getItem('count5') || 0));
    const [count6, setCount6] =useState(parseInt(localStorage.getItem('count6') || 0));
    

    const [color1, setColor1] = useState('white');
    const [color2, setColor2] = useState('white');
    const [color3, setColor3] = useState('white');
    const [color4, setColor4] = useState('white');
    const [color5, setColor5] = useState('white');
    const [color6, setColor6] = useState('white');

    //색깔 규칙은 어차피 이거 하나니까 이거는 6개 만들필요 없음
    const colors = ['skyblue', '#04B4AE', 'yellowgreen', 'yellow', 'orange', 'red'];

    const navigate = useNavigate();
    const location = useLocation();

    const [howManyPlayer, setHowManyPlayer] = useState(6);
    const [loginPlayerNum, setLoginPlayerNum] = useState(2);

    const { loginPlayerId, loginPlayerNickname } = location.state;
    console.log('state', location.state);

    function Exit(event) {
        event.preventDefault();
        navigate("/Login");
    }
    function LoginBtn(event) {
        event.preventDefault();
        navigate("/Login");
    }
    function WaitingRoom1(event){
        event.preventDefault();
        navigate("/WaitingRoom1");
        }
    
    function handleClick1(event) {
        setCount1(count1 + 1);
        setColor1(colors[count1 % colors.length]);
    }
    function handleClick2(event) {
        setCount2(count2 + 1);
        setColor2(colors[count2 % colors.length]);
    }
    function handleClick3(event) {
        setCount3(count3 + 1);
        setColor3(colors[count3 % colors.length]);
    }
    function handleClick4(event) {
        setCount4(count4 + 1);
        setColor4(colors[count4 % colors.length]);
    }
    function handleClick5(event) {
        setCount5(count5 + 1);
        setColor5(colors[count5 % colors.length]);
    }
    function handleClick6(event) {
        setCount6(count6 + 1);
        setColor6(colors[count6 % colors.length]);
    }

 function moveClick1(event){
       const button = document.getElementById('countButton6');
       if(button){
        button.click();
       }
        event.preventDefault();
        navigate("/waitingRoom1");
    }
    function moveClick2(event){
        event.preventDefault();
        navigate("/waitingRoom2");
    }
    function moveClick3(event){
        event.preventDefault();
        navigate("/waitingRoom3");
    }
    function moveClick4(event){
        event.preventDefault();
        navigate("/waitingRoom4");
    }
    function moveClick5(event){
        event.preventDefault();
        navigate("/waitingRoom5");
    }
    function moveClick6(event){
        event.preventDefault();
        navigate("/waitingRoom6");
    }
        
    

    if (count1,count2,count3,count4,count5,count6 === 6) {
        (setCount1,setCount2,setCount3,setCount4,setCount5,setCount6)(6);
    }

    if (count1,count2,count3,count4,count5,count6 === 6) {
        (setColor1,setColor2,setColor3,setColor4,setColor5,setColor6)('red');
    }


    return(
        <div>
            <h1 className="LobbyTitle"><button className="fabicon img"></button> Welcome to the Coup!</h1>
                 {/* 꼭 버튼을 누르는데 사용할 필요 없다. 이런식으로 h1으로 안되는 이미지 같은것도 button임 */}
              
                     <h3 className="SubTitle1">원하는 인원수를 선택하세요
                        <select
                            value={howManyPlayer} // 현재 선택한 값을 표시
                            onChange={(e) => setHowManyPlayer(parseInt(e.target.value))} // 선택한 값을 저장
                        >
                            {[...Array(5)].map((_, i) => (
                                <option key={i + 2} value={i + 2}>{i + 2}인방</option>
                            ))}
                        </select></h3><br />
                    <h3 className="SubTitle2">자신의 위치를 선택하세요
                        <select
                            value={loginPlayerNum}
                            onChange={(ev) => setLoginPlayerNum(parseInt(ev.target.value))}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}번</option>
                            ))}
                        </select></h3> 
                    <ToGame navigate={navigate} howManyPlayer={howManyPlayer} loginPlayerId={loginPlayerId} loginPlayerNum={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} />
                    {/* <button className="GameStart" onClick={GameStart}>Game Start</button> */}
                    <button className="Exit" onClick={Exit}>Exit</button>
                    <button className="imgdoor" onClick={LoginBtn}>로그아웃</button>
                    <button className="Setting" onClick={LoginBtn}>환경설정</button>
                    <button onClick={WaitingRoom1}>대합실로 이동</button>
                    {/* <button onClick={addRow}>방 만들기</button> */}

        <table>
            <tbody>
               <tr><td className="tdFirst">1번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color1}} onClick={handleClick1} disabled={count1>=6} id="countButton6">{count1}/6</button><button onClick={moveClick1} className="WaitingRoomButton">입장</button></td></tr>
               <tr><td className="tdFirst">2번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color2}} onClick={handleClick2} disabled={count2>=6}>{count2}/6</button><button onClick={moveClick2} className="WaitingRoomButton">입장</button></td></tr>
               <tr><td className="tdFirst">3번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color3}} onClick={handleClick3} disabled={count3>=6}>{count3}/6</button><button onClick={moveClick3} className="WaitingRoomButton">입장</button></td></tr>
               <tr><td className="tdFirst">4번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color4}} onClick={handleClick4} disabled={count4>=6}>{count4}/6</button><button onClick={moveClick4} className="WaitingRoomButton">입장</button></td></tr>
               <tr><td className="tdFirst">5번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color5}} onClick={handleClick5} disabled={count5>=6}>{count5}/6</button><button onClick={moveClick5} className="WaitingRoomButton">입장</button></td></tr>
               <tr><td className="tdFirst">6번방</td><td className="tdSecond"><button className="button" style={{ backgroundColor:color6}} onClick={handleClick6} disabled={count6>=6}>{count6}/6</button><button onClick={moveClick6} className="WaitingRoomButton">입장</button></td></tr>
            </tbody>
        </table>
    </div>
    //div도 딱히 위치를 지정해주지 않아도 위에다 올려놓으면 위에다 배치됨 기본적으로

    
    
    );
    }

    
export default Lobby;

