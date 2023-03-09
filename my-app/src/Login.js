import React from 'react';
import './css/Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [loginPlayerId, setLoginPlayerId] = useState("");

    const SignUpBtn = (event) => {
        event.preventDefault();
        navigate("/signUp");
    }

    const IdInput = (event) => {
        setLoginPlayerId(event.target.value);
    }

    const LobbyBtn = (event) => {
        event.preventDefault();
        navigate('/Lobby', {
            state: {
                loginPlayerId: loginPlayerId,
                loginPlayerNickname: "임시닉네임",
            },
        });
    }

    return (
        <div className="html">
            <div className="body">
                <main className="loginForm">
                    <form onSubmit={LobbyBtn} action="/main" method="POST">
                        <h1 className="h3-mb-3-fw-normal">로그인</h1><br /><br />
                        <div className="form-floating">
                        <label className="id">아이디</label><br /><br />
                            <input type="text" className="form-control" id="id" placeholder="아이디를 입력하세요" onChange={IdInput} /><br /><br />
                            <label className="pwd">비밀번호</label><br /><br />
                            <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요" /><br /><br />
                        </div>
                        <br />
                        <button className="LoginBtn" type="submit">로그인</button>
                        <button className="JoinBtn" onClick={SignUpBtn}>회원가입</button> <br /><br /> <br /><br />
                        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;