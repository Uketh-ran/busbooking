import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import { IoBusOutline } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { GoArrowSwitch } from "react-icons/go";
import Copy from './Copy';
import { useNavigate, useLocation } from 'react-router-dom';
import Corsl from './Corsl';
import Primo from './Primo';
import Flag from './Flag';
import Faqsec from './Faqsec';

const Home = () => {
  const location = useLocation();

  // Retrieve previous state if exists
  const [fromLocation, setFromLocation] = useState(location.state?.from || "");
  const [toLocation, setToLocation] = useState(location.state?.to || "");
  const [startDate, setStartDate] = useState(location.state?.date || new Date());

  useEffect(() => {
    // Load stored values when component mounts
    const savedFrom = sessionStorage.getItem("fromLocation");
    const savedTo = sessionStorage.getItem("toLocation");
    const savedDate = sessionStorage.getItem("startDate");

    if (savedFrom) setFromLocation(savedFrom);
    if (savedTo) setToLocation(savedTo);
    if (savedDate) setStartDate(new Date(savedDate));
  }, []);

  useEffect(() => {
    // Save values whenever they change
    sessionStorage.setItem("fromLocation", fromLocation);
    sessionStorage.setItem("toLocation", toLocation);
    sessionStorage.setItem("startDate", startDate);
  }, [fromLocation, toLocation, startDate]);

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const swapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSearch = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // Check login status

    if (!isLoggedIn) {
      alert("You must be logged in to search for buses.");
      return;
    }

    navigate('/Buspage', { state: { from: fromLocation, to: toLocation, date: startDate } });
  };

  return (
    <div>
      <Container fluid className='homebg '>
        <Row>
          <Col lg={12}>
            <h1 className='text-light text-center mx-auto '>India's No. 1 Online Bus Ticket Booking Site</h1>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center mt-5">
          <Col lg={12} md={6} className="text-center">
            <div className='mediaform'>
              <div className='fromdiv'>
                <IoBusOutline className='bus1 cursor-pointer media-bus-from media375' />
                <span className='from-text cursor-pointer media-from '>From</span>
                <input
                  type="text"
                  className='from input-mediafrom cursor-pointer'
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              <div className='todiv'>
              <div className='godiv'>
                <button className='gobutton mediachange-button' onClick={swapLocations}><GoArrowSwitch /></button>
              </div>
                <IoBusOutline className='bus2 cursor-pointer' />
                <span className='from-text to-text cursor-pointer media-to'>To</span>
                <input
                  type="text"
                  className='to cursor-pointer '
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              <div className='datediv'>

                <HiOutlineCalendarDateRange className="date_icon me-2" />
                <span className=' date-text'>Date</span>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  className="datepicker-input"
                  showYearDropdown
                  scrollableMonthYearDropdown
                />

              </div>
              <div className='searchdiv'>
                <button className='search-button fw-bold media-search' onClick={handleSearch}>SEARCH BUSES</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Corsl />
      <Primo />
      <Flag />
      <Faqsec />
      <Copy />
    </div>
  );
}

export default Home;

// import React,{ useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import "./Home.css";
// import { IoBusOutline } from "react-icons/io5";
// import { HiOutlineCalendar } from "react-icons/hi";
// import { GoArrowSwitch } from "react-icons/go";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Copy from "./Copy";

// const Home = () => {
//     const location = useLocation();

//   // Retrieve previous state if exists
//   const [fromLocation, setFromLocation] = useState(location.state?.from || "");
//   const [toLocation, setToLocation] = useState(location.state?.to || "");
//   const [startDate, setStartDate] = useState(location.state?.date || new Date());

//   useEffect(() => {
//     // Load stored values when component mounts
//     const savedFrom = sessionStorage.getItem("fromLocation");
//     const savedTo = sessionStorage.getItem("toLocation");
//     const savedDate = sessionStorage.getItem("startDate");

//     if (savedFrom) setFromLocation(savedFrom);
//     if (savedTo) setToLocation(savedTo);
//     if (savedDate) setStartDate(new Date(savedDate));
//   }, []);

//   useEffect(() => {
//     // Save values whenever they change
//     sessionStorage.setItem("fromLocation", fromLocation);
//     sessionStorage.setItem("toLocation", toLocation);
//     sessionStorage.setItem("startDate", startDate);
//   }, [fromLocation, toLocation, startDate]);

//   const navigate = useNavigate();

//   const handleDateChange = (date) => {
//     setStartDate(date);
//   };

//   const swapLocations = () => {
//     setFromLocation(toLocation);
//     setToLocation(fromLocation);
//   };

//   const handleSearch = () => {
//     const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // Check login status

//     if (!isLoggedIn) {
//       alert("You must be logged in to search for buses.");
//       return;
//     }

//     navigate('/Buspage', { state: { from: fromLocation, to: toLocation, date: startDate } });
//   };

//   return (
//     <div>
//       <Container fluid className="home-bg">
//         <h1 className="heading text-center">India's No. 1 Online Bus Ticket Booking Site</h1>

//         <div className="search-container">
//           <div className="input-box">
//             <IoBusOutline className="icon" />
//             <input
//               type="text"
//               placeholder="From"
//               value={fromLocation}
//               onChange={(e) => setFromLocation(e.target.value)}
//             />
//           </div>

//           <button className="swap-btn" onClick={swapLocations}>
//             <GoArrowSwitch className="swap-icon" />
//           </button>

//           <div className="input-box">
//             <IoBusOutline className="icon" />
//             <input
//               type="text"
//               placeholder="To"
//               value={toLocation}
//               onChange={(e) => setToLocation(e.target.value)}
//             />
//           </div>

//           <div className="input-box date-input-box">
//             <HiOutlineCalendar className="icon" />
//             <DatePicker
//               selected={startDate}
//               onChange={handleDateChange}
//               dateFormat="dd MMM yyyy"
//               minDate={new Date()}
//             />
//           </div>

//           <button className="search-btn" onClick={handleSearch}>SEARCH BUSES</button>
//         </div>

//       </Container>
//       <Copy />
//     </div>
//   );

// };

// export default Home;
