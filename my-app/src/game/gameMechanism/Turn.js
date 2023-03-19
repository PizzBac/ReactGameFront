import React, { useEffect, useState } from 'react';
import { cardImages, shuffleDeck } from '../gameBoard/player/card/Card';
import { SaveDeckData, LoadDeckData, SaveTotalPlayersData, LoadTotalPlayersData, SavePlayersData, LoadPlayersData, SaveTurnData, LoadTurnData, SaveActionData, LoadActionData } from './ExchangeServerInfo';
import { StartTurn } from './StartTurn';
import { ActionButtonState, AfterSelectActionDisableActionButton } from './SelectAction';
import { EndGame } from './EndGame';

function Turn(props) {
    const { howManyPlayer } = props;
    const [loginPlayerSeatNumber, setLoginPlayerSeatNumber] = useState(1);
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

    let deck = LoadDeckData();
    let totalLoginPlayersNumber = LoadTotalPlayersData();
    let playersData = LoadPlayersData();
    let turn = LoadTurnData();
    let action = LoadActionData();
    let doubtingPlayerSeatNumber = 999;
    let obstructingPlayerSeatNumber = 999;

    useEffect(() => {
        StartTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
            playersData, turn,
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
        playersData[turn].player.coins = playersData[turn].player.coins + 1;
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
        if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
            checkObstruct = window.confirm(
                `${playersData[turn].player.nickName}님이 해외 원조를 받으려고 합니다. 방해하시겠습니까? (방해 가능 직업 : 공작)`
            );
        }
        const obstructButtonPressedTime = new Date().getTime();

        if (checkObstruct) {
            playersData[loginPlayerSeatNumber].player.obstructButtonPressedTime = obstructButtonPressedTime;
            SavePlayersData(playersData);
            playersData = LoadPlayersData();
            IsObstruction();
        } else {
            console.log((turn + 1) + "번 플레이어가 2코인 획득");
            playersData[turn].player.coins = playersData[turn].player.coins + 2;
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

    function Exchange() {
        console.log((turn + 1) + "번 플레이어가 카드 교환을 시도한다.");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "Exchange";
        SaveActionData(action);

        IsDoubt();
    }

    function Steal() {
        console.log((turn + 1) + "번 플레이어가 강탈을 시도한다.");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "Steal";
        SaveActionData(action);

    // 강탈 대상 플레이어 지정할 수 있게 함
   

        // const [showModal, setShowModal] = useState(true);
        // const [targetPlayer, setTargetPlayer] = useState(null);

        // const handleTargetPlayerSelection = (player) => {
        //     if (player.coins > 0) {
        //         setTargetPlayer(player);
        //         setShowModal(false);
        //     }
        // };

        // const playersWithoutCurrentPlayer = playersData.filter((player) => player.id != turn);
        // const stealTargetOptions = playersWithoutCurrentPlayer.map((player) => ({
        //     label: `Player ${player.id + 1} (${player.coins} coins)`,
        //     value: player
        // }));

        // if (playersData[loginPlayerSeatNumber].player.id != playersData[turn].player.id) {
        //      // 대상의 코인이 0개면 선택 불가능
        // }

        IsDoubt();
    }

    function Assassination() {
        console.log("암살");
    }

    function Coup() {
        console.log("쿠데타");
    }

    function IsObstruction() {
        console.log("방해");
        if (action == "ForeignAid") {
            // 브로드캐스팅
            if (playersData[loginPlayerSeatNumber].player.obstructButtonPressedTime < obstructTime) {
                playersData[loginPlayerSeatNumber].player.isObstructing = true;
                SavePlayersData(playersData);
                playersData = LoadPlayersData();
                obstructingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;
            }
            console.log(`${playersData[obstructingPlayerSeatNumber].player.nickName}` + "님이 방해 시도");
            IsDoubt();
        } else if (action == "Steal") {

        } else if (action == "Assassination") {

        }
    }

    function IsDoubt() {
        console.log("의심");
        if (action == "ForeignAid") {
            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.id != playersData[obstructingPlayerSeatNumber].player.id) {
                checkDoubt = window.confirm(
                    `${playersData[obstructingPlayerSeatNumber].player.nickName}님이 해외 원조를 막으려고 합니다. (해외 원조 방해 가능 직업 : 공작) ${playersData[obstructingPlayerSeatNumber].player.nickName}님을 의심하시겠습니까?`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;

                // 브로드캐스팅
                if (playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime < doubtTime) {
                    playersData[loginPlayerSeatNumber].player.isDoubt = true;
                    doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;
                }

                SavePlayersData(playersData);
                playersData = LoadPlayersData();

                CheckBluff();
            }
            else {
                console.log(`${playersData[obstructingPlayerSeatNumber].player.nickName}님의 해외 원조 방해 성공`)
                EndTurn();
            }
        }
        else if (action == "Tax") {
            // 브로드캐스팅
            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[turn].player.nickName}님이 세금 징수를 하려고 합니다. 의심하시겠습니까? (세금 징수 가능 직업 : 공작)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;
                SavePlayersData(playersData);
                playersData = LoadPlayersData();
                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없으므로 ${playersData[turn].player.nickName}님이 3코인 획득`)
                playersData[turn].player.coins = playersData[turn].player.coins + 3;
                EndTurn();
            }
        }
        else if (action == "Exchange") {
            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[turn].player.nickName}님이 카드 교환을 시도합니다. 의심하시겠습니까? (카드 교환 가능 직업 : 외교관)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;
                SavePlayersData(playersData);
                playersData = LoadPlayersData();
                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없으므로 ${playersData[turn].player.nickName}님이 카드교환을 진행합니다.`)
                // 카드 교환 메커니즘 작성 필요
                EndTurn();
            }
        }
        else if (action == "Steal") {

        }
        else if (action == "Assassination") {

        }
    }

    function CheckBluff() {
        console.log("블러핑 체크");
        if (action == "ForeignAid") {
            let hasDuke = false;
            playersData[obstructingPlayerSeatNumber].player.hand.forEach((card) => {
                if (card.type == "duke" && card.isOpen == false) {
                    hasDuke = true;
                }
            });

            if (hasDuke) {
                console.log("블러핑 아니었음. 의심 실패.");
                let obstructingPlayerDukeIndex = playersData[obstructingPlayerSeatNumber].player.hand.findIndex(card => card.type == "duke");
                playersData[obstructingPlayerSeatNumber].player.hand[obstructingPlayerDukeIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("duke");
                shuffleDeck(deck);

                const checkNotOpenedHands = playersData[doubtingPlayerSeatNumber].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }

                SavePlayersData(playersData);
                SaveDeckData(deck);
                EndTurn();
            } else {
                console.log("블러핑이었으므로 블러핑한 플레이어의 카드 한 장 오픈하고 현재 턴 플레이어 2코인 획득");
                const checkNotOpenedHands = playersData[turn].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }
                playersData[turn].player.coins = playersData[turn].player.coins + 2;
                SavePlayersData(playersData);
                SaveDeckData(deck);
                EndTurn();
            }
        }
        else if (action == "Tax") {

            let hasDuke = false;
            playersData[turn].player.hand.forEach((card) => {
                if (card.type == "duke" && card.isOpen == false) {
                    hasDuke = true;
                }
            });

            if (hasDuke) {
                console.log("블러핑 아니었음. 의심 실패.");
                let currentTurnPlayerDukeIndex = playersData[turn].player.hand.findIndex(card => card.type == "duke");
                playersData[turn].player.hand[currentTurnPlayerDukeIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("duke");
                shuffleDeck(deck);

                const checkNotOpenedHands = playersData[doubtingPlayerSeatNumber].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }
                playersData[turn].player.coins = playersData[turn].player.coins + 3;
                SavePlayersData(playersData);
                SaveDeckData(deck);
                console.log(`${playersData[turn].player.nickName}님이 3코인 획득`);
                EndTurn();
            } else {
                console.log("블러핑이었으므로 3코인 획득하지 못하고 카드 한 장 오픈");
                const checkNotOpenedHands = playersData[turn].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }
                SavePlayersData(playersData);
                SaveDeckData(deck);
                EndTurn();
            }
        }
        else if (action == "Exchange") {
            let hasAmbassador = false;
            playersData[turn].player.hand.forEach((card) => {
                if (card.type == "ambassador" && card.isOpen == false) {
                    hasAmbassador = true;
                }
            });

            if (hasAmbassador) {
                console.log("블러핑 아니었음. 의심 실패.");
                let currentTurnPlayerAmbassadorIndex = playersData[turn].player.hand.findIndex(card => card.type == "ambassador");
                playersData[turn].player.hand[currentTurnPlayerAmbassadorIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("ambassador");
                shuffleDeck(deck);

                const checkNotOpenedHands = playersData[doubtingPlayerSeatNumber].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }

                SavePlayersData(playersData);
                SaveDeckData(deck);
                // ExchangeCards();
                EndTurn();
            } else {
                console.log("블러핑이었으므로 카드 교환 실패하고 카드 한 장 오픈");
                const checkNotOpenedHands = playersData[turn].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[doubtingPlayerSeatNumber].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[doubtingPlayerSeatNumber].player.hand[closedHandIndex].isOpen = true;
                    playersData[doubtingPlayerSeatNumber].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }
                SavePlayersData(playersData);
                SaveDeckData(deck);
                EndTurn();
            }

        }
        else if (action == "Steal") {

        }
        else if (action == "Assassination") {

        }
    }

    function EndTurn() {
        console.log("턴 종료");
        playersData[turn].player.myTurn = !(playersData[turn].player.myTurn);
        turn = (turn + 1) % howManyPlayer;
        SavePlayersData(playersData);
        playersData = LoadPlayersData();
        SaveTurnData(turn);
        turn = LoadTurnData();

        if (totalLoginPlayersNumber < 2) {
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
            playersData, turn,
        );
    }

    return (
        <div>
            {/* <>
                {showModal && (
                    <Modal>
                        <h2>Select a player to steal from:</h2>
                        <Select
                            options={stealTargetOptions}
                            onChange={(selectedOption) => handleTargetPlayerSelection(selectedOption.value)}
                        />
                    </Modal>
                )}
                {!showModal && IsDoubt()}
            </> */}
            <div style={{ position: 'absolute', backgroundColor: '#FFFFFF', right: 30, bottom: 30, height: 30 }}>
                <button id="income" onClick={Income} disabled={incomeButtonDisabled}>소득</button>
                <button id="foreignAid" onClick={ForeignAid} disabled={foreignAidButtonDisabled}>해외원조</button>
                <button id="tax" onClick={Tax} disabled={taxButtonDisabled}>세금징수</button>
                <button id="exchange" onClick={Exchange} disabled={exchangeButtonDisabled}>카드교환</button>
                <button id="steal" onClick={Steal} disabled={stealButtonDisabled}>강탈</button>
                <button id="assassination" onClick={Assassination} disabled={assassinationButtonDisabled}>암살</button>
            </div>
        </div>
    )
}
export default Turn;