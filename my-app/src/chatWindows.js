// 소켓 안 쓰고 그냥 useState로 입출력하는 코드
import React from 'react';
import styles from "./css/TestBoard.module.css";

function Chat() {
    const [message, setMessage] = React.useState("");
    const [name, setName] = React.useState("");
    const [chatLog, setChatLog] = React.useState([]);




    // 새로운 메시지가 추가될 때마다 자동으로 스크롤을 아래쪽으로 이동
    const messagesEndRef = React.useRef(null); // useRef를 이용하여 messagesEndRef 변수 생성
      // useEffect 등록
  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);


    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = { name, message };
        setChatLog([...chatLog, newMessage]);
        setName("");
        setMessage("");
    };

    return (
        <div>
            {/* 채팅 목록 */}
            <div className={styles.chatcontainer}>
                {chatLog.map((item, index) => (
                    <div className="text" key={index}>
                        <strong>{item.name}:</strong> {item.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
                {/*<div ref={messagesEndRef}></div>*/} {/* ref 속성을 이용하여 messagesEndRef 변수와 div 요소를 연결 */}
            </div>

            {/* 메시지 입력 폼 */}
            <form onSubmit={handleSubmit}>
                <label>
                    이름:
                    <input type="text" value={name} onChange={handleChangeName} />
                </label>
                <br />
                <label>
                    메시지:
                    <input
                        type="text"
                        value={message}
                        onChange={handleChangeMessage}
                    />
                </label>
                <br />
                <button type="submit">보내기</button>
            </form>
        </div>
    );
}

export default Chat;