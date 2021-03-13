// https://discord.com/developers/applications

const authConfig = {
	clientId: process.env.DISCORD_CLIENT_ID || null,
	clientSecret: process.env.DISCORD_CLIENT_SECRET || null,
	publicKey: process.env.DISCORD_PUBLIC_KEY || null,
	botToken: process.env.DISCORD_BOT_TOKEN || null
};

module.exports = authConfig;
