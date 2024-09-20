import express from "express";
import { init, sendMessage } from "./WhatsappClient";

const app = express();
const port = 3001;

app.use(express.json()); // To parse json payloads

app.listen(port, () => {
	console.log("Server running on port " + port);
})



app.post('/send-text', (req, res) => {
	const { message, recipient } = req.body;

	init();

	sendMessage(recipient, message)
		.then(() => { res.status(200).send(); })
		.catch(() => { res.status(500).send({ message: 'Error sending message' }) })
});
