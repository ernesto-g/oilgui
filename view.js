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


function View()
{
	this.uniqueIdCounter=0;
};

View.prototype.insertTaskInTable = function(idTask)
{
	var table = document.getElementById("tableTasks");

	var row = table.insertRow(-1);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre: </label><input class='form-control' id='task_name_"+idTask+"' type='text' value='New Task'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='task_div_"+idTask+"' style=''>" +
	"</br><label>Prioridad: </label><input class='form-control'  id='task_pri_"+idTask+"' type='number' value='1'></input> "+
	"</br><label>STACK: </label><input class='form-control' id='task_stack_"+idTask+"' type='number' value='512'></input> "+
	"</br><label>SCHEDULE: </label><select class='form-control' id='task_sch_"+idTask+"'><option value='NON'>NON</option><option value='FULL'>FULL</option></select> "+
	"</br><label>TYPE: </label><select class='form-control' id='task_type_"+idTask+"'><option value='EXTENDED'>EXTENDED</option><option value='STANDARD'>STANDARD</option></select> "+
	"</br><label>ACTIVATION: </label><input class='form-control' id='task_activ_"+idTask+"' type='number' value='1'></input> "+
	"</br><label>AUTOSTART: </label><select class='form-control' id='task_autos_"+idTask+"' ><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select> "+
	"</br><label>RESOURCES: </label><button onclick='addResourceToTask("+idTask+");' class='btn' ><span  class='glyphicon glyphicon-plus myplus' aria-hidden='true'></span></button> <ul id='res_list_task_"+idTask+"' ></ul>" +
	"</br><label>EVENTS: </label><button onclick='addEventToTask("+idTask+");' class='btn' ><span class='glyphicon glyphicon-plus myplus' aria-hidden='true'></span></button> <ul id='event_list_task_"+idTask+"' ></ul>" +
	"</div>";
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteTask("+idTask+");' class='close'>&times;</button>";
	return table.rows.length;
};

View.prototype.insertResourceInTable = function(idResource)
{
	var table = document.getElementById("tableResources");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<div id='resource_div_"+idResource+"' style=''><input class='form-control'  id='resName_"+idResource+"' type='text'></input></div>";
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<button onclick='deleteResource("+idResource+");' class='close'>&times;</button>";
	return table.rows.length;	
};
View.prototype.insertEventInTable = function(idEvent)
{
	var table = document.getElementById("tableEvents");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<div id='event_div_"+idEvent+"' style=''><input class='form-control'  id='eventName_"+idEvent+"' type='text'></input></div>";
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<button onclick='deleteEvent("+idEvent+");' class='close'>&times;</button>";
	return table.rows.length;	
};
View.prototype.insertCounterInTable = function(idCounter)
{
	var table = document.getElementById("tableCounters");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre:</label><input class='form-control'  id='counterName_"+idCounter+"' type='text' value='HardwareCounter"+idCounter+"'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='counter_div_"+idCounter+"' style=''>"+
	"</br><label>MAXALLOWEDVALUE:</label><input class='form-control'  id='counter_max_val_"+idCounter+"' type='number' value='1000'></input>"+
	"</br><label>MINCYCLE:</label><input class='form-control'  id='counter_min_cyc_"+idCounter+"' type='number' value='1'></input>"+
	"</br><label>TICKSPERBASE:</label><input class='form-control'  id='counter_tick_"+idCounter+"' type='number' value='1'></input>"+
	"</br><label>COUNTER:</label><input class='form-control'  id='counter_counter_"+idCounter+"' type='text' value='HWCOUNTER"+idCounter+"'></input>"+
	"</br><label>TYPE:</label><select class='form-control' id='counter_type_"+idCounter+"' ><option value='HARDWARE'>HARDWARE</option><option value='-'>-</option></select>"+
	"</div>";
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteCounter("+idCounter+");' class='close'>&times;</button>";
	return table.rows.length;	
};

