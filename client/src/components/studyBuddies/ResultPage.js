import React from "react";

const ResultPage = (props) => {
	return (
		<div>
			<h1 style={{ color: "yellow", textAlign: "center" }}>
				List of Trainees
			</h1>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<input
							type="text"
							className="form-control"
							placeholder="Search"
							value={props.search}
							onChange={props.handleSearch}
						/>
					</div>
					<div className="col-md-6">
						<div
							className="btn-group"
							role="group"
							aria-label="Basic example"
						>
							<button
								type="button"
								className={`btn btn-${props.selected === "daily" ? "info" : "outline-info"}`}
								value="daily"
								onClick={props.handleFilter}
							>
								Daily
							</button>
							<button
								type="button"
								className={`btn btn-${props.selected  === "weekly" ? "info" : "outline-info"}`}
								value="weekly"
								onClick={props.handleFilter}
							>
								Weekly
							</button>
							<button
								type="button"
								className={`btn btn-${props.selected   === "monthly" ? "info" : "outline-info"}`}
								value="monthly"
								onClick={props.handleFilter}
							>
								Monthly
							</button>
						</div>
					</div>
				</div>
			</div>
			<h1 style={{ color: "red" }}>
				There is no available trainee for this date.
				<p>Please check weekly and monthly availability.</p>
			</h1>

		</div>
	);
};

export default ResultPage;