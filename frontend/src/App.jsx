import React from 'react';
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";  
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<LoginPage />}/>
        <Route path = "/mainPage" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;