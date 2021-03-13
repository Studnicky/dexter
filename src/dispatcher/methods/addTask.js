module.exports = function addTask(task = () => {}) {
	this.logger.trace(`${this.logTag} Adding task: ${task.name}`);
	this.queue.push(task);
};