View.prototype.insertAlarmInTable = function(idAlarm,model)
{
	var table = document.getElementById("tableAlarms");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre:</label><input class='form-control' id='alarmName_"+idAlarm+"' type='text' value='Alarm"+idAlarm+"'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='alarm_div_"+idAlarm+"' style=''>"+
	"</br><label>COUNTER: </label><select class='form-control' id='alarm_counter_cmb_"+idAlarm+"' ></select> "+	
	"</br><label>AUTOSTART: </label><select class='form-control' id='alarm_autos_"+idAlarm+"' onchange='updateAutostartInAlarm("+idAlarm+")'><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select> "+
	"<div id='alarm_div_autostart_"+idAlarm+"'>" +
		"</br><label>ALARMTIME:</label><input class='form-control' id='alarm_alarmtime_"+idAlarm+"' type='number' value='1'></input>"+
		"</br><label>CYCLETIME:</label><input class='form-control' id='alarm_cycletime_"+idAlarm+"' type='number' value='1'></input>"+
	"</div> "+
	"</br><label>ACTION: </label><select class='form-control' id='alarm_action_cmb_"+idAlarm+"' onchange='changeAlarmActionEvent("+idAlarm+")' ><option value='ACTIVATETASK'>ACTIVATETASK</option><option value='SETEVENT'>SETEVENT</option><option value='ALARMCALLBACK'>ALARMCALLBACK</option></select> "+	
		"<div id='alarm_div_action_"+idAlarm+"'>" +
		"</div> "+
	"</div>";
	
	this.updateCountersComboInAlarm(idAlarm,model.counters);
	this.changeAlarmAction(idAlarm,model);
	
	var cell1 = row.insertCell(2);
	cell1.innerHTML = "<button onclick='deleteAlarm("+idAlarm+");' class='close'>&times;</button>";
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
		str+="</br><label>TASK: </label><select class='form-control' id='alarm_task_"+idAlarm+"' >";
		var tasks = model.tasks;
		for(var i in tasks)
		{
			str+="<option value='"+tasks[i].name+"'>"+tasks[i].name+"</option>"
		}
		str+="</select>";
	}
	if(action=="SETEVENT")
	{
		str+="</br><label>EVENT: </label><select class='form-control' id='alarm_event_"+idAlarm+"' >";
		var events = model.events;
		for(var i in events)
		{
			str+="<option value='"+events[i].eventName+"'>"+events[i].eventName+"</option>"
		}
		str+="</select>";
	}
	if(action=="ALARMCALLBACK")
	{
		str+="</br><label>ALARMCALLBACKNAME: </label><input class='form-control'  id='alarm_callback_"+idAlarm+"' type='text' value=''></input> "
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
View.prototype.findAlarmRowInTable = function(idAlarm)
{
	var table = document.getElementById("tableAlarms");
	for (var i = 1, row; row = table.rows[i]; i++) {
		var cell=row.cells[1];
		if(cell.childNodes[0].id=="alarm_div_"+idAlarm)
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
View.prototype.removeAlarmFromTable = function(idAlarm)
{
	var table = document.getElementById("tableAlarms");
	var row = this.findAlarmRowInTable(idAlarm);
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
	var cmb = "<select class='form-control'>";
	for(var i in resources)
	{
		var res = resources[i];
		cmb+="<option value='"+res.getId()+"'>"+res.getName()+"</option>";
	}
	cmb+="</select><button onclick=\"deleteResourceFromList('"+"item_res_in_list_"+this.uniqueIdCounter+"');\" class='close'>&times;</button>";
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

	var cmb = "<select class='form-control'>";
	for(var i in events)
	{
		var ev = events[i];
		cmb+="<option value='"+ev.getId()+"'>"+ev.getName()+"</option>";
	}
	cmb+="</select><button onclick=\"deleteEventFromList('"+"item_ev_in_list_"+this.uniqueIdCounter+"');\" class='close'>&times;</button>";
	li.innerHTML = cmb;
	list.appendChild(li);

	this.uniqueIdCounter++;
};

/*
* hace un update en el combo de resources/events por si se agrego uno nuevo
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
					// creo nuevo combo
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

/*
* hace un update en los combos de contadores para cada alarma, por si se agrego o borro alguno
*/
View.prototype.updateCountersCombosInAlarm = function(idAlarmMax,counters)
{
	var optionsStr="";
	for(var i in counters)
	{
		var c = counters[i];
		optionsStr+="<option value='"+c.getName()+"'>"+c.getName()+"</option>";
	}	
	// itero alarmas
	for(var idAlarm=0; idAlarm<idAlarmMax;idAlarm++)
	{
		try {
			var combo = document.getElementById("alarm_counter_cmb_"+idAlarm);
			if(combo.options.length>0)
				var selectedIdAl = combo.options[combo.selectedIndex].value;
			else
				var selectedIdAl = null;
			// creo nuevo combo
			combo.innerHTML = optionsStr;
			// selecciono el que estaba
			for (var i = 0; i < combo.options.length; i++) {
				if (combo.options[i].value== selectedIdAl) {
					combo.options[i].selected = true;
					break;
				}
			}
		}catch(err){};		
	}
};

/*
* hace un update en los combos de tareas para cada alarma, por si se agrego o borro alguna
*/
View.prototype.updateTasksCombosInAlarm = function(idAlarmMax,tasks)
{
	var optionsStr="";
	for(var i in tasks)
	{
		var t = tasks[i];
		optionsStr+="<option value='"+t.getName()+"'>"+t.getName()+"</option>";
	}	
	// itero alarmas
	for(var idAlarm=0; idAlarm<idAlarmMax;idAlarm++)
	{
		try{
			var combo = document.getElementById("alarm_task_"+idAlarm);
			if(combo.options.length>0)
				var selectedIdTask = combo.options[combo.selectedIndex].value;
			else
				var selectedIdTask = null;
			// creo nuevo combo
			combo.innerHTML = optionsStr;
			// selecciono el que estaba
			for (var i = 0; i < combo.options.length; i++) {
				if (combo.options[i].value== selectedIdTask) {
					combo.options[i].selected = true;
					break;
				}
			}	
		}catch(err){};				
	}
};
/*
* hace un update en los combos de eventospara cada alarma, por si se agrego o borro alguna
*/
View.prototype.updateEventsCombosInAlarm = function(idAlarmMax,events)
{
	var optionsStr="";
	for(var i in events)
	{
		var e = events[i];
		optionsStr+="<option value='"+e.getName()+"'>"+e.getName()+"</option>";
	}	
	// itero alarmas
	for(var idAlarm=0; idAlarm<idAlarmMax;idAlarm++)
	{
		try{
			var combo = document.getElementById("alarm_event_"+idAlarm);
			if(combo.options.length>0)
				var selectedIdEv= combo.options[combo.selectedIndex].value;
			else
				var selectedIdEv = null;
			// creo nuevo combo
			combo.innerHTML = optionsStr;
			// selecciono el que estaba
			for (var i = 0; i < combo.options.length; i++) {
				if (combo.options[i].value== selectedIdEv) {
					combo.options[i].selected = true;
					break;
				}
			}	
		}catch(err){};				
	}
};

/*
* Borra un resource de la lista, en la tarea
*/
View.prototype.removeResourceFromList = function(idResInList)
{
	var li = document.getElementById(idResInList);
	li.parentNode.removeChild(li);
}
/*
* Borra un event de la lista, en la tarea
*/
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
		task.type = document.getElementById("task_type_"+idTask).value;
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
/**
* Devuelve un objeto Resource con los datos cargados en la grafica
*/
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
/**
* Devuelve un objeto Event con los datos cargados en la grafica
*/
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
/**
* Devuelve un objeto Os con los datos cargados en la grafica
*/
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
/**
* Devuelve un objeto Counter con los datos cargados en la grafica
*/
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
/**
* Devuelve un objeto Alarm con los datos cargados en la grafica
*/
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

/**
* Devuelve el texto extra escrito en el formulario
*/
View.prototype.getExtraTextFromForm = function()
{
	return document.getElementById("text_extra").value;
}

/**
* Pone en disabled todos los botones de guardar
*/
View.prototype.disableSaveButtons = function()
{
	var btns = document.getElementsByClassName("btn-saveall");
	for(var i in btns)
	{
		var btn = btns[i];
		btn.disabled = true;
	}
};

View.prototype.enableButtonById = function(id)
{
	var btn = document.getElementById(id);
	btn.disabled = false;
};
