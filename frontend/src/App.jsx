import React from 'react';
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";  
import AddLicense from './AddLicense';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<LoginPage />}/>
        <Route path = "/mainPage" element={<MainPage/>}/>
        <Route path = "/addLicense" element = {<AddLicense/>}/>
      </Routes>
    </Router>
  );
}

export default App;