import React from 'react';
import './css/Login.css';
// import {BrowserRouter, Routes, Route} from "react-router-dom";



function Login() {

    
    console.log("로그인 화면")
    return (
        <div className="html">
            <div className="body">
                <main className="loginForm">
                    {/* <form action="login.jsp" method="post"> */}
                        <img className="mb-4" src="./image/assassin.png" alt="" width="72" height="57" />
                        <h1 className="h3 mb-3 fw-normal">로그인</h1><br /><br />

                        <div className="form-floating">
                            <label className="id">아이디</label><br />
                      
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="id" placeholder="아이디를 입력하세요" /><br />
                            <label className="pwd">비밀번호</label><br />
                            <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요" />
                        </div>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" /> 아이디 저장
                            </label><br />
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
                        <br />
                        <button className="JoinBtn">회원가입</button> <br /><br /> <br /><br />
                       
                                                <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    {/* </form> */}
                </main>
            </div>
        </div>
    );
};

export default Login;