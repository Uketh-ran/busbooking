import React, { useState } from 'react';
import { useLocation, Outlet,useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiCctv } from "react-icons/bi";
import { PiPlugCharging } from "react-icons/pi";
import './Buspage.css';
import { format, addDays, parse } from 'date-fns';
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import Copy from "./Copy"

const allBuses = [
  {
    id: 1, name: "ABC Travels", sp: "Chathiram", ep: "Killambakkam",
    from: "Trichy", to: "Chennai", departure: "06:00 AM", arrival: "12:00 PM",
    duration: "06h 00m", price: 500, type: "Semi Sleeper (2+2)",
    boardingPoints: [
      { id: 1, name: "Chathiram Bus Stand", time: "06:00 AM" },
      { id: 2, name: "Tollgate", time: "06:15 AM" }
    ],
    droppingPoints: [
      { id: 1, name: "Guduvanchery", time: "11:50 AM" },
      { id: 2, name: "Killambakkam", time: "12:00 PM" },
    ],
  },
  {
    id: 2, name: "ABC Travels", sp: "Killambakkam", ep: "Chathiram",
    from: "Chennai", to: "Trichy", departure: "06:00 AM", arrival: "12:00 PM",
    duration: "06h 00m", price: 600, type: "Semi Sleeper (2+2)",
    boardingPoints: [
      { id: 1, name: "Killambakkam", time: "06:00 AM" },
      { id: 2, name: "Guduvanchery", time: "06:10 AM" },
    ],
    droppingPoints: [
      { id: 1, name: "Tollgate", time: "11:50 AM" },
      { id: 2, name: "Chathiram Bus Stand", time: "12:00 PM" }
    ],
  },
  {
    id: 3, name: "Royal Travels", sp: "Central Bus Stand", ep: "Killambakkam",
    from: "Trichy", to: "Chennai", departure: "10:00 PM", arrival: "04:00 AM",
    duration: "06h 00m", price: 900, type: "Semi Sleeper (2+2)",
    boardingPoints: [
      { id: 1, name: "Central Bus Stand", time: "10:00 PM" },
      { id: 2, name: "Tollgate", time: "10:20 PM" }
    ],
    droppingPoints: [
      { id: 1, name: "SRM", time: "03:50 AM" },
      { id: 2, name: "Killambakkam Bus Stand", time: "04:00 AM" }
    ],
  },
  {
    id: 4, name: "Royal Travels", sp: "Killambakkam", ep: "Chathiram Bus Stand",
    from: "Chennai", to: "Trichy", departure: "10:00 PM", arrival: "04:00 AM",
    duration: "06h 00m", price: 900, type: "Semi Sleeper (2+2)",
    boardingPoints: [
      { id: 1, name: "Killambakkam", time: "10:00 PM" },
      { id: 2, name: "SRM", time: "10:20 PM" }
    ],
    droppingPoints: [
      { id: 1, name: "Tollgate", time: "03:40 AM" },
      { id: 2, name: "Central Bus Stand", time: "04:00 AM" }
    ],
  },
];

