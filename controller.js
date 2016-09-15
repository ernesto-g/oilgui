var taskCounter=0;
var resourceCounter=0;
var eventCounter=0;
var resources = [];
var events = [];
var tasks = [];

var view = new View();


var deleteTask = function(idTask)
{
	console.log("eliminar tarea");
	view.removeTaskFromTable(idTask);
	delete tasks[idTask];
};
var deleteResource = function(idResource)
{
	console.log("eliminar resource");
	view.removeResourceFromTable(idResource);
	delete resources[idResource];
};
var deleteEvent = function(idEvent)
{
	view.removeEventFromTable(idEvent);
	delete events[idEvent];
};

var addTask = function()
{
	view.insertTaskInTable(taskCounter);
	
	taskCounter++;
};
var addResourceToTask = function(idTask)
{
	view.addResource(idTask,resources);
};

var addEventToTask = function(idTask)
{
	view.addEvent(idTask,events);
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

var saveAll = function()
{
	var idRes=0;
	for(var idRes=0; idRes<resourceCounter; idRes++)
	{
		var res = view.getResourceFromForm(idRes);
		if(res!=null)
		{
			resources[idRes] = res;		
		}
	}	
	console.log(resources);

	var idEvent=0;
	for(var idEvent=0; idEvent<eventCounter; idEvent++)
	{
		var res = view.getEventFromForm(idEvent);
		if(res!=null)
		{
			events[idEvent] = res;		
		}
	}	
	console.log(events);

	view.updateResourcesEventsCombos(taskCounter,resources,true);
	view.updateResourcesEventsCombos(taskCounter,events,false);

	var idTask=0;
	for(var idTask=0; idTask<taskCounter; idTask++)
	{
		var task = view.getTaskFromForm(idTask);
		if(task!=null)
		{
			tasks[idTask] = task;		
		}
	}
	console.log(tasks);
};
