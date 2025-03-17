import React, { useState } from 'react';
import './Help.css';
import { Container, Row, Col } from 'react-bootstrap';
import Helpimg from './rc_artboard.jpg';
import ticket from './ticket_booking.svg';
import resed from './ticket_reschedule.svg';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import cancel from './bus_cancellation.svg';
import offer from './offer_info.svg';
import pay from './payement_and_refund.svg';
import wallet from './wallet.svg';
import question from './question.svg';
import Copy from './Copy';

const Help = () => {
  const [showTicketBooking, setShowTicketBooking] = useState(false);
  const [showTicketReschedule, setShowTicketReschedule] = useState(false);
  const [showBusCancellation, setShowBusCancellation] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div>
      <div className='helpbg'>
        <Container fluid className='mt-2'>
          <Row>
            <Col lg={1}></Col>
            <Col lg={4}  className='faq-cont'>
              {/* FAQ Section */}
              <div className='faq-bg w-100'>
                <div className={`faq media-faq mb-5 mt-5 ${showTicketBooking || showTicketReschedule || showBusCancellation || showOffers || showPayments || showWallet || showRefund || showOther || showRewards || showPass ? 'slide-out' : 'slide-in'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <span className='fs-5 fw-bold'>redbus</span> <br />
                      <span className='fs-6 fw-light'>FAQs</span>
                    </p>
                  </div>
                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>Help topics</p>

                  <button className='tickets' onClick={() => setShowTicketBooking(true)}>
                    <img src={ticket} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Ticket Booking</span>
                    <IoIosArrowForward className='arrow1' />
                  </button>

                  <button className='tickets mt-2' onClick={() => setShowTicketReschedule(true)}>
                    <img src={resed} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Ticket Reschedule / <span className='mediacancellation'> Cancellation </span></span>
                    <IoIosArrowForward className='arrow2 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowBusCancellation(true)}>
                    <img src={cancel} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Bus Cancellation</span>
                    <IoIosArrowForward className='arrow3 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowOffers(true)}>
                    <img src={offer} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Offers</span>
                    <IoIosArrowForward className='arrow4 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowPayments(true)}>
                    <img src={pay} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Payments & Refunds</span>
                    <IoIosArrowForward className='arrow5 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowWallet(true)}>
                    <img src={wallet} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>redBus wallet</span>
                    <IoIosArrowForward className='arrow6 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowRefund(true)}>
                    <img src={pay} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Refund Guarantee Program</span>
                    <IoIosArrowForward className='arrow7 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowOther(true)}>
                    <img src={question} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Other Queries</span>
                    <IoIosArrowForward className='arrow8 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowRewards(true)}>
                    <img src={question} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>Trip Rewards</span>
                    <IoIosArrowForward className='arrow9 arrow1' />
                  </button>
                  <button className='tickets mt-2' onClick={() => setShowPass(true)}>
                    <img src={question} alt="" className='mt-3 mb-3 ms-3' width={15} />
                    <span className='ms-3'>RoutePass</span>
                    <IoIosArrowForward className='arrow10 arrow1' />
                  </button>
                </div>

                {/* Ticket Booking Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq ${showTicketBooking ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowTicketBooking(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3'>
                    <span>I am unable to go beyond search option. What do I do?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>How to book a bus ticket on redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>Where can I view the bus ticket that I have booked through redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>How to check the availability of buses?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>Do I need to create an account to book bus tickets on redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>How to sign-up or login to redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>Can I book State Road Transport Corporation bus tickets from redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>Will I have to pay extra money for booking online tickets on redBus?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>I am unable to select a specific seat/operator/date/route. What do I do?</span>
                  </button>
                </div>

                {/* Ticket Reschedule Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq reschedule ${showTicketReschedule ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowTicketReschedule(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3'>
                    <span>How to cancel a ticket?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>Are there any cancellation charges levied when a bus ticket is canceled?</span>
                  </button>

                  <button className='tickets mt-1 text-start p-3'>
                    <span>How to reschedule a ticket?</span>
                  </button>

                </div>
                {/* BusCancellation Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq reschedule ${showBusCancellation ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowBusCancellation(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3'>
                    <span>Bus operator has cancelled the bus. What do I do?</span>
                  </button>

                </div>

                {/* Offers Section */}
                <div className={`faq mb-5 mt-5 media-faq tcb_faq reschedule ${showOffers ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowOffers(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>How do I apply the offer code?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I am unable to apply the offer code. What do I do?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I get discounts & offers on bus tickets at redBus?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I have applied the promo code, but did not receive any cashback. What do I do?</span>
                  </button>

                </div>
                {/* Payments Section */}
                <div className={`faq mb-5 mt-5 media-faq tcb_faq reschedule ${showPayments ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowPayments(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>I am unable to select payment option. What do I do?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How do I check my refund status and details?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What are the payment options that are available on redBus?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I missed the bus. Do I get a refund?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I get a refund in case I cancel my ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>My money has been deducted but the tickets are not booked. What should I do now?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Will I get refund in case of a failed transaction?</span>
                  </button>

                </div>
                {/* Wallet Section */}
                <div className={`faq mb-5 mt-5 media-faq tcb_faq reschedule ${showWallet ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowWallet(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>My wallet shows incorrect balance. What do I do?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I want to know the terms & conditions regarding usage of redBus wallet</span>
                  </button>

                </div>

                {/* Refund Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq  ${showRefund ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowRefund(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>What is Refund guarantee?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How does Refund guarentee work?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How do I opt-in for a refund guarantee for my booking?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I cancel the refund guarantee after purchasing it?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens to my refund guarantee if I reschedule my booking?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Why am I still getting cancellation charges even though I have purchased refund guarantee?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Will my refund guarantee be refunded when I cancel my ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Why am I not seeing the refund guarantee on the ticket I want to purchase?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I purchase the refund guarantee for RTC bookings?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Where will I get my refund on cancellation?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>If I have purchased refund guarantee, how do I go about getting the full refund?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Bus operator has canceled my journey. Will I get the refund of the refund guarantee amount?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Will I have to pay GST on top of the refund guarantee amount?</span>
                  </button>

                </div>
                {/* Other Section */}
                <div className={`faq mb-5 mt-5 media-faq tcb_faq reschedule ${showOther ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowOther(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>Do I need to carry any documents with me when I board the bus?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What is the child fare policy?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What is the luggage policy?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I lost my ticket. What should I do now?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I rate or review a bus service?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How do I delete my redBus account?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I reactivate my deleted account?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What is T&C for Grievances and claims related to Bus journey?</span>
                  </button>

                </div>
                {/* Rewards Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq ${showRewards ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowRewards(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>What are Trip Rewards? What are its benefits?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is the Trip Rewards available for everyone? Am I eligible for the Trip Rewards program?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How to participate in the Trip Rewards program?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I have booked a ticket, but its not showing up in Trip Rewards program</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Why am I not able to redeem my free ticket despite booking all of the required number of tickets?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is my reward ticket entirely free? What is the maximum free amount that I can get for a free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>When can I redeem my free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is the free ticket transferable? Can my friends/family travel on this free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I combine 2 Trip Rewards?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I track my current progress on Trip Rewards?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I check when my Trip Reward is expiring?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I be a part of multiple Trip Rewards at once?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Do I have to opt in for Trip Reward again after completing it once?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Will only journeys on the same source city and destination city count towards my trip rewards progress?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my 1st Trip Reward ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my non first Trip Reward ticket in the earning cycle?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my ‘free ticket’?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I reschedule my Trip Reward ticket in the earning cycle?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I reschedule my ‘Free ticket’ trip?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens in case of partial cancellation for my earning cycle tickets?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens in case of partial cancellation for my ‘free ticket’?</span>
                  </button>

                </div>
                {/* Pass Section */}
                <div className={`faq mb-5 media-faq mt-5 tcb_faq ${showPass ? 'slide-in' : 'hidden'}`}>
                  <div className='redbus_faqs'>
                    <p className='ms-5'>
                      <FaArrowLeft className='leftarrow me-2' onClick={() => setShowPass(false)} />
                      <span className='fs-5 fw-bold ms-3'>redbus</span> <br />
                      <span className='fs-6 fw-light ms-1 tbfaq'>FAQs</span>
                    </p>
                  </div>

                  <p className='ms-3 help_topics fw-bold fs-6 mt-4'>FAQs</p>

                  <button className='tickets text-start p-3 mt-1'>
                    <span>What is routePass? What are its benefits?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is the routePass available for everyone? Am I eligible for the routePass program?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How to participate in the routePass program?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>I have booked a ticket, but it's not showing up in the routePass program.</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Why am I not able to redeem my free ticket despite booking all of the required number of tickets?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is my reward ticket entirely free? What is the maximum free amount that I can get for a free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>When can I redeem my free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is routePass applicable on all bus operators on the route?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Is the free ticket transferable? Can my friends/family travel on this free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I combine 2 routePasses?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I track my current progress on routePass?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>How can I check when my routePass is expiring?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I be a part of multiple routePasses at once?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Do I have to opt in for routePass again after completing it once?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Will only journeys with the same bus operator count towards my routePass progress?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my first routePass ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my non first routePass ticket in the earning cycle?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens if I cancel my free ticket?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I reschedule my routePass ticket in the earning cycle?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>Can I reschedule my free ticket trip?</span>
                  </button>
                  <button className='tickets text-start p-3 mt-1'>
                    <span>What happens in case of partial cancellation for my earning cycle tickets?</span>
                  </button>
                </div>
              </div>

            </Col>

            <Col lg={4} className='ms-5 help-right0 redbus-help'>
              <div className='help-right'>
                <h1 className='text-light media-help mt-5 fw-bold fs-1'>redBus Help</h1>
                <img src={Helpimg} alt="" className=' help-img' />
                <h1 className='text-light  mt-5 fw-bold fs-2 media-support'>24/7 Customer Support</h1>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Container>
      </div>
      <Copy />
    </div>
  );
};

export default Help;
