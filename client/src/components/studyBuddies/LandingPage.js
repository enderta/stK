import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const LandingPage = () => {
	return (
		<div>
			<div>
				<div className="container">
					<div className="row">
						<div className="col-6">
							<div
								className="card"
								style={{
									padding: "10px",
									margin: "10px",
									position: "absolute",
									top: "25%",
									left: "25%",
									right: "25%",
									background: "none",
									border: "none",
								}}
							>
								<div className="card-body" style={{ background: "none" }}>
									<>
										<Card
											className={"btn btn-outline-primary"}
											style={{
												margin: "10px",
												background: "darkblue",
												width: "200px",
											}}
										>
											<Link
												to={"/login"}
												style={{ textDecoration: "none", color: "green" }}
											>
												Login
											</Link>
										</Card>
										<Card
											className={"btn btn-outline-primary"}
											style={{
												margin: "10px",
												background: "darkgray",
												width: "200px",
											}}
										>
											<Link
												to={"/register"}
												style={{ textDecoration: "none", color: "yellow" }}
											>
												Register
											</Link>
										</Card>
									</>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;