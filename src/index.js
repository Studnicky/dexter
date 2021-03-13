const config = require('../config');
const logger = require('./logger');
const errors = require('./errors');

const platforms = require('./platforms');
async function app() {
	//	Register all event creating platforms
	const activePlatforms = {
		discord: new platforms.discord()
	};

	//	Start all platforms
	try {
		await Promise.all(
			Object.values(activePlatforms).map((platform) => {
				return platform.startup();
			})
		);
	} catch (err) {
		state.error = new errors.unknown(err, state);
		throw new errors.unknown(err, { event: { name: 'Server Startup' } });
	}
}

app();
module.exports = app;
