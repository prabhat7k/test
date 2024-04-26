import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
	host: "mysql-db",
	user: "root",
	password: "1212",
	database: "Book",
});

app.get("/", (req, res) => {
	res.json("server running");
});

app.get("/books", (req, res) => {
	const q = "SELECT * FROM books";
	db.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

app.post("/books", (req, res) => {
	const q = "INSERT INTO books(`title`, `publisher`, `authors`, `copies`) VALUES (?)";

	const values = [req.body.title, req.body.publisher, req.body.authors, req.body.copies];

	db.query(q, [values], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

app.listen(5000, () => {
	console.log("Connected to backend");
});
