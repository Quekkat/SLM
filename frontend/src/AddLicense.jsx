import React from "react";
import {useGlobalStore} from "./globalVariables";


const AddLicense = () =>{
    const {licenseCreateAmmount, incrementAddLicense, decrementAddLicense, addLicenseOwnerGmail, expirationDate, licenseType, setAddLicenseGmail,setExpirationDate, createLicense,setLicenseType} = useGlobalStore();


    const addLicenseEvent= async (e)=>{
        e.preventDefault();
        await createLicense();
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
                        <input className="addLicenseInput" type = "date" value={expirationDate} onChange={e=>{setExpirationDate(e.target.value)}} required/>
                    </div>
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> License type:</p>
                        <select className="addLicenseInput" value = {licenseType} onChange={e=>{setLicenseType(e.target.value)}}>
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
                        <div className= "license-ammount-container">
                            <p className="inputLabel"> License ammount:</p>
                            <button type="button" onClick={incrementAddLicense}> + </button>
                            <p> {licenseCreateAmmount}</p>
                            <button type="button" onClick={decrementAddLicense}> - </button>
                            <button type="submit">CREATE</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddLicense;