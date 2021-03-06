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
	view.disableSaveButtons();
	
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
		
	// extra text
	model.extraText = view.getExtraTextFromForm();
		
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


// Eventos del menu "Ayuda"
var about = function()
{
	console.log("muestro abaout");
	$('#aboutModal').modal('show');
};

// Eventos del menu "Archivo"

var newProject = function()
{
	location.reload();
};

var saveProject = function()
{
	saveAll();
	// paso values de los inputs al DOM
	$('input').each(function(index, input){input.setAttribute('value', input.value)});
	//paso values de los combos al DOM
	var allSelects = $("select");
	for(var i in allSelects)
	{
		var sel = allSelects[i];
		var val = sel.value;
		if(sel.options!=null)
		{
			for(var j=0;  j<sel.options.length; j++)
			{
				var op = sel.options[j];
				if(op.value==val)
					sel.options[j].setAttribute("selected", "true");			
				else
					sel.options[j].removeAttribute("selected");			
			}
		}		
	}
	//__________________________________

	var el = document.getElementById('body');
	var out = {"taskCounter":taskCounter,"resourceCounter":resourceCounter,"eventCounter":eventCounter,"counterCounter":counterCounter,"alarmCounter":alarmCounter,"model":model,"html":el.outerHTML};	
	var text = JSON.stringify(out);
	downloadFile("os.joil",text);
};

var openProject = function()
{
	$('#input_file_prj').focus().trigger('click');	
};
var openProjectFileEvent = function(event)
{
    var input = event.target;
	console.log(input);
    var reader = new FileReader();

    reader.onload = function(){
      	var text = reader.result;
	  	var obj = JSON.parse(text);

	  	// cargo los valores del archivo en la pagina	
	  	var el = document.getElementById('body');	
	  	el.outerHTML = obj.html;
		taskCounter=obj.taskCounter;
		resourceCounter=obj.resourceCounter;
		eventCounter=obj.eventCounter;
		counterCounter=obj.counterCounter;
		alarmCounter=obj.alarmCounter;
		model = obj.model;
		document.getElementById('text_extra').innerHTML = model.extraText;
		//____________________________________________

		updateClickSaveEvents();

	  	alert("El archivo se abrio correctamente");
    };
 
   reader.readAsText(input.files[0]);
};
//____________________________________________________________________________________



/**
 Eventos de click sobre campos para habilitar boton de guardar
 */
var updateClickSaveEvents = function()
{
$('#tableResources').on('click', function (event) {
  if (event.target != this) {
	if(event.target.tagName=="INPUT" || event.target.tagName=="BUTTON")
		view.enableButtonById("btnSaveRes");
  } 
});
$('#tableEvents').on('click', function (event) {
  if (event.target != this) {
	if(event.target.tagName=="INPUT" || event.target.tagName=="BUTTON")
		view.enableButtonById("btnSaveEv");
  } 
});
$('#tableTasks').on('click', function (event) {
  if (event.target != this) {
	if(event.target.tagName=="INPUT" || event.target.tagName=="BUTTON" || event.target.tagName=="SELECT" || event.target.tagName=="SPAN")
		view.enableButtonById("btnSaveTask");
  } 
});
$('#tableCounters').on('click', function (event) {
  if (event.target != this) {
	if(event.target.tagName=="INPUT" || event.target.tagName=="BUTTON" || event.target.tagName=="SELECT")
		view.enableButtonById("btnSaveCount");
  } 
});
$('#tableAlarms').on('click', function (event) {
  if (event.target != this) {
	if(event.target.tagName=="INPUT" || event.target.tagName=="BUTTON" || event.target.tagName=="SELECT")
		view.enableButtonById("btnSaveAl");
  } 
});
};

//__________________________________________________________________


updateClickSaveEvents();
view.disableSaveButtons();
