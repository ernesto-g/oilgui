function Alarm(idAlarm)
{
	this.id = idAlarm;
	
	this.name = null;
	this.counter = null;

	this.autostart = false;
	this.alarmtime = 0;
	this.cycletime = 0;

	this.action = null;
	this.task = null;
	this.event = null;
	this.alarmcallback = null;
	
}

Alarm.prototype.getId = function()
{
	return this.id;
}