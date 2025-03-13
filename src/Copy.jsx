// import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import logo from './rdc-redbus-logo.svg';
// import "./Copy.css"
// import { MdOutlineCopyright } from "react-icons/md";
// import { FaFacebookF } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";

// const Copy = () => {
//   return (
//     <div className='copybg'>
//       <Container fluid className='mt-5'>
//         <Row>
//           <Col lg={1} sm={0}></Col>
//           <Col lg={2} sm={12} className='logo'><img src={logo} alt="" /> <br /> <span className='text-of-red mt-1'> redBus is the world's largest online bus ticket booking
//             service trusted by over 25 million happy customers globally. redBus offers bus ticket booking through its
//             website, iOS and Android mobile apps for all major routes.</span></Col>
//           <Col lg={2} sm={12} className='ms-5 ps-4'>
//             <p className='fw-bold ms-2'>About redBus</p>
//             <p className='ms-2 text-of-red'>About Us</p>
//             <p className='ms-2 text-of-red'>Investor Relations</p>
//             <p className='ms-2 text-of-red'>Contact us</p>
//             <p className='ms-2 text-of-red'>redBus on mobile</p>
//             <p className='ms-2 text-of-red'>Sitemap</p>
//             <p className='ms-2 text-of-red'>Offers</p>
//             <p className='ms-2 text-of-red'>Careers</p>
//             <p className='ms-2 text-of-red'>Values</p>
//           </Col>
//           <Col lg={2} sm={12} >
//             <p className='fw-bold ms-2'>Info</p>
//             <p className='ms-2 text-of-red'>T&C</p>
//             <p className='ms-2 text-of-red'>Privacy policy</p>
//             <p className='ms-2 text-of-red'>FAQ</p>
//             <p className='ms-2 text-of-red'>Blog</p>
//             <p className='ms-2 text-of-red'>Bus operator registration</p>
//             <p className='ms-2 text-of-red'>Agent registration</p>
//             <p className='ms-2 text-of-red'>User agreement</p>
//             <p className='ms-2 text-of-red'>Primo Bus</p>
//             <p className='ms-2 text-of-red'>Bus Timetable</p>
//           </Col>
//           <Col lg={2} sm={12}>
//             <p className='fw-bold ms-2'>Global Sites</p>
//             <p className='ms-2 text-of-red'>India</p>
//             <p className='ms-2 text-of-red'>Singapore</p>
//             <p className='ms-2 text-of-red'>Malaysia</p>
//             <p className='ms-2 text-of-red'>Indonesia</p>
//             <p className='ms-2 text-of-red'>Peru</p>
//             <p className='ms-2 text-of-red'>Colombia</p>
//             <p className='ms-2 text-of-red'>Cambodia</p>
//             <p className='ms-2 text-of-red'>Vietnam</p>
//           </Col>
//           <Col lg={2} sm={12}>
//             <p className='fw-bold ms-2'> Our Partners</p>
//             <p className='ms-2 text-of-red'>Goibibo Bus</p>
//             <p className='ms-2 text-of-red'>Goibibo Hotels</p>
//             <p className='ms-2 text-of-red'>Makemytrip Hotels</p>
//           </Col>
//         </Row>
//       </Container>
//       <Container fluid className='mt-5'>
//         <Row className=' copy-2'>
          
//           <Col lg={5} sm={6} className='mt-4 pb-5'>
//             <MdOutlineCopyright /> <span>2025 Redbus India Pvt Ltd. All rights reserved</span>
//           </Col>
//           <Col lg={5} sm={1}></Col>
//           <Col lg={2} sm={5} className='mt-4 pb-5'>
//             <FaFacebookF className='me-4'/>
//             <FaLinkedinIn className='me-4'/>
//             <FaTwitter className='me-4'/>
//             <AiFillInstagram className='me-4'/>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Copy

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
