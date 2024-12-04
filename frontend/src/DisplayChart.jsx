import React,{useState, useEffect} from "react";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const DisplayChart = ({listeningList}) => {
    //TODO: refresh graph
    const [displayState, setDisplayState] = useState([]);
    var graphData =[];
    const today = new Date();
    //when the license is retrieved
    const refreshGraph = (licenseList)=>{
        graphData.length =0;
        console.log('Graph refreshing');
        for (let i = 0; i < 12; i++) {
            //list the 12 months
            const date = new Date(today.getFullYear(), today.getMonth() + i, 1); // Calculate the month
            const monthName = date.toLocaleString('default', { month: 'short' }); // Get full month name
            const isoDate = date.toISOString();
            //find the expired maya license
            const filteredMaya = licenseList.filter((license)=> license.licenseType ==="MAYA" && license.dateExpired>=isoDate);
            const mayaInt = filteredMaya.length;
            //find the expired houdini license
            const filteredHoudini = licenseList.filter((license)=> license.licenseType ==="HOUDINI" && license.dateExpired>=isoDate);
            const houdiniInt = filteredHoudini.length;
            //find the expired unreal license
            const filteredUnreal = licenseList.filter((license)=> license.licenseType ==="UNREAL" && license.dateExpired>=isoDate);
            const unrealInt = filteredUnreal.length;
            //push the data
            graphData.push({ month: monthName, maya: mayaInt, unreal: 1, houdini: houdiniInt });
          }
        console.log('The graph data is:');
        console.log(graphData);
        setDisplayState(graphData);
    }

    const retrieveLicense = async () => {
        await axios.get('/API/license/list').then (response =>{
          refreshGraph(response.data);
        }).catch(error => {
          console.error(error);
        });
      }
    useEffect(() =>{
        retrieveLicense();

      }, [listeningList]);

    return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={displayState} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="month"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="maya" stroke="#cf6400" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="unreal" stroke="#91230d" strokeWidth={5} isAnimationActive={false}/>
                <Line type="monotone" dataKey="houdini" stroke="#756515" strokeWidth={5} isAnimationActive={false}/>
                <CartesianGrid strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
    );
      
};

export default DisplayChart;
