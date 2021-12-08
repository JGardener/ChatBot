const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
    connection : {
        reconnect: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        // password = access token
        password: process.env.BOT_ACCESS_TOKEN
    },
	channels: [ process.env.CHANNEL_NAME ]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
});

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags['display-name']}, heya!`);
	}
});