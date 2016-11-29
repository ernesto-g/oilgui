

function View()
{
	this.uniqueIdCounter=0;
};

View.prototype.insertTaskInTable = function(idTask)
{
	var table = document.getElementById("tableTasks");

	var row = table.insertRow(-1);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre: </label><input id='task_name_"+idTask+"' type='text' value='New Task'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='task_div_"+idTask+"' style=''>" +
	"</br><label>Prioridad: </label><input id='task_pri_"+idTask+"' type='number' value='1'></input> "+
	"</br><label>STACK: </label><input id='task_stack_"+idTask+"' type='number' value='512'></input> "+
	"</br><label>SCHEDULE: </label><select id='task_sch_"+idTask+"'><option value='NON'>NON</option><option value='FULL'>FULL</option></select> "+
	"</br><label>ACTIVATION: </label><input id='task_activ_"+idTask+"' type='number' value='1'></input> "+
	"</br><label>AUTOSTART: </label><select id='task_autos_"+idTask+"' ><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select> "+
	"</br><label>RESOURCES: </label><button onclick='addResourceToTask("+idTask+");'>+</button> <ul id='res_list_task_"+idTask+"' ></ul>" +
	"</br><label>EVENTS: </label><button onclick='addEventToTask("+idTask+");'>+</button> <ul id='event_list_task_"+idTask+"' ></ul>" +
	"</div>";
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteTask("+idTask+");'>X</button>";
	return table.rows.length;
};

View.prototype.insertResourceInTable = function(idResource)
{
	var table = document.getElementById("tableResources");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<div id='resource_div_"+idResource+"' style=''><input id='resName_"+idResource+"' type='text'></input></div>";
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<button onclick='deleteResource("+idResource+");'>X</button>";
	return table.rows.length;	
};
View.prototype.insertEventInTable = function(idEvent)
{
	var table = document.getElementById("tableEvents");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<div id='event_div_"+idEvent+"' style=''><input id='eventName_"+idEvent+"' type='text'></input></div>";
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<button onclick='deleteEvent("+idEvent+");'>X</button>";
	return table.rows.length;	
};
View.prototype.insertCounterInTable = function(idCounter)
{
	var table = document.getElementById("tableCounters");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre:</label><input id='counterName_"+idCounter+"' type='text' value='HardwareCounter"+idCounter+"'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='counter_div_"+idCounter+"' style=''>"+
	"</br><label>MAXALLOWEDVALUE:</label><input id='counter_max_val_"+idCounter+"' type='number' value='1000'></input>"+
	"</br><label>MINCYCLE:</label><input id='counter_min_cyc_"+idCounter+"' type='number' value='1'></input>"+
	"</br><label>TICKSPERBASE:</label><input id='counter_tick_"+idCounter+"' type='number' value='1'></input>"+
	"</br><label>COUNTER:</label><input id='counter_counter_"+idCounter+"' type='text' value='HWCOUNTER"+idCounter+"'></input>"+
	"</br><label>TYPE:</label><select id='counter_type_"+idCounter+"' ><option value='HARDWARE'>HARDWARE</option><option value='-'>-</option></select>"+
	"</div>";
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteCounter("+idCounter+");'>X</button>";
	return table.rows.length;	
};

View.prototype.insertAlarmInTable = function(idAlarm,model)
{
	var table = document.getElementById("tableAlarms");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre:</label><input id='alarmName_"+idAlarm+"' type='text' value='Alarm"+idAlarm+"'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='alarm_div_"+idAlarm+"' style=''>"+
	"</br><label>COUNTER: </label><select id='alarm_counter_cmb_"+idAlarm+"' ></select> "+	
	"</br><label>AUTOSTART: </label><select id='alarm_autos_"+idAlarm+"' onchange='updateAutostartInAlarm("+idAlarm+")'><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select> "+
	"<div id='alarm_div_autostart_"+idAlarm+"'>" +
		"</br><label>ALARMTIME:</label><input id='alarm_alarmtime_"+idAlarm+"' type='number' value='1'></input>"+
		"</br><label>CYCLETIME:</label><input id='alarm_cycletime_"+idAlarm+"' type='number' value='1'></input>"+
	"</div> "+
	"</br><label>ACTION: </label><select id='alarm_action_cmb_"+idAlarm+"' onchange='changeAlarmActionEvent("+idAlarm+")' ><option value='ACTIVATETASK'>ACTIVATETASK</option><option value='SETEVENT'>SETEVENT</option><option value='ALARMCALLBACK'>ALARMCALLBACK</option></select> "+	
		"<div id='alarm_div_action_"+idAlarm+"'>" +
		"</div> "+
	"</div>";
	
	this.updateCountersComboInAlarm(idAlarm,model.counters);
	this.changeAlarmAction(idAlarm,model);
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteAlarm("+idAlarm+");'>X</button>";
	return table.rows.length;	
};

