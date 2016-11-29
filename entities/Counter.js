function Counter(idCounter)
{
	this.id = idCounter;
	this.name = null;
	this.maxAllowValue = 0;
	this.minCycle = 0;
	this.tickPerBase = 0;
	this.type = null;
	this.counter = null;	
}

Counter.prototype.getId = function()
{
	return this.id;
}