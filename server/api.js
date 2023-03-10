import { Router } from "express";
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const bcrypt = require("bcrypt");
const secret = "mysecret";
const mg = require("mailgun-js");
import logger from "./utils/logger";
import db from "./db";

const router = Router();
const mailgun = () =>
	mg({
		apiKey: "78a5653ce69388407c6a2edcd2a85368-d1a07e51-f900629e",
		domain: "sandboxd2c73936264e4683bc115f81fd6d19dd.mailgun.org",
	});
router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.use(
	cors({
		accessControlAllowOrigin: "*",
		accessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
		accessControlAllowHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
		accessControlAllowCredentials: true,
	})
);

router.post("/send", (req, res) => {
	const { email, to, subject, text } = req.body;
	const data = {
		from: email,
		to: to,
		subject: subject,
		text: text,
		html: `<h1>${email} says lets study</h1>`,
	};
	mailgun()
		.messages()
		.send(data, (error, body) => {
			if (error) {
				console.log(error);
				return res.status(500).json({
					message: error.message,
				});
			}
			return res.status(200).json(body);
		});
});

router.post(
	"/register",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
		check("name", "Please enter a name").not().isEmpty(),
	],
	async (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.setHeader("Access-Control-Allow-Credentials", true);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password, name } = req.body;
		try {
			let user = await db.query("SELECT * FROM trainees WHERE email = $1", [email]);
			if (user.rows.length > 0) {
				return res.status(400).json({ message: "User already exists" });
			}
			const salt = await bcrypt.genSalt(10);
			user = await db.query(
				"INSERT INTO trainees (email, password, name) VALUES ($1, $2, $3) RETURNING *",
				[email, await bcrypt.hash(password, salt), name]
			);
			const payload = {
				user: {
					id: user.rows[0].id,
				},
			};
			jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
				if (err) {
throw err;
}
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

router.post("/login", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		const result = await db.query(
			"SELECT * FROM trainees WHERE email = $1",
			[email]
		);
		if (result.rows.length === 0) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Invalid credentials" }] });
		}
		const user = result.rows[0];
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Invalid credentials" }] });
		} else {
			const payload = {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};
			jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
				if (err) {
					throw err;
				}
				res.json({ token,id: user.id, name: user.name, email: user.email });
});
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
	}
});

router.post("/availability", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

	// Delete old data before inserting new data
	const deleteQuery = "DELETE FROM availability WHERE availability_date < CURRENT_DATE";
	await db.query(deleteQuery);
	jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
		if (error) {
			res.status(401).json({ message: "Unauthorized" });
		} else {
			const { availability_date, topic, trainees_id } = req.body;
			const query = "INSERT INTO availability (availability_date, topic, trainees_id) VALUES ($1, $2, $3) RETURNING id";
			const values = [availability_date, topic, trainees_id];
			const result = await db.query(query, values);
			const id = result.rows[0].id;
			res.status(201).json({
				msg: "Availability created",
				availability_date: availability_date,
				topic: topic,
				trainees_id: trainees_id,
				id: id,
			});
		}
	});
});

router.get("/availabilities", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	const deleteQuery = "DELETE FROM availability WHERE availability_date < CURRENT_DATE";
	db.query(deleteQuery);
	jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
		if (error) {
			res.status(401).json({ message: "Unauthorized" });
		} else {
			const queryOptions = {
				daily: "WHERE availability_date = CURRENT_DATE",
				weekly: "WHERE availability_date BETWEEN CURRENT_DATE AND CURRENT_DATE + interval '7' day",
				monthly: `WHERE (date_trunc('month', availability_date) = date_trunc('month', CURRENT_DATE)
              OR date_trunc('month', availability_date) = date_trunc('month', CURRENT_DATE + interval '1' month)) AND availability_date >= CURRENT_DATE`,
				name: `WHERE t.name = '${req.query.name}'`,
				email: `WHERE t.email = '${req.query.email}'`,
			};
			const queryFilter = queryOptions[req.query.filter] || "";
			const search = req.query.search || "";
			const query = `
                SELECT a.availability_date, a.topic, t.name, t.email, a.id
                FROM availability a JOIN trainees t ON a.trainees_id = t.id ${queryFilter}
                AND (a.topic ILIKE '%${search}%' OR t.name ILIKE '%${search}%' OR t.email ILIKE '%${search}%')
                ORDER BY a.availability_date ASC`;
			const { rows } = await db.query(query);
			res.status(200).json({
				data: rows,
			});
		}
	});
});

router.get("/availability/:id", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	const deleteQuery = "DELETE FROM availability WHERE availability_date < CURRENT_DATE";
	await db.query(deleteQuery);
	jwt.verify(req.headers.authorization, secret, (error, decoded) => {
		if (error) {
			res.status(401).json({ message: "Unauthorized" });
		} else {
			const id = parseInt(req.params.id);
			db.query("SELECT * FROM availability WHERE trainees_id = $1", [id], (error, results) => {
				if (error) {
					throw error;
				}
				res.status(200).json(results.rows);
			});
		}
	});
});

router.put("/availability/:id", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	const deleteQuery = "DELETE FROM availability WHERE availability_date < CURRENT_DATE";
	await db.query(deleteQuery);
	jwt.verify(req.headers.authorization, secret, (error, decoded) => {
			if (error) {
				res.status(401).json({ message: "Unauthorized" });
			} else {
				const id = parseInt(req.params.id);
				const { availability_date, topic, trainees_id } = req.body;
				db.query(
					"UPDATE availability SET availability_date = $1, topic = $2, trainees_id = $3 WHERE id = $4",
					[availability_date, topic, trainees_id, id],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.status(200).json({ message: "Availability updated" });
					}
				);
			}
		}
	);
});

router.delete("/availability/:id", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	const deleteQuery = "DELETE FROM availability WHERE availability_date < CURRENT_DATE";
	await db.query(deleteQuery);
	jwt.verify(req.headers.authorization, secret, (error, decoded) => {
		if (error) {
			res.status(401).json({ message: "Unauthorized" });
		} else {
			const id = parseInt(req.params.id);
			db.query("DELETE FROM availability WHERE id = $1", [id], (error, results) => {
				if (error) {
					throw error;
				}
				res.status(200).json({ message: "Availability deleted" });
			});
		}
	});
});
export default router;