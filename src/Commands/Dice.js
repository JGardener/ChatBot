const Dice = (chatParams) => {
    chatParams.client.say(chatParams.channel, `${chatParams.tags['display-name']}, you rolled ${Math.floor((Math.random() * 6) + 1)}`);
}
export default Dice;