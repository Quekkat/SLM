import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {useGlobalStore} from "./globalVariables";
const Navbar =()=>{
    const {refreshEvent, setFilterLicense, filter, findLicense, setFindLicense, findLicenseEvent} = useGlobalStore();
    const navigate = useNavigate();
    const logoutEvent =()=>{
        navigate("/");
    };
    const adminPageEvent = ()=>{
        navigate("/adminPage");
    }
    return(
        <div className="navigation-bar">
            <div className="create-admin-logout-div">
                <button type="button" onClick={adminPageEvent}>Create Admin</button>
                <button type="button" onClick={logoutEvent}>logout</button>
            </div>
            <div className="tab-div-container">
                <p> Filter license:</p>
                <div className="filter-div">
                    <select value = {filter} onChange={e=>{setFilterLicense(e.target.value)}}>
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
                        <input className="find-license-input" type = "text" value={findLicense} onChange={e=>{setFindLicense(e.target.value)}} placeholder="gmail"/>
                        <button type="button" onClick={findLicenseEvent}>Search</button>
                </div>
                <button type="button" onClick={refreshEvent}>Refresh</button>
            </div>
        </div>
    );
}
export default Navbar;