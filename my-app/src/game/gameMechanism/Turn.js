import React, { useEffect, useState } from 'react';
import { cardImages, shuffleDeck } from '../gameBoard/player/card/Card';
import { SaveDeckData, LoadDeckData, SaveTotalPlayersData, LoadTotalPlayersData, SavePlayersData, LoadPlayersData, SaveTurnData, LoadTurnData, SaveActionData, LoadActionData, SaveStealTargetSeatNumber, LoadStealTargetSeatNumber, SaveDoubtingPlayerSeatNumber, SaveObstructionButtonPressedTime, LoadDoubtingPlayerSeatNumber, SaveAssassinationTargetIndex } from './ExchangeServerInfo';
import { StartTurn } from './StartTurn';
import { ActionButtonState, AfterSelectActionDisableActionButton } from './SelectAction';
import { EndGame } from './EndGame';
import StealTargetModal from '../gameBoard/modal/StealTargetModal';

function Turn(props) {
    const [loginPlayerSeatNumber, setLoginPlayerSeatNumber] = useState(1);
    const [doubtTime, setDoubtTime] = useState(Infinity);
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
    let obstructionButtonPressedTime;
    let stealTargetSeatNumber;
    let assassinationTargetIndex;

    useEffect(() => {
        StartTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
    }, []);

    function Income() {
        playersData = LoadPlayersData();
        turn = LoadTurnData();
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
        playersData[turn].player.coins = playersData[turn].player.coins + 1;

        SaveActionData(action);
        SavePlayersData(playersData);

        EndTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
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
            EndTurn(
                incomeButtonDisabled, setIncomeButtonDisabled,
                foreignAidButtonDisabled, setForeignAidButtonDisabled,
                taxButtonDisabled, setTaxButtonDisabled,
                exchangeButtonDisabled, setExchangeButtonDisabled,
                stealButtonDisabled, setStealButtonDisabled,
                assassinationButtonDisabled, setAssassinationButtonDisabled,
                coupButtonDisabled, setCoupButtonDisabled,
            );
        }
    }

    function Tax() {
        turn = LoadTurnData();
        console.log((turn + 1) + "번 플레이어가 세금 징수를 시도한다.");
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

    const [modalOpen, setModalOpen] = useState(false);
    const [stealTargetModalSelectedPlayer, setStealTargetModalSelectedPlayer] = useState("");

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

        // 강탈 대상 플레이어를 현재 턴 플레이어가 지정할 수 있게 해야 함
        // do {
        //     stealTargetSeatNumber = Math.floor(Math.random() * totalLoginPlayersNumber);
        // } while (playersData[turn].player.id == stealTargetSeatNumber);
        // SaveStealTargetSeatNumber(stealTargetSeatNumber);

        // 모달창 노출
        setModalOpen(true);

        // IsDoubt();
    }

    function StealConfirm() {
        setModalOpen(false);
        console.log(stealTargetModalSelectedPlayer);
        IsDoubt();
    }

    function Assassination() {
        console.log("암살");
        AfterSelectActionDisableActionButton(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );
        action = "Assassination";
        SaveActionData(action);

        // 암살 대상 플레이어를 현재 턴 플레이어가 지정할 수 있게 해야 함
        do {
            assassinationTargetIndex = Math.floor(Math.random() * totalLoginPlayersNumber);
        } while (playersData[turn].player.id == assassinationTargetIndex);
        SaveAssassinationTargetIndex(assassinationTargetIndex);

        playersData[turn].player.coins -= 3;
        SavePlayersData(playersData);

        IsDoubt();
    }

    function Coup() {
        console.log("쿠데타");

        // 쿠데타 대상 플레이어를 현재 턴 플레이어가 지정할 수 있게 해야 함
        let coupTargetIndex;
        do {
            coupTargetIndex = Math.floor(Math.random() * 5);
        } while (playersData[turn].player.id == coupTargetIndex);

        const checkNotOpenedHands = playersData[coupTargetIndex].player.hand.filter((card) => card.isOpen == false).length;

        if (checkNotOpenedHands == 2) {
            // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
            const closedHandIndex = Math.floor(Math.random() * 2);
            playersData[coupTargetIndex].player.hand[closedHandIndex].isOpen = true;
        } else if (checkNotOpenedHands == 1) {
            const closedHandIndex = playersData[coupTargetIndex].player.hand.findIndex((card) => card.isOpen == false);
            playersData[coupTargetIndex].player.hand[closedHandIndex].isOpen = true;
            playersData[coupTargetIndex].player.isOut = true;
            SaveTotalPlayersData(totalLoginPlayersNumber - 1);
        }

        SavePlayersData(playersData);
        SaveDeckData(deck);

        EndTurn(
            incomeButtonDisabled, setIncomeButtonDisabled,
            foreignAidButtonDisabled, setForeignAidButtonDisabled,
            taxButtonDisabled, setTaxButtonDisabled,
            exchangeButtonDisabled, setExchangeButtonDisabled,
            stealButtonDisabled, setStealButtonDisabled,
            assassinationButtonDisabled, setAssassinationButtonDisabled,
            coupButtonDisabled, setCoupButtonDisabled,
        );

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
        }
        else if (action == "Steal") {

            let checkObstruction = false;
            if (playersData[loginPlayerSeatNumber].player.id != playersData[turn].player.id) {
                checkObstruction = window.confirm(
                    `${playersData[loginPlayerSeatNumber].player.nickName}님의 강탈을 방해하시겠습니까? (강탈 방해 가능 직업 : 외교관, 사령관) ${playersData[obstructingPlayerSeatNumber].player.nickName}님을 의심하시겠습니까?`
                );
            }
            obstructionButtonPressedTime = new Date().getTime();
            SaveObstructionButtonPressedTime(obstructionButtonPressedTime);

            action = "ObstructingSteal";
            SaveActionData(action);

            IsDoubt();
        }
        else if (action == "Assassination") {
            let checkObstruction = false;
            if (playersData[assassinationTargetIndex].player.id == playersData[loginPlayerSeatNumber].player.id) {
                checkObstruction = window.confirm(
                    `${playersData[turn].player.nickName}님의 암살에 저항하시겠습니까? (암살 저항 가능 직업 : 귀부인)`
                );
            }

            action = "ResistingAssassination";
            SaveActionData(action);

            if (checkObstruction) {
                IsDoubt();
            }
            else {
                const checkNotOpenedHands = playersData[assassinationTargetIndex].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[assassinationTargetIndex].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[assassinationTargetIndex].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[assassinationTargetIndex].player.hand[closedHandIndex].isOpen = true;
                    playersData[assassinationTargetIndex].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }

                SavePlayersData(playersData);
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "Tax") {
            // 브로드캐스팅
            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[turn].player.nickName}님이 세금 징수를 시도합니다. 의심하시겠습니까? (세금 징수 가능 직업 : 공작)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;
                SavePlayersData(playersData);
                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없으므로 ${playersData[turn].player.nickName}님이 3코인 획득`)
                playersData[turn].player.coins = playersData[turn].player.coins + 3;
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "Steal") {

            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[turn].player.nickName}님이 강탈을 시도합니다. 의심하시겠습니까? (강탈 가능 직업 : 사령관)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;

                SavePlayersData(playersData);
                SaveDoubtingPlayerSeatNumber(doubtingPlayerSeatNumber);

                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없으므로 ${playersData[turn].player.nickName}님이 강탈을 진행합니다.`)

                IsObstruction();
            }
        }
        else if (action == "ObstructingSteal") {

            let checkDoubt = false;
            if (playersData[obstructingPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[obstructingPlayerSeatNumber].player.nickName}님이 강탈을 방해합니다. 의심하시겠습니까? (강탈 방해 가능 직업 : 외교관, 사령관)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;

                SavePlayersData(playersData);
                SaveDoubtingPlayerSeatNumber(doubtingPlayerSeatNumber);

                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없으므로 ${playersData[obstructingPlayerSeatNumber].player.nickName}님이 ${playersData[turn].player.nickName}님의 강탈을 방해했습니다.`)

                EndTurn(incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "Assassination") {
            let checkDoubt = false;
            if (playersData[loginPlayerSeatNumber].player.myTurn == false) {
                checkDoubt = window.confirm(
                    `${playersData[turn].player.nickName}님이 암살을 시도합니다. 의심하시겠습니까? (암살 가능 직업 : 암살자)`
                );
            }
            const doubtButtonPressedTime = new Date().getTime();

            if (checkDoubt) {
                playersData[loginPlayerSeatNumber].player.doubtButtonPressedTime = doubtButtonPressedTime;
                doubtingPlayerSeatNumber = playersData[loginPlayerSeatNumber].player.id;

                SavePlayersData(playersData);
                SaveDoubtingPlayerSeatNumber(doubtingPlayerSeatNumber);

                CheckBluff();
            }
            else {
                console.log(`의심 플레이어 없음`)

                IsObstruction();
            }
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
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
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
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
            }
            EndTurn(
                incomeButtonDisabled, setIncomeButtonDisabled,
                foreignAidButtonDisabled, setForeignAidButtonDisabled,
                taxButtonDisabled, setTaxButtonDisabled,
                exchangeButtonDisabled, setExchangeButtonDisabled,
                stealButtonDisabled, setStealButtonDisabled,
                assassinationButtonDisabled, setAssassinationButtonDisabled,
                coupButtonDisabled, setCoupButtonDisabled,
            );
        }
        else if (action == "Steal") {

            let hasCaptain = false;
            playersData[turn].player.hand.forEach((card) => {
                if (card.type == "captain" && card.isOpen == false) {
                    hasCaptain = true;
                }
            });

            if (hasCaptain) {
                console.log("블러핑 아니었음. 의심 실패.");
                let currentTurnPlayerCaptainIndex = playersData[turn].player.hand.findIndex(card => card.type == "captain");
                playersData[turn].player.hand[currentTurnPlayerCaptainIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("captain");
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

                IsObstruction();
            } else {
                console.log("블러핑이었으므로 강탈 실패하고 카드 한 장 오픈");
                const checkNotOpenedHands = playersData[turn].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[turn].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[turn].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[turn].player.hand[closedHandIndex].isOpen = true;
                    playersData[turn].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }
                SavePlayersData(playersData);
                SaveDeckData(deck);
                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "ObstructingSteal") {

            playersData = LoadPlayersData();
            obstructingPlayerSeatNumber = LoadDoubtingPlayerSeatNumber();
            deck = LoadDeckData();
            stealTargetSeatNumber = LoadStealTargetSeatNumber();

            let hasAmbassadorOrCaptain = false;
            playersData[obstructingPlayerSeatNumber].player.hand.forEach((card) => {
                if ((card.type === "ambassador" || card.type === "captain") && !card.isOpen) {
                    hasAmbassadorOrCaptain = true;
                }

            });

            if (hasAmbassadorOrCaptain) {
                console.log("블러핑 아니었음. 의심 실패.");
                let obstructingPlayerCaptainOrAmbassadorIndex = playersData[obstructingPlayerSeatNumber].player.hand.findIndex(card => card.type == "ambassador" || card.type == "captain");
                playersData[obstructingPlayerSeatNumber].player.hand[obstructingPlayerCaptainOrAmbassadorIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("captain");
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

                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
            else {
                console.log("블러핑이었으므로 강탈 방해 실패하고 카드 한 장 오픈. 2코인 강탈 성공");
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

                if (playersData[stealTargetSeatNumber].player.coins > 1) {
                    playersData[stealTargetSeatNumber].player.coins -= 2;
                    playersData[turn].player.coins += 2;
                } else if (0 <= playersData[stealTargetSeatNumber].player.coins <= 1) {
                    playersData[stealTargetSeatNumber].player.coins -= 1;
                    playersData[turn].player.coins += 1;
                }

                SavePlayersData(playersData);
                SaveDeckData(deck);

                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "Assassination") {
            playersData = LoadPlayersData();
            deck = LoadDeckData();

            let hasAssassin = false;
            playersData[turn].player.hand.forEach((card) => {
                if ((card.type === "assassin") && !card.isOpen) {
                    hasAssassin = true;
                }

            });

            if (hasAssassin) {
                console.log("블러핑 아니었음. 의심 실패.");
                let assassinIndex = playersData[turn].player.hand.findIndex(card => card.type == "assassin");
                playersData[turn].player.hand[assassinIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("assassin");
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

                IsObstruction();
            }
            else {
                console.log("블러핑이었으므로 카드 한 장 오픈");
                const checkNotOpenedHands = playersData[turn].player.hand.filter((card) => card.isOpen == false).length;

                if (checkNotOpenedHands == 2) {
                    // doubtingPlayer가 자신의 hand에서 isOpen = true로 바꿀 카드를 선택할 수 있도록 해야 함
                    const closedHandIndex = Math.floor(Math.random() * 2);
                    playersData[turn].player.hand[closedHandIndex].isOpen = true;
                } else if (checkNotOpenedHands == 1) {
                    const closedHandIndex = playersData[turn].player.hand.findIndex((card) => card.isOpen == false);
                    playersData[turn].player.hand[closedHandIndex].isOpen = true;
                    playersData[turn].player.isOut = true;
                    SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                }

                SavePlayersData(playersData);
                SaveDeckData(deck);

                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
        else if (action == "ResistingAssassination") {
            playersData = LoadPlayersData();
            deck = LoadDeckData();

            let hasContessa = false;
            playersData[assassinationTargetIndex].player.hand.forEach((card) => {
                if ((card.type === "contessa") && !card.isOpen) {
                    hasContessa = true;
                }

            });

            if (hasContessa) {
                console.log("블러핑 아니었음. 저항 성공");
                let contessaIndex = playersData[assassinationTargetIndex].player.hand.findIndex(card => card.type == "contessa");
                playersData[assassinationTargetIndex].player.hand[contessaIndex] = {
                    type: deck.pop(),
                    image: cardImages[deck[deck.length - 1]],
                    isOpen: false,
                };
                deck.push("contessa");
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

                IsObstruction();
            }
            else {
                console.log("블러핑이었으므로 암살 당하고 카드도 오픈");

                [0, 1].forEach(function (index) {
                    playersData[assassinationTargetIndex].player.hand[index].isOpen = true;
                });
                playersData[assassinationTargetIndex].player.isOut = true;

                SaveTotalPlayersData(totalLoginPlayersNumber - 1);
                SavePlayersData(playersData);
                SaveDeckData(deck);

                EndTurn(
                    incomeButtonDisabled, setIncomeButtonDisabled,
                    foreignAidButtonDisabled, setForeignAidButtonDisabled,
                    taxButtonDisabled, setTaxButtonDisabled,
                    exchangeButtonDisabled, setExchangeButtonDisabled,
                    stealButtonDisabled, setStealButtonDisabled,
                    assassinationButtonDisabled, setAssassinationButtonDisabled,
                    coupButtonDisabled, setCoupButtonDisabled,
                );
            }
        }
    }

    return (
        <>
            <div style={{ position: 'absolute', backgroundColor: '#FFFFFF', right: 30, bottom: 30, height: 30 }}>
                <button id="income" onClick={Income} disabled={incomeButtonDisabled}>소득</button>
                <button id="foreignAid" onClick={ForeignAid} disabled={foreignAidButtonDisabled}>해외원조</button>
                <button id="tax" onClick={Tax} disabled={taxButtonDisabled}>세금징수</button>
                <button id="exchange" onClick={Exchange} disabled={exchangeButtonDisabled}>카드교환</button>
                <button id="steal" onClick={Steal} disabled={stealButtonDisabled}>강탈</button>
                <button id="assassination" onClick={Assassination} disabled={assassinationButtonDisabled}>암살</button>
                <button id="coup" onClick={Coup} disabled={coupButtonDisabled}>쿠데타</button>
            </div>
            {modalOpen &&
                <StealTargetModal
                    setModalOpen={setModalOpen}
                    setStealTargetModalSelectedPlayer={setStealTargetModalSelectedPlayer}
                    stealTargetModalSelectedPlayer={stealTargetModalSelectedPlayer}
                    StealConfirm={StealConfirm}
                />}
        </>
    )
}

export function EndTurn(
    incomeButtonDisabled, setIncomeButtonDisabled,
    foreignAidButtonDisabled, setForeignAidButtonDisabled,
    taxButtonDisabled, setTaxButtonDisabled,
    exchangeButtonDisabled, setExchangeButtonDisabled,
    stealButtonDisabled, setStealButtonDisabled,
    assassinationButtonDisabled, setAssassinationButtonDisabled,
    coupButtonDisabled, setCoupButtonDisabled,
) {
    console.log("턴 종료");
    let playersData = LoadPlayersData();
    let totalLoginPlayersNumber = LoadTotalPlayersData();
    let turn = LoadTurnData();

    playersData[turn].player.myTurn = !(playersData[turn].player.myTurn);
    turn = (turn + 1) % totalLoginPlayersNumber;

    SavePlayersData(playersData);
    SaveTurnData(turn);

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
    );
}

export default Turn;