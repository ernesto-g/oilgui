
function Model()
{
	this.resources = [];
	this.events = [];
	this.tasks = [];
	this.counters = [];
	this.os = null;
	this.alarms = [];
	this.extraText=null;
	
};

Model.prototype.toString = function()
{
	//console.log(this.resources);
	//console.log(this.events);
	//console.log(this.tasks);
	return "";
};

