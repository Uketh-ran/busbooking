
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './rdc-redbus-logo.svg';
import "./Copy.css";
import { MdOutlineCopyright } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Copy = () => {
  return (
    <div className='copybg'>
      <Container fluid className='mt-5 px-5'>
        <Row className="gy-4 justify-content-center">
          {/* Logo & Description */}
          <Col lg={3} md={6} sm={12}>
            <img src={logo} alt="Redbus Logo" className="logo mb-3" />
            <p className='text-of-red'>
              redBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. 
              redBus offers bus ticket booking through its website, iOS, and Android mobile apps for all major routes.
            </p>
          </Col>

          {/* About redBus */}
          <Col lg={2} md={3} sm={6}>
            <p className='fw-bold'>About redBus</p>
            <ul className='footer-list'>
              <li>About Us</li>
              <li>Investor Relations</li>
              <li>Contact Us</li>
              <li>redBus on Mobile</li>
              <li>Sitemap</li>
              <li>Offers</li>
              <li>Careers</li>
              <li>Values</li>
            </ul>
          </Col>

          {/* Info */}
          <Col lg={2} md={3} sm={6}>
            <p className='fw-bold'>Info</p>
            <ul className='footer-list'>
              <li>T&C</li>
              <li>Privacy Policy</li>
              <li>FAQ</li>
              <li>Blog</li>
              <li>Bus Operator Registration</li>
              <li>Agent Registration</li>
              <li>Insurance Partner</li>
              <li>User Agreement</li>
              <li>Primo Bus</li>
              <li>Bus Timetable</li>
            </ul>
          </Col>

          {/* Global Sites */}
          <Col lg={2} md={3} sm={6}>
            <p className='fw-bold'>Global Sites</p>
            <ul className='footer-list'>
              <li>India</li>
              <li>Singapore</li>
              <li>Malaysia</li>
              <li>Indonesia</li>
              <li>Peru</li>
              <li>Colombia</li>
              <li>Cambodia</li>
              <li>Vietnam</li>
            </ul>
          </Col>

          {/* Our Partners */}
          <Col lg={2} md={3} sm={6}>
            <p className='fw-bold'>Our Partners</p>
            <ul className='footer-list'>
              <li>Goibibo Bus</li>
              <li>Goibibo Hotels</li>
              <li>Makemytrip Hotels</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <Container fluid className='mt-5 px-5 text-center'>
        <hr />
        <Row className='copy-2 align-items-center'>
          <Col lg={6} sm={12} className='mt-3 text-lg-start text-center'>
            <MdOutlineCopyright /> <span>2025 Redbus India Pvt Ltd. All rights reserved</span>
          </Col>

          <Col lg={6} sm={12} className='mt-3 text-lg-end text-center'>
            <FaFacebookF className='me-3 social-icon' />
            <FaLinkedinIn className='me-3 social-icon' />
            <FaTwitter className='me-3 social-icon' />
            <AiFillInstagram className='social-icon' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Copy;
