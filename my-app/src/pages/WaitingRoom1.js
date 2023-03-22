import React from "react";
import '../css/WaitingRoom.css';
import {useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { WaitingRoomToGame } from "../Navigation";
import { SaveRoomData } from "../game/gameMechanism/ExchangeServerInfo";

function WaitingRoom(){

  const navigate=useNavigate();
  const location= useLocation();

  const [howManyPlayer,setHowManyPlayer]= useState(0);
  const [loginPlayerNum,setLoginPlayerNum]= useState(0); 
  const [loginPlayerNumState,setLoginPlayerNumState]=useState(0); 
  const [howManyPlayerState, setHowManyPlayerState]= useState(0);

  const {loginPlayerId, loginPlayerNickname}= location.state;

   //LoadHowManyPlayer 함수를 호출하고, 그 결과를 howManyPlayer 변수에 할당하고 있다.
   //LoadLoginPlayerNum 함수를 호출하고, 그 결과를 loginPlayerNum 변수에 할당하고 있다. 
   


  useEffect(() => {
     if (loginPlayerNum!== loginPlayerNumState){ //2개의 값이 다르다면 setLoginPlayerNum함수를 호출
      //애네를 통해서 loginPlayerNumState와 howManyPlayerState의 값이 변경될 때마다 해당 값을 컴포넌트의 상태 변수에 반영가능
       setLoginPlayerNum(loginPlayerNum);
     }
     if (howManyPlayer!== howManyPlayerState){
       setHowManyPlayer(howManyPlayer);
     }
   }, [loginPlayerNumState, howManyPlayerState]);


   function LoadLoginPlayerNum(){ 
    WaitingRoomToGame();//호출할 함수를 적어준다.
     //만약 플레이어가 1명이면, 1명것만 가지고 오게 해야 함.

   }

   function LoadHowManyPlayer(){
    WaitingRoomToGame();
   }

   function handleClick(){
    WaitingRoomToGame();
   }
   return(
    <div>
    <button className="toGame" onClick={() => {
      handleClick();
      LoadLoginPlayerNum();
      LoadHowManyPlayer();
    }}>
      Button
    </button>
  </div>
  
  );
   }

export default WaitingRoom;