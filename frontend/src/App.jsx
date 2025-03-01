import React, {lazy, Suspense} from 'react';
//import LoginPage from "./LoginPage";
//import MainPage from "./MainPage";  
//import AdminPage from './AdminPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const LoginPage =lazy(()=> import("./LoginPage"));
const MainPage =lazy(()=> import("./MainPage"));
const AdminPage = lazy(()=> import("./AdminPage"));
function App() {
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<Suspense><LoginPage /></Suspense>}/>
        <Route path = "/mainPage" element={<Suspense><MainPage/></Suspense>}/>
        <Route path ="/adminPage" element ={<Suspense><AdminPage/></Suspense>}/>
      </Routes>
    </Router>
  );
}

export default App;