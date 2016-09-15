

function View()
{
	this.uniqueIdCounter=0;
};

View.prototype.insertTaskInTable = function(idTask)
{
	var table = document.getElementById("tableTasks");

	var row = table.insertRow(-1);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<label>Nombre: </label><input type='text'></input>";
	
	var cell1 = row.insertCell(1);
	cell1.innerHTML = "<div id='task_div_"+idTask+"' style=''></br><label>Prioridad: </label><input type='number'></input> "+
	"</br><label>STACK: </label><input type='number'></input> "+
	"</br><label>SCHEDULE: </label><select><option value=''>NON</option><option value=''>FULL</option></select> "+
	"</br><label>ACTIVATION: </label><input type='number'></input> "+
	"</br><label>AUTOSTART: </label><select><option value=''>TRUE</option><option value=''>FALSE</option></select> "+
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
		var r = events[i];
		cmb+="<option value=''>"+r+"</option>";
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
	console.log("update de combos");
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
					console.log("idRes seleccionado:"+selectedIdRes);
					// creo nuevo combo
					console.log("creo nuevo combo");
					console.log(optionsStr);
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



View.prototype.getTaskFromForm = function(idTask)
{
	var div = document.getElementById("task_div_"+idTask);
	if(div!=null)
	{
		var task = new Task(idTask);
		// leer datos del formulario para esta tarea y cargarlos en la tarea
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

