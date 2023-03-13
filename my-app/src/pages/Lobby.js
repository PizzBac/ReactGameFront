import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Lobby.css';
import { useState,useEffect} from "react";
import { PieChart } from 'react-minimal-pie-chart';

function User({userData}) {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('white');
    const colors = ['skyblue', '#04B4AE', 'yellowgreen', 'yellow', 'orange', 'red'];
    // const navigate=useNavigate();
    // const location= useLocation();
    // const [howManyPlayer, setHowManyPlayer] = useState(3);
    // const [loginPlayerNum, setLoginPlayerNum] = useState(3);
    // const { loginPlayerId, loginPlayerNickname } = location.state;
    // console.log('state', location.state);


    function handleClick(event) {
        setCount(count + 1);
        setColor(colors[count % colors.length]);
            // event.preventDefault();
            // navigate('/game', {
            //     state: {
            //         howManyPlayer: howManyPlayer,
            //         loginPlayerId: loginPlayerId,
            //         loginPlayerNum: loginPlayerNum,
            //         loginPlayerNickname: loginPlayerNickname,
            //     },
            // });
        }
      

      
  useEffect(() => {
    setColor(colors[count-1 % colors.length]);
  }, [count]);

    // function handleClick(){
    //     setColor(['skyblue','yellowgreen','green','yellow','orange','red']);
    // }
   if(count==7){
    setCount(6) ;
   }

   if(count==7){
    alert('방이 꽉 찼습니다.');
   }

   if(count==7){
    setColor('red');
   }

 
    return(
        
<div>
    {/* <tr>
                <th className="Channel">방이름</th>
            
                <th className="People"></th>
            </tr> */}
        <tr>
            <td className="tdFirst">{userData.name}번방 </td>

            <td className="tdSecond"><button style={{ backgroundColor: color }} onClick={handleClick} ><p className="tdSecond">{count} /6명</p></button></td>
        </tr>
</div>

    )
        };

function UserList(){

    
    const navigate=useNavigate();
    const location= useLocation();

    const [howManyPlayer, setHowManyPlayer] = useState(3);
    const [loginPlayerNum, setLoginPlayerNum] = useState(3);

    const { loginPlayerId, loginPlayerNickname } = location.state;
    console.log('state', location.state);

    function GameStart(event){
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
    function Exit(event){
        event.preventDefault();
        navigate("/Login");
    }
    function LoginBtn(event){
        event.preventDefault();
        navigate("/Login");
    }
    const users = [
        {email:'1', name:'1'},
        {email:'2', name:'2'},
        {email:'3', name:'3'},
        {email:'4', name:'4'},
        {email:'5', name:'5'},
        {email:'6', name:'6'}

    ];
     
    return(
   
        <div className="BackGround">
            <div>
                <h1 className="LobbyTitle">Welcome to the Coup!</h1>
                <div>
                    <h3 className="SubTitle1">원하는 인원수를 선택하세요
                        <select
                            value={howManyPlayer} // 현재 선택한 값을 표시
                            onChange={(e) => setHowManyPlayer(parseInt(e.target.value))} // 선택한 값을 저장
                        >
                            {[...Array(5)].map((_, i) => (
                                <option key={i+2} value={i + 2}>{i + 2}인방</option>
                            ))}
                        </select></h3><br />
                    <h3 className="SubTitle2">자신의 위치를 선택하세요
                        <select
                            value={loginPlayerNum}
                            onChange={(ev) => setLoginPlayerNum(parseInt(ev.target.value))}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i+1} value={i + 1}>{i + 1}번</option>
                            ))}
                        </select></h3>
                    <button className="GameStart" onClick={GameStart}>Game Start</button>
                    <button className="Exit" onClick={Exit}>Exit</button>
                    <button className="imgdoor" onClick={LoginBtn}>로그아웃</button>
                <button className="Setting" onClick={LoginBtn}>환경설정</button>
                </div>
      
                <div>
        <table>
        <thead>
            {/* <tr>
                <th className="Channel">방이름</th>
            
                <th className="People">가나다</th>
            </tr> */}
        </thead>
        <tbody>
          {users.map((user)=>(
            <User userData={user}/>
          ))}
        </tbody>
    </table>
    </div>
        </div>
        </div>

    );
}
export default UserList;