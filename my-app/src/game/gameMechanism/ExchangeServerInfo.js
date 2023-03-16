export function SaveDeckData(deck) {
    localStorage.setItem('deck', JSON.stringify(deck));
    //deck은 배열이다. stringfy를 써서 string값으로 변환시켜줌.
    //Card.js 에서 이미 배열로 만들어놨다.
}

export function LoadDeckData() {
    const deck = localStorage.getItem('deck');
    return deck ? JSON.parse(deck) : null;
}

export function SaveTotalPlayersData(totalPlayers) {
    localStorage.setItem('totalPlayers', totalPlayers.toString());
}

export function LoadTotalPlayersData() {
    let totalPlayers = localStorage.getItem('totalPlayers');
    totalPlayers = totalPlayers ? parseInt(totalPlayers) : 0;
    return totalPlayers;
}

export function SavePlayersData(players) {
    localStorage.setItem('players', JSON.stringify(players));
}

export function LoadPlayersData() {
    const players = localStorage.getItem('players');
    return players ? JSON.parse(players) : null;
}

export function SaveTurnData(turn) {
    localStorage.setItem('turn', turn.toString());
}

export function LoadTurnData() {
    let turn = localStorage.getItem('turn');
    turn = turn ? parseInt(turn) : 0;
    return turn;
}

export function SaveActionData(action) {
    localStorage.setItem('action', action);
}

export function LoadActionData() {
    let action = localStorage.getItem('action');
    action = action ? action : null;
    return action;
}

export function SaveObstructingPlayer(obstructingPlayer) {
    localStorage.setItem('obstructingPlayer', JSON.stringify(obstructingPlayer));
}

export function LoadObstructingPlayer() {
    const obstructingPlayer = localStorage.getItem('obstructingPlayer');
    return obstructingPlayer ? JSON.parse(obstructingPlayer) : null;
}

export function SaveDoubtingPlayer(doubtingPlayer) {
    localStorage.setItem('doubtingPlayer', JSON.stringify(doubtingPlayer));
}

export function LoadDoubtingPlayer() {
    const doubtingPlayer = localStorage.getItem('doubtingPlayer');
    return doubtingPlayer ? JSON.parse(doubtingPlayer) : null;
}