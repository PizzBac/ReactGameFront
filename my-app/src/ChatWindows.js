import React from 'react';
import styles from "./css/TestBoard.module.css";
import { FaPaperPlane } from "react-icons/fa";

// 소켓 안 쓰고 그냥 useState로 입출력하는 코드

function Chat() {
    // const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [chatLog, setChatLog] = React.useState([]);

    // 새로운 메시지가 추가될 때마다 자동으로 스크롤을 아래쪽으로 이동
    const messagesEndRef = React.useRef(null);
    React.useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    // const handleChangeName = (event) => {
    //     setName(event.target.value);
    // };

    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = { message };
        setChatLog([...chatLog, newMessage]);
        // setName("");
        setMessage("");
    };

    return (
        <div className={styles.chatWrapper}>
            {/* 채팅 목록 */}
            <div className={styles.chatcontainer} >
                {
                    chatLog.map((item, index) => (
                        <div className="text" key={index}>
                            {/* <strong>{item.name}:</strong> {item.message} */}
                            <strong>익명:</strong> {item.message}
                        </div>
                    ))
                }
                < div ref={messagesEndRef} />
                {/* ref 속성을 이용하여 messagesEndRef 변수와 div 요소를 연결 */}
            </div >
            {/* 메시지 입력 폼 */}
            <form onSubmit={handleSubmit}>
                {/* <label>
                    이름:
                    <input type="text" value={name} onChange={handleChangeName} />
                </label>
                <br /> */}
                <label className={styles.messageLabel}>
                    <input
                        className={styles.messageInput}
                        type="text"
                        value={message}
                        onChange={handleChangeMessage}
                        placeholder="메시지를 입력하세요"
                    />
                    {/* <button className={styles.submitBtn} type="submit"><i class="fa fa-paper-plane"></i></button> */}
                    <span className={styles.submitBtn} onClick={handleSubmit}>
                        <FaPaperPlane />
                    </span>
                </label>
            </form>
        </div>
    );
}

export default Chat;
