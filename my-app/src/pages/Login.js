import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
import { ToSignUp, LoginToLobby } from '../Navigation';

function Login() {
    const navigate = useNavigate();
    const [loginPlayerId, setLoginPlayerId] = useState("");
    const [loginPlayerNickname, setLoginPlayerNickname] = useState("임시닉")

    function IdInput(event){
        setLoginPlayerId(event.target.value);
    }

    return (
        <div className="html">
            <div className="body">
                <main className="loginForm">
                    <form method="POST">
                        <h1 className="h3-mb-3-fw-normal">로그인</h1><br /><br />
                        <div className="form-floating">
                            <label className="id">아이디</label><br /><br />
                            <input type="text" className="form-control" id="id" placeholder="아이디를 입력하세요" onChange={IdInput} /><br /><br />
                            <label className="pwd">비밀번호</label><br /><br />
                            <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요" /><br /><br />
                        </div>
                        <br />
                        <LoginToLobby navigate={navigate} loginPlayerId={loginPlayerId} loginPlayerNickname={loginPlayerNickname} />
                        <ToSignUp navigate={navigate} />
                        <br /><br /> <br /><br />
                        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;