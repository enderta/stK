import React, { useEffect, useState } from "react";

const App = () => {
	const [availability, setAvailability] = useState([]);
	useEffect(() => {
		fetch(`https://starter-kit-uq32.onrender.com/api/availabilities`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjc4NDcyNjkzLCJleHAiOjE2Nzg4MzI2OTN9.XFtFA0dVINwaZ1zjd_yoJaxI7af90yR2fmF3UI-QsQc",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

				},
			})
			.then((response) => response.json())
			.then((data) => {

				setAvailability(data.data);
			});
	}, [  ]);
	console.log(availability);

	return (
        <div>
ender
        </div>
    );
};

export default App;