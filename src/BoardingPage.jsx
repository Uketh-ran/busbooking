
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Tabs, Tab, Form } from "react-bootstrap";
import "./Boarding.css";

const BoardingPage = () => {
  console.log("BoardingPage loaded");

  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state?.bus || JSON.parse(localStorage.getItem("bus"));
  const selectedSeats = location.state?.selectedSeats || JSON.parse(localStorage.getItem("selectedSeats"));

  const [showModal, setShowModal] = useState(false);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);
  const [activeTab, setActiveTab] = useState("boarding");
  const [showSelectionTabs, setShowSelectionTabs] = useState(true);

  useEffect(() => {
    if (bus && selectedSeats) {
      setShowModal(true);
    } else {
      navigate("/");
    }
  }, [bus, selectedSeats, navigate]);
 

  useEffect(() => {
    if (selectedBoarding && selectedDropping) {
      // Store selected boarding and dropping points in localStorage
      localStorage.setItem("selectedBoarding", JSON.stringify(selectedBoarding));
      localStorage.setItem("selectedDropping", JSON.stringify(selectedDropping));
    }
  }, [selectedBoarding, selectedDropping]);

  const handleProceed = () => {
    if (!selectedBoarding || !selectedDropping) {
      alert("Please select both boarding and dropping points before proceeding.");
      return;
    }
    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
        selectedBoarding,
        selectedDropping,
      },
    });
  };

  const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const handleBoardingSelect = (point) => {
    setSelectedBoarding(point);
    setActiveTab("dropping");
  };

  const handleDroppingSelect = (point) => {
    setSelectedDropping(point);
    setShowSelectionTabs(false);
  };
  

  return (
    
    <Modal  show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select the boarding and dropping point</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Selection Tabs */}
        {showSelectionTabs && (
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="boarding" title={<span>BOARDING POINT</span>}>
              {bus?.boardingPoints.length > 0 ? (
                bus.boardingPoints.map((point, index) => (
                  <div key={`boarding-${point.name}-${index}`} className="p-3 border-bottom">
                    <Form.Check
                      type="radio"
                      name="boardingPoint"
                      id={`boarding-${index}`}
                      label={
                        <div>
                          <strong>{point.time}</strong> {point.name}
                          <br />
                          <span className="text-muted">Landmark: {point.name}</span>
                        </div>
                      }
                      onChange={() => handleBoardingSelect(point)}
                      checked={selectedBoarding?.name === point.name}
                    />
                  </div>
                ))
              ) : (
                <p>No boarding points available.</p>
              )}
            </Tab>

            <Tab eventKey="dropping" title="DROPPING POINT">
              {bus?.droppingPoints.length > 0 ? (
                bus.droppingPoints.map((point, index) => (
                  <div key={`dropping-${point.name}-${index}`} className="p-3 border-bottom">
                    <Form.Check
                      type="radio"
                      name="droppingPoint"
                      id={`dropping-${index}`}
                      label={
                        <div>
                          <strong>{point.time}</strong> {point.name}
                          <br />
                          <span className="text-muted">Landmark: {point.name}</span>
                        </div>
                      }
                      onChange={() => handleDroppingSelect(point)}
                      checked={selectedDropping?.name === point.name}
                    />
                  </div>
                ))
              ) : (
                <p>No dropping points available.</p>
              )}
            </Tab>
          </Tabs>
        )}

        {/* Summary Box */}
        {selectedBoarding && selectedDropping && !showSelectionTabs && (
          <div className="summary-box border rounded p-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Boarding & Dropping</h5>
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowSelectionTabs(true)}
              >
                CHANGE
              </span>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <div>
                <div className="fw-bold">{selectedBoarding.name}</div>
                <div className="text-muted">Landmark: {selectedBoarding.name}</div>
              </div>
              <div>{selectedBoarding.time}</div>
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <div>
                <div className="fw-bold">{selectedDropping.name}</div>
                <div className="text-muted">Landmark: {selectedDropping.name}</div>
              </div>
              <div>
                <strong>{selectedDropping.time}</strong>{" "}
                <span className="text-danger">({formatDate()})</span>
              </div>
            </div>

            <hr />

            <div className="mb-2">
              <strong>Seat No.</strong>
              <div>{selectedSeats.join(", ")}</div>
            </div>

            <div className="mb-2">
              <strong>Fare Details</strong>
              <div className="d-flex justify-content-between">
                <span>
                  Amount <small className="text-muted">(Taxes will be calculated during payment)</small>
                </span>
                <strong>INR {bus.price * selectedSeats.length}.00</strong>
              </div>
            </div>

            <button
              className="proceed-btn w-100 mt-3"
              onClick={handleProceed}
              disabled={!selectedBoarding || !selectedDropping}
            >
              PROCEED TO BOOK
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BoardingPage;