View.prototype.updateAutostartInAlarm = function(idAlarm)
{
	var e = document.getElementById("alarm_div_autostart_"+idAlarm);

	var cmb = document.getElementById("alarm_autos_"+idAlarm);
	console.log(cmb.value);
	if(cmb.value=="TRUE")
		e.style.display="block";
	else
		e.style.display="none";
};
View.prototype.updateCountersComboInAlarm = function(idAlarm,counters)
{
	var e = document.getElementById("alarm_counter_cmb_"+idAlarm);
	var str = "";
	for(var i in counters)
	{
		str+="<option value='"+counters[i].name+"'>"+counters[i].name+"</option>";
	}
	e.innerHTML = str;
};
View.prototype.changeAlarmAction = function(idAlarm,model)
{
	var action = document.getElementById("alarm_action_cmb_"+idAlarm).value;	
	var e = document.getElementById("alarm_div_action_"+idAlarm);
	
	var str = "";
	if(action=="ACTIVATETASK" || action=="SETEVENT")
	{
		str+="</br><label>TASK: </label><select id='alarm_task_"+idAlarm+"' >";
		var tasks = model.tasks;
		for(var i in tasks)
		{
			str+="<option value='"+tasks[i].name+"'>"+tasks[i].name+"</option>"
		}
		str+="</select>";
	}
	if(action=="SETEVENT")
	{
		str+="</br><label>EVENT: </label><select id='alarm_event_"+idAlarm+"' >";
		var events = model.events;
		for(var i in events)
		{
			str+="<option value='"+events[i].eventName+"'>"+events[i].eventName+"</option>"
		}
		str+="</select>";
	}
	if(action=="ALARMCALLBACK")
	{
		str+="</br><label>ALARMCALLBACKNAME: </label><input id='alarm_callback_"+idAlarm+"' type='text' value=''></input> "
	}	
	e.innerHTML = str;
};



View.prototype.findTaskRowInTable = function(idTask)
{
	var table = document.getElementById("tableTasks");
	for (var i = 0, row; row = table.rows[i]; i++) {
		var cell=row.cells[1];
		if(cell.childNodes[0].id=="task_div_"+idTask)
		{
			return i;
		}
	}
	return -1;
}
View.prototype.findResourceRowInTable = function(idResource)
{
	var table = document.getElementById("tableResources");
	for (var i = 0, row; row = table.rows[i]; i++) {
		var cell=row.cells[0];
		if(cell.childNodes[0].id=="resource_div_"+idResource)
		{
			return i;
		}
	}
	return -1;
}
View.prototype.findEventRowInTable = function(idEvent)
{
	var table = document.getElementById("tableEvents");
	for (var i = 0, row; row = table.rows[i]; i++) {
		var cell=row.cells[0];
		if(cell.childNodes[0].id=="event_div_"+idEvent)
		{
			return i;
		}
	}
	return -1;
}
View.prototype.findCounterRowInTable = function(idCounter)
{
	var table = document.getElementById("tableCounters");
	for (var i = 1, row; row = table.rows[i]; i++) {
		var cell=row.cells[1];
		if(cell.childNodes[0].id=="counter_div_"+idCounter)
		{
			return i;
		}
	}
	return -1;
}

