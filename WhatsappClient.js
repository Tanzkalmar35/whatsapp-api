const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
	puppeteer: {
		headless: true
	},
	authStrategy: new LocalAuth({
		clientId: '',
	}),
});

client.on('ready', () => {
	console.log("Client is ready");
	// ...
});

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

client.initialize();
