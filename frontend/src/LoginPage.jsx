import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGlobalStore} from "./globalVariables";
function LoginPage(){
    const {loginName, loginPassword, loginEvent, setLoginName, setLoginPassword, respondResult } = useGlobalStore();
    const navigate = useNavigate();
    const signInEvent = async (e) => {
        e.preventDefault();
        console.log("loginpage sign in event");
       await loginEvent()
       const result = useGlobalStore.getState().respondResult;
       console.log("sign in event: the result is" ,result)
        if(result=="success"){
            navigate("/mainPage");
        }
      };
    
    return(
        <div className="login-base">
            <div className="loginPageBody">
                <p className="loginTitle"> Sign-in</p>
                <form onSubmit={signInEvent}>
                <div className="contentDisplay">
                    <p>Username:</p>
                    <div className="inputBoxWrapper">
                    <input type ="text" className="inputBox" value={loginName}onChange={(e) => setLoginName(e.target.value)}required></input>
                    </div>
                    <p>Password:</p>
                    <div className="inputBoxWrapper">
                    <input type="password" className="inputBox"value={loginPassword}onChange={(e) => setLoginPassword(e.target.value)} required></input>
                    </div>
                </div>
                <button type = "submit">SIGN-IN </button>
                </form> 
            </div>
        </div>
    )
}
export default LoginPage