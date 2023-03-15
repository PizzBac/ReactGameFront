import React from 'react';
import styles from "../../css/TestBoard.module.css";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToTop from '../scrollTop';
// import SockJs from 'sockjs-client';

function ChatWindows(props) {
    const { loginPlayerId, loginPlayerNickname } = props;
    const [message, setMessage] = React.useState("");
    const [chatLog, setChatLog] = React.useState([]);

    // 새로운 메시지가 추가될 때마다 자동으로 스크롤을 아래쪽으로 이동
    const messagesEndRef = React.useRef(null);
    React.useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    function handleChangeMessage(event) {
        setMessage(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newMessage = { message };
        setChatLog([...chatLog, newMessage]);

        //소켓을 사용하여 서버에 메세지를 전송
        // const socket= new SockJs('http://localhost:8080/chat');
        setMessage("");
    };

    return (
        <ScrollToTop>
        <div className={styles.chatWrapper}>
            {/* 채팅 목록 */}
            <div className={styles.chatcontainer} >
                {
                    chatLog.map((item, index) => (
                        <div className="text" key={index+1}>
                            {/* <strong>{item.name}:</strong> {item.message} */}
                            <strong>{loginPlayerNickname}:</strong> {item.message}
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
        </ScrollToTop>
    );
}

export default ChatWindows;


