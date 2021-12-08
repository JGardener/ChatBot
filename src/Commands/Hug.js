const Hug = (chatParams) => {
    chatParams.client.say(chatParams.channel, `${chatParams.tags['display-name']} gives ${chatParams.args} a big hug!`);
}

export default Hug;