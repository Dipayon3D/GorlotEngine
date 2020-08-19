"use strict";

function AssetExplorer(parent)
{
    // Parent
    this.parent = (parent !== undefined) ? parent : document.body

	//Create element
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
	this.element.style.overflow = "auto";
	this.element.style.cursor = "default";
	this.element.style.backgroundColor = Editor.theme.panel_color;
	
    // Drop event
	this.element.ondrop = function(event)
	{
        // Dragged file into Asset Explorer
        if(event.dataTransfer.files.length > 0) {
            var file = event.dataTransfer.files[0]
            var name = FileSystem.getFileName(file.path)

            // Image
            if(file.type.startsWith("image")) {
                var texture = new Texture(file.path)
                texture.name = name
                texture.setPath(Editor.CURRENT_PATH)
                Editor.program.addTexture(texture)
                Editor.updateAssetExplorer()
            }
            // Video
            else if(file.type.startsWith("video")) {
                var texture = new VideoTexture(file.path)
                texture.name = name
                texture.setPath(Editor.CURRENT_PATH)
                Editor.program.addTexture(texture)
                Editor.updateAssetExplorer()
            }
            // Audio
            else if(file.type.startsWith("audio")) {
                var texture = new Audio(file.path)
                texture.name = name
                texture.setPath(Editor.CURRENT_PATH)
                Editor.program.addTexture(texture)
                Editor.updateAssetExplorer()
            }
        }
	};

	this.element.ondragover = function(event)
	{
		event.preventDefault();
	};

	//Element atributes
	this.fit_parent = false;
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Files in explorer
	this.files_size = new THREE.Vector2(70, 70);
	this.files_spacing = 0;
	this.files = [];

	//Add element to document
	this.parent.appendChild(this.element);
}

//Remove all files
AssetExplorer.prototype.clear = function()
{
	while(this.files.length > 0)
	{
		this.files.pop().destroy();
	}
}

//Add file to explorer
AssetExplorer.prototype.add = function(file)
{
	file.setParent(this.element)
	file.size.copy(this.files_size)
	file.updateInterface()

	this.files.push(file)
}

//Remove element
AssetExplorer.prototype.destroy = function()
{
	try
	{
		this.parent.removeChild(this.element);
	}
	catch(e){}
}

//Update AssetExplorer
AssetExplorer.prototype.update = function(){}

//Update division Size
AssetExplorer.prototype.updateInterface = function()
{
	//Fit parent
	if(this.fit_parent)
	{
		this.size.x = this.parent.offsetWidth;
		this.size.y = this.parent.offsetHeight; 
	}

	//Element visibility
	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}

	//Update file position
	var files = []
	for(var i = 0; i < this.files.length; i++) {
		if (this.files[i].path === Editor.CURRENT_PATH) {
			this.files[i].visible = true
			this.files[i].updateInterface()

			files.push(this.files[i])
		} else {
			this.files[i].visible = false
			this.files[i].updateInterface()
		}
	}

	var files_per_row = Math.floor(files.length / ((files.length * (this.files_size.x+this.files_spacing)) / this.size.x))
	for(var i = 0; i < files.length; i++) {
		var row = Math.floor(i / files_per_row)
		var col = i % files_per_row
		files[i].position.x = (col * this.files_size.x) + ((col+1) * this.files_spacing)
		files[i].position.y = (row * this.files_size.y) + ((row+1) * this.files_spacing)
		files[i].updateInterface()
	}

	//Update element
	this.element.style.top = this.position.y + "px"
	this.element.style.left = this.position.x + "px"
	this.element.style.width = this.size.x + "px"
	this.element.style.height = this.size.y + "px"
}
