export function ToSignUp({ navigate }) {
    function handleClick(event) {
        event.preventDefault();
        navigate("/signUp");
    }
    return (
        <button className="JoinBtn" onClick={handleClick}>회원가입</button>
    );
}

export function LoginToLobby({ navigate, loginPlayerId, loginPlayerNickname, SaveLoginData }) {
    function handleClick(event) {
        event.preventDefault();
        
        if (loginPlayerId === "" || loginPlayerNickname === "") {
            alert("아이디와 닉네임을 입력해주세요.");
        } else {
            SaveLoginData(loginPlayerId, loginPlayerNickname);
            navigate('/Lobby', {
                state: {
                    loginPlayerId: loginPlayerId,
                    loginPlayerNickname: loginPlayerNickname,
                },
            });
        }
    };
    return (
        <button className="LoginBtn" type="submit" onClick={handleClick}>로그인</button>
    );
}

export function GameToLobby({ navigate, loginPlayerId, loginPlayerNumber, loginPlayerNickname }) {
    function handleClick(event) {
        event.preventDefault();
        navigate('/Lobby', {
            state: {
                loginPlayerId: loginPlayerId,
                loginPlayerNum: loginPlayerNumber,
                loginPlayerNickname: loginPlayerNickname,
            },
        });
    };
    return (
        <button onClick={handleClick}>로비로 이동</button>
    );
}

export function ToGame({ navigate, howManyPlayer, loginPlayerId, loginPlayerNum, loginPlayerNickname }) {
    function handleClick(event) {
        event.preventDefault();
        localStorage.removeItem('players');
        navigate('/game', {
            state: {
                howManyPlayer: howManyPlayer,
                loginPlayerId: loginPlayerId,
                loginPlayerNum: loginPlayerNum,
                loginPlayerNickname: loginPlayerNickname,
            },
        });
    }
    return (
        <button className="GameStart" onClick={handleClick}>Game Start</button>
    );
}