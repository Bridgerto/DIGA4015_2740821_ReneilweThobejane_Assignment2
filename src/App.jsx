// HOOKS
import React from 'react'
import { Routes, Route } from 'react-router-dom';

//PAGES
import OnBoarding from './pages/OnBoarding';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SignUpFixedCosts from './pages/SignUpFixedCosts';
import SignUpBankVerification from './pages/SignUpBankVerification';

import MoneySnapshot from './pages/MoneySnapshot';
import Profile from './pages/Profile';
import SimulationStudio from './pages/SimulationStudio';
import StrategyTracks from './pages/StrategyTracks';


// COMPONENTS
import NavBar from './components/NavBar';

//STYLING
import './App.css'



export default function App() {
   
    return (
    <div>
      <Routes>
        <Route path="/" element={<OnBoarding />}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>  
        <Route path="/SignUpFixedCosts" element={<SignUpFixedCosts/>}/>
        <Route path="/SignUpBankVerification" element={<SignUpBankVerification/>}/>
    
        <Route path="/MoneySnapshot" element={<MoneySnapshot/>}/>
        <Route path="/StrategyTracks" element={<StrategyTracks />}/>
        <Route path="/SimulationStudio" element={<SimulationStudio />}/>
        <Route path="/Profile" element={<Profile />}/>
      </Routes>    
    </div>
  );
}

