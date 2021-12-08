import tmi from 'tmi.js'
import dotenv from 'dotenv';
dotenv.config();

import Commands from './Commands/Commands';

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


// Keep track of chat messages, awaiting commands
client.on('message', (channel, tags, message, self) => {
    const args = message.split(" ");
    const command = args.shift();
    
    if(self) {return;}
    
    // chatParams is now the argument passed to all commands
    // It contains all we need for arguments
    // example: client.say() is now chatParams.client.say()
    const chatParams = {
        client: client,
        channel: channel,
        tags: tags,
        message: message, 
        self: self,
        args: args
    }
    
    //  
    // chatParams will be passed an argument to this, containing all the parameters we need. 
    
    if(Commands[command]){
        Commands[command](chatParams);
    }
    
    console.log(`${tags['display-name']}: ${message}`);
});

client.on('connected', () => {
    console.log('Bot has connected...');
});

client.connect().catch(console.error);