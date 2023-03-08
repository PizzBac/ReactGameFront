import { useState, useEffect } from 'react';

function CardFrontBack(props) {
    const { playerNumber, activate } = props;

    // 카드 이미지의 상태(앞면/뒷면)를 useState로 관리
    const [cardState, setCardState] = useState({
        assassin: 'back',
        contessa: 'back',
        duke: 'back',
        ambassador: 'back',
        captain: 'back',
    });

    // 카드 이미지 파일 경로를 객체로 저장
    const cardImages = {
        assassin: {
            front: require('../css/images/assassin.png'),
            back: require('../css/images/back.png'),
        },
        contessa: {
            front: require('../css/images/contessa.png'),
            back: require('../css/images/back.png'),
        },
        duke: {
            front: require('../css/images/duke.png'),
            back: require('../css/images/back.png'),
        },
        ambassador: {
            front: require('../css/images/ambassador.png'),
            back: require('../css/images/back.png'),
        },
        captain: {
            front: require('../css/images/captain.png'),
            back: require('../css/images/back.png'),
        },
    };

    // CardFrontBack.js 컴포넌트에서 useEffect 훅을 사용하여 playerNumber가 변경될 때마다 카드 상태를 업데이트
    useEffect(() => {
        setCardState((prevState) => {
            // 스프레드 연산자 ...를 사용하여 이전 상태를 복사하여 기존 객체를 변경하지 않으면서 새로운 객체를 생성
            const newState = { ...prevState };
            // playerNumber 값이 1이면 assassin, contessa 카드로, 2이면 duke, captain 카드로 설정
            const playerCard = playerNumber === 1 ? ['assassin', 'contessa'] : ['duke', 'captain'];

            // newState 객체의 프로퍼티들을 순회하면서 playerCard 배열에 있는 카드면 'front', 아니면 'back'으로 설정
            Object.keys(newState).forEach((key) => {
                newState[key] = playerCard.includes(key) ? 'front' : 'back';
            });
            return newState;
        });
    }, [playerNumber]);

    // 카드 상태에 따라 카드의 앞뒷면을 보여주는 div 렌더링
    return (
        <div className={`card-front-back${activate ? ' active' : ''}`}>
            {Object.keys(cardState).map((key) => (
                <img
                    key={key}
                    src={cardImages[key][cardState[key]]}
                    alt={key}
                />
            ))}
        </div>
    );
}

export default CardFrontBack;