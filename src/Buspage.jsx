
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { BiCctv } from "react-icons/bi";
import { PiPlugCharging } from "react-icons/pi";
import './Buspage.css';
import { format, addDays, parse } from 'date-fns';
import Copy from "./Copy";
import { Outlet } from "react-router-dom";

const Buspage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '';
  const to = location.state?.to || '';
  const date = useMemo(() => location.state?.date || new Date(), [location.state?.date]);

  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});

  const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
  const bookedSeats = [3, 5, 9];
  const maleSeats = [2, 6];
  const femaleSeats = [4, 8];


  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true,
    }));
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/bus')
      .then(res => res.json())
      .then(data => {
        const filteredBuses = data.filter(bus =>
          bus.from.toLowerCase() === from.toLowerCase() &&
          bus.to.toLowerCase() === to.toLowerCase() &&
          format(new Date(bus.dateOfDeparture), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')
        );
        setBusList(filteredBuses);
      })
      .catch(err => console.error('Error fetching buses:', err));
  }, [from, to, date]);

  const travelDate = new Date(date);
  const formattedDate = format(travelDate, 'dd/MM/yyyy');

  const handleSeatSelection = (seatNumber, busId) => {
    setSelectedSeats((prevSeats) => {
      const currentBusSeats = prevSeats[busId] || [];
      const isSelected = currentBusSeats.includes(seatNumber);

      return {
        ...prevSeats,
        [busId]: isSelected
          ? currentBusSeats.filter(seat => seat !== seatNumber)
          : [...currentBusSeats, seatNumber],
      };
    });
  };


  return (
    <div className='bg-bus-page'>
      <Container fluid className='mt-2'>
        <h4 className="text-center mb-4 pt-2">{from} → {to} ({formattedDate})</h4>

        {/* Header Row */}
        <div className='buses1 bus-summary'>
          <Row>
            <Col xs={6} md={2}></Col>
            <Col xs={6} md={2} onClick={() => handleSort('departure')}>
              <span className='media-departure mx-auto'>
                Departure {sortConfig.key === 'departure' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2} onClick={() => handleSort('duration')}>
              <span className='media-duration mx-auto'>
                Duration {sortConfig.key === 'duration' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2} onClick={() => handleSort('arrival')}>
              <span className='media-arrival mx-auto'>
                Arrival {sortConfig.key === 'arrival' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2} onClick={() => handleSort('price')}>
              <span className='media-fare mx-auto'>
                Fare {sortConfig.key === 'price' && (sortConfig.ascending ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />)}
              </span>
            </Col>
            <Col xs={6} md={2}><span className='media-seats-available mx-auto'>Seats Available</span></Col>
          </Row>

        </div>

        {/* Buses List */}
        {busList.length > 0 ? (
          busList.map((bus) => {
            const busId = bus._id || bus.id;
            let departureTime, arrivalTime;
            let formattedDeparture = '-', formattedArrival = '-', formattedArrivalDate = formattedDate;

            try {
              departureTime = parse(bus.departureTime, "HH:mm", new Date());
              formattedDeparture = format(departureTime, "HH:mm");

              arrivalTime = parse(bus.arrivalTime, "HH:mm", new Date());
              formattedArrival = format(arrivalTime, "HH:mm");

              const isNextDayArrival = arrivalTime < departureTime;
              formattedArrivalDate = isNextDayArrival ? format(addDays(travelDate, 1), "dd/MM/yyyy") : formattedDate;
            } catch (err) {
              console.warn(`Invalid time format in bus: ${bus.busName}`, err);
            }

            return (
              <React.Fragment key={busId}>
                <div className='buses1 media-buses1 mx-auto mb-5 p-3'>
                  <Row>
                    <Col xs={6} md={2}><span className='text-dark fw-bold media-busname mx-auto'>{bus.busName}</span></Col>
                    <Col xs={6} md={2}>
                      <span className='text-dark fw-bold mx-auto'>{formattedDeparture}</span><br />
                      <small className='mx-auto'>{formattedDate}</small>
                    </Col>
                    <Col xs={6} md={2}><span>{bus.duration}</span></Col>
                    <Col xs={6} md={2}>
                      <span className='text-dark fw-bold'>{formattedArrival}</span><br />
                      <small className='mx-auto'>{formattedArrivalDate}</small>
                    </Col>
                    <Col xs={6} md={2}><span className='mx-auto'>INR <span className='text-dark fw-bold ms-1'>{bus.price}</span></span></Col>
                    <Col xs={6} md={2}>
                      <button
                        className='text-light view-seats mx-auto'
                        onClick={() => setSelectedBus(selectedBus === busId ? null : busId)} // 🔥 [UPDATED]
                      >
                        {selectedBus === busId ? "Hide Seats" : "View Seats"} {/* 🔥 [UPDATED] */}
                      </button>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col xs={6} md={2}><span className=' semi media-busname mx-auto'>{bus.type}</span></Col>
                    <Col xs={6} md={2}><span className=' semi media-semi media-arrival-1 mx-auto'>{bus.sp}</span></Col>
                    <Col xs={6} md={2}><span className=' semi mx-auto '>{bus.ep}</span></Col>
                    <Col xs={6} md={2} className='seats-available mx-auto'>
                      <span className=' semi mx-auto'>
                        Seats Available: {bus.seatsAvailable} <br />
                        <span className='mx-auto'>Total Seats: {bus.Totalseats}</span>
                      </span>
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col xs={6} md={2}><BiCctv className='mx-auto' /><PiPlugCharging className='mx-auto' /></Col>
                  </Row>
                </div>

                {selectedBus === busId && (
                  <div className="seat-selection mb-5 mx-auto p-4">
                    <h5 className="text-center">Select Your Seats in {bus.busName}</h5>
                    <div className="seat-1-container justify-content-center">
                      <div className="seat-container align-items-center">
                        {[...Array(10)].map((_, rowIndex) => (
                          <Row key={rowIndex} className="bus-row justify-content-center">
                            {[1, 2, null, 3, 4].map((col, index) => {
                              if (col === null) return <Col xs={1} key={index}></Col>;

                              const seatNumber = rowIndex * 4 + col;
                              const isBooked = bookedSeats.includes(seatNumber);
                              const isMale = maleSeats.includes(seatNumber);
                              const isFemale = femaleSeats.includes(seatNumber);
                              const isSelected = (selectedSeats[busId] || []).includes(seatNumber);

                              return (
                                <Col xs={6} md={2} key={`${busId}-${seatNumber}`} className="seat">
                                  <Button
                                    variant={isBooked ? "secondary" : "outline-secondary"}
                                    className={`seats-btn 
              ${isSelected ? "bg-success text-white" : ""} 
              ${isMale ? "border-primary border-3" : ""} 
              ${isFemale ? "border-danger border-3" : ""}`}
                                    onClick={() => !isBooked && handleSeatSelection(seatNumber, busId)}
                                  >
                                    {seatNumber}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        ))}

                      </div>

                      <div className="seat-legend mt-4">
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

                    <div className="text-center mt-4">
                      <Button
                        className='proceed-btn'
                        disabled={!selectedSeats[busId] || selectedSeats[busId].length === 0}
                        onClick={() => {
                          navigate('boarding', {
                            state: { bus, selectedSeats: selectedSeats[busId], from, to, date }
                          });
                        }}
                      >
                        Proceed
                      </Button>

                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <p>No buses available for the selected route and date.</p>
        )}
      </Container>
      <Outlet />
      <Copy />
    </div>
  );
};
export default Buspage;

