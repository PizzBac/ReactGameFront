import { SaveDeckData, LoadDeckData, SaveTotalPlayersData, LoadTotalPlayersData, SavePlayersData, LoadPlayersData, SaveTurnData, LoadTurnData, SaveActionData, LoadActionData, SaveObstructingPlayer, LoadObstructingPlayer, SaveDoubtingPlayer, LoadDoubtingPlayer } from './ExchangeServerInfo';
import { SelectAction } from './SelectAction';

export function StartTurn(incomeButtonDisabled, setIncomeButtonDisabled,
    foreignAidButtonDisabled, setForeignAidButtonDisabled,
    taxButtonDisabled, setTaxButtonDisabled,
    exchangeButtonDisabled, setExchangeButtonDisabled,
    stealButtonDisabled, setStealButtonDisabled,
    assassinationButtonDisabled, setAssassinationButtonDisabled,
    coupButtonDisabled, setCoupButtonDisabled,
) {
    let players = LoadPlayersData();
    let turn = LoadTurnData();
    console.log((turn + 1) + "번 플레이어의 턴 시작");

    players[turn].player.myTurn = !(players[turn].player.myTurn);

    SavePlayersData(players);

    SelectAction(
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