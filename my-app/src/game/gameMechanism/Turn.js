import React, { useEffect, useState } from 'react';

function Turn(props) {
    const { howManyPlayer } = props;
    const [loginPlayer, setLoginPlayer] = useState(1);
    const [whatAction, setWhatAction] = useState("")
    const [whosTurn, setWhosTurn] = useState("")

    const [yesDoubt, setYesDoubt] = useState(false);
    const [whoDoubt, setWhoDoubt] = useState(null);

    const [yesObstruct, setYesObstruct] = useState(false);
    const [whoObstruct, setWhoObstruct] = useState(null);
    const [obstructTime, setObstructTime] = useState(Infinity);

    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [incomeButtonDisabled, setIncomeButtonDisabled] = useState(!false);
    const [foreignAidButtonDisabled, setForeignAidButtonDisabled] = useState(!false);
    const [assassinationButtonDisabled, setAssassinationButtonDisabled] = useState(!false);

    function savePlayersData(players) {
        localStorage.setItem('players', JSON.stringify(players));
    }
    function loadPlayersData() {
        const players = localStorage.getItem('players');
        return players ? JSON.parse(players) : null;
    }

    function saveTurnData(turn) {
        localStorage.setItem('turn', turn.toString());
    }
    function loadTurnData() {
        let turn = localStorage.getItem('turn');
        turn = turn ? parseInt(turn) : 0;
        return turn;
    }

    function saveActionData(action) {
        localStorage.setItem('action', action);
    }
    function loadActionData() {
        let action = localStorage.getItem('action');
        action = action ? action : null;
        return turn;
    }

    function saveObstructingPlayer(obstructingPlayer) {
        localStorage.setItem('obstructingPlayer', obstructingPlayer);
    }
    function loadObstructingPlayer() {
        let obstructingPlayer = localStorage.getItem('obstructingPlayer');
        obstructingPlayer = obstructingPlayer ? obstructingPlayer : null;
        return obstructingPlayer;
    }

    let players = loadPlayersData();
    let turn = loadTurnData();
    let action = loadActionData();
    let obstructingPlayer = loadObstructingPlayer();

    useEffect(() => {
        StartTurn();
    }, []);

    useEffect(() => {
        savePlayersData(players);
        players = loadPlayersData();
        saveTurnData(turn);
        turn = loadTurnData();
        saveActionData(action);
        action = loadActionData();
        saveObstructingPlayer(obstructingPlayer);
        obstructingPlayer = loadObstructingPlayer();
    });

    function StartTurn() {
        console.log(players);
        console.log((turn + 1) + "번 플레이어의 턴 시작");
        players[turn].player.myTurn = !(players[turn].player.myTurn);
        savePlayersData(players);
        players = loadPlayersData();
        SelectAction();
    }

    // 행동 선택
    function SelectAction() {
        const currentTurnPlayerCoin = players[turn].player.coins;
        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        if (currentTurnPlayerCoin >= 3) {
            setAssassinationButtonDisabled((prev) => !prev);
        }
    }

    function Income() {
        console.log((turn + 1) + "번 플레이어가 소득 선택");
        action = "Income";
        players[turn].player.coins = players[turn].player.coins + 1;
        EndTurn();
    }

    function ForeignAid() {
        console.log((turn + 1) + "번 플레이어가 해외 원조 선택");
        action = "ForeignAid";

        // 현재 턴인 플레이어 제외한 다른 플레이어들에게 UI로 화면 띄우는 기능 필요
        // 서버에서 브로드캐스팅해야 함
        const startTime = new Date().getTime();
        const checkObstruct = window.confirm(
            `${players[turn].player.nickName}님이 해외 원조를 받으려고 합니다. 방해하시겠습니까? (방해 가능 직업 : 공작)`
        );
        const endTime = new Date().getTime();
        const buttonPressedTime = endTime - startTime;
        if (checkObstruct) {
            players[loginPlayer].player.obstructButtonPressedTime = buttonPressedTime;
            savePlayersData(players);
            players = loadPlayersData();
            setYesObstruct(prev => !prev);
            IsObstruction();
            console.log("의심");
        } else {
            players[turn].player.coins = players[turn].player.coins + 2;
            EndTurn();
        }
    }

    function IsObstruction() {
        if (action === "ForeignAid") {
            // 브로드캐스팅
            for (const player of players) {
                if (player.buttonPressedTime < obstructTime) {
                    player.isObstructing = true;
                    obstructingPlayer = player;
                    saveObstructingPlayer(obstructingPlayer);
                    obstructingPlayer = loadObstructingPlayer();
                }
            }
            IsDoubt();
        } else if (action === "Tax") {

        } else if (action === "Exchange") {

        } else if (action === "Steal") {

        } else if (action === "Assassination") {

        }
    }

    function IsDoubt() {
        if (action === "ForeignAid") {
            const checkDoubt = window.confirm(
                `${obstructingPlayer.nickName}님이 해외 원조를 막으려고 합니다. 의심하시겠습니까? (해외 원조 방해 가능 직업 : 공작)`
            );

            for (const player of players) {
                if (checkDoubt === true) {
                    player.player.buttonPressedTime = new Date().getTime();
                    setYesDoubt(prev => !prev);
                }
            };
        } else if (action === "Tax") {

        } else if (action === "Exchange") {

        } else if (action === "Steal") {

        } else if (action === "Assassination") {

        }
        // 누가 먼저 의심했는지 확인 필요
        if ("bluff") {

        }
    }

    function Assassination() {
        console.log("암살");
        EndTurn();
    }

    function EndTurn() {
        players[turn].player.myTurn = !(players[turn].player.myTurn);
        turn = (turn + 1) % howManyPlayer;
        savePlayersData(players);
        players = loadPlayersData();
        saveTurnData(turn);
        turn = loadTurnData();

        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        if (assassinationButtonDisabled === false) {
            setAssassinationButtonDisabled((prev) => !prev);
        }

        if (howManyPlayer < 2) {
            EndGame();
        }
        StartTurn();
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
                <button id="assassination" onClick={Assassination} disabled={assassinationButtonDisabled}>암살</button>
                <button id="obstruction" onClick={IsObstruction}>방해</button>
                <button id="doubt" onClick={IsDoubt}>의심</button>
                {/* <button id="endTurn" onClick={EndTurn}>턴종료</button> */}
                <button id="endGame" onClick={EndGame}>게임종료</button>
            </div>
        </div>
    )
}
export default Turn;