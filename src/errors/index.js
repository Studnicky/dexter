const config = require('../../config');

class unknownError extends Error {
	constructor(error, state, ...args) {
		const { name: errorName = 'UNKNOWN', number, message, description, stack, fileName, lineNumber, columnNumber } = error;
		const {
			event: { platform: platformName, name: eventName = null },
			correlationId = null,
			user = {}
		} = state;

		const errorMessage = message || description || errorName || 'Unknown Error';

		super(errorMessage);
		this.type = errorName;
		this.platform = platformName;
		this.event = eventName;
		this.correlationId = correlationId;
		this.user = user;

		if (config.app.env !== 'production') {
			this.stack = stack;
		}
	}
}

class AuthError extends Error {
	constructor(event, error, ...args) {
		super(event, error, ...args);
		this.type = 'AUTHORIZATION';
	}
}

module.exports = {
	unknown: unknownError,
	auth: AuthError
};
