import React, { useState } from 'react';

function Turn(props) {
    const { howManyPlayer, players } = props;
    const [howManyPlayers, setHowManyPlayers] = useState(howManyPlayer);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentplayerCoin, setCurrentPlayerCoin] = useState(2);

    // 현재 턴 플레이어 정보를 가져와야 함
    // 턴 시작 전 전체 플레이어 수와 현재 플레이어의 코인 수 체크
    function StartTurn() {
        if (howManyPlayers < 2) {
            EndGame();
        }
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
        // 현재 턴 플레이어 코인 1 증가
        EndTurn();
    }
    function ForeignAid() {
        // 방해 여부 확인
        const [isObstructed, setIsObstructed] = useState(false);

        // 플레이어 방해 여부 상태 바꾸는 코드 필요

        // 플레이어 리스트와 방해 여부를 검사
        function CheckObstruction(players) {
            for (const player of players) {
                // 현재 턴인 플레이어는 방해할 수 없음
                if (player.myTurn === true) {
                    return false;
                }
                // 그 외 플레이어들의 방해 여부 확인
                if (player.myTurn !== true && player.isObstructing === true) {
                    setIsObstructed(true);
                }
            }
            if(isObstructed) {
                IsObstruction();
            }
            else {
                // 현재 턴 유저 2코인 획득
            }
        }

        function IsObstruction() {
            // 방해한 플레이어 의심 여부 확인 필요
        }


        // 의심 없을 시
        // 의심 있을 시

    }

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