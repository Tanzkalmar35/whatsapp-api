import { Client, LocalAuth } from 'whatsapp-web.js';

const client: Client = new Client({
	puppeteer: {
		headless: true
	},
	authStrategy: new LocalAuth({
		clientId: 'EXAMPLE_CLIENT_ID',
	}),
});

client.on('ready', () => {
	console.log("Client is ready");
	// ...
});

/**
 * Sends a message via the whatsapp web client to the recipient.
 *
 * @param {string} recipient the chat id to send the message to 
 * @param {string} message the message to send
 *
 * @returns Promise<string>
 */
export function sendMessage(recipient: string, message: string): Promise<boolean> {
	let success: boolean = false;
	client.sendMessage(recipient, message).then(() => {
		success = true
	})

	if (success) {
		return Promise.resolve(success);
	} else {
		return Promise.reject(success)
	}
}

// Incoming message
client.on('message_create', async msg => {
	console.log("Received message:", msg.body);
	if (msg.body === '!fuck') {
		msg.reply('you');
	}
});

client.on('error', err => {
	console.error("Error occurred:", err);
});

client.on('qr', qr => {
	console.log(qr);
});

/**
 * Initializes the app
 */
export function init() {
	client.initialize();
}
