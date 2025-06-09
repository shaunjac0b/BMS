import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import StatementsRewards from './Pages/StatementsRewards';
import Navbar from './Components/Navbar'; // make sure the path is correct

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // stays here if this file exists in src/

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statements-rewards" element={<StatementsRewards />} />
      </Routes>
    </Router>
  );
}

export default App;
