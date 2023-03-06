// import { NextPage } from "next";
import { useState } from "react";
// import Button from "../components/lib/button";
import React from "react";
import './css/SignUp.css';

function SignUp() {
    //초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [birth, setBirth] = React.useState("");

    // 오류메세지 상태 저장
    const [idMessage, setIdMessage] = React.useState("");
    const [nameMessage, setNameMessage] = React.useState("");
    const [passwordMessage, setPasswordMessage] = React.useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState("");
    const [emailMessage, setEmailMessage] = React.useState("");
    const [phoneMessage, setPhoneMessage] = React.useState("");
    const [birthMessage, setBirthMessage] = React.useState("");

    // 유효성 검사
    const [isId, setIsId] = React.useState(false);
    const [isname, setIsName] = React.useState(false);
    const [isPassword, setIsPassword] = React.useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
    const [isEmail, setIsEmail] = React.useState(false);
    const [isPhone, setIsPhone] = React.useState(false);
    const [isBirth, setIsBirth] = React.useState(false);

    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;

        if (!idRegExp.test(currentId)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);
        } else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
    };

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);

        if (currentName.length < 2 || currentName.length > 5) {
            setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
            setIsName(false);
        } else {
            setNameMessage("사용가능한 닉네임 입니다.");
            setIsName(true);
        }
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
            setIsPassword(false);
        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");
            setIsPassword(true);
        }
    };
    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);
        if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
            setIsPasswordConfirm(true);
        }
    };
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다!");
            setIsEmail(false);
        } else {
            setEmailMessage("사용 가능한 이메일 입니다.");
            setIsEmail(true);
        }
    };
    const onChangePhone = (getNumber) => {
        const currentPhone = getNumber;
        setPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("-를 넣어서 전화번호를 입력해주세요");
            setIsPhone(false);
        } else {
            setPhoneMessage("사용 가능한 번호입니다:-)");
            setIsPhone(true);
        }
    };

    const addHyphen = (e) => {
        const currentNumber = e.target.value;
        setPhone(currentNumber);
        if (currentNumber.length == 3 || currentNumber.length == 8) {
            setPhone(currentNumber + "-");
            onChangePhone(currentNumber + "-");
        } else {
            onChangePhone(currentNumber);
        }
    };

    const onChangeBirth = (e) => {
        
        const currentBirth = e.target.value;
        setBirth(currentBirth);
    };

    return (
        
        <div className="superform">
            <div className="title"><h1>회원가입</h1></div>
            <div className="form">
                <div className="form-el">
                    <label htmlFor="id">아이디</label> <br />
                    <input id="id" name="id" value={id} onChange={onChangeId} />
                    <br/>
                    <p className="message"> {idMessage} </p>
                </div><br />

                <div className="form-el">
                    <label htmlFor="name">이름</label> <br />
                    <input id="name" name="name" value={name} onChange={onChangeName} />
                    <p className="message">{nameMessage}</p>
                </div><br />

                <div className="form-el">
                    <label htmlFor="password">비밀번호</label> <br />
                    <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword} />
                    <p className="message">{passwordMessage}</p>
                </div><br />

                <div className="form-el">
                    <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={onChangePasswordConfirm} />
                    <p className="message">{passwordConfirmMessage}</p>
                </div><br />

                <div className="form-el">
                    <label htmlFor="email">이메일</label> <br />
                    <input
                        id="email"
                        name="name"
                        value={email}
                        onChange={onChangeEmail} />
                    <p className="message">{emailMessage}</p>
                </div><br />

                <div className="form-el">
                    <label htmlFor="phone">핸드폰 번호</label> <br />
                    <input id="phone" name="phone" value={phone} onChange={addHyphen} />
                    <p className="message">{phoneMessage}</p>
                </div>
                {/* <div className="form-el">
                    <label htmlFor="birth">Birth</label> <br />
                    <input
                        id="birth"
                        name="birth"
                        value={birth}
                        onChange={onChangeBirth} />
                    <p className="message">{birthMessage}</p>
                </div> */}
                <br />
                <br />
                <button type="submit">로그인 창으로 이동</button> 
                
                <button type="submit">회원가입</button>
            </div>
         </div>
    );
}

export default SignUp;