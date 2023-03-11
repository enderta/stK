import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const MyAvailabilityCard = (props) => {
	const [edit, setEdit] = useState(false);
	const trainees_id = useState(localStorage.getItem("id"));
	const [date, setDate] = React.useState(new Date());
	const [topic, setTopic] = React.useState("");

	const handleDelete = (e) => {
		e.preventDefault();
		fetch(`https://starter-kit-uq32.onrender.com/api/availability/${props.date.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error);
				} else {
					alert("You have deleted this available date!");
					window.location.reload();
				}
			})
			.catch((err) => console.log(err));
	};
	const handleUpdate = (e) => {
		e.preventDefault();
		const formattedDate = `${date.getFullYear()}-${(
			"0" +
			(date.getMonth() + 1)
		).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
		const available = {
			availability_date: formattedDate,
			topic: topic,
			trainees_id: trainees_id,
		};
		fetch(`https://starter-kit-uq32.onrender.com/api/availability/${props.date.id}`, {
			method: "PUT",
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
					alert("You have updated this available date!");
					window.location.reload();
				}
			})
			.catch((err) => console.log(err));
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "date") {
			setDate(new Date(value));
		} else if (name === "topic") {
			setTopic(value);
		}
	};
	return (
		<div>
			<div className={"card"}>
				<div className={"card-body"}>
					<h5 className="card-title">
						{" "}
						Date: {new Date(props.date.availability_date).toLocaleDateString()}
					</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						Topic: {props.date.topic}
					</h6>
					<Button
						style={{ margin: "10px" }}
						variant="outline-danger"
						onClick={handleDelete}
					>
						Delete
					</Button>
					<Button variant="outline-primary" onClick={() => setEdit(!setEdit())}>
						Edit
					</Button>
					<Modal show={edit} onHide={() => setEdit(!edit)}>
						<Modal.Header closeButton>
							<Modal.Title>Edit Availability</Modal.Title>
						</Modal.Header>
						<Modal.Body>
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
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								style={{ margin: "10px" }}
								variant="outline-info"
								onClick={() => setEdit(!edit)}
							>
								Close
							</Button>
							<br />
							<Button variant="outline-success" onClick={handleUpdate}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default MyAvailabilityCard;