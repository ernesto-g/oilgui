function Resource(idRes,name)
{
	this.id = idRes;
	this.resName = name;
}
Resource.prototype.getId = function()
{
	return this.id;
}
Resource.prototype.getName = function()
{
	return this.resName;
}

Resource.prototype.toString = function()
{
	return this.resName;
}


