import fetch from "node-fetch";
import { DateTime } from "luxon";

const API_URL = `https://api.twitch.tv/helix/clips?broadcaster_id=${process.env.CHANNEL_ID}'`

// First, we need an access token to get authorisation. 
const refreshToken = async () => {
    let accessToken = ""
    const response = await fetch(`https://id.twitch.tv/oauth2/token
        --data-urlencode
        ?grant_type=refresh_token
        &refresh_token=${process.env.REFRESH_TOKEN}
        &client_id=${process.env.CLIENT_ID}
        &client_secret=${process.env.CLIENT_SECRET}`, {
        method: "POST"
    });
    const data = await response.json();
    accessToken = `Bearer ${data["access_token"]}`;
    return accessToken;
    }
    


const createClip =  (chatParams, accessToken) => {fetch(API_URL, {
    method: "POST",
    headers: {
        'Client-ID': process.env.BOT_CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken,
    }
}).then(response => response.json()).then(twitch => {
        console.log(twitch);
    });
}


const Clip = (chatParams) => {
    refreshToken().then((accessToken) => {
        createClip(chatParams, accessToken)
    })
}

export default Clip;

