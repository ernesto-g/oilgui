

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
