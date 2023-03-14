import React, { useEffect, useState } from 'react';

function Turn(props) {
    const { howManyPlayer, players } = props;
    const [howManyPlayers, setHowManyPlayers] = useState(howManyPlayer);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentplayerCoin, setCurrentPlayerCoin] = useState(2);

    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [incomeButtonDisabled, setIncomeButtonDisabled] = useState(!false);
    const [foreignAidButtonDisabled, setForeignAidButtonDisabled] = useState(!false);
    const [stealButtonDisabled, setStealButtonDisabled] = useState(!false);
    const [exchangeButtonDisabled, setExchangeButtonDisabled] = useState(!false);
    const [taxButtonDisabled, setTaxButtonDisabled] = useState(!false);
    const [assassinationButtonDisabled, setAssassinationButtonDisabled] = useState(!false);
    const [coupButtonDisabled, setCoupButtonDisabled] = useState(!false);

    function loadPlayersData() {
        const players = localStorage.getItem('players');
        return players ? JSON.parse(players) : null;
    }

    // 무조건 시작될 때 렌더링 필요
    players[currentPlayer].player.myTurn = true;

    // 현재 턴 플레이어 정보를 가져와야 함
    // 턴 시작 전 전체 플레이어 수와 현재 플레이어의 코인 수 체크
    function StartTurn() {
        console.log("턴 시작" + currentPlayer);
        loadPlayersData();
        console.log(players)

        return SelectAction();
    }

    // 행동 선택
    function SelectAction() {
        const currentplayerCoin = players[currentPlayer].player.coins;
        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        setStealButtonDisabled((prev) => !prev);
        setExchangeButtonDisabled((prev) => !prev);
        setTaxButtonDisabled((prev) => !prev);
        if (currentplayerCoin >= 3) {
            setAssassinationButtonDisabled((prev) => !prev);
        }
        if (currentplayerCoin >= 7) {
            setCoupButtonDisabled((prev) => !prev);
        }
    }

    function Income() {
        console.log("소득" + currentPlayer);
        players[currentPlayer].player.coins = players[currentPlayer].player.coins + 1;
        EndTurn();
    }
    function ForeignAid() {
        console.log("원조" + currentPlayer);
        // // 방해 여부 확인
        // const [isObstructed, setIsObstructed] = useState(false);

        // // 플레이어 방해 여부 상태 바꾸는 코드 필요

        // // 플레이어 리스트와 방해 여부를 검사
        // function CheckObstruction(players) {
        //     for (const player of players) {
        //         // 현재 턴인 플레이어는 방해할 수 없음
        //         if (player.myTurn === true) {
        //             return false;
        //         }
        //         // 그 외 플레이어들의 방해 여부 확인
        //         if (player.myTurn !== true && player.isObstructing === true) {
        //             setIsObstructed(true);
        //         }
        //     }
        //     if (isObstructed) {
        //         IsObstruction();
        //     }
        //     else {
        //         // 현재 턴 유저 2코인 획득
        //     }
        // }

        // function IsObstruction() {
        //     // 방해한 플레이어 의심 여부 확인 필요
        // }
        // // 의심 없을 시
        // // 의심 있을 시
        EndTurn();
    }

    function Tax() {
        console.log("세금");
        EndTurn();
    }
    function Exchange() {
        console.log("교환");
        EndTurn();
    }
    function Steal() {
        console.log("강탈");
        EndTurn();
    }

    function Assassination() {
        console.log("암살");
        EndTurn();
    }

    function Coup() {
        console.log("쿠!");
        EndTurn();
    }

    function EndTurn() {
        players[currentPlayer].player.myTurn = false;
        console.log("턴 종료" + currentPlayer);
        if (currentPlayer === players.length - 1) {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer(prev => prev + 1)
        }

        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        setStealButtonDisabled((prev) => !prev);
        setExchangeButtonDisabled((prev) => !prev);
        setTaxButtonDisabled((prev) => !prev);
        if (assassinationButtonDisabled === false) {
            setAssassinationButtonDisabled((prev) => !prev);
        }
        if (coupButtonDisabled === false) {
            setCoupButtonDisabled((prev) => !prev);
        }

        if (howManyPlayer < 2) {
            return EndGame();
        }
        return StartTurn();
    }

    function EndGame() {
        console.log("게임 종료");
    }

    return (
        <div>
            <div style={{ position: 'absolute', backgroundColor: '#FFFFFF', right: 30, bottom: 30, height: 30 }}>
                <button id="startTurn" onClick={StartTurn} disabled={startButtonDisabled}>턴시작</button>
                <button id="income" onClick={Income} disabled={incomeButtonDisabled}>소득</button>
                <button id="foreignAid" onClick={ForeignAid} disabled={foreignAidButtonDisabled}>해외원조</button>
                <button id="tax" onClick={Tax} disabled={taxButtonDisabled}>세금징수</button>
                <button id="exchange" onClick={Exchange} disabled={exchangeButtonDisabled}>카드교환</button>
                <button id="steal" onClick={Steal} disabled={stealButtonDisabled}>강탈</button>
                <button id="assassination" onClick={Assassination} disabled={assassinationButtonDisabled}>암살</button>
                <button id="coup" onClick={Coup} disabled={coupButtonDisabled}>쿠데타</button>
                <button id="endTurn" onClick={EndTurn}>턴종료</button>
                <button id="endGame" onClick={EndGame}>게임종료</button>
            </div>
        </div>
    )
}

export default Turn;