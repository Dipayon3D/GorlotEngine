"use strict";

function TextBox(parent)
{
	//Parent
    this.parent = (parent !== undefined) ? parent : document.body

	//Create element
	this.element = document.createElement("input");
	this.element.type = "text";
	this.element.style.position = "absolute";
	this.element.style.backgroundColor = Editor.theme.boxColor;
	this.element.style.color = Editor.theme.textColor;
	this.element.style.borderStyle = "none";

	//Element atributes
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Add element to document
	this.parent.appendChild(this.element);
}

//Set if element if disabled
TextBox.prototype.setDisabled = function(value)
{
	this.element.disabled = value;
}

//Set onchange onChange
TextBox.prototype.setOnChange = function(onChange)
{
	this.element.onchange = onChange;
}

//Set text
TextBox.prototype.setText = function(text)
{
	this.element.value = text;
}

//Get text
TextBox.prototype.getText = function()
{
	return this.element.value;
}

//Remove element
TextBox.prototype.destroy = function()
{
	try
	{
		this.parent.removeChild(this.element);
	}
	catch(e){}
}

//Update
TextBox.prototype.update = function(){}

//Update Interface
TextBox.prototype.updateInterface = function()
{
	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}

	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}