View.prototype.removeTaskFromTable = function(idTask)
{
	var table = document.getElementById("tableTasks");
	var row = this.findTaskRowInTable(idTask);
	table.deleteRow(row);
}
View.prototype.removeResourceFromTable = function(idResource)
{
	var table = document.getElementById("tableResources");
	var row = this.findResourceRowInTable(idResource);
	table.deleteRow(row);
}
View.prototype.removeEventFromTable = function(idEvent)
{
	var table = document.getElementById("tableEvents");
	var row = this.findEventRowInTable(idEvent);
	table.deleteRow(row);
}
View.prototype.removeCounterFromTable = function(idCounter)
{
	var table = document.getElementById("tableCounters");
	var row = this.findCounterRowInTable(idCounter);
	table.deleteRow(row);
}

/*
* agrega el combo de recursos para el form de la tarea
*/
View.prototype.addResource = function(idTask,resources)
{
	if(resources.length==0)
		return;
	var list = document.getElementById("res_list_task_"+idTask);
	var li = document.createElement("li");
	li.id = "item_res_in_list_"+this.uniqueIdCounter;
	var cmb = "<select>";
	for(var i in resources)
	{
		var res = resources[i];
		cmb+="<option value='"+res.getId()+"'>"+res.getName()+"</option>";
	}
	cmb+="</select><button onclick=\"deleteResourceFromList('"+"item_res_in_list_"+this.uniqueIdCounter+"');\">X</button>";
	li.innerHTML = cmb;
	list.appendChild(li);

	this.uniqueIdCounter++;
};

/*
* agrega el combo de eventos para el form de la tarea
*/
View.prototype.addEvent = function(idTask,events)
{
	if(events.length==0)
		return;
	var list = document.getElementById("event_list_task_"+idTask);
	var li = document.createElement("li");
	li.id = "item_ev_in_list_"+this.uniqueIdCounter;

	var cmb = "<select>";
	for(var i in events)
	{
		var ev = events[i];
		cmb+="<option value='"+ev.getId()+"'>"+ev.getName()+"</option>";
	}
	cmb+="</select><button onclick=\"deleteEventFromList('"+"item_ev_in_list_"+this.uniqueIdCounter+"');\">X</button>";
	li.innerHTML = cmb;
	list.appendChild(li);

	this.uniqueIdCounter++;
};

/*
* hace un update en el combo de resources por si se agrego uno nuevo
*/
View.prototype.updateResourcesEventsCombos = function(idTaskMax,resources,flagResEv)
{
	//console.log("update de combos");
	var optionsStr="";
	for(var i in resources)
	{
		var r = resources[i];
		optionsStr+="<option value='"+r.getId()+"'>"+r.getName()+"</option>";
	}

	for(var idTask=0; idTask<idTaskMax;idTask++) // itero lista de recursos de cada tarea
	{
		var id = "";
		if(flagResEv)
			id="res_list_task_"+idTask;
		else
			id="event_list_task_"+idTask;

		var ul = document.getElementById(id);
		if(ul!=null)
		{
			for(var index in ul.childNodes) // itero combos de recursos de esta tarea
			{
				var node = ul.childNodes[index];
				try {
					var combo = node.childNodes[0];
					var selectedIdRes = combo.options[combo.selectedIndex].value;
					//console.log("idRes seleccionado:"+selectedIdRes);
					// creo nuevo combo
					//console.log("creo nuevo combo");
					//console.log(optionsStr);
					combo.innerHTML = optionsStr;
					// selecciono el que estaba
					for (var i = 0; i < combo.options.length; i++) {
						if (combo.options[i].value== selectedIdRes) {
							combo.options[i].selected = true;
							break;
						}
					}
					//__________________________
				}catch(err){}
			}
		}
	}
};

View.prototype.removeResourceFromList = function(idResInList)
{
	var li = document.getElementById(idResInList);
	li.parentNode.removeChild(li);
}
View.prototype.removeEventFromList = function(idEvInList)
{
	var li = document.getElementById(idEvInList);
	li.parentNode.removeChild(li);
}


