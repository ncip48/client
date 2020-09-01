import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  Navbar,
  Container,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { oranye } from "../../styles/color";

const bgoren = {
  backgroundColor: oranye,
  padding: 3,
  width: "100%",
};

const bgtransparan = {
  backgroundColor: "transparent",
  borderColor: "transparent",
};

const headerStyle = {
  marginTop: 5,
  marginBottom:5
}

function BaseLayout({ children }) {
  return (
    <>
    <header>
      <Navbar style={bgoren} className="fixed header-fixed">
        <Container>
          <Col xs={3} md={3} style={headerStyle}>
            <Link to="/" className="navbar-brand">
              <img
                alt=""
                src="/logo.png"
                height="45"
                className="logo-header"
              />
            </Link>
          </Col>
          <Col xs={3} md={6} className="displayweb">
            <InputGroup>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="cari barang..."
              />
              <InputGroup.Append>
                <Button variant="light">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={6} md={3}>
            <div className="float-right">
              <Link to="/notif" className="btn btn-primary" style={bgtransparan}>
                <FontAwesomeIcon icon={faBell} size="lg" />
              </Link>
              <Button style={bgtransparan} className="displayweb">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </Button>
              <Button style={bgtransparan}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </Button>
            </div>
          </Col>
        </Container>
      </Navbar>
      </header>
      {children}
    </>
  );
}

export default BaseLayout;
