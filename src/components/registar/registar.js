import React, { useState } from "react";
import "./registar.css";
import InputHook from "../../hooks/useInput";
import loadingClasses from "../../loading/loading.module.css";
import axios from "axios";
const Registar = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [erorSMS, setErorSms] = useState("");
  const registration = (namee, lastname, nickname, email, password) => {
    setError(false);
    setErorSms("email is already in usage");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    axios
      .post("http://localhost:5000/registration", {
        name: namee,
        lastname: lastname,
        nickname: nickname,
        email: email,
        password: password,
        file: formData,
      })
      .then((response) => {
        console.log(response);
        if (response.data == "email is already in usage") {
          setError(true);
          setErorSms("email is already in usage");
        }
        if (response.data == "succses") {
          setError(true);
          setErorSms("account created sucssesfully");
        }
        if (response.data == "fill inputs") {
          setError(true);
          setErorSms("fill inputs");
        }
        setIsloading(false);
      });
  };

  const submitHandler = (event) => {
    setIsloading(true);
    event.preventDefault();
    if (
      classEmail != "invalid" &&
      classpassword != "invalid" &&
      classNickName != "invalid" &&
      classname != "invalid" &&
      classLastname != "ivalid"
    ) {
      registration(
        nameInput.trim(),
        lastnameInput.trim(),
        nickNameInput.trim(),
        emailInput.trim(),
        passwordInput.trim()
      );
    } else {
      setError(true);
      setErorSms("something went wrong");
      setIsloading(false);
    }
  };
  const {
    inputValue: emailInput,
    nameClassName: classEmail,
    changeHandlerFun: EmailChangeHandler,
    focusHandler: lostFocusEmail,
  } = InputHook("email");

  const {
    inputValue: nameInput,
    nameClassName: classname,
    changeHandlerFun: nameChangeHandler,
    focusHandler: lostFocusname,
  } = InputHook("name");

  const {
    inputValue: passwordInput,
    nameClassName: classpassword,
    changeHandlerFun: passwordChangeHandler,
    focusHandler: lostFocuspassword,
  } = InputHook("password");

  const {
    inputValue: nickNameInput,
    nameClassName: classNickName,
    changeHandlerFun: nicknamechangeHandler,
    focusHandler: lostFocusNickname,
  } = InputHook("nickname");

  const {
    inputValue: lastnameInput,
    nameClassName: classLastname,
    changeHandlerFun: lastnameChangeHandler,
    focusHandler: lostFocuslastname,
  } = InputHook("lastname");

  return (
    <div class="login-form">
      <form onSubmit={submitHandler}>
        <h1>Registar</h1>
        <div class="content">
          <div class="input-field">
            <input
              className={classname}
              onChange={nameChangeHandler}
              onBlur={lostFocusname}
              type="text"
              placeholder="Name"
              autocomplete="nope"
            />
          </div>
          <div class="input-field">
            <input
              className={classLastname}
              onChange={lastnameChangeHandler}
              onBlur={lostFocuslastname}
              type="text"
              placeholder="Lastname"
              autocomplete="nope"
            />
          </div>
          <div class="input-field">
            <input
              className={classNickName}
              onChange={nicknamechangeHandler}
              onBlur={lostFocusNickname}
              type="text"
              placeholder="Nickname"
              autocomplete="nope"
            />
          </div>
          <div class="input-field">
            <input
              className={classEmail}
              onChange={EmailChangeHandler}
              onBlur={lostFocusEmail}
              type="email"
              placeholder="Email"
              autocomplete="nope"
            />
          </div>
          <div class="input-field">
            <input
              className={classpassword}
              onChange={passwordChangeHandler}
              onBlur={lostFocuspassword}
              type="password"
              placeholder="Password"
              autocomplete="new-password"
            />
          </div>
        </div>
        <div class="action">
          <button type="submit">create account</button>
        </div>
      </form>

      <div class="loadingDiv">
        <br />
        {error && <p>{erorSMS}</p>}
        {isLoading && <div className={loadingClasses["lds-dual-ring"]}></div>}
      </div>
    </div>
  );
};

export default Registar;
