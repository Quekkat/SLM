import React, {useState} from "react";
const Tab = ({findLicense,retrieveLicense, retrieveSelectedLicense}) =>{  
    const [findWho, setFindWho] = useState('');
    const [licenseType, setLicenseType] = useState('');
    //form wrapper for search user button
    const formSubmitEvent = async(e)=>{
        e.preventDefault();
        findLicense(findWho);
    }
    //Triggers when pressed enter
    const handleEnterKey = (event) =>{
        if(event.key==="Enter"){
            console.log("clicked");
            findLicense(findWho);
        }
    }
    const handleType = (e)=>{
        setLicenseType(e.target.value);
        if(!e.target.value){
            retrieveLicense();
        }else{
            retrieveSelectedLicense(e.target.value);
        }
    }
    return(
        <div className="tabContainer">
            <form className="tab-card" onSubmit={formSubmitEvent}>
                <input className="tab-input" type="text" value ={findWho} onChange={(e)=>{setFindWho(e.target.value);}} onKeyDown={handleEnterKey} placeholder="search users" required/>
                <button className="tab-button" type ="submit">search</button>
            </form>
            <button onClick={()=>{retrieveLicense(); setFindWho('')}}> refresh</button>
            <div>
                <p className="bold-text">Filter: </p>
            </div>
            <select className="tab-filter" value = {licenseType} onChange={handleType}>
                    <option value="">none</option>
                    <option value="MAYA">MAYA</option>
                    <option value="HOUDINI">HOUDINI</option>
                    <option value="UNREAL">UNREAL</option>
            </select>
        </div>
    );
}
export default Tab;