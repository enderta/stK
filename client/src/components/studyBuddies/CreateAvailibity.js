import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CreateAvailibity = () => {
	const [date, setDate] = React.useState(new Date());
	const [topic, setTopic] = React.useState("");
	let id = localStorage.getItem("id");
	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "date") {
			setDate(new Date(value));
		} else if (name === "topic") {
			setTopic(value);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const formattedDate = `${date.getFullYear()}-${(
			"0" +
			(date.getMonth() + 1)
		).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
		const available = {
			availability_date: formattedDate,
			topic: topic,
			trainees_id: id,
		};
		fetch("http://localhost:3000/api/availability", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify(available),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error);
				} else {
					localStorage.setItem("date", formattedDate);
					localStorage.setItem("topic", data.topic);
					localStorage.setItem("av_id", data.id);
					alert("You have created a new available date!");
					window.location.reload();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Create Availability</h5>
							<div className="container">
								<div className="row">
									<div className="col-md-6 mt-5 mx-auto">
										<Form style={{ width: "50%", margin: "auto" }}>
											<Form.Group controlId="formBasicDate">
												<Form.Label style={{ color: "goldenrod" }}>Date</Form.Label>
												<Form.Control
													type="date"
													min={new Date().toISOString().split("T")[0]}
													max={
														new Date(new Date().setMonth(new Date().getMonth() + 1))
															.toISOString()
															.split("T")[0]
													}
													name="date"
													onChange={handleChange}
												/>
											</Form.Group>
											<Form.Group controlId="formBasicTopic">
												<Form.Label style={{ color: "goldenrod" }}>Topic</Form.Label>
												<Form.Control
													type="text"
													placeholder="Topic"
													name="topic"
													onChange={handleChange}
												/>
											</Form.Group>
											<Button
												onClick={handleSubmit}
												className="btn btn-outline-info"
												style={{ float: "right", margin: "10px" }}
											>
												Create
											</Button>
											{/*   <Button onClick={handleBack} className="btn btn-outline-info" style={{float: "right", margin: "10px"}}>Back</Button>*/}
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
	);
};

export default CreateAvailibity;