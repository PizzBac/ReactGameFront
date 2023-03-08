import React from 'react';
import './css/Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 데이터를 서버로 전송하는 로직...
        navigate("/game");
    };

    const SignUpBtn = (event) => {
        event.preventDefault();
        navigate("/signUp");
    }

    const LobbyBtn = (event) =>{
        event.preventDefault();
        navigate("/Lobby");
    }

    return (
        
        <div className="html">
            <div className="body">
                <main className="loginForm">
                    <form onSubmit={handleSubmit} action="/main" method="POST">
            
                        {/* <img className="mb-4" src={require('./css/images/assassin.png')} alt="" width="72" height="57" /> */}
                        <h1 className="h3-mb-3-fw-normal">로그인</h1><br /><br />

                        <div className="form-floating">

                            {/* <label className="id">아이디</label>/ */}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="id" placeholder="아이디를 입력하세요" /><br />
                            {/* <label className="pwd">비밀번호</label> */}
                            <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요" /><br />
                        </div>
<br/>
                        <div className="checkbox">
                            <label>
                                {/* <input type="checkbox" value="remember-me" /> 아이디 저장 */}
                            </label><br />
                        </div>
                        <button className="LoginBtn" onClick={LobbyBtn} type="submit">로그인</button>
                        {" "}
                        <button className="JoinBtn" onClick={SignUpBtn}>회원가입</button> <br /><br /> <br /><br />
                    <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;