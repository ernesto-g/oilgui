
function Model()
{
	this.resources = [];
	this.events = [];
	this.tasks = [];
};

Model.prototype.toString = function()
{
	console.log(this.resources);
	console.log(this.events);
	console.log(this.tasks);
	return "";
};

