import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketDetailed } from "react-icons/bs";
import Copy from './Copy';
import './Show.css';

const Show = () => {
  return (
    <div className="show-tickets-container">
      <Container className="text-center">
        {/* Heading */}
        <h2 className="title">PRINT TICKET</h2>
        <p className="subtitle">
          Verify your details, and <span className="text-danger">Print</span> your tickets
        </p>

        {/* Input Form */}
        <Row className="justify-content-center form-section align-items-end">
          {/* Ticket Number Field */}
          <Col lg={4} md={6} sm={12} className="text-start ">
            <label className="input-label1">TICKET NUMBER</label>
            <div className="input-container1">
              <BsTicketDetailed className="input-icon" />
              <input type="text" placeholder="Enter your ticket number" className="custom-input" />
            </div>
          </Col>

          {/* Mobile Number Field */}
          <Col lg={4} md={6} sm={12} className="text-start">
            <label className="input-label1">MOBILE NUMBER</label>
            <div className="input-container1">
              <select className="country-code">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input type="text" placeholder="" className="custom-input" />
            </div>
          </Col>

          {/* Submit Button */}
          <Col lg={2} md={12} sm={12} className="text-center mt-3 mt-lg-0">
            <button className="submit-button">SUBMIT</button>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <div className="footer-bg">
        <Copy />
      </div>
    </div>
  );
};

export default Show;
