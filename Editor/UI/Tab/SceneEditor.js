"use strict";

function SceneEditor(parent)
{
	//Parent
	if(parent === undefined)
	{
		this.parent = document.body;
	}
	else
	{
		this.parent = parent;
	}
	
	//ID
	var id = "scene_editor" + SceneEditor.id;
	SceneEditor.id++;

	//Create Element
	this.element = document.createElement("div");
	this.element.id = id;
	this.element.style.position = "absolute";

	//Canvas
	this.canvas = document.createElement("canvas");
	this.canvas.style.position = "absolute";
	this.element.appendChild(this.canvas);

	//Performance meter
	this.stats = new Stats();
	this.stats.dom.style.position = "absolute";
	this.stats.dom.style.left = "0px";
	this.stats.dom.style.top = "0px";
	this.stats.dom.style.zIndex = "0";
	this.element.appendChild(this.stats.dom);

	//Self pointer
	var self = this;

	//Drop event
	this.canvas.ondrop = function(event)
	{
		event.preventDefault();

		if(self.scene !== null)
		{
			//Canvas element
			var canvas = self.element;
			var rect = canvas.getBoundingClientRect();

			//Update raycaster direction
			var position = new THREE.Vector2(event.clientX - rect.left, event.clientY - rect.top);
			var position_normalized = new THREE.Vector2((position.x / self.canvas.width * 2) - 1, (-2 * position.y / self.canvas.height) + 1);
			Editor.updateRaycaster(position_normalized.x, position_normalized.y);

			//Get object from drag buffer
			var uuid = event.dataTransfer.getData("uuid");
			var dragged_object = DragBuffer.popDragElement(uuid);

			// Check intersected objects
			var intersections = Editor.raycaster.intersectObjects(self.scene.children, true)

			// Dragged file into object
			if (intersections.length > 0 && event.dataTransfer.files.length > 0) {
				var file = event.dataTransfer.files[0]

				// Image
				if (file.type.startsWith("image")) {
					var object = intersections[0].object

					if (object instanceof THREE.Mesh) {
						// Create new material with selected image
						var texture = new Texture(file.path)
						var material = new MeshStandardMaterial({map: texture, color: 0xffffff, roughness: 0.6, metalness: 0.2})
						material.name = file.name
						object.material = material

						// Update asset explorer
						Editor.updateObjectViews()
					} else if (object instanceof THREE.Sprite) {
						// Create new material with selected image
						var texture = new Texture(file.path)
						var material = new THREE.SpriteMaterial({map: texture, color: 0xffffff})
						material.name = file.name
						object.material = material

						Editor.updateObjectViews()
					}
				}
				// Video
				else if (file.type.startsWith("video")) {
					var object = intersections[0].object

					if (object instanceof THREE.Mesh) {
						var texture = new VideoTexture(file.path)
						var material = new MeshStandardMaterial({map: texture, color: 0xffffff, roughness: 0.6, metalness: 0.2})
						material.name = file.name
						object.material = material
						Editor.updateObjectViews()
					} else if (object instanceof THREE.Sprite) {
						var texture = new VideoTexture(file.path)
						var material = new THREE.SpriteMaterial({map: texture, color: 0xffffff})
						material.name = file.name
						Editor.updateObjectViews()
					}
				}
			}
			// Dragged resource into object
			else if (intersections.length > 0 && dragged_object !== null) {
				var object = intersections[0].object

				if (dragged_object instanceof THREE.SpriteMaterial) {
					if (object instanceof THREE.Sprite) {
						object.material = dragged_object
						Editor.updateObjectViews()
					}
				} else if (dragged_object instanceof THREE.Material) {
					if (object instanceof THREE.Mesh) {
						object.material = dragged_object
						Editor.updateObjectViews()
					}
				}
			}
			// Create an object caller
			else if (dragged_object !== null) {
				var obj = new ObjectCaller()
				obj.setObject(dragged_object)
				Editor.addToScene(obj)
			}

			// Dragged file into window
			if (event.dataTransfer.files.length > 0) {
				var file = event.dataTransfer.files[0]

				// Open project
				if (file.name.endsWith(".isp")) {
					if (confirm("All unsaved changes to the project will be lost! Load file?")) {
						Editor.loadProgram(file.path)
						Editor.resetEditingFlags()
						Editor.updateObjectViews()
					}
				}
			}
		}
	};

	//Prevent deafault when object dragged over
	this.canvas.ondragover = function(event)
	{
		event.preventDefault();
	};

	//Button
	this.show_buttons_fullscreen = false
	this.show_buttons_tools = false
	this.show_buttons_vr = false

	//Fullscreen button
	this.fullscreen_button = new ButtonImage(this.element);
	this.fullscreen_button.size.set(25, 25);
	this.fullscreen_button.setImage("Editor/Files/Icons/Misc/Fullscreen.png");
	this.fullscreen_button.visible = false;
	this.fullscreen_button.updateInterface();
	this.fullscreen_button.element.onmouseenter = function()
	{
		self.fullscreen_button.img.style.opacity = 0.5;
	};
	this.fullscreen_button.element.onmouseleave = function()
	{
		self.fullscreen_button.img.style.opacity = 1.0;
	};

	var fullscreen = true;
	this.fullscreen_button.setCallback(function()
	{
		self.setFullscreen(fullscreen);
		fullscreen = !fullscreen;
	});

	// Select tool
	this.tool_select_button = new ButtonImage(this.element)
	this.tool_select_button.size.set(15, 15)
	this.tool_select_button.setImage("Editor/Files/Icons/Tools/Select.png")
	this.tool_select_button.visible = false
	this.tool_select_button.updateInterface()

	this.tool_select_button.element.onmouseenter = function() {
		self.tool_select_button.img.style.opacity = 0.5
	}
	this.tool_select_button.element.onmouseleave = function() {
		self.tool_select_button.img.style.opacity = 1
	}

	this.tool_select_button.setCallback(() => {
		Editor.selectTool(Editor.MODE_SELECT)
		self.tool_select_button.img.style.filter = "contrast(100%)"
		self.tool_move_button.img.style.filter = "contrast(0%)"
		self.tool_rotate_button.img.style.filter = "contrast(0%)"
		self.tool_scale_button.img.style.filter = "contrast(0%)"
		self.tool_select_button.updateInterface()
		self.tool_move_button.updateInterface()
		self.tool_rotate_button.updateInterface()
		self.tool_scale_button.updateInterface()
	})

	// Move tool
	this.tool_move_button = new ButtonImage(this.element)
	this.tool_move_button.size.set(15, 15)
	this.tool_move_button.setImage("Editor/Files/Icons/Tools/Move.png")
	this.tool_move_button.visible = false
	this.tool_move_button.updateInterface()
	this.tool_move_button.img.style.filter = "contrast(0%)"

	this.tool_move_button.element.onmouseenter = function() {
		self.tool_move_button.img.style.opacity = 0.5
	}

	this.tool_move_button.element.onmouseleave = function() {
		self.tool_move_button.img.style.opacity = 1
	}

	this.tool_move_button.setCallback(() => {
		Editor.selectTool(Editor.MODE_MOVE)
		self.tool_select_button.img.style.filter = "contrast(0%)"
		self.tool_move_button.img.style.filter = "contrast(100%)"
		self.tool_rotate_button.img.style.filter = "contrast(0%)"
		self.tool_scale_button.img.style.filter = "contrast(0%)"
		self.tool_select_button.updateInterface()
		self.tool_move_button.updateInterface()
		self.tool_rotate_button.updateInterface()
		self.tool_scale_button.updateInterface()
	})

	// Rotate tool
	this.tool_rotate_button = new ButtonImage(this.element)
	this.tool_rotate_button.size.set(15, 15)
	this.tool_rotate_button.setImage("Editor/Files/Icons/Tools/Rotate.png")
	this.tool_rotate_button.visible = false
	this.tool_rotate_button.updateInterface()
	this.tool_rotate_button.img.style.filter = "contrast(0%)"

	this.tool_rotate_button.element.onmouseenter = function() {
		self.tool_rotate_button.img.style.opacity = 0.5
	}

	this.tool_rotate_button.element.onmouseleave = function() {
		self.tool_rotate_button.img.style.opacity = 1
	}

	this.tool_rotate_button.setCallback(() => {
		Editor.selectTool(Editor.MODE_ROTATE)
		self.tool_select_button.img.style.filter = "contrast(0%)"
		self.tool_move_button.img.style.filter = "contrast(0%)"
		self.tool_rotate_button.img.style.filter = "contrast(100%)"
		self.tool_scale_button.img.style.filter = "contrast(0%)"
		self.tool_select_button.updateInterface()
		self.tool_move_button.updateInterface()
		self.tool_rotate_button.updateInterface()
		self.tool_scale_button.updateInterface()
	})

	// Scale tool
	this.tool_scale_button = new ButtonImage(this.element)
	this.tool_scale_button.size.set(15, 15)
	this.tool_scale_button.setImage("Editor/Files/Icons/Tools/Resize.png")
	this.tool_scale_button.visible = false
	this.tool_scale_button.updateInterface()
	this.tool_scale_button.img.style.filter = "contrast(0%)"

	this.tool_scale_button.element.onmouseenter = function() {
		self.tool_scale_button.img.style.opacity = 0.5
	}

	this.tool_scale_button.element.onmouseleave = function() {
		self.tool_scale_button.img.style.opacity = 1
	}

	this.tool_scale_button.setCallback(() => {
		Editor.selectTool(Editor.MODE_SCALE)
		self.tool_select_button.img.style.filter = "contrast(0%)"
		self.tool_move_button.img.style.filter = "contrast(0%)"
		self.tool_rotate_button.img.style.filter = "contrast(0%)"
		self.tool_scale_button.img.style.filter = "contrast(100%)"
		self.tool_select_button.updateInterface()
		self.tool_move_button.updateInterface()
		self.tool_rotate_button.updateInterface()
		self.tool_scale_button.updateInterface()
	})

	//VR button
	this.vr_button = new ButtonImage(this.element);
	this.vr_button.size.set(25, 25);
	this.vr_button.setImage("Editor/Files/Icons/Misc/VR.png");
	this.vr_button.visible = false;
	this.vr_button.updateInterface();
	this.vr_button.element.onmouseenter = function()
	{
		self.vr_button.img.style.opacity = 0.5;
	};
	this.vr_button.element.onmouseleave = function()
	{
		self.vr_button.img.style.opacity = 1.0;
	};

	//Element atributes
	this.fit_parent = false;
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Scene
	this.scene = null;

	//Add element to document
	this.parent.appendChild(this.element);
}

