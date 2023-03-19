export function SaveLoginData(loginPlayerId, loginPlayerNickname) {
    localStorage.setItem('loginPlayerId', loginPlayerId);
    localStorage.setItem('loginPlayerNickname', loginPlayerNickname);
}

export function LoadLoginPlayerId() {
    const loginPlayerId = localStorage.getItem('loginPlayerId');
    return loginPlayerId ? loginPlayerId : "아이디 없음";
}

export function LoadLoginPlayerNickname() {
    const loginPlayerNickname = localStorage.getItem('loginPlayerNickname');
    return loginPlayerNickname ? loginPlayerNickname : "닉네임 없음";
}

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
    totalPlayers = totalPlayers ? parseInt(totalPlayers) : 999;
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
    turn = turn ? parseInt(turn) : 999;
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

export function SaveDoubtingPlayerSeatNumber(doubtingPlayerSeatNumber) {
    localStorage.setItem('doubtingPlayerSeatNumber', doubtingPlayerSeatNumber.toString());
}

export function LoadDoubtingPlayerSeatNumber() {
    let doubtingPlayerSeatNumber = localStorage.getItem('doubtingPlayerSeatNumber');
    doubtingPlayerSeatNumber = doubtingPlayerSeatNumber ? parseInt(doubtingPlayerSeatNumber) : null;
    return doubtingPlayerSeatNumber;
}

export function SaveObstructionButtonPressedTime(obstructionButtonPressedTime) {
    localStorage.setItem('obstructionButtonPressedTime', obstructionButtonPressedTime.toString());
}

export function LoadObstructionButtonPressedTime() {
    let obstructionButtonPressedTime = localStorage.getItem('obstructionButtonPressedTime');
    obstructionButtonPressedTime = obstructionButtonPressedTime ? parseInt(obstructionButtonPressedTime) : null;
    return obstructionButtonPressedTime;
}

export function SaveStealTargetSeatNumber(stealTargetSeatNumber) {
    localStorage.setItem('stealTargetSeatNumber', stealTargetSeatNumber.toString());
}

export function LoadStealTargetSeatNumber() {
    let stealTargetSeatNumber = localStorage.getItem('stealTargetSeatNumber');
    stealTargetSeatNumber = stealTargetSeatNumber ? parseInt(stealTargetSeatNumber) : null;
    return stealTargetSeatNumber;
}

export function SaveAssassinationTargetIndex(assassinationTargetIndex) {
    localStorage.setItem('assassinationTargetIndex', assassinationTargetIndex.toString());
}

export function LoadAssassinationTargetIndex() {
    let assassinationTargetIndex = localStorage.getItem('assassinationTargetIndex');
    assassinationTargetIndex = assassinationTargetIndex ? parseInt(assassinationTargetIndex) : null;
    return assassinationTargetIndex;
}