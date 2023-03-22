import React from "react";
import { useLocation, useNavigate} from "react-router-dom";
import '../css/Lobby.css';
import { useState, useEffect } from "react";
import { ToGame } from "../Navigation";
import {WaitingRoom1} from "./WaitingRoom1";
import { withSubscription } from "react-stomp-hooks";
import { ReactDOMServer } from "react";

function Lobby() {
    //모든 테이블들을 다 독립적으로 만들어 주기 위해서 const를 6개 선언했다.(방이 6개임)
    const [count1, setCount1] = useState(parseInt(localStorage.getItem('count1') || 0));
    const [count2, setCount2] = useState(parseInt(localStorage.getItem('count2') || 0));
    const [count3, setCount3] = useState(parseInt(localStorage.getItem('count3') || 0));
    const [count4, setCount4] = useState(parseInt(localStorage.getItem('count4') || 0));
    const [count5, setCount5] = useState(parseInt(localStorage.getItem('count5') || 0));
    const [count6, setCount6] = useState(parseInt(localStorage.getItem('count6') || 0));


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
    
    //선택지를 다 독립적으로 만들기 위해서 howManyPlayer, loginPlayerNum, selectedPlayerNum 등등을 6개씩 만듦
    const [howManyPlayer, setHowManyPlayer] = useState(6);
    const [howManyPlayer1, setHowManyPlayer1] = useState(6);
    const [howManyPlayer2, setHowManyPlayer2] = useState(6);
    const [howManyPlayer3, setHowManyPlayer3] = useState(6);
    const [howManyPlayer4, setHowManyPlayer4] = useState(6);
    const [howManyPlayer5, setHowManyPlayer5] = useState(6);
    const [howManyPlayer6, setHowManyPlayer6] = useState(6);

    const [loginPlayerNum, setLoginPlayerNum] = useState(2);
    const [loginPlayerNum1, setLoginPlayerNum1] = useState(2);
    const [loginPlayerNum2, setLoginPlayerNum2] = useState(2);
    const [loginPlayerNum3, setLoginPlayerNum3] = useState(2);
    const [loginPlayerNum4, setLoginPlayerNum4] = useState(2);
    const [loginPlayerNum5, setLoginPlayerNum5] = useState(2);
    const [loginPlayerNum6, setLoginPlayerNum6] = useState(2);
    
    const [selectedPlayerNum, setSelectedPlayerNum]= useState();
    const [selectedPlayerNum1, setSelectedPlayerNum1]= useState();
    const [selectedPlayerNum2, setSelectedPlayerNum2]= useState();
    const [selectedPlayerNum3, setSelectedPlayerNum3]= useState();
    const [selectedPlayerNum4, setSelectedPlayerNum4]= useState();
    const [selectedPlayerNum5, setSelectedPlayerNum5]= useState();
    const [selectedPlayerNum6, setSelectedPlayerNum6]= useState();

    const { loginPlayerId, loginPlayerNickname } = location.state;
    const { loginPlayerId1, loginPlayerNickname1 } = location.state;
    const { loginPlayerId2, loginPlayerNickname2 } = location.state;
    const { loginPlayerId3, loginPlayerNickname3 } = location.state;
    const { loginPlayerId4, loginPlayerNickname4 } = location.state;
    const { loginPlayerId5, loginPlayerNickname5 } = location.state;
    const { loginPlayerId6, loginPlayerNickname6 } = location.state;
    
    console.log('state', location.state);

    function Exit(event) {
        event.preventDefault();
        navigate("/Login");
    }
    function LoginBtn(event) {
        event.preventDefault();
        navigate("/Login");
    }
    function WaitingRoom1(event) {
        event.preventDefault();
        navigate("/WaitingRoom1");
    }

    function handleClick1(event) {
      setCount1(prevCount1 => prevCount1 + 1);
      setColor1(colors[count1 % colors.length]);
    }
    function handleClick2(event) {
      setCount1(prevCount2 => prevCount2 + 1);
        setColor2(colors[count2 % colors.length]);
    }
    function handleClick3(event) {
      setCount1(prevCount3 => prevCount3 + 1);
        setColor3(colors[count3 % colors.length]);
    }
    function handleClick4(event) {//1234
      setCount1(prevCount4 => prevCount4 + 1);
        setColor4(colors[count4 % colors.length]);
    }
    function handleClick5(event) {
      setCount1(prevCount5 => prevCount5 + 1);
        setColor5(colors[count5 % colors.length]);
    }
    function handleClick6(event) {
      setCount1(prevCount6 => prevCount6 + 1);
        setColor6(colors[count6 % colors.length]);
    }

    function moveClick1(event) {
        const userResponse1= window.confirm('방에 입장하시겠습니까?');
        if(userResponse1){
            event.preventDefault();
            SaveRoomData(howManyPlayer,loginPlayerNum); //얘는 함수 끌어다 쓴거임. 별 의미 없음.
        navigate('/WaitingRoom1', {
            state: {
                howManyPlayer: howManyPlayer1,
                loginPlayerId: loginPlayerId2,
                loginPlayerNum: loginPlayerNum3,
                loginPlayerNickname: loginPlayerNickname4,
            },
        });
           }else{
    }  
    }

    function SaveRoomData(howManyPlayer,loginPlayerNum){ //얘가 핵심이다.
      localStorage.setItem('howManyPlayer',howManyPlayer.toString()); //JSON.stringfy() 이건 배열을 문자열로 변환
      localStorage.setItem('loginPlayerNum',loginPlayerNum.toString()); // JSON.parse() 문자열을 배열로 전환
    }
 
    function moveClick2(event) {
        const userResponse2= window.confirm('방에 입장하시겠습니까?');
        if(userResponse2){
            event.preventDefault();
            navigate('/WaitingRoom1', {
              state: {
                  howManyPlayer: howManyPlayer2,
                  loginPlayerId: loginPlayerId2,
                  loginPlayerNum: loginPlayerNum2,
                  loginPlayerNickname: loginPlayerNickname2,
              },
          });
    }else{
      
    }  
    }
    function moveClick3(event) {
        const userResponse3= window.confirm('방에 입장하시겠습니까?');
        if(userResponse3){
            event.preventDefault();
        navigate('/WaitingRoom1', {
            state: {
                howManyPlayer: howManyPlayer3,
                loginPlayerId: loginPlayerId3,
                loginPlayerNum: loginPlayerNum3,
                loginPlayerNickname: loginPlayerNickname3,
            },
        });
    }else{
    }  
    }
    function moveClick4(event) {
        const userResponse4= window.confirm('방에 입장하시겠습니까?');
        if(userResponse4){
            event.preventDefault();
        navigate('/WaitingRoom1', {
            state: {
                howManyPlayer: howManyPlayer4,
                loginPlayerId: loginPlayerId4,
                loginPlayerNum: loginPlayerNum4,
                loginPlayerNickname: loginPlayerNickname4,
            },
        });
    }else{
    }  
    }
    function moveClick5(event) {
        const userResponse5= window.confirm('방에 입장하시겠습니까?');
        if(userResponse5){
            event.preventDefault();
        navigate('/WaitingRoom1', {
            state: {
                howManyPlayer: howManyPlayer5,
                loginPlayerId: loginPlayerId5,
                loginPlayerNum: loginPlayerNum5,
                loginPlayerNickname: loginPlayerNickname5,
            },
        });
    }else{
    }  
    }
    function moveClick6(event) {
        const userResponse6= window.confirm('방에 입장하시겠습니까?');
        if(userResponse6){
            event.preventDefault();
        navigate('/WaitingRoom1', {
            state: {
                howManyPlayer: howManyPlayer6,
                loginPlayerId: loginPlayerId6,
                loginPlayerNum: loginPlayerNum6,
                loginPlayerNickname: loginPlayerNickname6,
            },
        });
    }else{
    }  
    }



    if (count1, count2, count3, count4, count5, count6 === 6) {
        (setCount1, setCount2, setCount3, setCount4, setCount5, setCount6)(6);
    }

    if (count1, count2, count3, count4, count5, count6 === 6) {
        (setColor1, setColor2, setColor3, setColor4, setColor5, setColor6)('red');
    }


    return (
        <div>
            <h1 className="LobbyTitle"><button className="fabicon img"></button> Welcome to the Coup!</h1>
            {/* 꼭 버튼을 누르는데 사용할 필요 없다. 이런식으로 h1으로 안되는 이미지 같은것도 button임 */}

            {/* <ToGame navigate={navigate} howManyPlayer={howManyPlayer} loginPlayerId={loginPlayerId} loginPlayerNum={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} /> */}
            {/* <button className="GameStart" onClick={GameStart}>Game Start</button> */}
            {/* <button className="Exit" onClick={Exit}>Exit</button> */}
            <button className="imgdoor" onClick={LoginBtn}>로그아웃</button>
            <button className="Setting" onClick={LoginBtn}>환경설정</button>
            <table>
                <tbody>      


);
                <tr>{/*첫번째 테이블 행*/}
  <td className="tdFirst">1번방</td>
  <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
        <select
          value={howManyPlayer1} //현재 선택한 값을 표시
          onChange={(e1) => {
            setHowManyPlayer1(parseInt(e1.target.value));
            setSelectedPlayerNum1(parseInt(e1.target.value) + 1);
          }} //선택한 값을 저장
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 2} value={i + 2}>{
              i + 2}인방</option>
          ))}
        </select>
        {selectedPlayerNum > 0 && (
          <div>
            {[...Array(selectedPlayerNum1)].map((_, i) => (
              <span key={i} className="circle"></span>
            ))}
          </div>
          )}
      </h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum}
          onChange={(ev1) => setLoginPlayerNum1(parseInt(ev1.target.value))}
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room1-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
  <td className="tdSecond">
    <button onClick={moveClick1} className="WaitingRoomButton">입장</button>
  </td>
