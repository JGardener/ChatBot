const Lurk = (chatParams) => {
    chatParams.client.say(chatParams.channel, `${chatParams.tags['display-name']} is now lurking. Mute the tab instead of the stream to count as a viewer! See you soon!`);
}

export default Lurk;