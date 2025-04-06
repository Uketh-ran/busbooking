

// import React, { useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import { format } from "date-fns";
// import "./Boarding.css";

// const BoardingPage = () => {

//   const location = useLocation();
//   const navigate = useNavigate();



//   const [selectedBoarding, setSelectedBoarding] = useState(null);
//   const [selectedDropping, setSelectedDropping] = useState(null);

//   const containerRef = useRef(null);

//   const { bus, selectedSeats, from, to, date } = location.state || {};

//   // ✅ Then do the check
//   if (!bus || !selectedSeats || selectedSeats.length === 0 || !from || !to || !date) {
//     alert("No seats selected. Please select seats to continue.");
//     navigate(-1);
//     return null;
//   }

//   const formattedDate = date instanceof Date ? format(date, "dd/MM/yyyy") : date;
//   const boardingPoints = bus.boardingPoints || [];
//   const droppingPoints = bus.droppingPoints || [];

//   const handleConfirm = () => {
//     if (!selectedBoarding || !selectedDropping) {
//       alert("Please select both boarding and dropping points.");
//       return;
//     }

//     alert(
//       `Boarding at ${selectedBoarding.name} (${selectedBoarding.time})\nDropping at ${selectedDropping.name} (${selectedDropping.time})`
//     );

//     navigate("/payment", {
//       state: { bus, selectedSeats, from, to, date, selectedBoarding, selectedDropping },
//     });
//   };

//   return (
//     <div className="boarding boarding-overlay">
//       <Container ref={containerRef} className="mt-5 boarding-box">
//         <h3 className="text-center">Select Your Boarding & Dropping Points</h3>
//         <h5 className="text-center">{bus.name} ({bus.type})</h5>
//         <h6 className="text-center text-muted">
//           {from} → {to} ({formattedDate})
//         </h6>
//         <h6 className="text-center">
//           Selected Seats: {selectedSeats && selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
//         </h6>

//         <h4 className="mt-4">Boarding Points</h4>
//         <Row>
//           {boardingPoints.length > 0 ? (
//             boardingPoints.map((point) => (
//               <Col lg={4} key={point.id} className="mb-3 bd-width">
//                 <Form.Check
//                   type="radio"
//                   label={<span className="bd-width">{point.name} - {point.time}</span>}
//                   name="boarding"
//                   className="bd-width"
//                   onChange={() => setSelectedBoarding(point)}
//                   checked={selectedBoarding?.id === point.id}
//                 />
//               </Col>
//             ))
//           ) : (
//             <p className="text-danger">No boarding points available.</p>
//           )}
//         </Row>

//         <h4 className="mt-4">Dropping Points</h4>
//         <Row>
//           {droppingPoints.length > 0 ? (
//             droppingPoints.map((point) => (
//               <Col lg={4} key={point.id} className="mb-3 bd-width">
//                 <Form.Check
//                   type="radio"
//                   label={<span className="bd-width"> {point.name} - {point.time}</span>}
//                   name="dropping"
//                   className="bd-width"
//                   onChange={() => setSelectedDropping(point)}
//                   checked={selectedDropping?.id === point.id}
//                 />
//               </Col>
//             ))
//           ) : (
//             <p className="text-danger">No dropping points available.</p>
//           )}
//         </Row>

//         <div className="text-center mt-4">
//           <Button variant="danger" className="me-3" onClick={() => navigate(-1)}>
//             Go Back
//           </Button>
//           <Button variant="primary" onClick={handleConfirm}>
//             Confirm Selection
//           </Button>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default BoardingPage;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Tabs, Tab, Form } from "react-bootstrap";
// import "./Boarding.css";

// const BoardingPage = () => {
//   const location = useLocation();
//   const { bus, selectedSeats } = location.state || {};
//   const [selectedBoarding, setSelectedBoarding] = useState(null);
//   const [selectedDropping, setSelectedDropping] = useState(null);

//   if (!bus) {
//     return <p>Loading bus details...</p>;
//   }

