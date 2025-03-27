import "./Viewoffer.css";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import viewoffer1 from "./viewoffer1.png";
import viewoffer2 from "./viewoffer2.png";
import viewoffer3 from "./viewoffer3.png";
import viewoffer4 from "./viewoffer4.png";
import viewoffer5 from "./viewoffer5.png";
import viewoffer6 from "./viewoffer6.png";
import viewoffer7 from "./viewoffer7.png";
import viewoffer8 from "./viewoffer8.png";
import Copy from "./Copy"


const offers = [
    { image: viewoffer1, title: "Save up to Rs 250 on bus tickets", code: "FIRST" },
    { image: viewoffer2, title: "Save up to Rs 300 on bus tickets", code: "BUS300" },
    { image: viewoffer3, title: "Save up to Rs 300 on Karnataka, Tamil Nadu, Kerala routes", code: "CASH300" },
    { image: viewoffer4, title: "Save up to Rs 300 in AP, Telangana routes", code: "SUPERHIT" },
    { image: viewoffer5, title: "Save up to Rs 300 on Chartered Bus", code: "CHARTERED15" },
    { image: viewoffer6, title: "Save 25% up to Rs 100 on SBSTC bus tickets.", code: "SBNEW" },
    { image: viewoffer7, title: "Save up to Rs 250 on KSRTC bus tickets", code: "KSRTC" },
    { image: viewoffer8, title: "Save up to Rs. 50 on IntrCity SmartBus operator", code: "INTRCITY" },
    { image: viewoffer2, title: "Save up to Rs. 50 on IntrCity SmartBus operator", code: "BUS50" },
];

const Viewoffer = () => {
    return (
        <div className="viewoffer-bg">
            <Container className="py-4 mb-5 pb-5">
                <h2 className="text-center  mb-4">Offers</h2>
                <Row className="g-4">
                    {/* Empty column only for large screens */}
                    <Col lg={2} className="d-none d-lg-block"></Col>

                    <Col lg={8}>
                        <Row className="g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {offers.map((offer, index) => (
                                <Col key={index}>
                                    <Card className="offer-card">
                                        <Card.Img variant="top" src={offer.image} className="offer-img" />
                                        <Card.Body>
                                            <Card.Text className="offer-title ">{offer.title}</Card.Text>
                                            <Card.Text className="offer-code">
                                                Use Code <span>{offer.code}</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Empty column only for large screens */}
                    <Col lg={2} className="d-none d-lg-block"></Col>
                </Row>
            </Container>
            <Copy/>
        </div>
        
    );
};

export default Viewoffer;
