import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Help from './Help';
import Cancel from './Cancel';
import Home from './Home';
import Buspage from './Buspage';
import ChangeDate from './ChangeDate';
import BoardingPage from './BoardingPage';
import NavBar from './NavBar';
import Email from './Email';
import Show from './Show';
import ViewOffer from "./Viewoffer"

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-offer" element={<ViewOffer />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cancel-ticket" element={<Cancel />} />
          <Route path="/change-travel-date" element={<ChangeDate />} />
          <Route path="/email" element={<Email />} />
          <Route path="/show-my-ticket" element={<Show />} />
          <Route path="/Buspage/" element={<Buspage />}>
            <Route path="boarding" element={<BoardingPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

