import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddLicense = ({retrieveLicense}) =>{
    const [gmail, setGmail] = useState('');
    const [licenseType, setLicenseType] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const navigate = useNavigate();


    const addLicenseEvent= async(e)=>{
        e.preventDefault();
        const formattedExpirationDate = new Date(expirationDate).toISOString();
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
        }
    }

    return(
        <div className="createLicense">
            <p className="loginTitle">Create license:</p>
            <form onSubmit={addLicenseEvent}>
                <div className="addLicenseContentContainer">
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> Owner email: </p>
                        <input className="addLicenseInput" type = "text" value={gmail} onChange={e=>{setGmail(e.target.value)}} placeholder="email" required/>
                    </div>
                    <div className="addLicenseInputDiv">
                        <p className="inputLabel"> Expiration date: </p>
                        <input type = "date" value={expirationDate} onChange={e=>{setExpirationDate(e.target.value)}} required/>
                    </div>
                    <div className="addLicenseInputDiv">
                    <p className="inputLabel"> License type:</p>
                    <select value = {licenseType} onChange={e=>{setLicenseType(e.target.value)}}>
                        <option value="">--select--</option>
                        <option value="MAYA">MAYA</option>
                        <option value="HOUDINI">HOUDINI</option>
                        <option value="UNREAL">UNREAL</option>
                    </select>
                    </div>
                    <button className="createButton" type="submit">CREATE</button>
                </div>
            </form>
        </div>
    )
}
export default AddLicense;