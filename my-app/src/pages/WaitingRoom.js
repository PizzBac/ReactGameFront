import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/WaitingRoom.css';

function WaitingRoom(){

   const navigate=useNavigate();

    const [buttonText,setButtonText]= useState('준비');
    const [button2Text, setButton2Text]= useState('준비완료')
    const [buttonColor, setButtonColor]= useState('#40FF00');
    const [button2Color, setButton2Color]= useState('pink');
    const [ready,setReady] = useState(false);

    

    function handleOtherButtonClick(event) {
      event.preventDefault();
      navigate("/Game");
  }
 function handleClick(){
    setButtonText('준비완료')
    setButtonColor('skyblue');
    setReady(true); //다른 버튼을 누를 준비가 완료되었다는 코드
 }

      function handleOtherButtonClick(event){//얘가 바로 다른 버튼임.
         setButton2Text('게임시작')
         setButton2Color('#FA5858');
         if(button2Text === '게임시작'){
         event.preventDefault();
         navigate("/game"); //이거 누르면 게임으로 가야함. 이거는 아까 형민이형이 알려준 코드 활용해서 보내야해.
         }

      }
return(
 <div>
   <button className="readyButton1" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>


   <button className="readyButton2" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>

   <button className="readyButton3" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>

   <button className="readyButton4" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>

   <button className="readyButton5" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>

   <button className="readyButton6" 
   onClick={handleClick} style={{backgroundColor:buttonColor}}>{buttonText}
   </button>

 <button className="startButton" 
 onClick={handleOtherButtonClick} disabled={!ready}
  style={{ backgroundColor:button2Color}}>{button2Text}
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

export default WaitingRoom;