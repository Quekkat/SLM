import React,{useState, useEffect} from "react";
import axios from 'axios';
const LicenseStatus =({listenLicense}) =>{
const [activeLicense, setActiveLicense] = useState('');
const [expiredLicense, setExpiredLicense] = useState('');
const [totalLicense, setTotalLicense] = useState('');
const [licenseList, setLicenseList] = useState(null);

//from other
useEffect(()=>{
    axios.get('/API/license/list').then (response =>{
        setLicenseList(response.data);
      }).catch(error => {
        console.error(error);
      });
},[listenLicense]);
//from internal
useEffect(()=>{
    if(licenseList){
        const today = new Date().toISOString();
        const activeLicenseArray = licenseList.filter((license)=>license.dateExpired>=today);
        setActiveLicense(activeLicenseArray.length);
        const expiredLicenseArray = licenseList.filter((license)=>license.dateExpired<today);
        setExpiredLicense(expiredLicenseArray.length);
        setTotalLicense(licenseList.length);
    }
},[licenseList])
    return(
        <div className="license-card">
            <p className="bold-text">License Status:</p>
            <div>
                <p className="inputLabel">Active license:</p>
                <span>{activeLicense}</span>
            </div>
            <div>
                <p className="inputLabel">Expired license:</p>
                <span>{expiredLicense}</span>
            </div>
            <div>
                <p className="inputLabel">Total license:</p>
                <span>{totalLicense}</span>
            </div>
        </div>
    );
}
export default LicenseStatus;