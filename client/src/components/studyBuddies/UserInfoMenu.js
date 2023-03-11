import React from "react";
import { Dropdown } from "react-bootstrap";

const UserInfoMenu = () => {
	const user = {
		name: localStorage.getItem("name"),
		email: localStorage.getItem("email"),
	};

	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle variant="outline-success" id="user-info-dropdown">
					{user.name} {/* Replace with the name of the logged user */}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="/profile">Profile</Dropdown.Item>
					<Dropdown.Item href="/logout">Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default UserInfoMenu;