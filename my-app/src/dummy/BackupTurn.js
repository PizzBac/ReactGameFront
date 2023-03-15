import React, { useEffect, useState } from 'react';

function Turn(props) {
    const { howManyPlayer, players } = props;
    const [loginPlayer, setLoginPlayer] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentplayerCoin, setCurrentplayerCoin] = useState(0);
    const [whatAction, setWhatAction] = useState("")

    const [whoDoubt, setWhoDoubt] = useState(null);

    const [whoObstruct, setWhoObstruct] = useState(null);
    const [obstructTime, setObstructTime] = useState(Infinity);

    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [incomeButtonDisabled, setIncomeButtonDisabled] = useState(!false);
    const [foreignAidButtonDisabled, setForeignAidButtonDisabled] = useState(!false);
    const [taxButtonDisabled, setTaxButtonDisabled] = useState(!false);
    const [exchangeButtonDisabled, setExchangeButtonDisabled] = useState(!false);
    const [stealButtonDisabled, setStealButtonDisabled] = useState(!false);
    const [assassinationButtonDisabled, setAssassinationButtonDisabled] = useState(!false);
    const [coupButtonDisabled, setCoupButtonDisabled] = useState(!false);

    function loadPlayersData() {
        const players = localStorage.getItem('players');
        return players ? JSON.parse(players) : null;
    }

    useEffect(() => {
        loadPlayersData();
        console.log("현재 액션: "+whatAction);
        console.log(players);
    });

    useEffect(() => {
        StartTurn();
    }, []);

    useEffect(() => {
        players[currentPlayer].player.myTurn = true;
    }, [StartTurn]);

    function StartTurn() {
        SelectAction();
        setWhatAction("StartTurn");
        console.log((currentPlayer + 1) + "번 플레이어의 턴");

    }

    // 행동 선택
    function SelectAction() {
        setCurrentplayerCoin(players[currentPlayer].player.coins);
        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        setTaxButtonDisabled((prev) => !prev);
        setExchangeButtonDisabled((prev) => !prev);
        setStealButtonDisabled((prev) => !prev);
        if (currentplayerCoin >= 3) {
            setAssassinationButtonDisabled((prev) => !prev);
        }
        if (currentplayerCoin >= 7) {
            setCoupButtonDisabled((prev) => !prev);
        }
    }

    function IsDoubt() {
        if (whatAction === "ForeignAid") {

        } else if (whatAction === "Tax") {

        } else if (whatAction === "Exchange") {

        } else if (whatAction === "Steal") {

        } else if (whatAction === "Assassination") {

        }
        // 누가 먼저 의심했는지 확인 필요
        if ("bluff") {

        }
    }

    function Income() {
        console.log((currentPlayer + 1) + "번 플레이어 소득 획득");
        console.log((players[currentPlayer].player.coins) + "번 플레이어 코인");
        players[currentPlayer].player.coins = players[currentPlayer].player.coins + 1;
        console.log((players[currentPlayer].player.coins) + "번 플레이어 코인");
        setWhatAction("Income");
        EndTurn();
    }

    function ForeignAid() {
        console.log("원조" + currentPlayer);
        setWhatAction("ForeignAid");

        // 방해 여부 확인
        // 현재 턴인 플레이어 제외한 다른 플레이어들에게 UI로 화면 띄우는 기능 필요 - 서버에서 브로드캐스팅해야 함
        const checkObstruct = window.confirm(
            `${players[currentPlayer].player.nickName}님이 해외 원조를 받으려고 합니다. 방해하시겠습니까? (방해 가능 직업 : 공작)`
        );

        if (checkObstruct) {
            return IsObstruction();
        } else {
            players[currentPlayer].player.coins = players[currentPlayer].player.coins + 2;
            return EndTurn();
        }
    }

    function IsObstruction() {
        if (whatAction === "ForeignAid") {
            for (const player of players) {
                if (player.buttonPressedTime < obstructTime) {
                    setWhoObstruct(player);
                    setObstructTime(player.buttonPressedTime);
                    player.isObstructing = true;
                }
            }
            IsDoubt();
        } else if (whatAction === "Tax") {

        } else if (whatAction === "Exchange") {

        } else if (whatAction === "Steal") {

        } else if (whatAction === "Assassination") {

        }
    }

    function Tax() {
        console.log("세금");
        return EndTurn();
    }

    function Exchange() {
        console.log("교환" + currentPlayer);

        // 남은 카드 배열을 가져와야함

        // UI 로 카드 선택
        // const keepIndex = window.prompt(
        //     shuffled.map((card, i) => `${i + 1}. ${card}`).join('\n') + '\n\n교환할 카드의 번호를 입력해주세요. (1~2)'
        // );
        // if (keepIndex === null) {
        //     // 취소한 경우
        //     return;
        // }
        // const keep = parseInt(keepIndex) - 1;
        // if (isNaN(keep) || keep < 0 || keep >= 2) {
        //     // 잘못된 입력인 경우
        //     window.alert('잘못된 입력입니다.');
        //     return Exchange();
        // }

        // // 교환할 카드
        // const discard = cards.filter((_, i) => i !== keep)[0];

        // // 덱에서 새 카드를 가져와서 교환
        // const deck = localStorage.getItem('deck');
        // const remainingCards = JSON.parse(deck);

        return EndTurn();
    }
    function Steal() {
        console.log("강탈");

        // 강탈 가능한 대상 확인 필요
        // let stealAvailable = [];
        // for (let i = 0; i < howManyPlayers; i++) {
        //     const player = players[i].player;
        //     // 자신이거나 이미 돈이 없는 경우 제외
        //     if (i === currentPlayer || player.coins === 0) {
        //         continue;
        //     }
        //     stealAvailable.push({ index: i, nickName: player.nickName });
        // }

        // 상대방 선택 UI
        // const opponentIndex = window.prompt(
        //     stealAvailable.map((p) => `${p.index + 1}. ${p.nickName}`).join('\n') + '\n\n강탈할 상대방 번호를 입력해주세요. (1~' + stealAvailable.length + ')'
        // );

        // if (opponentIndex === null) {
        //     // 취소한 경우
        //     return;
        // }
        // const index = parseInt(opponentIndex) - 1;
        // if (isNaN(index) || index < 0 || index >= stealAvailable.length) {
        //     // 잘못된 입력인 경우
        //     window.alert('잘못된 입력입니다.');
        //     return Steal();
        // }

        // 상대방 돈을 가져옴
        // const opponent = stealAvailable[index];
        // players[currentPlayer].player.coins += 2;
        // players[opponent.index].player.coins -= 2;

        return EndTurn();
    }

    function Assassination() {
        console.log("암살");
        return EndTurn();
    }

    function Coup() {
        console.log("쿠!");
        return EndTurn();
    }

    // 게임 도중에 사람 나갔는지 확인하는 기능 필요. 자신의 행동일 때 일정 시간 이상 행동하지 않으면 나간 것으로 간주?
    
    function EndTurn() {
        players[currentPlayer].player.myTurn = false;
        console.log((currentPlayer + 1) + "번 플레이어 턴 종료");

        setCurrentPlayer((prev) => ((prev + 1) % (howManyPlayer)));
        console.log("다음 턴은 " + (currentPlayer + 1) + "번 플레이어의 차례입니다.");

        setWhatAction("EndTurn");

        setStartButtonDisabled((prev) => !prev);
        setIncomeButtonDisabled((prev) => !prev);
        setForeignAidButtonDisabled((prev) => !prev);
        setTaxButtonDisabled((prev) => !prev);
        setExchangeButtonDisabled((prev) => !prev);
        setStealButtonDisabled((prev) => !prev);
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
                <button id="obstruction" onClick={IsObstruction}>방해</button>
                <button id="doubt" onClick={IsDoubt}>의심</button>
                {/* <button id="endTurn" onClick={EndTurn}>턴종료</button> */}
                <button id="endGame" onClick={EndGame}>게임종료</button>
            </div>
        </div>
    )
}
export default Turn;