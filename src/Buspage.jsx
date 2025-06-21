
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
  const [bookedSeatsMap, setBookedSeatsMap] = useState({}); // { busId: [seats] }
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true,
    }));
  };
  useEffect(() => {
    const fetchBusesAndSeats = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/bus');
        const data = await res.json();

        const filteredBuses = data.filter(bus =>
          bus.from.toLowerCase() === from.toLowerCase() &&
          bus.to.toLowerCase() === to.toLowerCase() &&
          format(new Date(bus.dateOfDeparture), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')
        );

        setBusList(filteredBuses);

        const bookedSeatsObj = {};
        await Promise.all(filteredBuses.map(async (bus) => {
          try {
            const res = await fetch(`http://localhost:5001/api/bus/${bus._id}/bookedseats`);
            const result = await res.json();
            bookedSeatsObj[bus._id] = result.bookedSeats || [];
          } catch (err) {
            console.error(`Error fetching booked seats for bus ${bus._id}:`, err);
            bookedSeatsObj[bus._id] = [];
          }
        }));

        setBookedSeatsMap(bookedSeatsObj);
      } catch (err) {
        console.error('Error fetching buses:', err);
      }
    };

    fetchBusesAndSeats(); // call async function inside useEffect
  }, [from, to, date]);


  const travelDate = new Date(date);
  const formattedDate = format(travelDate, 'dd/MM/yyyy');

  const handleSeatSelection = async (seatNumber, busId) => {
    const currentSeats = selectedSeats[busId] || [];
    const isAlreadySelected = currentSeats.includes(seatNumber);
    const isAlreadyBooked = (bookedSeatsMap[busId] || []).includes(seatNumber);

    // Prevent duplicate booking or reselecting
    if (isAlreadySelected || isAlreadyBooked) return;

    try {
      const res = await fetch(`http://localhost:5001/api/bus/${busId}/bookseat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatNumber }),
      });

      const result = await res.json();

      if (result.success) {
        // ✅ Update local state
        setSelectedSeats(prev => ({
          ...prev,
          [busId]: [...(prev[busId] || []), seatNumber],
        }));

        setBookedSeatsMap(prev => ({
          ...prev,
          [busId]: [...(prev[busId] || []), seatNumber],
        }));
      } else {
        alert(result.message || "Failed to book seat.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking. Try again.");
    }
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
                              // const isBooked = bookedSeats.includes(seatNumber);
                              const isBooked = (bookedSeatsMap[busId] || []).includes(seatNumber);
                              const isSelected = (selectedSeats[busId] || []).includes(seatNumber);

                              return (
                                <Col xs={6} md={2} key={`${busId}-${seatNumber}`} className="seat">
                                  <Button
                                    variant={isBooked ? "secondary" : "outline-secondary"}
                                    className={`seats-btn 
              ${isSelected ? "bg-success text-white" : ""} `}
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

