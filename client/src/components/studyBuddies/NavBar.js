import React from "react";
import { Image, Container, Nav, Navbar } from "react-bootstrap";
import UserInfoMenu from "./UserInfoMenu";

const NavBar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">
                        <Image src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png" alt="Code Your Future" width="100" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/all">All Users</Nav.Link>
                            <Nav.Link href="/myavailability">My Availabilities</Nav.Link>
                            <Nav.Link href="/availability">Create Availability</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <UserInfoMenu />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;