</tr>





<tr>{/*두번째 테이블 행 */}
  <td className="tdFirst">2번방</td>

  <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
  <select
    value={howManyPlayer2} // 현재 선택한 값을 표시
    onChange={(e2) => {
      setHowManyPlayer2(parseInt(e2.target.value));
      setSelectedPlayerNum2(parseInt(e2.target.value) + 1);
    }} // 선택한 값을 저장
  >
    {[...Array(5)].map((_, i) => (
      <option key={`room2-${i + 2}`} value={i + 2}>{i + 2}인방</option>
    ))}
  </select>
</h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum2}
          onChange={(ev2) => setLoginPlayerNum2(parseInt(ev2.target.value))}
          
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room2-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
  <td className="tdSecond">
    <button onClick={moveClick2} className="WaitingRoomButton">입장</button>
    {selectedPlayerNum2 > 0 && selectedPlayerNum2 <= 7 && (
    <div>
      {[...Array(selectedPlayerNum2-1)].map((_, i) => (
        <span key={`room2-circle-${i}`} className="circle"></span>
      ))}
    </div>
  )}
  </td>
</tr>




                    <tr>{/*3번째 테이블 행*/}
                    <td className="tdFirst">3번방</td> 
                    <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
        <select
          value={howManyPlayer3} //현재 선택한 값을 표시
          onChange={(e3) => {
            setHowManyPlayer3(parseInt(e3.target.value));
            setSelectedPlayerNum3(parseInt(e3.target.value) + 1);
          }} //선택한 값을 저장
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 2} value={i + 2}>{
              i + 2}인방</option>
          ))}
        </select>
        {selectedPlayerNum3 > 0 && (
          <div>
            {[...Array(selectedPlayerNum3)].map((_, i) => (
              <span key={i} className="circle"></span>
            ))}
          </div>
          )}
      </h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum}
          onChange={(ev3) => setLoginPlayerNum3(parseInt(ev3.target.value))}
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room1-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
               <td className="tdSecond"><button onClick={moveClick3} className="WaitingRoomButton">입장</button>
               </td>
               </tr>





                    <tr>{/*4번째 테이블 행*/}
                        <td className="tdFirst">4번방</td> 
                        <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
        <select
          value={howManyPlayer4} //현재 선택한 값을 표시
          onChange={(e4) => {
            setHowManyPlayer4(parseInt(e4.target.value));
            setSelectedPlayerNum4(parseInt(e4.target.value) + 1);
          }} //선택한 값을 저장
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 2} value={i + 2}>{
              i + 2}인방</option>
          ))}
        </select>
        {selectedPlayerNum4 > 0 && (
          <div>
            {[...Array(selectedPlayerNum4)].map((_, i) => (
              <span key={i} className="circle"></span>
            ))}
          </div>
          )}
      </h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum4}
          onChange={(ev4) => setLoginPlayerNum4(parseInt(ev4.target.value))}
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room1-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
               <td className="tdSecond"><button onClick={moveClick4} className="WaitingRoomButton">입장</button>
               </td>
               </tr>





                    <tr>{/*5번째 테이블 행*/}
                        <td className="tdFirst">5번방</td> 
                        <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
        <select
          value={howManyPlayer5} //현재 선택한 값을 표시
          onChange={(e5) => {
            setHowManyPlayer5(parseInt(e5.target.value));
            setSelectedPlayerNum5(parseInt(e5.target.value) + 1);
          }} //선택한 값을 저장
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 2} value={i + 2}>{
              i + 2}인방</option>
          ))}
        </select>
        {selectedPlayerNum5 > 0 && (
          <div>
            {[...Array(selectedPlayerNum5)].map((_, i) => (
              <span key={i} className="circle"></span>
            ))}
          </div>
          )}
      </h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum5}
          onChange={(ev5) => setLoginPlayerNum5(parseInt(ev5.target.value))}
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room1-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
               <td className="tdSecond"><button onClick={moveClick5} className="WaitingRoomButton">입장</button>
               </td>
               </tr>




                    <tr>{/*6번째 테이블 행*/}
                        <td className="tdFirst">6번방</td> 
                        <td>
    <div>
      <h3 className="SubTitle1">원하는 인원수를 선택하세요
        <select
          value={howManyPlayer1} //현재 선택한 값을 표시
          onChange={(e6) => {
            setHowManyPlayer6(parseInt(e6.target.value));
            setSelectedPlayerNum6(parseInt(e6.target.value) + 1);
          }} //선택한 값을 저장
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 2} value={i + 2}>{
              i + 2}인방</option>
          ))}
        </select>
        {selectedPlayerNum6 > 0 && (
          <div>
            {[...Array(selectedPlayerNum6)].map((_, i) => (
              <span key={i} className="circle"></span>
            ))}
          </div>
          )}
      </h3><br />
      <h3 className="SubTitle2">자신의 위치를 선택하세요
        <select
          value={loginPlayerNum6}
          onChange={(ev6) => setLoginPlayerNum6(parseInt(ev6.target.value))}
        >
          {[...Array(6)].map((_, i) => (
            <option key={`room1-${i + 1}`} value={i + 1}>{i + 1}번</option>
          ))}
        </select>
      </h3>
    </div>
  </td>
               <td className="tdSecond"><button onClick={moveClick6} className="WaitingRoomButton">입장</button>
               </td>
               </tr>
                </tbody>
            </table>
        </div>
    


    );
          }


export default Lobby;

