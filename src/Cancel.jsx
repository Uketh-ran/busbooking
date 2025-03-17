
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketDetailed } from 'react-icons/bs';
import './Cancel.css';
import Copy from './Copy';

const Cancel = () => {
      return (
            <div className="bg-change  d-flex flex-column justify-content-center">
                  <Container>
                        {/* Title */}
                        <h5 className="text-center mt-4 mb-4 fw-light fs-1">Cancel your Ticket</h5>

                        {/* Input Fields Section */}
                        <Row className="justify-content-center">
                              {/* Ticket Number Input */}
                              <Col md={5} sm={12} className="d-flex align-items-center enter-no-cancel ms-2 me-2 pb-2">
                                    <div>
                                          <BsTicketDetailed className=" ms-2 me-2" />
                                          <input
                                                type="text"
                                                placeholder="ENTER TICKET NO"
                                                className="border-0 cyt flex-grow-1"
                                          />
                                    </div>
                              </Col>

                              {/* Mobile Number Input */}
                              <Col md={5} sm={12} className="d-flex align-items-center enter-no-cancel pb-2 ms-md-3 mt-3 mt-md-0">
                                    <div>
                                          <select className="border-0 bg-transparent">
                                                <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                          </select>
                                          <input
                                                type="number"
                                                placeholder="ENTER MOBILENO"
                                                className="border-0 flex-grow-1 cyt ms-2"
                                          />
                                    </div>
                              </Col>
                        </Row>

                        {/* Button */}
                        <Row className="mt-4 justify-content-center">
                              <Col md={3} sm={6} xs={12} className="text-center">
                                    <button className=" btn-slt-pass  fw-bold text-light">SELECT PASSENGERS</button>
                              </Col>
                        </Row>
                  </Container>
                  <Copy />
            </div>
      );
};

export default Cancel;
