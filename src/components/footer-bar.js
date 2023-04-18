import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import footerlogo from '../assets/footer-logo.svg';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
export default function Footerbar() {
  return (
    <div className="">
      <Navbar expand="lg" className="fixed-bottom navbar custom-align-center  nav-bar-bg custom-border-top">
        <Row className="custom-width">
          <Col className="custom-align-center p-a-0 p-l-24">
          <Nav.Link href="https://aaludra.com/contact-us/" target="_blank"  className="p-a-0  custom-footer-text">Help</Nav.Link>
          <Nav.Link href="https://aaludra.com/privacy-policy/" target="_blank" className="p-a-0 p-l-24 custom-footer-text">Privacy policy</Nav.Link>
          </Col>
          <Col className="p-a-0">
          <Navbar.Brand className="float-right p-a-0"><span className=" custom-footer-text p-r-12">Engineered at</span><img src={footerlogo} alt="logo" width="110" height="52" /></Navbar.Brand>
          </Col>
        </Row>       
      </Navbar>
    </div>
  );
}
