import React, { useEffect, useState } from 'react';
import { cardImages, shuffleDeck } from '../gameBoard/player/card/Card';
import { SaveDeckData, LoadDeckData, SaveTotalPlayersData, LoadTotalPlayersData, SavePlayersData, LoadPlayersData, SaveTurnData, LoadTurnData, SaveActionData, LoadActionData, SaveObstructingPlayer, LoadObstructingPlayer, SaveDoubtingPlayer, LoadDoubtingPlayer } from './ExchangeServerInfo';
import { StartTurn } from './StartTurn';
import { ActionButtonState, AfterSelectActionDisableActionButton } from './SelectAction';
import { EndGame } from './EndGame';

function Turn(props) {
    const { howManyPlayer } = props;
    const [loginPlayer, setLoginPlayer] = useState(1);
    const [whatAction, setWhatAction] = useState("")
    const [whosTurn, setWhosTurn] = useState("")

    const [yesDoubt, setYesDoubt] = useState(false);
    const [whoDoubt, setWhoDoubt] = useState(null);
    const [doubtTime, setDoubtTime] = useState(Infinity);

    const [whoObstruct, setWhoObstruct] = useState(null);
    const [obstructTime, setObstructTime] = useState(Infinity);

    const {
        incomeButtonDisabled, setIncomeButtonDisabled,
        foreignAidButtonDisabled, setForeignAidButtonDisabled,
        taxButtonDisabled, setTaxButtonDisabled,
        exchangeButtonDisabled, setExchangeButtonDisabled,
        stealButtonDisabled, setStealButtonDisabled,
        assassinationButtonDisabled, setAssassinationButtonDisabled,
        coupButtonDisabled, setCoupButtonDisabled,
    } = ActionButtonState();

    SaveTotalPlayersData(6);

    // 푸시용으로 일부 수정

    let deck = LoadDeckData();
    let totalPlayers = LoadTotalPlayersData();
    let players = LoadPlayersData();
    let turn = LoadTurnData();
    let action = LoadActionData();
    let obstructingPlayer = LoadObstructingPlayer();
    let doubtingPlayer = LoadDoubtingPlayer();

    useEffect(() => {
        StartTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
            players, turn,
        );
    }, []);

    function Income() {
        console.log((turn + 1) + "번 플레이어가 소득 선택");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "Income";
        SaveActionData(action);
        players[turn].player.coins = players[turn].player.coins + 1;
        EndTurn();
    }

    function ForeignAid() {
        console.log((turn + 1) + "번 플레이어가 해외 원조 선택");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "ForeignAid";
        SaveActionData(action);

        // 현재 턴인 플레이어 제외한 다른 플레이어들에게 UI로 화면 띄우는 기능 필요
        // 서버에서 브로드캐스팅해야 함
        let checkObstruct = false;
        if (players[loginPlayer].player.myTurn === false) {
            checkObstruct = window.confirm(
                `${players[turn].player.nickName}님이 해외 원조를 받으려고 합니다. 방해하시겠습니까? (방해 가능 직업 : 공작)`
            );
        }
        const obstructButtonPressedTime = new Date().getTime();

        if (checkObstruct) {
            players[loginPlayer].player.obstructButtonPressedTime = obstructButtonPressedTime;
            SavePlayersData(players);
            players = LoadPlayersData();
            IsObstruction();
        } else {
            players[turn].player.coins = players[turn].player.coins + 2;
            EndTurn();
        }
    }

    function Tax() {
        console.log((turn + 1) + "번 플레이어가 세금 징수를 하려고 한다.");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "Tax";
        SaveActionData(action);

        IsDoubt();
    }

    function Assassination() {
        console.log("암살");
        EndTurn();
    }

    function IsObstruction() {
        console.log("방해");
        if (action === "ForeignAid") {
            // 브로드캐스팅
            if (players[loginPlayer].player.obstructButtonPressedTime < obstructTime) {
                players[loginPlayer].player.isObstructing = true;
                SavePlayersData(players);
                players = LoadPlayersData();
                obstructingPlayer = players[loginPlayer].player;
                SaveObstructingPlayer(obstructingPlayer);
                obstructingPlayer = LoadObstructingPlayer();
            }
            console.log(`${obstructingPlayer.nickName}` + "님이 방해 시도");
            IsDoubt();
        } else if (action === "Exchange") {

        } else if (action === "Steal") {

        } else if (action === "Assassination") {

        }
    }

    function IsDoubt() {
        console.log("의심");
        if (action === "ForeignAid") {
            let checkDoubt = false;
            if (players[loginPlayer].player !== obstructingPlayer) {
                checkDoubt = window.confirm(
                    `${obstructingPlayer.nickName}님이 해외 원조를 막으려고 합니다. (해외 원조 방해 가능 직업 : 공작) ${obstructingPlayer.nickName}님을 의심하시겠습니까?`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                players[loginPlayer].player.doubtButtonPressedTime = doubtButtonPressedTime;
                SavePlayersData(players);
                players = LoadPlayersData();

                // 브로드캐스팅
                if (players[loginPlayer].player.doubtButtonPressedTime < doubtTime) {
                    players[loginPlayer].player.isDoubt = true;
                    doubtingPlayer = players[loginPlayer].player;
                    SaveDoubtingPlayer(doubtingPlayer);
                    doubtingPlayer = LoadDoubtingPlayer();
                }

                CheckBluff();
            } else {
                EndTurn();
            }
        }
        else if (action === "Tax") {
            // 브로드캐스팅
            let checkDoubt = false;
            if (players[loginPlayer].player.myTurn === false) {
                checkDoubt = window.confirm(
                    `${players[turn].player.nickName}님이 세금 징수를 하려고 합니다. 의심하시겠습니까? (세금 징수 가능 직업 : 공작)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                players[loginPlayer].player.doubtButtonPressedTime = doubtButtonPressedTime;
                SavePlayersData(players);
                players = LoadPlayersData();
                CheckBluff();
            } else {
                players[turn].player.coins = players[turn].player.coins + 3;
                EndTurn();
            }

        }
        else if (action === "Exchange") {

        }
        else if (action === "Steal") {

        }
        else if (action === "Assassination") {

        }
    }

    function CheckBluff() {
        console.log("블러핑 체크");
        if (action === "ForeignAid") {

            let hasDuke = false;
            obstructingPlayer.hand.forEach((card) => {
                if (card.type === "duke") {
                    hasDuke = true;
                }
            });

            if (hasDuke) {
                console.log("블러핑 아니었음. 의심 실패.");
                let obstructingPlayerDukeIndex = obstructingPlayer.hand.findIndex(card => card.type === "duke");
                obstructingPlayer.hand[obstructingPlayerDukeIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("duke");
                shuffleDeck(deck);

                const checkNotOpenedHands = doubtingPlayer.hand.filter((card) => card.isOpen === false).length;

                if (checkNotOpenedHands === 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    doubtingPlayer.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands === 1) {
                    const closedHandIndex = doubtingPlayer.hand.findIndex((card) => card.isOpen === false);
                    doubtingPlayer.hand[closedHandIndex].isOpen = true;
                    doubtingPlayer.isOut = true;
                    SaveDoubtingPlayer(doubtingPlayer);
                    SaveTotalPlayersData(totalPlayers - 1);
                }

                SavePlayersData(players);
                SaveDeckData(deck);
                EndTurn();
            } else {
                console.log("블러핑이었음");
                obstructingPlayer.hand.forEach((card) => {
                    if (card.type === "duke") {
                        card.isOpen = true;
                    }
                });
                players[turn].player.coins = players[turn].player.coins + 2;
                EndTurn();
            }
        }
        else if (action === "Tax") {

        }
        else if (action === "Exchange") {

        }
        else if (action === "Steal") {

        }
        else if (action === "Assassination") {

        }
    }

    function EndTurn() {
        console.log("턴 종료");
        players[turn].player.myTurn = !(players[turn].player.myTurn);
        turn = (turn + 1) % howManyPlayer;
        SavePlayersData(players);
        players = LoadPlayersData();
        SaveTurnData(turn);
        turn = LoadTurnData();

        if (totalPlayers < 2) {
            EndGame();
        }
        StartTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
            players, turn,
        );
    }

    return (
        <div>
            <div style={{ position: 'absolute', backgroundColor: '#FFFFFF', right: 30, bottom: 30, height: 30 }}>
                <button id="income" onClick={Income} disabled={incomeButtonDisabled}>소득</button>
                <button id="foreignAid" onClick={ForeignAid} disabled={foreignAidButtonDisabled}>해외원조</button>
                <button id="assassination" onClick={Assassination} disabled={assassinationButtonDisabled}>암살</button>
            </div>
        </div>
    )
}
export default Turn;