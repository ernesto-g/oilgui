/*
	<Generador de archivo OIL para FreeOSEK>
    Copyright (C) <2016>  <Ernesto Gigliotti>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function OILGenerator(model)
{
	this.model= model;
};

OILGenerator.prototype.generate = function()
{
	console.log("Genero OIL file");
	console.log(this.model);
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
		MEMMAP = FALSE;	\n\
	};	\n\
";

	str+="\n\tAPPMODE = AppMode1;\n";

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
		TYPE = "+this.model.tasks[index].type+";	\n\
		STACK = "+this.model.tasks[index].stack+";	\n";

		if(this.model.tasks[index].autostart=="TRUE")
			str+="\t\tAUTOSTART = TRUE {\n\t\t\tAPPMODE = AppMode1;\n\t\t};";
		else
			str+="\t\tAUTOSTART = FALSE;";

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
			str+= "\t\t\tAPPMODE = AppMode1; \n";
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

	// extra text
	str+= "\n"+this.model.extraText;
	
	// end osek
	str+= "\n};";
	
	console.log(str);
	
	
	return str;
};



