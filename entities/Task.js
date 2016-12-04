function Task(idTask)
{
	this.id = idTask;
	this.name = null;
	this.priority = null;
	this.stack = null;
	this.schedule = null;
	this.activation = null;
	this.autostart = null;
	this.resources = [];
	this.events = [];
}

Task.prototype.getId = function()
{
	return this.id;
}
Task.prototype.getName = function()
{
	return this.name;
}