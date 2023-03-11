import React, { useState } from 'react';

function PassTurn(props) {
    const { howManyPlayer, loginPlayerNickname } = props;
    const [howManyPlayers, setHowManyPlayers] = useState(howManyPlayer);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentplayerCoin, setCurrentPlayerCoin] = useState(2);

    function WhosTurn(e) {
        setCurrentPlayer(e.target.value);
    }

    // 턴 시작 전 전체 플레이어 수와 현재 플레이어의 코인 수 체크
    function StartTurn() {
        if (currentplayerCoin >= 7) {
            return Coup();
        }
        if (currentplayerCoin >= 3) {
            return Assassination();
        }
        return BasicAction();
    }

    // 게임종료
    function EndGame() {
    }

    // 소득, 해외원조, 세금징수, 카드교환, 강탈
    function BasicAction() {
    }

    // 암살
    function Assassination() {
    }

    // 쿠데타
    function Coup() {
    }

    // 턴종료
    function EndTurn() {
        if (2 <= howManyPlayers) {
            return StartTurn();
            setCurrentPlayer(currentPlayer + 1);
            setCurrentPlayerCoin();
        }
        else if (howManyPlayers < 2) {
            return EndGame();
        }
    }

    return (
        <div>
            <p>{loginPlayerNickname}의 차례({currentPlayer}번 플레이어)</p>
            <select value={currentPlayer} onChange={WhosTurn}>
                <option value="1">Player 1</option>
                <option value="2">Player 2</option>
                <option value="3">Player 3</option>
                <option value="4">Player 4</option>
                <option value="5">Player 5</option>
                <option value="6">Player 6</option>
            </select>
        </div>
    );
}

export default PassTurn;