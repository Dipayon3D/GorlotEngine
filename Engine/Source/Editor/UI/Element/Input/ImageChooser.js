"use strict";

function ImageChooser(parent)
{
	//Parent
    this.parent = (parent !== undefined) ? parent : document.body

	//Create element
	this.element = document.createElement("div");
	this.element.style.position = "absolute";

	//Alpha background
	this.alpha = document.createElement("img");
	this.alpha.style.position = "absolute";
	this.alpha.src = "editor/files/Alpha.png";
	this.element.appendChild(this.alpha);

	//Image
	this.img = document.createElement("img");
	this.img.style.position = "absolute";
	this.element.appendChild(this.img);

	//Self pointer
	var self = this;

	//On drop get file dropped
	this.element.ondrop = function(event)
	{
		event.preventDefault();

		if(event.dataTransfer.files.length > 0)
		{
			//Get first file from event
			var file = event.dataTransfer.files[0];

			//Check if its a image
			if(file.type.startsWith("image"))
			{
				self.setImage(file.path);
				self.onChange(file.path);
			}
		}
	};

	//Prevent deafault when object dragged over
	this.element.ondragover = function(event)
	{
		event.preventDefault();
	};

	//Onclick select image file
	this.element.onclick = function()
	{
		if(self.onChange !== null)
		{
			FileSystem.chooseFile(function(files)
			{
				if(files.length > 0) {
					var file = files[0].path
					self.setImage(file);
					self.onChange(file);
				}
			}, "image/*");
		}
	};

    // onChange callback
	this.onChange = null;

    // Attributes
	this.size = new THREE.Vector2(100, 100);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	this.keepAspectRatio = false;
	this.imageScale = new THREE.Vector2(1,1);

	//Add element to document
	this.parent.appendChild(this.element);
}

//Set onchange onChange function
ImageChooser.prototype.setOnChange = function(onChange)
{
	this.onChange = onChange;
}

//Remove element
ImageChooser.prototype.destroy = function()
{
	try
	{
		this.parent.removeChild(this.element);
	}
	catch(e){}
}

//Update
ImageChooser.prototype.update = function(){}

//Set image from URL
ImageChooser.prototype.setImage = function(url)
{
	this.img.src = url;
}

//Get image URL
ImageChooser.prototype.getValue = function()
{
	return this.img.src;
}

//Update Interface
ImageChooser.prototype.updateInterface = function()
{
	//Set visibility
	if(this.visible)
	{
		this.element.style.visibility = "visible";
		this.img.style.visibility = "visible";
		this.alpha.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
		this.img.style.visibility = "hidden";
		this.alpha.style.visibility = "hidden";
	}

	//Keep image aspect ratio
	if(this.keepAspectRatio)
	{
		if(this.size.x < this.size.y)
		{
			this.size.y = this.size.x * this.img.naturalHeight / this.img.naturalWidth;
		}
		else
		{
			this.size.x = this.size.y * this.img.naturalWidth / this.img.naturalHeight;
		}
	}

	//Update img
	this.img.width = this.size.x * this.imageScale.x;
	this.img.height = this.size.y * this.imageScale.y;
	this.img.style.left = ((this.size.x - (this.size.x * this.imageScale.x))/2) + "px";
	this.img.style.top = ((this.size.y - (this.size.y * this.imageScale.y))/2) + "px";
	
	this.alpha.width = this.size.x;
	this.alpha.height = this.size.y;
	this.alpha.style.left = this.img.style.left;
	this.alpha.style.top = this.img.style.top;

	//Update base element
	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}