//SceneEditor counter
SceneEditor.id = 0;

//Update container object data
SceneEditor.prototype.updateMetadata = function(container)
{
	if(this.scene !== null)
	{
		var scene = this.scene;

		//Set container name
		container.setName(scene.name);

		//Check if scene exists in program
		var found = false;
		Editor.program.traverse(function(obj)
		{
			if(obj.uuid === scene.uuid)
			{
				found = true;
			}
		});

		//If not found close tab
		if(!found)
		{
			container.close();
		}
	}
}

//Set fullscreen mode
SceneEditor.prototype.setFullscreen = function(value)
{
	//Apply fullscreen mode
	if(value)
	{
		//Set to fullscreen mode
		App.enterFullscreen(this.element);

		this.element.style.zIndex = 10000;
		this.position.set(0, 0);	
		this.size.set(window.screen.width, window.screen.height);
		this.updateInterface();

		Editor.resizeCamera();
	}
	else
	{
		//Leave fullscreen mode
		App.leaveFullscreen();
	
		//Restore elements
		this.element.style.zIndex = 0;
		Interface.updateInterface();
	}
}

//Activate scene editor
SceneEditor.prototype.activate = function()
{
	Editor.program.scene = this.scene;
	Editor.setPerformanceMeter(this.stats);
	Editor.setRenderCanvas(this.canvas);
	Editor.setState(Editor.STATE_EDITING);
	Editor.resetEditingFlags();
	Editor.resize();
}

