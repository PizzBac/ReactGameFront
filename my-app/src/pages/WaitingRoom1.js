import React from "react";
import '../css/WaitingRoom.css';
import {useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToGame } from "../Navigation";

function WaitingRoom(){

  const navigate=useNavigate();
  const location= useLocation();

  const [howManyPlayer,setHowManyPlayer]= useState(LoadLoginPlayerNum()); //LoadHowManyPlayer 함수를 호출하고, 그 결과를 howManyPlayer 변수에 할당하고 있다.
  const [loginPlayerNum,setLoginPlayerNum]= useState(LoadHowManyPlayer());  //LoadLoginPlayerNum 함수를 호출하고, 그 결과를 loginPlayerNum 변수에 할당하고 있다. 
  const [loginPlayerNumState,howManyPlayerState]=useState(); 
  const {loginPlayerId, loginPlayerNickname}= location.state; //URL을 저장시켜주는 값이다.

  useEffect(() => {
     if (loginPlayerNum !== loginPlayerNumState) {
       setLoginPlayerNum(loginPlayerNum);
     }
     if (howManyPlayer !== howManyPlayerState) {
       setHowManyPlayer(howManyPlayer);
     }
   }, [loginPlayerNumState, howManyPlayerState]);


   function LoadLoginPlayerNum(){ //호출할 함수를 적어준다.
      return(
        <div>
          3456
        </div>
      )
   }

   function LoadHowManyPlayer(){
    return(
      <div>
        8970
      </div>
    )
   }

  return(
    <div>
    <button onClick={ToGame}>버튼</button>
    </div>
  );
}

export default WaitingRoom;