//  Kick off the service by loading .env into process.ENV
//  importing resolve from path module
const { resolve } = require('path');

if (process.env.NODE_ENV !== 'production') {
	const { parsed, error } = require('dotenv').config({ path: resolve(__dirname, '../.env') });
	if (error) {
		throw error;
	}
}

const app = require('./app');
const setup = require('./setup');
const logger = require('./logger');
const cache = require('./cache');
const discord = require('./discord');
const pokeapi = require('./pokeapi');
const theme = require('./theme');
const frontend = require('./frontend');
const dispatcher = require('./dispatcher');
// const niantic = require('./niantic');

//  Create config from ENV
const config = {
	app,
	setup,
	theme,
	logger,
	cache,
	discord,
	pokeapi,
	frontend,
	dispatcher
	// niantic
};

module.exports = config;
