import React, { useState } from 'react';

function Turn(props) {
    const { howManyPlayer, players } = props;
    const [howManyPlayers, setHowManyPlayers] = useState(howManyPlayer);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentplayerCoin, setCurrentPlayerCoin] = useState(2);

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

    function EndGame() { }

    function Income() {
        // const updatedPlayers = [...players];
        // updatedPlayers[currentPlayer - 1].coins += incomeAmount;
        // setCurrentPlayerCoin(updatedPlayers[currentPlayer - 1].coins);
        // EndTurn();
    }
    function ForeignAid() { }
    function Tax() { }
    function Exchange() { }
    function Steal() { }

    function BasicAction() {
        Income();
        ForeignAid();
        Tax();
        Exchange();
        Steal();
    }

    function Assassination() { }

    function Coup() { }

    function EndTurn() {
        setCurrentPlayer((currentPlayer + 1) % players.length);
        if (2 <= howManyPlayers) {

            // return StartTurn();
            // setCurrentPlayerCoin();
        }
        else if (howManyPlayers < 2) {
            // return EndGame();
        }
    }

    return (
        <div>
            <button onClick={Income}>소득</button>
            <button onClick={ForeignAid}>해외원조</button>
            <button onClick={Tax}>세금징수</button>
            <button onClick={Exchange}>카드교환</button>
            <button onClick={Steal}>강탈</button>
            <button onClick={Assassination}>암살</button>
            <button onClick={Coup}>쿠데타</button>
        </div>
    )
}

export default Turn;