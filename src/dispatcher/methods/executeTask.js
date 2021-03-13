module.exports = function executeTask(index, ...args) {
	const task = this.queue[index] ? this.queue[index] : this.onComplete;
	this.logger.trace(`${this.logTag} Executing task [${index}:${this.queue.length}] ${task.name}`);
	return task.call(this, this.executeTask.bind(this, ++index, ...args), ...args);
};
