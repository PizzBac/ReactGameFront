import { useState } from 'react';
import { SaveDeckData, LoadDeckData, SaveTotalPlayersData, LoadTotalPlayersData, SavePlayersData, LoadPlayersData, SaveTurnData, LoadTurnData, SaveActionData, LoadActionData, SaveObstructingPlayer, LoadObstructingPlayer, SaveDoubtingPlayer, LoadDoubtingPlayer } from './ExchangeServerInfo';

export function ActionButtonState() {
    const [incomeButtonDisabled, setIncomeButtonDisabled] = useState(!false);
    const [foreignAidButtonDisabled, setForeignAidButtonDisabled] = useState(!false);
    const [taxButtonDisabled, setTaxButtonDisabled] = useState(!false);
    const [exchangeButtonDisabled, setExchangeButtonDisabled] = useState(!false);
    const [stealButtonDisabled, setStealButtonDisabled] = useState(!false);
    const [assassinationButtonDisabled, setAssassinationButtonDisabled] = useState(!false);
    const [coupButtonDisabled, setCoupButtonDisabled] = useState(!false);

    return {
        incomeButtonDisabled, setIncomeButtonDisabled,
        foreignAidButtonDisabled, setForeignAidButtonDisabled,
        taxButtonDisabled, setTaxButtonDisabled,
        exchangeButtonDisabled, setExchangeButtonDisabled,
        stealButtonDisabled, setStealButtonDisabled,
        assassinationButtonDisabled, setAssassinationButtonDisabled,
        coupButtonDisabled, setCoupButtonDisabled,
    };
}

export function SelectAction(
    incomeButtonDisabled, setIncomeButtonDisabled,
    foreignAidButtonDisabled, setForeignAidButtonDisabled,
    taxButtonDisabled, setTaxButtonDisabled,
    exchangeButtonDisabled, setExchangeButtonDisabled,
    stealButtonDisabled, setStealButtonDisabled,
    assassinationButtonDisabled, setAssassinationButtonDisabled,
    coupButtonDisabled, setCoupButtonDisabled,
    players, turn,
) {
    console.log((turn + 1) + "번 플레이어가 행동 선택 중");
    const currentTurnPlayerCoin = players[turn].player.coins;

    setIncomeButtonDisabled((prev) => !prev);
    setForeignAidButtonDisabled((prev) => !prev);
    setTaxButtonDisabled((prev) => !prev);
    // setExchangeButtonDisabled((prev) => !prev);
    // setStealButtonDisabled((prev) => !prev);
    if (currentTurnPlayerCoin >= 3) {
        setAssassinationButtonDisabled((prev) => !prev);
    }
    // if (currentTurnPlayerCoin >= 7) {
    //     setCoupButtonDisabled((prev) => !prev);
    // }
}

export function AfterSelectActionDisableActionButton(
    incomeButtonDisabled, setIncomeButtonDisabled,
    foreignAidButtonDisabled, setForeignAidButtonDisabled,
    taxButtonDisabled, setTaxButtonDisabled,
    exchangeButtonDisabled, setExchangeButtonDisabled,
    stealButtonDisabled, setStealButtonDisabled,
    assassinationButtonDisabled, setAssassinationButtonDisabled,
    coupButtonDisabled, setCoupButtonDisabled,
) {

    if (incomeButtonDisabled === false) {
        setIncomeButtonDisabled((prev) => !prev);
    }
    if (foreignAidButtonDisabled === false) {
        setForeignAidButtonDisabled((prev) => !prev);
    }
    if(taxButtonDisabled === false) {
        setTaxButtonDisabled((prev) => !prev);
    }
    // if(exchangeButtonDisabled === false) {
    //     setExchangeButtonDisabled((prev) => !prev);
    // }
    // if(stealButtonDisabled === false) {
    //     setStealButtonDisabled((prev) => !prev);
    // }
    if (assassinationButtonDisabled === false) {
        setAssassinationButtonDisabled((prev) => !prev);
    }
    // if(coupButtonDisabled === false) {
    //     setCoupButtonDisabled((prev) => !prev);
    // }
}