//   return (
//     <div className="boarding-overlay">
//       <div className="mt-4 boarding">
//         <h5 className="text-center">Select the boarding and dropping point</h5>
//         <hr />

//         <Tabs defaultActiveKey="boarding" className="mb-3">
//           {/* Boarding Point Tab */}
//           <Tab eventKey="boarding" title={<span style={{ color: "red" }}>BOARDING POINT</span>}>
//             {bus.boardingPoints.map((point, index) => (
//               <div key={index} className="p-3 border-bottom">
//                 <Form.Check
//                   type="radio"
//                   name="boardingPoint"
//                   id={`boarding-${index}`}
//                   label={
//                     <div>
//                       <strong>{point.time}</strong> {point.name}
//                       <br />
//                       <span className="text-muted">Landmark: {point.name}</span>
//                     </div>
//                   }
//                   onChange={() => setSelectedBoarding(point)}
//                 />
//               </div>
//             ))}
//           </Tab>

//           {/* Dropping Point Tab */}
//           <Tab eventKey="dropping" title="DROPPING POINT">
//             {bus.droppingPoints.map((point, index) => (
//               <div key={index} className="p-3 border-bottom">
//                 <Form.Check
//                   type="radio"
//                   name="droppingPoint"
//                   id={`dropping-${index}`}
//                   label={
//                     <div>
//                       <strong>{point.time}</strong> {point.name}
//                       <br />
//                       <span className="text-muted">Landmark: {point.name}</span>
//                     </div>
//                   }
//                   onChange={() => setSelectedDropping(point)}
//                 />
//               </div>
//             ))}
//           </Tab>
//         </Tabs>

//         {/* Price Summary */}
//         <div className="d-flex justify-content-between p-3 border-top">
//           <span>Amount <small className="text-muted">( Taxes will be calculated during payment )</small></span>
//           <strong>INR {bus.price * selectedSeats.length}.00</strong>
//         </div>

//         {/* Proceed Button */}
//         <div className="text-center mt-3">
//           <button
//             className="btn btn-success"
//             disabled={!selectedBoarding || !selectedDropping}
//             onClick={() => {
//               console.log("Boarding:", selectedBoarding);
//               console.log("Dropping:", selectedDropping);
//               // Navigate to payment or next step here
//             }}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default BoardingPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Step 1
import { Tabs, Tab, Form } from "react-bootstrap";
import "./Boarding.css";

const BoardingPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Step 2

  const { bus, selectedSeats } = location.state || {};
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);

  if (!bus) {
    return <p>Loading bus details...</p>;
  }

  return (
    <div className="boarding-overlay">
      <div className="mt-4 boarding">
        <h5 className="text-center">Select the boarding and dropping point</h5>
        <hr />

        <Tabs defaultActiveKey="boarding" className="mb-3">
          {/* Boarding Point Tab */}
          <Tab eventKey="boarding" title={<span style={{ color: "red" }}>BOARDING POINT</span>}>
            {bus.boardingPoints.map((point, index) => (
              <div key={index} className="p-3 border-bottom">
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
                  onChange={() => setSelectedBoarding(point)}
                />
              </div>
            ))}
          </Tab>

          {/* Dropping Point Tab */}
          <Tab eventKey="dropping" title="DROPPING POINT">
            {bus.droppingPoints.map((point, index) => (
              <div key={index} className="p-3 border-bottom">
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
                  onChange={() => setSelectedDropping(point)}
                />
              </div>
            ))}
          </Tab>
        </Tabs>

        {/* Price Summary */}
        <div className="d-flex justify-content-between p-3 border-top">
          <span>Amount <small className="text-muted">( Taxes will be calculated during payment )</small></span>
          <strong>INR {bus.price * selectedSeats.length}.00</strong>
        </div>

        {/* Proceed Button */}
        <div className="text-center mt-3">
          <button
            className="btn btn-success"
            disabled={!selectedBoarding || !selectedDropping}
            onClick={() => {
              navigate("/payment", {
                state: {
                  bus,
                  selectedSeats,
                  selectedBoarding,
                  selectedDropping,
                },
              });
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardingPage;
