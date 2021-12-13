
import fetch from 'node-fetch';
import { DateTime } from 'luxon';

const Followage = (chatParams) => {
    
    const getUserFollowAge = (userId) => {
        fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&to_id=${process.env.CHANNEL_ID}`, {
            'method': 'GET',
            headers: {
                'Client-ID': process.env.BOT_CLIENT_ID,
                'Authorization': 'Bearer ' + process.env.BOT_ACCESS_TOKEN,
            }
        })
        .then((response) => response.json())
        .then((twitch) => {

            let followStart = DateTime.fromISO(twitch.data[0].followed_at);
            let rightNow = DateTime.now();
            let difference = rightNow.diff(followStart, ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']).toObject();
            let differenceArray = [];

            // Converts the diff object to a string.
            let differenceMessage = () => {
                for (const [key, value] of Object.entries(difference)){
                    if(value != 0){
                        differenceArray.push(`${value} ${key}`);
                    }
                }
                return `${differenceArray.join(', ')} ago`;
            }
            
            chatParams.client.say(chatParams.channel, 
                `${chatParams.tags['display-name']} has followed ${process.env.CHANNEL_NAME} since ${followStart.toFormat('DDDD')} -  ${differenceMessage()}`);
        });    
    }
    getUserFollowAge(chatParams.tags['user-id']);
}

export default Followage;

