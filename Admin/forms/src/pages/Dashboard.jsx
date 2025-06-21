import React from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid className="bg-light p-4 min-vh-100">
      {/* Breadcrumb */}
      <div className="mb-3 text-muted">
        <h4 className="fw-semibold">Dashboard</h4>
      </div>

      {/* Top Cards */}
      <Row className="mb-4">
        {[
          { title: "Total Bookings", value: 0, icon: "🚌" },
          { title: "Total Revenue", value: "₹0", icon: "💰" },
          { title: "Total Users", value: 0, icon: "👥" }
        ].map((card, idx) => (
          <Col md={4} key={idx}>
            <Card className="text-white bg-primary mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className="mb-1 text-uppercase fs-6">{card.title}</Card.Title>
                    <h3 className="fw-bold">{card.value}</h3>
                  </div>
                  <div className="fs-2">{card.icon}</div>
                </div>
                <Card.Text className="text-decoration-underline mt-2">View more...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Map and Sales Analytics */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Popular Route Map</Card.Header>
            <Card.Body style={{ height: "300px" }} className="bg-light d-flex justify-content-center align-items-center">
              <span className="text-muted">Route Map Placeholder</span>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Bookings Analytics</Card.Header>
            <Card.Body style={{ height: "300px" }} className="bg-light d-flex justify-content-center align-items-center">
              <span className="text-muted">Chart Placeholder</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity & Latest Bookings */}
      <Row>
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <p className="text-muted mb-0">No recent bookings yet.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Latest Bookings</Card.Header>
            <Card.Body className="p-0">
              <Table striped bordered hover responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>Passenger</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No bookings found!
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="text-center text-muted mt-5">
        BusBooking Admin © {new Date().getFullYear()} All Rights Reserved.<br />
        Version 1.0.0
      </footer>
    </Container>
  );
};

export default Dashboard;
