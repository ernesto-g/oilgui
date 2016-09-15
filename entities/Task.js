function Task(idTask)
{
	this.id = idTask;
}

Task.prototype.getId = function()
{
	return this.id;
}