//Set scene
SceneEditor.prototype.setScene = function(scene)
{
	this.scene = scene;
}

//Remove element
SceneEditor.prototype.destroy = function()
{
	try
	{
		this.parent.removeChild(this.canvas);
	}
	catch(e){}
}

//Update SceneEditor
SceneEditor.prototype.update = function(){}

//Update division Size
SceneEditor.prototype.updateInterface = function()
{
	//Fit parent
	if(this.fit_parent)
	{
		this.size.x = this.parent.offsetWidth;
		this.size.y = this.parent.offsetHeight; 
	}
	
	//Set visibilty
	if(this.visible)
	{
		this.element.style.visibility = "visible";
		this.canvas.style.visibility = "visible";
		if(Settings.general.show_stats)
		{
			this.stats.dom.style.visibility = "visible";
		}
		else
		{
			this.stats.dom.style.visibility = "hidden";
		}
	}
	else
	{
		this.element.style.visibility = "hidden";
		this.canvas.style.visibility = "hidden";
		this.stats.dom.style.visibility = "hidden";
	}

	//Fullscreen button
	this.fullscreen_button.position.x = this.position.x + this.size.x - this.fullscreen_button.size.x - 5;
	this.fullscreen_button.position.y = this.position.y + this.size.y - this.fullscreen_button.size.y - 5;
	this.fullscreen_button.visible = this.visible && this.show_buttons_fullscreen;
	this.fullscreen_button.updateInterface();

	// Tools buttons
	this.tool_select_button.position.x = this.position.x + this.size.x - this.tool_select_button.size.x - (this.tool_move_button.size.x + this.tool_rotate_button.size.x + this.tool_scale_button.size.x) - 40
	this.tool_select_button.position.y = this.position.y - this.tool_select_button.size.y + 30
	this.tool_select_button.visible = this.visible && this.show_buttons_tools
	this.tool_select_button.updateInterface()

	this.tool_move_button.position.x =  this.position.x + this.size.x - this.tool_move_button.size.x - (this.tool_rotate_button.size.x + this.tool_scale_button.size.x) - 30 
	this.tool_move_button.position.y = this.tool_select_button.position.y
	this.tool_move_button.visible = this.visible && this.show_buttons_tools
	this.tool_move_button.updateInterface()

	this.tool_rotate_button.position.x = this.position.x + this.size.x - this.tool_rotate_button.size.x - this.tool_scale_button.size.x - 20
	this.tool_rotate_button.position.y = this.tool_select_button.position.y
	this.tool_rotate_button.visible = this.visible && this.show_buttons_tools
	this.tool_rotate_button.updateInterface()

	this.tool_scale_button.position.x = this.position.x + this.size.x - this.tool_scale_button.size.x - 10
	this.tool_scale_button.position.y = this.tool_select_button.position.y
	this.tool_scale_button.visible = this.visible && this.show_buttons_tools
	this.tool_scale_button.updateInterface()

	//VR button
	this.vr_button.position.x = this.fullscreen_button.position.x - this.vr_button.size.x - 10;
	this.vr_button.position.y = this.fullscreen_button.position.y;
	this.vr_button.visible = this.visible && this.show_buttons_vr;
	this.vr_button.updateInterface();

	//Update canvas
	this.canvas.width = this.size.x;
	this.canvas.height = this.size.y;
	this.canvas.style.width = this.size.x + "px";
	this.canvas.style.height = this.size.y + "px";

	//Update element
	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}
