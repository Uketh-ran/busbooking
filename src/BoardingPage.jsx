import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { format } from "date-fns"; // Date formatting
import "./Boarding.css"

const BoardingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from state
  const { bus, selectedSeats, from, to, date } = location.state || {};

  // Hooks for selected points
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);

  // Ensure required data is available
  if (!bus || !selectedSeats || !from || !to || !date) {
    return (
      <h3 className="text-center text-danger">
        Invalid selection. Please go back.
      </h3>
    );
  }

  // Convert date object to string if necessary
  const formattedDate = date instanceof Date ? format(date, "dd/MM/yyyy") : date;

  // Get boarding and dropping points from the selected bus
  const boardingPoints = bus.boardingPoints || [];
  const droppingPoints = bus.droppingPoints || [];

  // Function to handle confirmation
  const handleConfirm = () => {
    if (!selectedBoarding || !selectedDropping) {
      alert("Please select both boarding and dropping points.");
      return;
    }

    alert(
      `Boarding at ${selectedBoarding.name} (${selectedBoarding.time})\nDropping at ${selectedDropping.name} (${selectedDropping.time})`
    );

    // Navigate to the next step (e.g., payment)
    navigate("/payment", {
      state: { bus, selectedSeats, from, to, date, selectedBoarding, selectedDropping },
    });
  };

  return (

    <div className="bording">
      <Container className="mt-5">
        <h3 className="text-center">Select Your Boarding & Dropping Points</h3>
        <h5 className="text-center">{bus.name} ({bus.type})</h5>
        <h6 className="text-center text-muted">
          {from} → {to} ({formattedDate})
        </h6>
        <h6 className="text-center">Selected Seats: {selectedSeats.join(", ")}</h6>

        {/* Boarding Points */}
        <h4 className="mt-4">Boarding Points</h4>
        <Row>
          {boardingPoints.length > 0 ? (
            boardingPoints.map((point) => (
              <Col lg={4} key={point.id} className="mb-3">
                <Form.Check
                  type="radio"
                  label={`${point.name} - ${point.time}`}
                  name="boarding"
                  onChange={() => setSelectedBoarding(point)}
                  checked={selectedBoarding?.id === point.id}
                />
              </Col>
            ))
          ) : (
            <p className="text-danger">No boarding points available.</p>
          )}
        </Row>

        {/* Dropping Points */}
        <h4 className="mt-4">Dropping Points</h4>
        <Row>
          {droppingPoints.length > 0 ? (
            droppingPoints.map((point) => (
              <Col lg={4} key={point.id} className="mb-3">
                <Form.Check
                  type="radio"
                  label={`${point.name} - ${point.time}`}
                  name="dropping"
                  onChange={() => setSelectedDropping(point)}
                  checked={selectedDropping?.id === point.id}
                />
              </Col>
            ))
          ) : (
            <p className="text-danger">No dropping points available.</p>
          )}
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleConfirm}>
            Confirm Selection
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default BoardingPage;
