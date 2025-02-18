import {useGlobalStore} from "./globalVariables";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const AdminPage =()=>{
    const [password, setPassword] = useState("");
    const [accountName, setAccountName]= useState("");
    const navigate = useNavigate();

    const backEvent = () =>{
        navigate("/mainPage");
    }

    const handleCreateForm = async (e)=>{
        e.preventDefault();


    }

    return(
        <div className="login-base">
            <div className="loginPageBody">
                <p className="loginTitle"> CREATE NEW ACCOUNT</p>
                <form autoComplete="off" onSubmit={handleCreateForm}>
                    <div className="contentDisplay">
                        <p>Username:</p>
                        <div className="inputBoxWrapper">
                        <input type ="text" className="inputBox" placeholder="account name" value={accountName}onChange={(e) => setAccountName(e.target.value)}required></input>
                        </div>
                        <p>Password:</p>
                        <div className="inputBoxWrapper">
                        <input type="text" className="inputBox" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        </div>
                    </div>
                    <button type = "submit"> CREATE ACCOUNT </button>
                </form>
                <button type="button" onClick={backEvent}>back</button>
            </div>

        </div>
    );
}
export default AdminPage;