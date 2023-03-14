import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import Logout from "./Logout";


const UserInfoMenu = () => {
	const user = {
		name: localStorage.getItem("name"),
		email: localStorage.getItem("email"),
	};

	return (
		<div >

					<Dropdown >
						<Dropdown.Toggle variant="outline-success" id="user-info-dropdown" style={{ borderRadius:"50px" }}>
							{user.name.charAt(0).toLocaleUpperCase()}
						</Dropdown.Toggle>

						<Dropdown.Menu >
							<Dropdown.Item href="/profile">Profile</Dropdown.Item>
							<Dropdown.Item >
								<Logout />
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

		</div>
	);
};

export default UserInfoMenu;