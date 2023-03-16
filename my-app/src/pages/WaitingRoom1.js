import React from "react";
import '../css/WaitingRoom.css';
import {useLocation, useNavigate} from "react-router-dom";
import {ToGame} from "../Navigation"
import { useState, useEffect } from "react";
//export로 받을 때에는 {}를 써야 받아온다. 이거 안쓰고 그냥 ToGame 이러면 undefined 취급받음.



function WaitingRoom1(props){
   
    const [buttonText1,setButtonText1]= useState('준비');
    const [button2Text1, setButton2Text1]= useState('게임시작')
    const [buttonColor1, setButtonColor1]= useState('#40FF00');
    const [button2Color1, setButton2Color1]= useState('red');


    const [buttonText2,setButtonText2]= useState('준비');
    const [button2Text2, setButton2Text2]= useState('게임시작')
    const [buttonColor2, setButtonColor2]= useState('#40FF00');
    const [button2Color2, setButton2Color2]= useState('red');


    const [buttonText3,setButtonText3]= useState('준비');
    const [button2Text3, setButton2Text3]= useState('게임시작')
    const [buttonColor3, setButtonColor3]= useState('#40FF00');
    const [button2Color3, setButton2Color3]= useState('red');


    const [buttonText4,setButtonText4]= useState('준비');
    const [button2Text4, setButton2Text4]= useState('게임시작')
    const [buttonColor4, setButtonColor4]= useState('#40FF00');
    const [button2Color4, setButton2Color4]= useState('red');


    const [buttonText5,setButtonText5]= useState('준비');
    const [button2Text5, setButton2Text5]= useState('게임시작')
    const [buttonColor5, setButtonColor5]= useState('#40FF00');
    const [button2Color5, setButton2Color5]= useState('red');


    const [buttonText6,setButtonText6]= useState('준비');
    const [button2Text6, setButton2Text6]= useState('게임시작')
    const [buttonColor6, setButtonColor6]= useState('#40FF00');
    const [button2Color6, setButton2Color6]= useState('red');
 
    const navigate = useNavigate();
    const location = useLocation();
    const [howManyPlayer, setHowManyPlayer] = useState(3);
    const [loginPlayerNum, setLoginPlayerNum] = useState(2); 
    const {loginPlayerId,loginPlayerNickname} = location.state;
   
   const [buttonDisabled1, setButtonDisabled1] = useState(false);
   const [buttonDisabled2, setButtonDisabled2] = useState(false);
   const [buttonDisabled3, setButtonDisabled3] = useState(false);
   const [buttonDisabled4, setButtonDisabled4] = useState(false);
   const [buttonDisabled5, setButtonDisabled5] = useState(false);
   const [buttonDisabled6, setButtonDisabled6] = useState(false);

   const [gameStart, setGameStart] = useState(true);
   const [numActiveButtons, setNumActiveButtons] = useState(0); //활성화된 버튼의 개수를 나타내는 상태변수, 초기값은 0이다.

   const [buttonColor, setButtonColor] = useState("white");
   const [buttonText, setButtonText] = useState("준비하기");
    //얘가 반환해주는 함수임. 아무것도 반환값이 없으면 undefined가 default 값이어서 화면이 백지로 뜸.

    const [ready1,setReady1] = useState(true);
    const [ready2,setReady2] = useState(true);
    const [ready3,setReady3] = useState(true);
    const [ready4,setReady4] = useState(true);
    const [ready5,setReady5] = useState(true);
    const [ready6,setReady6] = useState(true);
    //원래 false로 바꿔야 하는데 일단 해결을 못해서 true로 잠깐 바꿔둠

 
 function handleClick1(){
   setButtonText1('준비완료')
   setButtonColor1('skyblue');
   setButtonDisabled1(true);
  setNumActiveButtons(numActiveButtons + 1);
   setReady1(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
  };
 function handleClick2(){
   setButtonText2('준비완료')
   setButtonColor2('skyblue');
   setButtonDisabled2(true);
  setNumActiveButtons(numActiveButtons + 1);
   setReady2(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
}
function handleClick3(){
   setButtonText3('준비완료')
   setButtonColor3('skyblue');
   setButtonDisabled3(true);
  setNumActiveButtons(numActiveButtons + 1);
   setReady3(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
}
function handleClick4(){
   setButtonText4('준비완료')
   setButtonColor4('skyblue');
   setButtonDisabled4(true);
  setNumActiveButtons(numActiveButtons + 1);
   setReady4(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
}
function handleClick5(){
   setButtonText5('준비완료')
   setButtonColor5('skyblue');
   setButtonDisabled5(true);
  setNumActiveButtons(numActiveButtons + 1);
   setReady5(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
}

function handleClick6(){
   setButtonText6('준비완료')
   setButtonColor6('skyblue');
   setButtonDisabled6(true);
   setNumActiveButtons(numActiveButtons + 1);
   setReady6(true); //다른 버튼을 누를 준비가 완료되었다는 코드
   handleOtherButtonClick();
}

function handleOtherButtonClick(event){//얘가 함수형 컴포넌트가 아니라 함수다.
   if (numActiveButtons === 6 && !ready1 || !ready2 || !ready3 || !ready4 || !ready5 || !ready6) {
      setGameStart(true); // 모든 버튼들이 활성화되었을 때만 게임스타트가 가능하게 하는 코드 만드는 중
    }
   setButton2Text1('게임시작')
   setButton2Color1('#FA5858');
   event.preventDefault();
   localStorage.removeItem('players');
   
   navigate('/game', {
      state: {
         howManyPlayer: howManyPlayer,
         loginPlayerId: loginPlayerId,
         loginPlayerNum: loginPlayerNum,
         loginPlayerNickname: loginPlayerNickname,
      },
   });
}
 return(
 <div style={{ backgroundColor: 'yellow' }}> 
<button
  className="readyButton1" onClick={handleClick1} disabled={buttonDisabled1}style={{ backgroundColor: buttonColor1 }}>
  {buttonText1}
</button>

   <button className="readyButton2" 
   onClick={handleClick2}disabled={buttonDisabled2} style={{backgroundColor:buttonColor2}}>{buttonText2}
   </button>

   <button className="readyButton3" 
   onClick={handleClick3} disabled={buttonDisabled3} style={{backgroundColor:buttonColor3}}>{buttonText3}
   </button>

   <button className="readyButton4" 
   onClick={handleClick4} disabled={buttonDisabled4} style={{backgroundColor:buttonColor4}}>{buttonText4}
   </button>

   <button className="readyButton5" 
   onClick={handleClick5} disabled={buttonDisabled5} style={{backgroundColor:buttonColor5}}>{buttonText5}
   </button>

   <button className="readyButton6" 
   onClick={handleClick6} disabled={buttonDisabled6} style={{backgroundColor:buttonColor6}}>{buttonText6}
   </button>
   
  <button
    className="startButton"
    onClick={handleOtherButtonClick}
    disabled={!(ready1 && ready2 && ready3 &&ready4 && ready5 && ready6)} //여기를 바꿔야 함. 버튼 누르면 전부 활성화 되게
    style={{ backgroundColor: button2Color1 }}
  >
    {button2Text1}
  </button>
         <h3 className="SubTitle1">[원하는 인원수를 선택하세요]
         <select className="select1"
  value={howManyPlayer}
  size="5"
  onChange={(e) => {
    const selectedValue = parseInt(e.target.value);
    setHowManyPlayer(selectedValue);
    if(selectedValue===7){
      setButtonDisabled6(false); // 6번째 버튼 활성화
      setButtonDisabled5(false); // 5번째 버튼 활성화
      setButtonDisabled4(false); // 4번째 버튼 활성화
      setButtonDisabled3(false); // 3번째 버튼 활성화
      setButtonDisabled2(false); // 2번째 버튼 활성화
      setButtonDisabled1(false); // 1번째 버튼 활성화
    }
    else if (selectedValue === 6){
      setButtonDisabled6(true); // 6번째 버튼 비활성화
      setButtonDisabled5(false); // 5번째 버튼 활성화
      setButtonDisabled4(false); // 4번째 버튼 활성화
      setButtonDisabled3(false); // 3번째 버튼 활성화
      setButtonDisabled2(false); // 2번째 버튼 활성화
      setButtonDisabled1(false); // 1번째 버튼 활성화
    } else if (selectedValue === 5) {
      setButtonDisabled6(true); // 6번째 버튼 비활성화
      setButtonDisabled5(true); // 5번째 버튼 비활성화
      setButtonDisabled4(false); // 4번째 버튼 활성화
      setButtonDisabled3(false); // 3번째 버튼 활성화
      setButtonDisabled2(false); // 2번째 버튼 활성화
      setButtonDisabled1(false); // 1번째 버튼 활성화
    } else if(selectedValue===4) {
      setButtonDisabled6(true); // 6번째 버튼 비활성화
      setButtonDisabled5(true); // 5번째 버튼 비활성화
      setButtonDisabled4(true); // 4번째 버튼 비활성화
      setButtonDisabled3(false); // 3번째 버튼 활성화
      setButtonDisabled2(false); // 2번째 버튼 활성화
      setButtonDisabled1(false); // 1번째 버튼 활성화
    } else if(selectedValue===3){
      setButtonDisabled6(true); // 6번째 버튼 비활성화
      setButtonDisabled5(true); // 5번째 버튼 비활성화
      setButtonDisabled4(true); // 4번째 버튼 비활성화
      setButtonDisabled3(true); // 3번째 버튼 비활성화
      setButtonDisabled2(false); // 2번째 버튼 활성화
      setButtonDisabled1(false); // 1번째 버튼 활성화
  } 
  }}
>
  {[...Array(5)].map((_, i) => (
    <option key={i + 2} value={i + 3}>{i + 2}인방</option>
  ))}
</select></h3>
    <h3 className="SubTitle2">[자신의 위치를 선택하세요]
        <select className="select2"
          value={loginPlayerNum}
         onChange={(ev) => setLoginPlayerNum(parseInt(ev.target.value))}
          size="6">
         {[...Array(6)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}번</option>
                 ))}
               </select></h3> 
 </div>
);
}
export default WaitingRoom1;