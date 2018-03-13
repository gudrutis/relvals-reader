import React, {Component} from "react";
import Navbar from "react-bootstrap/es/Navbar";
import NavDropdown from "react-bootstrap/es/NavDropdown";
import Nav from "react-bootstrap/es/Nav";
import {Button, Col, Glyphicon, Modal, Row} from "react-bootstrap";
import Dropdown from "react-bootstrap/es/Dropdown";

import {urls, legend} from '../config';

class Navigation extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {

        const modalHelp = (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Legend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {legend}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <Navbar fixedTop id={'navigation'}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <p>RelVals</p>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Older releases" id="basic-nav-dropdown">
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <button className="btn btn-default navbar-btn" onClick={this.handleShow}>
                            <Glyphicon glyph="question-sign"/> Legend
                        </button>
                        {' '}
                        <Dropdown id="dropdown-custom-2">
                            <Dropdown.Toggle>
                                <Glyphicon glyph="exclamation-sign"/> Report an issue with ...
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="super-colors">

                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Row>
                        <Col xs={12}>
                            <Nav>
                                {this.props.flaworControl}
                            </Nav>
                        </Col>
                        <Col xs={12}>
                            <Nav>
                                {this.props.archControl}
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse>
                {modalHelp}
            </Navbar>
        );
    }
}

export default Navigation;
