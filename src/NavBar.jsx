
import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LiaHeadsetSolid, LiaLanguageSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";
import LoginModal from "./LoginModal"; // Import LoginModal component
import "./Navbar.css";
import redbusLogo from "./rdc-redbus-logo.svg"; // Replace with your logo
import { useNavigate } from "react-router-dom";


const CustomNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const closeMenu = () => {
    document.body.click(); // Close dropdown
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          {/* Left Side - Logo & Bus Tickets */}
          <Navbar.Brand href="/">
            <img src={redbusLogo} alt="RedBus" className="logo" />
          </Navbar.Brand>
          <Nav className="bus-tickets">
            <button className="bus-button" onClick={() => navigate("/")}>
              <img src={redbusLogo} alt="Redbus" className="bus-icon" />
              <span>Bus Tickets</span>
            </button>
          </Nav>

          {/* Right Side - Help, Language, Account */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end helps">
            <Nav className="right-options">
              <Nav.Link as={Link}  to="/help" className="nav-item text-dark hea-text">
                <LiaHeadsetSolid className="nav-icon" /> Help
              </Nav.Link>
              <Dropdown className="nav-item">
                <Dropdown.Toggle variant="link" className="dropdown-toggle text-dark text-decoration-none hea-text">
                  <LiaLanguageSolid className="nav-icon" /> English
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">English</Dropdown.Item>
                  <Dropdown.Item href="#">हिन्दी</Dropdown.Item>
                  <Dropdown.Item href="#">தமிழ்</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Account Dropdown */}
              <Dropdown className="nav-item">
                <Dropdown.Toggle variant="link" className="dropdown-toggle text-dark text-decoration-none hea-text">
                  <RiAccountCircleLine className="nav-icon" /> Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/cancel-ticket" onClick={closeMenu}>
                    Cancel Ticket
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/change-travel-date" onClick={closeMenu}>
                    Change Travel Date
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/show-my-ticket" onClick={closeMenu}>
                    Show My Ticket
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/email" onClick={closeMenu}>
                    Email/SMS
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setShowModal(true); closeMenu(); }}>
                    Login/Signup
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    sessionStorage.removeItem("isLoggedIn");
                    alert("You have been logged out.");
                    closeMenu();
                  }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default CustomNavbar;
