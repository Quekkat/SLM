// src/components/MainPage.jsx
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LicenseList from './LicenseList';
import Tab  from './Tab';
import DisplayChart from './DisplayChart';
import LicenseStatus from './LicenseStatus';
import AddLicense from './AddLicense';
const MainPage = () => {
  //States
  const [licenseList, setLicenseList] = useState(null);
  const navigate = useNavigate();

  //retrieves license list
  const retrieveLicense = async () => {
    console.log("retrieving");
    await axios.get('/API/license/list').then (response =>{
      setLicenseList(response.data);
    }).catch(error => {
      console.error(error);
    });
  }
  //Fetches the license list on first run
  useEffect(() =>{
    retrieveLicense();
  }, []);

  //Deletes license
  const handleDelete = async (id) =>{
    console.log('deleting'+id);
    await axios.delete('API/license/delete/'+id)
    .then((response)=>{
      retrieveLicense();
      console.log(response.data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  const findLicense = async (username) =>{
    console.log("finding license:"+username);
    axios.get('/API/license/searchWho/'+username).then(response=>{
      if (response.data.length === 0) {
        // If no user found, show a popup
        alert('User does not exist!');
      }else{
        setLicenseList(response.data);
      }
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
        <div>
          <Tab findLicense={findLicense} retrieveLicense={retrieveLicense} retrieveSelectedLicense={retrieveSelectedLicense}/>
        </div>
        <div className="license-list-list-body">
          { licenseList && <LicenseList licenseList={licenseList} handleDelete = {handleDelete} />}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainPage;
