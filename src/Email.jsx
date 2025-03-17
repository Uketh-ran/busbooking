
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketDetailed } from "react-icons/bs";
import Copy from './Copy';
import './Email.css'; // Import external CSS for styling

const Email = () => {
  return (
    <div className="show-tickets-container">
      <Container className="text-center">
        <h2 className="title">SMS AND EMAIL TICKET</h2>
        <p className="subtitle">
          Verify your details, and <span className="text-danger">EMAIL / SMS</span> your tickets
        </p>

        {/* Input Form */}
        <Row className="justify-content-center form-section">
          <Col lg={4} md={6} sm={12}>
            <label className="input-label">TICKET NUMBER</label>
            <div className="input-container">
              <BsTicketDetailed className="input-icon" />
              <input type="text" placeholder="Enter your ticket number" className="custom-input" />
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <label className="input-label">MOBILE NUMBER</label>
            <div className="input-container">
              <select className="country-code">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input type="text" placeholder="Enter your mobile number" className="custom-input" />
            </div>
          </Col>

          <Col lg={2} md={6} sm={12} className="text-center">
            <button className="submit-button">SUBMIT</button>
          </Col>
        </Row>
      </Container>

      {/* Copy Footer */}
      <div className="footer-bg">
        <Copy />
      </div>
    </div>
  );
};

export default Email;
