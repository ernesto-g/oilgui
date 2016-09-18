function OILGenerator(model)
{
	this.model= model;
};

OILGenerator.prototype.generate = function()
{
	console.log("Genero OIL file");
	console.log(model);
	var str = "\n\
OS GeneratedOilOS {	\n\
    STATUS = "+this.model.os.osStatus+";	\n\
    STARTUPHOOK = "+this.model.os.osStartupHook+";	\n\
    ERRORHOOK = "+this.model.os.osErrorHook+";	\n\
    SHUTDOWNHOOK = "+this.model.os.osShutDownHook+";	\n\
    PRETASKHOOK = "+this.model.os.osPreTaskHook+";	\n\
    POSTTASKHOOK = "+this.model.os.osPostTaskHook+";	\n\
    USEGETSERVICEID = "+this.model.os.osServId+";	\n\
    USEPARAMETERACCESS = "+this.model.os.osParAccess+";	\n\
    USERESSCHEDULER = "+this.model.os.osSch+";	\n\
};	\n\
";

	for(var index in this.model.resources)
	{
		str+= "RESOURCE = "+this.model.resources[index]+";\n";
	}
	
	for(var index in this.model.events)
	{
		str+= "EVENT = "+this.model.events[index]+";\n";
	}

	// Tasks
	for(var index in this.model.tasks)
	{	
		str+= "\n\
TASK "+this.model.tasks[index].name+" {	\n\
    PRIORITY = "+this.model.tasks[index].priority+";	\n\
    SCHEDULE = "+this.model.tasks[index].schedule+"; \n\
    ACTIVATION = "+this.model.tasks[index].activation+";	\n\
    AUTOSTART = "+this.model.tasks[index].autostart+";	\n\
    STACK = "+this.model.tasks[index].stack+";	\n";
		for(var index2 in this.model.tasks[index].resources)
		{
			str+= "\n    RESOURCE = "+this.model.resources[this.model.tasks[index].resources[index2]]+";";
		}
		for(var index2 in this.model.tasks[index].events)
		{
			str+= "\n    EVENT = "+this.model.events[this.model.tasks[index].events[index2]]+";";
		}
		str+= "\n}";
	}
	
	console.log(str);
	
	
	return str;
};



