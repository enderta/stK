import React from "react";

const Logout = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<div>
			<button
				onClick={handleLogout}
				className="btn btn-outline-info"
				style={{ float: "right", margin: "10px" }}
			>
				Logout
			</button>
		</div>
	);
};

export default Logout;