// 턴 넘기기 기능 아직 미구현임

import React, { useState } from 'react';

function PassTurn(props) {
    const { loginPlayerNumber } = props;
    const [playerTurn, setPlayerTurn] = useState(loginPlayerNumber);

    // function updatePlayerTurn(value) {
    //   setPlayerTurn(value);
    // }
    function WhosTurn(e) {
        setPlayerTurn(e.target.value);
    }

    console.log(playerTurn);

    return (
        <div>
            <p>{playerTurn}번 플레이어의 차례</p>
            <select value={playerTurn} onChange={WhosTurn}>
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