/**
* Devuelve un objeto Task con los datos cargados en la grafica
*/
View.prototype.getTaskFromForm = function(idTask)
{
	var div = document.getElementById("task_div_"+idTask);
	if(div!=null)
	{
		var task = new Task(idTask);
		task.name = document.getElementById("task_name_"+idTask).value;
		task.priority = parseInt(document.getElementById("task_pri_"+idTask).value);
		task.stack = parseInt(document.getElementById("task_stack_"+idTask).value);
		task.schedule = document.getElementById("task_sch_"+idTask).value;
		task.activation = parseInt(document.getElementById("task_activ_"+idTask).value);
		task.autostart = document.getElementById("task_autos_"+idTask).value;
		// resources list
		var ul = document.getElementById("res_list_task_"+idTask);
		if(ul!=null)
		{
			for(var index in ul.childNodes) // itero combos de recursos de esta tarea
			{
				var node = ul.childNodes[index];
				try {
					var combo = node.childNodes[0];
					var selectedIdRes = combo.options[combo.selectedIndex].value;
					task.resources.push(parseInt(selectedIdRes));
				}catch(err){}
			}
		}
		// events list
		var ul = document.getElementById("event_list_task_"+idTask);
		if(ul!=null)
		{
			for(var index in ul.childNodes) // itero combos de recursos de esta tarea
			{
				var node = ul.childNodes[index];
				try {
					var combo = node.childNodes[0];
					var selectedIdEv = combo.options[combo.selectedIndex].value;
					task.events.push(parseInt(selectedIdEv));
				}catch(err){}
			}		
		}		
		return task;
	}
	return null;
};

View.prototype.getResourceFromForm = function(idRes)
{
	var div = document.getElementById("resource_div_"+idRes);
	if(div!=null)
	{
		var e = document.getElementById("resName_"+idRes);
		var res = new Resource(idRes,e.value);
		return res;
	}
	return null;
};
View.prototype.getEventFromForm = function(idEvent)
{
	var div = document.getElementById("event_div_"+idEvent);
	if(div!=null)
	{
		var e = document.getElementById("eventName_"+idEvent);
		var event = new Event(idEvent,e.value);
		return event;
	}
	return null;
};
View.prototype.getOsDataFromForm = function()
{
	var os = new Os();
	os.osStatus = document.getElementById("os_status").value;
	os.osStartupHook = document.getElementById("os_startuphook").value;
	os.osErrorHook = document.getElementById("os_errorhook").value;
	os.osShutDownHook = document.getElementById("os_shutdownhook").value;
	os.osPreTaskHook = document.getElementById("os_pretaskhook").value;
	os.osPostTaskHook = document.getElementById("os_posttaskhook").value;
	os.osServId = document.getElementById("os_servid").value;
	os.osParAccess = document.getElementById("os_paraccess").value;
	os.osSch = document.getElementById("os_sch").value;

	return os;
};
View.prototype.getCounterFromForm = function(idCounter)
{
	var div = document.getElementById("counter_div_"+idCounter);
	if(div!=null)
	{
		var c = new Counter(idCounter);
		c.maxAllowValue = document.getElementById("counter_max_val_"+idCounter).value;
		c.minCycle = document.getElementById("counter_min_cyc_"+idCounter).value;
		c.tickPerBase = document.getElementById("counter_tick_"+idCounter).value;
		c.name = document.getElementById("counterName_"+idCounter).value;
		c.counter = document.getElementById("counter_counter_"+idCounter).value;
		c.type = document.getElementById("counter_type_"+idCounter).value;
		return c;
	}
	return null;
};

View.prototype.getAlarmFromForm = function(idAlarm)
{
	var div = document.getElementById("alarm_div_"+idAlarm);
	if(div!=null)
	{
		var a = new Alarm(idAlarm);
		a.name = document.getElementById("alarmName_"+idAlarm).value;
		a.counter = document.getElementById("alarm_counter_cmb_"+idAlarm).value;
		a.autostart = document.getElementById("alarm_autos_"+idAlarm).value;
		a.action = document.getElementById("alarm_action_cmb_"+idAlarm).value;
		
		a.alarmtime = document.getElementById("alarm_alarmtime_"+idAlarm).value;
		a.cycletime = document.getElementById("alarm_cycletime_"+idAlarm).value;

		a.alarmcallback = null;
		var aux = document.getElementById("alarm_callback_"+idAlarm)
		if(aux!=null)
				a.alarmcallback = aux.value;
				
		a.task = null;
		var aux = document.getElementById("alarm_task_"+idAlarm)
		if(aux!=null)
			a.task = aux.value;
			
		a.event = null;
		var aux = document.getElementById("alarm_event_"+idAlarm)
		if(aux!=null)
			a.event = aux.value;
			
		return a;
	}
	return null;
};