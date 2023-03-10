import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';

// 클라이언트 측에서 SockJS 객체를 생성하고 연결
// SockJS 객체를 생성할 때는 서버에서 사용하는 소켓 엔드포인트 URL을 전달해야 함
const socket = new SockJS('http://localhost:3001/socket');

export function Function() {

    const [chatLog, setChatLog] = React.useState([]);

    // 소켓이 연결되었을 때 실행
    socket.onopen = () => {
        console.log('소켓이 연결되었습니다.');
    };

    // socket.onmessage : 서버에서 데이터를 수신하면 자동으로 실행되는 함수
    // 받은 데이터를 상태(state)에 저장하거나 UI를 업데이트하는 위치
    // event.data를 통해 전달받은 데이터에 접근
    // JSON.parse : 데이터를 자바스크립트로 변환하는 함수
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
    }

    // onbeforeunload : 소켓 닫히기 전에 실행
    socket.onclose = () => {
        console.log('소켓이 닫히려고 합니다.');
    };

    // 서버와의 연결 종료
    // socket.close();

    // 소켓이 닫힌 후에 실행
    socket.onclose = () => {
        console.log('소켓 연결이 닫혔습니다.');
    };

    return { sendMessage, chatLog };
}

// function App() {
//     const [selectedValue, setSelectedValue] = useState(null); // 선택된 라디오 버튼의 값을 웹소켓으로 전달 후 다시 받아서 상태로 저장
    
//     // WebSocket에서 메시지를 수신할 때마다 실행되는 콜백 함수
//     socket.onmessage = (e) => {
//         const data = JSON.parse(e.data);
//         setSelectedValue(data.selectedValue); // 수신된 데이터를 상태로 저장
//     };

//     const handleRadioChange = (e) => {
//         const value = e.target.value;
//         setSelectedValue(value); // 선택한 값을 상태로 저장
//         socket.send(JSON.stringify({ selectedValue: value })); // SockJS로 선택한 값을 전송
//     };

//     console.log(selectedValue);

//     return (
//         <div>
//             <input type="radio" name="radio-group" value="1" checked={selectedValue === '1'} onChange={handleRadioChange} />
//             <input type="radio" name="radio-group" value="2" checked={selectedValue === '2'} onChange={handleRadioChange} />
//             <input type="radio" name="radio-group" value="3" checked={selectedValue === '3'} onChange={handleRadioChange} />
//         </div>
//     );
// }

export default App;