import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MyAvailabilityCard from "./MyAvailabilityCard";

const MyAvailability = () => {
	const [myDates, setMyDates] = useState([]);
	useEffect(() => {
		fetch(
			`https://study-buddies.onrender.com/availability/${localStorage.getItem(
				"id"
			)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("token"),
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setMyDates(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<div>
				<NavBar />
			</div>
			<h1>My Availability</h1>
			<div>
				<div>
					<div className="container">
						<div className="row">
							{myDates.map((date) => {
								return (
									<div className="col-md-6">
										<div
											className="card mb-4 shadow-sm"
											style={{
												background: "darkgoldenrod",
												border: "black solid 1px",
												margin: "2px",
												padding: "2px",
											}}
										>
											<MyAvailabilityCard
												key={date.id}
												date={date}
												dates={myDates}
												setDates={setMyDates}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyAvailability;