module.exports = {
	trace: (...args) => {
		console.debug(...args);
	},
	debug: (...args) => {
		console.debug(...args);
	},
	info: (...args) => {
		console.info(...args);
	},
	warn: (...args) => {
		console.warn(...args);
	},
	error: (...args) => {
		console.error(...args);
	},
	fatal: (...args) => {
		console.error(...args);
	}
};
