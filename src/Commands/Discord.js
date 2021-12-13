const Discord = (chatParams) => chatParams.client.say(chatParams.channel, `Join the community Discord! ${process.env.DISCORD_LINK}`);

export default Discord