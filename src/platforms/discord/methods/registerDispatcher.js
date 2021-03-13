const Dispatcher = require('../../../dispatcher');
const { v4: uuidv4 } = require('uuid');

module.exports = async function registerDispatcher() {
	this.logger.info(`\x1b[42m Registering Platform Events... \x1b[0m`);

	//	Iterate routines config, register triggers to routines
	for (const [eventName, tasks] of Object.entries(this.routines)) {
		this.socket.on(eventName, async (...args) => {
			//	Pass platform reference to dispatcher

			const initialState = {
				correlationId: uuidv4(),
				event: {
					platformName: this.name,
					eventName: eventName,
					args: args
				}
			};

			const dispatcher = new Dispatcher(this, tasks, {});
			const result = await dispatcher.process(initialState);

			return result;
		});
	}
};
