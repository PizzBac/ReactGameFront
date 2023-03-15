import React,{ useState, useEffect } from "react";
import '../css/WaitingRoom.css';
import { useLocation, useNavigate } from "react-router-dom";
import { ToGame } from "../Navigation"
function WaitingRoom1(props){

   const navigate=useNavigate();

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

    const [ready1,setReady1] = useState(false);
    const [ready2,setReady2] = useState(false);
    const [ready3,setReady3] = useState(false);
    const [ready4,setReady4] = useState(false);
    const [ready5,setReady5] = useState(false);
    const [ready6,setReady6] = useState(false);

    const{activate, howManyPlayer,loginPlayerNumber, loginPlayerNickname}=props;

      function CreatePlayers(){
         const players=[];
         for (let i = 0; i < howManyPlayer; i++) {
            let nickName = `플레이어 ${i + 1}의 닉네임`;
              if (i + 1 === loginPlayerNumber) {
               nickName = loginPlayerNickname;
               }
      }
   } 

    function handleOtherButtonClick(event) {
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

      function handleOtherButtonClick(event){//얘가 바로 다른 버튼임.
         setButton2Text1('게임시작')
         setButton2Color1('#FA5858');
         if(button2Text1 === '게임시작'){ //여기서 잘 옮기면 됨.
            
                 
               } //이거 누르면 게임으로 가야함. 이거는 아까 형민이형이 알려준 코드 활용해서 보내야해.
         
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
 onClick={handleOtherButtonClick} disabled={!(ready1,ready2,ready3,ready4,ready5,ready6)}
  style={{ backgroundColor:button2Color1}}>{button2Text1}
  
 </button>

 </div>
 
 

);
// function Square(props) {
//    return (
//      <svg width={props.width} height={props.height}>
//        <rect
//          x={0}
//          y={0}
//          width={props.width}
//          height={props.height}
//          stroke="black"
//          strokeWidth="2"
//          fill="none"
//        />
//      </svg>
//    );
//  }

}
export default WaitingRoom1;