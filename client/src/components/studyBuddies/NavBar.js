import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import UserInfoMenu from "./UserInfoMenu";

const NavBar = () => {
	return (
		<div>
			{
				localStorage.getItem("token") ? (
					<Navbar bg="dark" variant="dark" expand="lg">
						<Container>
							<Navbar.Brand href="/home">
								<Image
									src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
									alt="Code Your Future"
									width="100"
									height="50"
								/>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<Nav.Link href="/all">All Users</Nav.Link>
									<Nav.Link href="/myavailability">My Availabilities</Nav.Link>
								</Nav>
								<Nav className="ml-auto">
									<UserInfoMenu />
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				) : (
					<Navbar bg="dark" variant="dark" expand="lg">
						<Container>
							<Navbar.Brand href="/">
								<Image
									src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
									alt="Code Your Future"
									width="100"
									height="50"
								/>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="ml-auto">
									<Nav.Link href="/login">Login</Nav.Link>
									<Nav.Link href="/register">Register</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
			)
			}
		</div>
	);
};

export default NavBar;