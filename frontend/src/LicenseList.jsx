import React from 'react';
import {useGlobalStore} from "./globalVariables";

const LicenseList = () => {
    //bla bla bla
    const{licenseList, deleteLicense}=useGlobalStore();
  return (
    <div>
      {licenseList.map((license)=>{
        //Formats created date
        const formattedExpirationDate = new Date(license.dateExpired).toLocaleDateString("en-GB",{
          day: "2-digit", month: "long", year: "numeric"
        });
        //Formats expiration date
        const formattedCreatedDate = new Date(license.dateCreated).toLocaleDateString("en-GB",{
          day: "2-digit", month: "long", year: "numeric"
        });
        return(
        <div className="licenseTile" key={license._id}>
          <div>
            <p> Owner: {license.userGmail}</p>
            <p> License type: {license.licenseType}</p>
            <p> Created date: {formattedCreatedDate}</p>
            <p> Expiration date: {formattedExpirationDate}</p>
          </div>
          <div>
            <button onClick ={()=>deleteLicense(license._id)}>Delete</button>
          </div>
        </div>
        );
      })}
    </div>
  );
}

export default LicenseList;
