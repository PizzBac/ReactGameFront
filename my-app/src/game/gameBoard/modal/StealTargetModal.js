import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import styles from './StealTargetModal.css';
import { LoadActionData } from '../../gameMechanism/ExchangeServerInfo';
import { cardImages } from '../player/card/Card';
import { SavePlayersData, LoadPlayersData } from '../../gameMechanism/ExchangeServerInfo';

function StealTargetModal(props) {
    const { setModalOpen, onConfirm, id, title, content, writer } = props;
    // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
    const closeModal = () => {
        setModalOpen(false);
    };

    // 모달 외부 클릭시 끄기 처리
    // Modal 창을 useRef로 취득
    const modalRef = useRef(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응

        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    let action = LoadActionData();

    function getCardImage(action) {
        switch (action) {
            case "Assassination":
                return cardImages.assassin.front;
            case "block":
                return cardImages.contessa.front;
            case "Tax":
                return cardImages.duke.front;
            case "Steal":
                return cardImages.captain.front;
            default:
                return cardImages.ambassador.front;
        }
    }

    let players = LoadPlayersData();

    return (
        // 모달창을 useRef로 잡아준다.
        // <div ref={modalRef} className={`${styles.ModalContainer} ${action}`}>
        //     <img src={getCardImage(action)} alt={`Card ${action}`} width={250} height={250}/>
        //     <button className={styles.confirm} onClick={() => {
        //         setModalOpen(false);
        //         onConfirm();
        //     }}>
        //         확인하기
        //     </button>
        //     <button className={styles.close} onClick={closeModal}>
        //         취소하기
        //     </button>
        // </div>
        <div ref={modalRef} className={`${styles.ModalContainer} ${action}`}>
            {players ? (
                players.map((player) => (
                    <div key={player.player.id + 1} className={`player${player.player.id + 1}`}>
                        <p className={`player${player.player.id + 1} nickname`}># {player.player.nickName}</p>
                        <input
                            id={player.player.id}
                            value={player.player.id}
                            name={player.player.nickName}
                            type="radio"
                            // checked={this.state.selectValue === "Mac"}
                            // onChange={this.handleChange}
                        />
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

// ModalBasic.propTypes = {
//     setModalOpen: PropTypes.func.isRequired,
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     writer: PropTypes.string.isRequired,
// };

export default StealTargetModal;