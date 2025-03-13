import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Help from './Help';
import Cancel from './Cancel';
import Home from './Home';
import Buspage from './Buspage';
import ChangeDate from './ChangeDate';
import ShowTickets from './ShowTickets'
import BoardingPage from './BoardingPage';
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cancel-ticket" element={<Cancel />} />
          <Route path="/change-travel-date" element={<ChangeDate />} />
          <Route path="/show-my-ticket" element={<ShowTickets />} />
          <Route path="/Buspage/" element={<Buspage />}>
            <Route path="boarding" element={<BoardingPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

