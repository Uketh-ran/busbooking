import React from 'react'
import Copy from './Copy'
import { Container, Row, Col } from 'react-bootstrap'
import "./App.css"
import { BsTicketDetailed } from "react-icons/bs";
import "./Cancel.css"


const Cancel = () => {

      return (
            <div className='bg-light'>
                  <div className='bg-light'>
                        <Container fluid>
                              <Row>
                                    <h5 className='text-center mt-5 mb-5'>Cancel Your Ticket</h5>
                                    <div className=' enterno mt-5'>
                                          <BsTicketDetailed className='bsticket' />
                                          <input type="text"
                                                placeholder='ENTER TICKET NO'
                                                className='enter-ticket-no ms-2' />
                                    </div>
                                    <div className='enterno entermobile mt-5'>
                                          <div className='country-code-selector d-inline'>
                                                <select className='country-code'>
                                                      <option value='+1'>+91 </option>
                                                      <option value='+44'>+44 </option>
                                                      <option value='+91'>+1 </option>
                                                </select>
                                          </div>
                                          <input
                                                type="number"
                                                placeholder='ENTER MOBILE NO'
                                                className='enter-ticket-no'
                                          />
                                    </div>
                              </Row>
                              <Row className='mt-5'>
                                    <Col lg={4} className='selectpass'>
                                          <button className=' pt-2 pb-2 select-passeger-button text-light fw-bold'>SELECT PASSENGERS</button>
                                    </Col>

                              </Row>
                        </Container>
                        <div className='cancel-copy '>
                              <Copy />
                        </div>
                  </div>
            </div>
      )
}

export default Cancel
