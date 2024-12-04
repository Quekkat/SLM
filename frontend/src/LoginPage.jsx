import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginPage(){
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [wordword, setWordword] = useState();
    const navigate = useNavigate();
    const signInEvent = async (e) => {
        e.preventDefault();
        await axios.post('/API/login', {username,password})
        .then(result =>{
            if(result.data==="success"){
                //navigates to main page
                navigate("/mainPage");

            }
            console.log(result);
            setWordword(result.data);
        })
        .catch(err=>{
            console.log(err);
            setWordword("error");
        })
      };
    
    return(
        <div className="login-base">
            <div className="loginPageBody">
                <p className="loginTitle"> Sign-in</p>
                <form onSubmit={signInEvent}>
                <div className="contentDisplay">
                    <p>Username:</p>
                    <div className="inputBoxWrapper">
                    <input type ="text" className="inputBox" value={username}onChange={(e) => setUsername(e.target.value)}required></input>
                    </div>
                    <p>Password:</p>
                    <div className="inputBoxWrapper">
                    <input type="password" className="inputBox"value={password}onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                </div>
                <button type = "submit">SIGN-IN </button>
                </form> 
                <p>{wordword}</p>
            </div>
        </div>
    )
}
export default LoginPage