const Buspage = () => {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
  const navigate = useNavigate();

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true,
    }));
  };

  if (!from || !to || !date) {
    return <h3 className="text-center text-danger">Invalid search data. Please go back and try again.</h3>;
  }

  const selectedDate = new Date(date);
  const formattedDate = format(selectedDate, "dd/MM/yyyy");

  const filteredBuses = allBuses.filter(
    bus => bus.from.toLowerCase() === from.toLowerCase() && bus.to.toLowerCase() === to.toLowerCase()
  );
  
  const sortedBuses = [...filteredBuses].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting initially
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
  
    if (sortConfig.key === 'departure' || sortConfig.key === 'arrival') {
      aValue = parse(aValue, 'hh:mm a', new Date());
      bValue = parse(bValue, 'hh:mm a', new Date());
    } else if (sortConfig.key === 'price') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
  
    return sortConfig.ascending ? aValue - bValue : bValue - aValue;
  });

  const bookedSeats = [10, 15, 26, 38]; // Predefined booked seats
  const maleSeats = [3, 6, 19]; // Predefined male seats
  const femaleSeats = [12, 24, 33]; // Predefined female seats

  const handleSeatSelection = (seatNumber, selectedBus) => {
    setSelectedSeats((prevSeats) => {
      let updatedSeats;
      
      if (prevSeats.includes(seatNumber)) {
        // Unselect seat
        updatedSeats = prevSeats.filter(seat => seat !== seatNumber);
      } else {
        // Select seat
        updatedSeats = [...prevSeats, seatNumber];
      }
      // If no seats are selected, go back to the bus page
      if (updatedSeats.length === 0) {
        navigate(-1);
      } else {
        // Otherwise, navigate to the boarding page
        navigate("boarding", {
          state: { bus: selectedBus, selectedSeats: updatedSeats, from, to, date }
        });
      }
      return updatedSeats;
    });
  };

  const totalSeats = 40; // Assuming each bus has 40 seats
  const availableSeats = totalSeats - bookedSeats.length;

  return (
    <div>
      <Container fluid className='mt-5'>
        <h4 className="text-center mb-4">
          {from} → {to} ({formattedDate})
        </h4>

        {/* Bus Summary Section */}
        <div className='buses1 bus-summary'>
          <Row>
            <Col xs={6} md={2} ></Col>
            <Col xs={6} md={2}  onClick={() => handleSort('departure')}>
              <span className='media-departure mx-auto'>
                Departure {sortConfig.key === 'departure' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2} onClick={() => handleSort('duration')}>
              <span className=' media-duration mx-auto'>
                Duration { sortConfig.key === 'duration' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2}  onClick={() => handleSort('arrival')}>
              <span className=' media-arrival mx-auto'>
                Arrival {sortConfig.key === 'arrival' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2} onClick={() => handleSort('price')}>
              <span className='media-fare mx-auto'>
                Fare {sortConfig.key === 'price' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown /> )}
              </span>
            </Col>

            <Col xs={6} md={2} ><span className='media-seats-available mx-auto'>Seats <span className='media-seats-available1'>Available</span></span></Col>
          </Row>
        </div>

        {sortedBuses.length > 0 ? (
          sortedBuses.map(bus => {

            const departureTime = parse(bus.departure, "hh:mm a", new Date());
            const arrivalTime = parse(bus.arrival, "hh:mm a", new Date());
            const isNextDayArrival = arrivalTime < departureTime;
            const arrivalDate = isNextDayArrival ? addDays(selectedDate, 1) : selectedDate;
            const formattedArrivalDate = format(arrivalDate, "dd/MM/yyyy");

            return (
              <React.Fragment key={bus.id}>
                <div className='buses1 media-buses1 mb-5 p-3'>
                  <Row>
                    <Col xs={6} md={2}><span className='text-dark fw-bold media-busname mx-auto'>{bus.name}</span></Col>
                    <Col xs={6} md={2}>
                      <span className='text-dark fw-bold mx-auto '>{bus.departure}</span>
                      <br />
                      <small className='mx-auto'>{formattedDate}</small>
                    </Col>
                    <Col xs={6} md={2}><span className=''>{bus.duration}</span></Col>
                    <Col xs={6} md={2}>
                      <span className='text-dark  fw-bold'>{bus.arrival}</span>
                      <br />
                      <small className={`mx-auto ${isNextDayArrival ? "text-danger" : ""}`}>
                        {formattedArrivalDate}
                      </small>
                    </Col>
                    <Col xs={6} md={2}><span className='mx-auto'>INR <span className='text-dark fw-bold ms-1'>{bus.price}</span></span></Col>
                    <Col xs={6} md={2}>
                      <button
                        className='text-light view-seats mx-auto'
                        onClick={() => {
                          setSelectedBus(selectedBus === bus.id ? null : bus.id);
                          setSelectedSeats([]);
                        }}
                      >
                        {selectedBus === bus.id ? "HIDE SEATS" : "VIEW SEATS"}
                      </button>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col xs={6} md={2}><span className=' semi media-busname mx-auto'>{bus.type}</span></Col>
                    <Col xs={6} md={2}><span className=' semi media-semi media-arrival-1 mx-auto'>{bus.sp}</span></Col>
                    <Col xs={6} md={2}><span className=' semi mx-auto '>{bus.ep}</span></Col>
                    <Col xs={6} md={2} className='seats-available mx-auto'>
                      <span className=' semi mx-auto'>
                        Seats Available: {availableSeats} <br />
                        <span className='mx-auto'>Total Seats: {totalSeats}</span>
                      </span>
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col xs={6} md={2}><BiCctv className='mx-auto' /><PiPlugCharging className='mx-auto' /></Col>
                  </Row>
                </div>

                {/* Seat Selection Section */}
                {selectedBus === bus.id && (
                  <div className="seat-selection mb-5 p-4 border">
                    <h5 className="text-center">Select Your Seats in {bus.name}</h5>

                    <div className=" seat-1-container justify-content-center">
                      {/* Seat Container */}
                      <div className="seat-container align-items-center">
                        {[...Array(10)].map((_, rowIndex) => (
                          <Row key={rowIndex} className="bus-row justify-content-center">
                            {[1, 2, null, 3, 4].map((col, index) => {
                              if (col === null) {
                                return <Col xs={1} key={index}></Col>; // Space for the aisle
                              }

                              const seatNumber = rowIndex * 4 + col;
                              const isBooked = bookedSeats.includes(seatNumber);
                              const isMale = maleSeats.includes(seatNumber);
                              const isFemale = femaleSeats.includes(seatNumber);
                              const isSelected = selectedSeats.includes(seatNumber);

                              return (
                                <Col xs={6} md={2} key={seatNumber} className="seat">
                                  <Button
                                    variant={isBooked ? "secondary" : "outline-secondary"}
                                    className={`seats-btn 
                                ${isSelected ? "bg-success text-white" : ""} 
                                ${isMale ? "border-primary border-3" : ""} 
                                ${isFemale ? "border-danger border-3" : ""}`}
                                onClick={() => !isBooked && handleSeatSelection(seatNumber, bus)}
                                  >
                                    {seatNumber}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        ))}
                      </div> 

                      {/* Seat Legend */}
                      <div className="seat-legend">
                        <h6>Seat Legend</h6>
                        <div className="d-flex align-items-center mb-2">
                          <Button variant="outline-secondary" className="seat-box"></Button> <span className="ms-2">Available</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Button variant="secondary" className="seat-box"></Button> <span className="ms-2">Booked</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Button variant="outline-secondary" className="border-primary seat-box"></Button> <span className="ms-2">Male</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Button variant="outline-secondary" className="border-danger seat-box"></Button> <span className="ms-2">Female</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <h3 className="text-center text-danger">No buses available for this route.</h3>
        )}
        <Outlet />
      </Container>
      <Copy/>
    </div>
  );
};

export default Buspage;

