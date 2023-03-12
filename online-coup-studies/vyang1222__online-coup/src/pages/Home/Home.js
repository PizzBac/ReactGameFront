import React, {useState, useEffect} from "react";
import Lobby from "../Lobby/Lobby";
import {api} from "../../LobbyAPI";
import "./Home.css";

function Home(props){
  const {history} =props;
  //전달하는 객체인 props를 활용하여 history 객체를 참조하여 페이지 이동을 수행하는 등의 작업을 수행할 수 있습니다.
  //예를 들어, 다음과 같이 history.push() 메소드를 사용하여 /about 경로로 이동할 수 있습니다:
  //const handleClick = () => {
//     history.push('/about');
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <button onClick={handleClick}>Go to About Page</button>
//     </div>
//   );
// }

const maxNameLengt= 12;
const roomIDLength = 6;

const [room, setRoom]= useState("");
const [jName,setJName] = useState("");
const jNameCount= maxNameLength -jName.length;
const [num, setNum] = useState(2);
const [cName, setCName] = useState("");
const cNameCount = maxNameLengt- cName.length;
const [errMsg, setErrMsg]= useState("");
//당연하지만 전부 다 useState이다.
//useState안에 있는 2는 num의 기본값이고, 2를 변경하고 싶을 때는 setNum으로 바꾸면 된다.

//handle URl to a room that doesn't exist
useEffect(()=>{
  let timer;
  if(history.location.state && history.location.state.invalidRoom){
    setErrMsg("room does not exist!");
    //reset error message
    timer= setTimeout(()=>{
      setErrMsg("");
      history.replace();
    },4000);
    //이게 timer 함수이다. 4000= 4초를 의미한다.
  }
  return()=>{
    clearTimeout(timer)
  };
},[history]);

//restrict inputs, specifically spaces (inspired by http://secert-hilter.online/)
function handleKeyDown(e, text){
  if(e.key === ""){
    if(text){
      if(text.length===0 || text.substring(text.length-1, text.length)===""){
        e.preventDefault();
        //이벤트의 기본 동작을 막기 위해 사용되는 함수
      }
    }else{
      e.preventDefault();
    }
    
  };

  //store user information to localStorage touse later when we arrive at teh room
  function saveInfo(name, id, credentials){
    localStorage.setItem("name",name);
    localStorage.setItem("id",id);
    localStorage.setItem("credentials", credentials);
  };
  
 const joinRoom = async(roomID,name)=>{
  try{
    const players= await api.getPlayers(roomID);
    const uniqueName= 
    players
    .filter((player)=>player.name)
    .map((player)=>player.name)
    .indexOf(name)===-1;
    if(uniqueName){
      //find first empey seat= 빈자리를 찾는다(아마 자리배치 인듯)
      const id= players.find((player)=> !player.name).id;
      api.joinRoom(roomID, id, name).then((credentials)=>{
        saveInfo(name,id,credentials);
        history.push("/rooms/"+roomID);
      });
    }else{
      //handle name conflict error
      setErrMsg("name already taken!!");
      setJName("");
      document.getElementById("joinName").value="";
    }
  }catch(err){
    /*
     ---To-Do: setErrMsg("room is full") here if that's the case. currently it's "room does not exist" in both cases---
    */
  }
 }

  }

}
}