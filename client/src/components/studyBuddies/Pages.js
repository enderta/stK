import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "./LandingPage";
import CreateAvailibity from "./CreateAvailibity";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";
import MyAvailability from "./MyAvailability";
import AllUsers from "./AllUsers";
import Availibites from "./Availibites";
const Pages = () => {
	return (
		<div>
			<Routes>
				<Route path="/*" element={<LandingPage />} />
				<Route path="/home" element={<Availibites />} />
			{/*	<Route path="/availability" element={<CreateAvailibity />} />*/}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/myavailability" element={<MyAvailability />} />
				<Route path="/all" element={<AllUsers />} />
			</Routes>
		</div>
	);
};

export default Pages;