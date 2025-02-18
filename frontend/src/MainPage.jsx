// src/components/MainPage.jsx
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LicenseList from './LicenseList';
import Tab  from './Tab';
import DisplayChart from './DisplayChart';
import LicenseStatus from './LicenseStatus';
import AddLicense from './AddLicense';
import Navbar from './Navbar';
import {useGlobalStore} from "./globalVariables";
const MainPage = () => {
  const{licenseList, refreshEvent} = useGlobalStore();
  //Fetches the license list on first run
  useEffect(() =>{
    refreshEvent();
  }, []);

  //Deletes license
  const handleDelete = async (id) =>{
    console.log('deleting'+id);
    await axios.delete('API/license/delete/'+id)
    .then((response)=>{
      refreshEvent();
      console.log(response.data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  const retrieveSelectedLicense =(value)=>{
    axios.get('/API/license/searchWhat/'+value).then(response=>{
      setLicenseList(response.data);
    })
  }

  return (

    <div>
      <div className="baseBody">
        <Navbar/>
        <div className="main-page-body">
            <div className="statsHead">
              <div>
                <p className="bold-text">License Expiration Graph:</p>
              </div>
                <div className="graphContainer">
                  <DisplayChart listeningList={licenseList}/>
                </div>
                <div className="statusContainer">
                  <LicenseStatus listenLicense={licenseList}/>
                  <AddLicense/>
                </div>
            </div>
            <div className = "license-list-body">
              <div className="license-list-list-body">
                { licenseList && <LicenseList/>}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
