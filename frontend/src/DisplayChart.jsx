import React,{useState, useEffect} from "react";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const DisplayChart = ({listeningList}) => {
    //TODO: refresh graph
    const [displayState, setDisplayState] = useState([]);
    var graphData =[];
    const today = new Date();

    const findExpiredLicense=(licenseList = [], type, isoDate) =>{
      const filteredLicense = licenseList.filter(
        (license) => license.licenseType === type && license.dateExpired >= isoDate
      ).length;
      console.log("the ammount of", type, " license is: ", filteredLicense);
      return filteredLicense;

    }

    //when the license is retrieved
    const refreshGraph = (licenseList =[])=>{
        console.log("updating graph");
        graphData.length =0;
        //This function loops into the upcoming 12 month to see how many license isnt expired each
        for (let i = 0; i < 12; i++) {
            //list the 12 months
            const date = new Date(today.getFullYear(), today.getMonth() + i, 1); // Calculate the month
            const monthName = date.toLocaleString('default', { month: 'short' }); // Get full month name
            const isoDate = date.toISOString();
            //find the expired houdini license
            //const filteredHoudini = licenseList.filter((license)=> license.licenseType ==="HOUDINI" && license.dateExpired>=isoDate);
            //const houdiniInt = filteredHoudini.length;

            const houdiniInt = findExpiredLicense(licenseList, "HOUDINI", isoDate);
            const nukeInt = findExpiredLicense(licenseList,"NUKE",isoDate);
            const MayaInt = findExpiredLicense(licenseList,"MAYA",isoDate);
            const _3DSMaxInt = findExpiredLicense(licenseList,"3DSMAX",isoDate);
            const arnoldInt = findExpiredLicense(licenseList,"ARNOLD",isoDate);
            const TGXInt = findExpiredLicense(licenseList,"TGX",isoDate);
            const redshiftInt = findExpiredLicense(licenseList,"REDSHIFT",isoDate);
            const dasElementInt = findExpiredLicense(licenseList,"DAS_ELEMENT",isoDate);
            const neatVideoInt = findExpiredLicense(licenseList,"NEATVIDEO",isoDate);
            const zBrushInt = findExpiredLicense(licenseList,"ZBRUSH",isoDate);
            const tinderboxInt = findExpiredLicense(licenseList,"TINDERBOX",isoDate);
            const unrealInt = findExpiredLicense(licenseList,"UNREAL",isoDate);


            //push the data
            graphData.push({ month: monthName, houdini: houdiniInt, nuke: nukeInt, maya: MayaInt, _3dsmax:_3DSMaxInt, arnold:arnoldInt, tgx: TGXInt, redshift: redshiftInt, daselement:dasElementInt, neatvido:neatVideoInt, zbrush:zBrushInt, tinderbox: tinderboxInt, unreal: unrealInt});
          }
        setDisplayState(graphData);
    }

    const retrieveLicense = async () => {
      console.log("display chart retrieving license")
      try{
        const response = await axios.get('/API/license/list');
        console.log("display chart retrieve license result response data:");
        console.log(response.data);
        refreshGraph(response.data);
      }catch(error){
        console.error(error);
        console.log("Display chart retrieve license failed");
      }
    }
    useEffect(() =>{
        console.log("Display chart use effect");
        retrieveLicense();

      }, [listeningList]);

    return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={displayState} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="month"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="houdini" name="Houdini" stroke="#756515" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="nuke" name="Nuke" stroke="#ce5603" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="maya" name="Maya" stroke="#d69e1c" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="_3dsmax" name="3DS Max" stroke="#668fcb" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="arnold" name="Arnold" stroke="#8446e3" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="tgx" name="TGX" stroke="#2cc196" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="redshift" name="Redshift" stroke="#0a6460" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="daselement" name="Das Element" stroke="#2226a1" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="neatvido" name="Neat Video" stroke="#c75088" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="zbrush" name="ZBrush" stroke="#6d0606" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="tinderbox" name="Tinderbox" stroke="#da9898" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="unreal" name="Unreal" stroke="#27cb19" strokeWidth={5} isAnimationActive={false}/>

                <CartesianGrid strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
    );
      
};

export default DisplayChart;
