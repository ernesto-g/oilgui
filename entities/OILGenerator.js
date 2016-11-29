function OILGenerator(model)
{
	this.model= model;
};

OILGenerator.prototype.generate = function()
{
	console.log("Genero OIL file");
	console.log(model);
	var str = "\nOSEK OSEK {\
\n	OS GeneratedOilOS {	\n\
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
		str+= "\tRESOURCE = "+this.model.resources[index]+";\n";
	}
	
	for(var index in this.model.events)
	{
		str+= "\tEVENT = "+this.model.events[index]+";\n";
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
			str+= "\n    	RESOURCE = "+this.model.resources[this.model.tasks[index].resources[index2]]+";";
		}
		for(var index2 in this.model.tasks[index].events)
		{
			str+= "\n    	EVENT = "+this.model.events[this.model.tasks[index].events[index2]]+";";
		}
		str+= "\n\t}";
	}
	
	// Counters
	for(var index in this.model.counters)
	{
		str+= "\n\
	COUNTER "+this.model.counters[index].name+" { 	\n\
		MAXALLOWEDVALUE = "+this.model.counters[index].maxAllowValue+";	\n\
		MINCYCLE = "+this.model.counters[index].minCycle+"; \n\
		TICKSPERBASE = "+this.model.counters[index].tickPerBase+";	\n\
		TYPE = "+this.model.counters[index].type+";	\n\
		COUNTER = "+this.model.counters[index].counter+";	\n";
		str+= "\t}";		
	}
	
	// alarms
	for(var index in this.model.alarms)
	{
		str+= "\n\
	ALARM "+this.model.alarms[index].name+" { 	\n\
		COUNTER = "+this.model.alarms[index].counter+";	\n";

		if(this.model.alarms[index].autostart)
		{
			str+= "\t\tAUTOSTART = TRUE { \n";
			str+= "\t\t\tALARMTIME = "+this.model.alarms[index].alarmtime+"; \n";
			str+= "\t\t\tCYCLETIME = "+this.model.alarms[index].cycletime+"; \n";
			str+= "\t\t}";		
		}
		else
			str+= "\t\tAUTOSTART = FALSE; \n";
			
		//action
		if(this.model.alarms[index].action=="ACTIVATETASK")
		{
			str+= "\n\t\tACTION = ACTIVATETASK { \n";
			str+= "\t\t\tTASK = "+this.model.alarms[index].task+"; \n";
			str+= "\t\t}";				
		}
		if(this.model.alarms[index].action=="SETEVENT")
		{
			str+= "\n\t\tACTION = SETEVENT { \n";
			str+= "\t\t\tTASK = "+this.model.alarms[index].task+"; \n";
			str+= "\t\t\tEVENT = "+this.model.alarms[index].event+"; \n";
			str+= "\t\t}";				
		}
		if(this.model.alarms[index].action=="ALARMCALLBACK")
		{
			str+= "\n\t\tACTION = ALARMCALLBACK { \n";
			str+= "\t\t\tALARMCALLBACKNAME = "+this.model.alarms[index].alarmcallback+"; \n";
			str+= "\t\t}";				
		}
	
		str+= "\n\t}";		
	
	}
	
	// end osek
	str+= "\n};";
	
	console.log(str);
	
	
	return str;
};



