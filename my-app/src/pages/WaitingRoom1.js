import React from "react";
import '../css/WaitingRoom.css';
import {useLocation, useNavigate } from "react-router-dom";
import {ToGame} from "../Navigation"
import { useState, useEffect } from "react";
//export로 받을 때에는 {}를 써야 받아온다. 이거 안쓰고 그냥 ToGame 이러면 undefined 취급받음.



function WaitingRoom1(props){
   
    const [buttonText1,setButtonText1]= useState('준비');
    const [button2Text1, setButton2Text1]= useState('준비완료')
    const [buttonColor1, setButtonColor1]= useState('#40FF00');
    const [button2Color1, setButton2Color1]= useState('pink');


    const [buttonText2,setButtonText2]= useState('준비');
    const [button2Text2, setButton2Text2]= useState('준비완료')
    const [buttonColor2, setButtonColor2]= useState('#40FF00');
    const [button2Color2, setButton2Color2]= useState('pink');


    const [buttonText3,setButtonText3]= useState('준비');
    const [button2Text3, setButton2Text3]= useState('준비완료')
    const [buttonColor3, setButtonColor3]= useState('#40FF00');
    const [button2Color3, setButton2Color3]= useState('pink');


    const [buttonText4,setButtonText4]= useState('준비');
    const [button2Text4, setButton2Text4]= useState('준비완료')
    const [buttonColor4, setButtonColor4]= useState('#40FF00');
    const [button2Color4, setButton2Color4]= useState('pink');


    const [buttonText5,setButtonText5]= useState('준비');
    const [button2Text5, setButton2Text5]= useState('준비완료')
    const [buttonColor5, setButtonColor5]= useState('#40FF00');
    const [button2Color5, setButton2Color5]= useState('pink');


    const [buttonText6,setButtonText6]= useState('준비');
    const [button2Text6, setButton2Text6]= useState('준비완료')
    const [buttonColor6, setButtonColor6]= useState('#40FF00');
    const [button2Color6, setButton2Color6]= useState('pink');
 
    const navigate = useNavigate();
    const location = useLocation();
    const [howManyPlayer, setHowManyPlayer] = useState(6);
    const [loginPlayerNum, setLoginPlayerNum] = useState(2);
   //  const {loginPlayerId, loginPlayerNickname } = location.state;
    //얘가 반환해주는 함수임. 아무것도 반환값이 없으면 undefined가 default 값이어서 화면이 백지로 뜸.

    const [ready1,setReady1] = useState(false);
    const [ready2,setReady2] = useState(false);
    const [ready3,setReady3] = useState(false);
    const [ready4,setReady4] = useState(false);
    const [ready5,setReady5] = useState(false);
    const [ready6,setReady6] = useState(false);

    function GameStart(event){
      event.preventDefault();
      navigate("/Game");
  }
  
    
 function handleClick1(){
    setButtonText1('준비완료')
    setButtonColor1('skyblue');
    setReady1(true); //다른 버튼을 누를 준비가 완료되었다는 코드
 }
 function handleClick2(){
   setButtonText2('준비완료')
   setButtonColor2('skyblue');
   setReady2(true); //다른 버튼을 누를 준비가 완료되었다는 코드
}
function handleClick3(){
   setButtonText3('준비완료')
   setButtonColor3('skyblue');
   setReady3(true); //다른 버튼을 누를 준비가 완료되었다는 코드
}
function handleClick4(){
   setButtonText4('준비완료')
   setButtonColor4('skyblue');
   setReady4(true); //다른 버튼을 누를 준비가 완료되었다는 코드
}
function handleClick5(){
   setButtonText5('준비완료')
   setButtonColor5('skyblue');
   setReady5(true); //다른 버튼을 누를 준비가 완료되었다는 코드
}

function handleClick6(){
   setButtonText6('준비완료')
   setButtonColor6('skyblue');
   setReady6(true); //다른 버튼을 누를 준비가 완료되었다는 코드
}

function handleOtherButtonClick(){//얘가 함수형 컴포넌트가 아니라 함수다.
   setButton2Text1('게임시작')
   setButton2Color1('#FA5858');
   return(
    <div>
        {/* <ToGame navigate={navigate} howManyPlayer={howManyPlayer} loginPlayerId={loginPlayerId} loginPlayerNum={loginPlayerNum} loginPlayerNickname={loginPlayerNickname} /> */}
              <button className="GameStart" onClick={GameStart}>Game Start</button>
    </div>
   );
}
 return(
 <div>
   <button className="readyButton1" 
   onClick={handleClick1} style={{backgroundColor:buttonColor1}}>{buttonText1}
   </button>

   <button className="readyButton2" 
   onClick={handleClick2} style={{backgroundColor:buttonColor2}}>{buttonText2}
   </button>

   <button className="readyButton3" 
   onClick={handleClick3} style={{backgroundColor:buttonColor3}}>{buttonText3}
   </button>

   <button className="readyButton4" 
   onClick={handleClick4} style={{backgroundColor:buttonColor4}}>{buttonText4}
   </button>

   <button className="readyButton5" 
   onClick={handleClick5} style={{backgroundColor:buttonColor5}}>{buttonText5}
   </button>

   <button className="readyButton6" 
   onClick={handleClick6} style={{backgroundColor:buttonColor6}}>{buttonText6}
   </button>

 <button className="startButton" 
 onClick={handleOtherButtonClick} disabled={!(ready1,!ready2,ready3,ready4,ready5,ready6)}
  style={{ backgroundColor:button2Color1}}>{button2Text1}
</button>  

 </div>
);
}
export default WaitingRoom1;