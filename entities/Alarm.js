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

function Alarm(idAlarm)
{
	this.id = idAlarm;
	
	this.name = null;
	this.counter = null;

	this.autostart = false;
	this.alarmtime = 0;
	this.cycletime = 0;

	this.action = null;
	this.task = null;
	this.event = null;
	this.alarmcallback = null;
	
}

Alarm.prototype.getId = function()
{
	return this.id;
}
