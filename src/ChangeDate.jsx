import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketDetailed } from "react-icons/bs";
import searchre from "./search_reschedule.png";
import choosere from "./choose_reschedule.png";
import confirmre from "./confirm_reschedule.png";
import Copy from './Copy';
import './ChangeDate.css'; // Import external CSS for exact styling

const ChangeDate = () => {
  return (
    <div className='change-date-container'>
      <Container className="text-center">
        <h2 className='title'>Change Travel Date</h2>
        <p className='subtitle'>
          Verify your details, and <span className="text-danger">Change Travel Date</span>
        </p>

        {/* Ticket and Mobile Number Inputs */}
        <Row className="justify-content-center form-section">
          <Col lg={4} md={6} sm={12}>
            <label className='input-label'>TICKET NUMBER</label>
            <div className='input-container'>
              <BsTicketDetailed className='input-icon' />
              <input type="text" placeholder='Enter your ticket number' className='custom-input' />
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <label className='input-label'>MOBILE NUMBER</label>
            <div className='input-container'>
              <select className='country-code'>
                <option value='+91'>+91</option>
                <option value='+1'>+1</option>
                <option value='+44'>+44</option>
              </select>
              <input type="text" placeholder='Enter your mobile number' className='custom-input' />
            </div>
          </Col>

          <Col lg={2} md={6} sm={12} className='text-center'>
            <button className='search-ticket-button'>SEARCH</button>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <Container fluid className='how-it-works'>
        <Row>
          <Col lg={12} className='text-center'>
            <h3 className='how-title'>How it works?</h3>
          </Col>
        </Row>

        <Row className="text-center">
          <Col lg={4} md={6} sm={12} className='how-step'>
            <img src={searchre} alt="Search Ticket" className='how-img' />
            <p className='how-step-title'>Search Ticket:</p>
            <p className='how-step-text'>Enter your ticket number and Email ID to search the ticket.</p>
          </Col>

          <Col lg={4} md={6} sm={12} className='how-step'>
            <img src={choosere} alt="Choose Travel Date" className='how-img' />
            <p className='how-step-title'>Choose Travel Date</p>
            <p className='how-step-text'>Verify your ticket and choose a date to change your travel date.</p>
          </Col>

          <Col lg={4} md={6} sm={12} className='how-step'>
            <img src={confirmre} alt="Confirmation" className='how-img' />
            <p className='how-step-title'>Confirmation:</p>
            <p className='how-step-text'>Select your bus and confirm date change by paying the difference amount.</p>
          </Col>
        </Row>
      </Container>

      <Copy />
    </div>
  );
};

export default ChangeDate;
