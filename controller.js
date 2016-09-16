var taskCounter=0;
var resourceCounter=0;
var eventCounter=0;


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

var deleteEventFromList = function(idEvInList)
{
	console.log("saco event:"+idEvInList);
	view.removeEventFromList(idEvInList);
};
var deleteResourceFromList = function(idResInList)
{
	view.removeResourceFromList(idResInList);

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
	console.log(model);
};


var generateOIL = function()
{
	saveAll();
	var oilG = new OILGenerator(model);
	oilG.generate();
	
};