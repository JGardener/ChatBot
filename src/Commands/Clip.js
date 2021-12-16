import fetch from "node-fetch";
import { DateTime } from "luxon";

const createClip = async (chatParams) => {
    const response = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${process.env.CHANNEL_ID}`, {
    method: "POST",
    headers: {
    'Client-ID': process.env.BOT_CLIENT_ID,
    'Authorization': 'Bearer ' + process.env.BOT_ACCESS_TOKEN,
    }
    });
    const twitch = await response.json();
    console.log(twitch);
    chatParams.client.say(chatParams.channel, `${chatParams.tags['display-name']} has clipped successfully! You will find the clip here: http://clips.twitch.tv/${twitch.data[0].id}`)
    const data = {
        displayName: chatParams.tags['display-name'],
        editURL: `http://clips.twitch.tv/${twitch.data[0].id}`
    };
    return data;
};

const sendToDiscord = (displayName, editURL) => {
    return fetch(process.env.DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            username: process.env.DISCORD_USERNAME,
            content: `${displayName} clipped the stream at ${DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)}! ${editURL}`
        })
    });
};

const Clip = (chatParams) => {
    createClip(chatParams)
        .then(object => {
            sendToDiscord(object.displayName, object.editURL)
        })
};

export default Clip;