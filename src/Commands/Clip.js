import fetch from "node-fetch";
import { DateTime } from "luxon";

const API_URL = `https://api.twitch.tv/helix/clips?broadcaster_id=${process.env.CHANNEL_ID}'`

const Clip = (chatParams) => {
    const createClip =  () => {fetch(API_URL, {
        method: "POST",
        headers: {
            'Client-ID': process.env.BOT_CLIENT_ID,
            'Authorization': 'Bearer ' + process.env.BOT_ACCESS_TOKEN,
        }
    }).then(response => response.json()).then(twitch => {
           console.log(twitch);
        });
    }
}
Clip();

export default Clip;

