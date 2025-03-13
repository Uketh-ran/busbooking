// import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { BsTicketDetailed } from "react-icons/bs";
// import Copy from './Copy';

// const ShowTickets = () => {
//       return (
//             <div>
//                   <div className='bgforchange'>
//                         <div className=''>
//                               <Container>

//                                     <h2 className='fw-light text-center pt-5'>SMS AND EMAIL TICKET</h2>
//                                     <div className='text-center pt-3'>
//                                           <span className='fs-5 '>Verify your details, and  </span><span className='fs-5 text-danger'> EMAIL / SMS</span><span className='fs-5'> your tickets</span>
//                                     </div>
//                                     <Row>
//                                           <Col lg={5}>
//                                                 <div>
//                                                       <label className='mt-4 ticketnum '>TICKET NUMBER</label>
//                                                       <div className=' text-center change-bs-bg mt-2'>
//                                                             <BsTicketDetailed className='bsticket' />
//                                                             <input type="text"
//                                                                   placeholder='Enter your ticket number'
//                                                                   className='enter-ticket-no ms-2 change-bs' />
//                                                       </div>
//                                                 </div>
//                                           </Col>
//                                           <Col lg={5}>

//                                                 <label className='mt-4 ticketnum mobilenum'>MOBILE NUMBER</label>
//                                                 <div className=' text-center change-bs-bg change-bs2-bg mt-2'>
//                                                       <div className='country-code-selector d-inline'>
//                                                             <select className='country-code'>
//                                                                   <option value='+1'>+91 </option>
//                                                                   <option value='+44'>+44 </option>
//                                                                   <option value='+91'>+1 </option>
//                                                             </select>
//                                                       </div>
//                                                       <input type="text"
//                                                             placeholder=''
//                                                             className='enter-ticket-no ms-2 change-bs' />
//                                                 </div>
//                                           </Col>
//                                           <Col lg={2} className='searchinchangecol'>
//                                                 <button className='text-light searchinchangebutton ps-4 pt-2 pb-2 pe-4'>SUBMIT</button>
//                                           </Col>
//                                     </Row>
//                               </Container>
//                         </div>
//                         <div className='pt-4 bg-light'>
//                               <Copy />
//                         </div>


//                   </div>

//             </div>
//       )
// }

// export default ShowTickets

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketDetailed } from "react-icons/bs";
import Copy from './Copy';
import './ShowTickets.css'; // Import external CSS for styling

const ShowTickets = () => {
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

export default ShowTickets;
