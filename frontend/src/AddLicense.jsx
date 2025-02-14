import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useGlobalStore} from "./globalVariables";


const AddLicense = () =>{
    const navigate = useNavigate();
    const {licenseCreateAmmount, incrementAddLicense, decrementAddLicense, addLicenseOwnerGmail, expirationDate, licenseType, setAddLicenseGmail,setExpirationDate, createLicense,setLicenseType} = useGlobalStore();


    const addLicenseEvent= (e)=>{
        e.preventDefault();
        /*const formattedExpirationDate = new Date(expirationDate).toISOString();
        const creationDate = new Date().toISOString();
        console.log(formattedExpirationDate);
        console.log(creationDate);
        if(!licenseType){
            setMessage("select license type");
        }else{
            await axios.post('/API/create/license',{gmail, licenseType, creationDate, formattedExpirationDate })
            .then(result =>{
                console.log("license created");
                setGmail('');
                setLicenseType('');
                setExpirationDate('');
                retrieveLicense();
            })
            .catch(err=>{
                console.log(err);
            })
        }*/
        createLicense();
    }

    return(
        <div className="createLicense">
            <p className="loginTitle">Create license:</p>
            <form onSubmit={addLicenseEvent}>
                <div className="addLicenseContentContainer">
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> Owner email: </p>
                        <input className="addLicenseInput" type = "text" value={addLicenseOwnerGmail} onChange={e=>{setAddLicenseGmail(e.target.value)}} placeholder="email" required/>
                    </div>
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> Expiration date: </p>
                        <input type = "date" value={expirationDate} onChange={e=>{setExpirationDate(e.target.value)}} required/>
                    </div>
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> License type:</p>
                        <select value = {licenseType} onChange={e=>{setLicenseType(e.target.value)}}>
                            <option value="">--select--</option>
                            <option value="HOUDINI">HOUDINI</option>
                            <option value="NUKE">NUKE</option>
                            <option value="MAYA">MAYA</option>
                            <option value="3DSMAX">3DSMAX</option>
                            <option value="ARMNOLD">ARNOLD</option>
                            <option value="TGX">TGX</option>
                            <option value="REDSHIFT">REDSHIFT</option>
                            <option value="DAS_ELEMENT">DAS_ELEMENT</option>
                            <option value="NEATVIDEO">NEATVIDEO</option>
                            <option value="ZBRUSH">ZBRUSH</option>
                            <option value="TINDERBOX">TINDERBOX</option>
                            <option value="UNREAL">UNREAL</option>
                        </select>
                    </div>
                    <div className="addLiceseInputDiv">
                        <p className="inputLabel"> License ammount:</p>
                        <div className= "licenseAmmountContainer">
                            <button type="button" onClick={incrementAddLicense}> + </button>
                            <p> {licenseCreateAmmount}</p>
                            <button type="button" onClick={decrementAddLicense}> - </button>
                        </div>
                    </div>
                    <button className="createButton" type="submit">CREATE</button>
                </div>
            </form>
        </div>
    )
}
export default AddLicense;