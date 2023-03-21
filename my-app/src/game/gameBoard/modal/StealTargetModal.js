import { useState, useEffect, useRef } from 'react';
import ModalCss from './StealTargetModal.css';
import { LoadActionData } from '../../gameMechanism/ExchangeServerInfo';
import { SavePlayersData, LoadPlayersData } from '../../gameMechanism/ExchangeServerInfo';

function StealTargetModal(props) {
    const { setModalOpen, stealTargetModalSelectedPlayer, setStealTargetModalSelectedPlayer, StealConfirm } = props;

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

        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
        };
    });

    let action = LoadActionData();
    let players = LoadPlayersData();

    return (
        // 모달창을 useRef로 잡아준다.
        <div ref={modalRef} className={`${ModalCss.ModalContainer} ${action}`}>
            {players ? (
                players.map((player) => (
                    <div key={player.player.id} className={`player${player.player.id}`}>
                        <p className={`player${player.player.id}-nickname`}># {player.player.nickName}</p>
                        <input
                            id={player.player.id}
                            value={player.player.nickName}
                            name={player.player.nickName}
                            type="radio"
                            checked={stealTargetModalSelectedPlayer === player.player.nickName}
                            onChange={() => setStealTargetModalSelectedPlayer(player.player.nickName)}
                        />
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
            <button onClick={() => StealConfirm()}>확인</button>
        </div>
    );
}

export default StealTargetModal;