module.exports = function addTasks(tasks = []) {
	tasks = Array.isArray(tasks) ? tasks : [tasks];
	this.logger.trace(`${this.logTag} Adding ${tasks.length} tasks to queue... `);
	for (const task of tasks) {
		this.addTask.call(this, task);
	}
};
