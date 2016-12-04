var taskCounter=0;
var resourceCounter=0;
var eventCounter=0;
var counterCounter=0;
var alarmCounter=0;

var view = new View();
var model = new Model();


var deleteTask = function(idTask)
{
	console.log("eliminar tarea");
	view.removeTaskFromTable(idTask);
	delete model.tasks[idTask];
};
var deleteResource = function(idResource)
{
	console.log("eliminar resource");
	view.removeResourceFromTable(idResource);
	delete model.resources[idResource];
};
var deleteEvent = function(idEvent)
{
	view.removeEventFromTable(idEvent);
	delete model.events[idEvent];
};
var deleteCounter = function(idCounter)
{
	view.removeCounterFromTable(idCounter);
	delete model.counters[idCounter];
};

var addTask = function()
{
	view.insertTaskInTable(taskCounter);
	
	taskCounter++;
};
var addResourceToTask = function(idTask)
{
	view.addResource(idTask,model.resources);
};

var addEventToTask = function(idTask)
{
	view.addEvent(idTask,model.events);
};


var addResource = function()
{
	view.insertResourceInTable(resourceCounter);
	
	resourceCounter++;
};
var addEvent = function()
{
	view.insertEventInTable(eventCounter);
	
	eventCounter++;
};

var addCounter = function()
{
	view.insertCounterInTable(counterCounter);
	
	counterCounter++;
};

var addAlarm = function()
{
	view.insertAlarmInTable(alarmCounter,model);
	
	alarmCounter++;
};

var updateCountersComboInAlarm = function(idAlarm)
{
	view.updateCountersComboInAlarm(idAlarm,model.counters);
};
var changeAlarmActionEvent = function(idAlarm)
{
	view.changeAlarmAction(idAlarm,model);
}
var updateAutostartInAlarm = function(idAlarm)
{
	view.updateAutostartInAlarm(idAlarm);
};



var deleteEventFromList = function(idEvInList)
{
	view.removeEventFromList(idEvInList);
};
var deleteResourceFromList = function(idResInList)
{
	view.removeResourceFromList(idResInList);

};
var deleteAlarm = function(idAlarm)
{
	view.removeAlarmFromTable(idAlarm);	
};




var saveAll = function()
{
	var idRes=0;
	for(var idRes=0; idRes<resourceCounter; idRes++)
	{
		var res = view.getResourceFromForm(idRes);
		if(res!=null)
		{
			model.resources[idRes] = res;		
		}
	}	

	var idEvent=0;
	for(var idEvent=0; idEvent<eventCounter; idEvent++)
	{
		var res = view.getEventFromForm(idEvent);
		if(res!=null)
		{
			model.events[idEvent] = res;		
		}
	}	

	view.updateResourcesEventsCombos(taskCounter,model.resources,true);
	view.updateResourcesEventsCombos(taskCounter,model.events,false);

	var idTask=0;
	for(var idTask=0; idTask<taskCounter; idTask++)
	{
		var task = view.getTaskFromForm(idTask);
		if(task!=null)
		{
			model.tasks[idTask] = task;		
		}
	}
	
	model.os = view.getOsDataFromForm();

	// Counters
	var idCounter=0;
	for(var idCounter=0; idCounter<counterCounter; idCounter++)
	{
		var counter = view.getCounterFromForm(idCounter);
		if(counter!=null)
		{
			model.counters[idCounter] = counter;
		}
	}
	
	view.updateCountersCombosInAlarm(alarmCounter,model.counters);
	view.updateTasksCombosInAlarm(alarmCounter,model.tasks);
	view.updateEventsCombosInAlarm(alarmCounter,model.events);
	
	// Alarms
	for(var idAlarm=0; idAlarm<alarmCounter; idAlarm++)
	{
		var a = view.getAlarmFromForm(idAlarm);
		if(a!=null)
		{
			model.alarms[idAlarm] = a;
		}
	}
		
		
	console.log(model);
};

function downloadFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var generateOIL = function()
{
	saveAll();
	var oilG = new OILGenerator(model);
	var text = oilG.generate();
	downloadFile("os.oil",text);
};