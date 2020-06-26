function Editor(){}

//Editor state
Editor.STATE_IDLE = 8; //Editing scripts
Editor.STATE_EDITING = 9; //Editing a scene
Editor.STATE_TESTING = 11; //Testing a scene

//Editor editing modes
Editor.MODE_SELECT = 0;
Editor.MODE_MOVE = 1;
Editor.MODE_RESIZE = 2;
Editor.MODE_ROTATE = 3;

// This is a variable for handling objects with a non-unique name
Editor.nameId = 1

// This variable determines whether we can click and modify what is inside the canvas
Editor.clickable = true

//Editor component system
Editor.components = [] // For creating a new component, push a Component to this array
Editor.componentManager = new ComponentManager()

Editor.componentManager.addComponent(new Object3DComponent(), true)
Editor.componentManager.addComponent(new Text3DComponent(), true)
Editor.componentManager.addComponent(new LightComponent(), true)

//Initialize Main
Editor.initialize = function(canvas)
{
	// Set mouse Lock false
	App.setMouseLock(false)
	App.showStats(false)

	//Editor initial state
	Editor.tool_mode = Editor.MODE_SELECT;
	Editor.state = Editor.STATE_EDITING;

	// Auxiliar values
	Editor.pid2 = Math.PI/2

	//Editor Selected object
	Editor.selected_object = null;
	Editor.block_camera_move = false;
	Editor.is_editing_object = false;
	Editor.editing_object_args = null;

	// Editor program and scene
	Editor.program = null
	Editor.program_running = null
	Editor.createNewProgram()

	// Renderer and canvas
	Editor.renderer = null
	Editor.canvas = null

	//Initialize User Interface
	EditorUI.Initialize();

	//Debug Elements
	Editor.tool_scene = new THREE.Scene();
	Editor.tool_scene_top = new THREE.Scene();
	Editor.cannon_renderer = new THREE.CannonDebugRenderer(Editor.tool_scene, Editor.program.scene.world);

	// Raycaster
	Editor.raycaster = new THREE.Raycaster()

	// Set render canvas
	Editor.setRenderCanvas(EditorUI.canvas.element)

	//Editor Camera
	Editor.camera = new PerspectiveCamera(60, Editor.canvas.width/Editor.canvas.height, 0.1, 100000);
	Editor.camera.position.set(0, 5, -5);
	Editor.camera_rotation = new THREE.Vector2(0,0);
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);

	//Update interface
	EditorUI.updateInterface();

	//Grid and axis helpers
	Editor.grid_helper = new THREE.GridHelper(200, 5);
	Editor.tool_scene.add(Editor.grid_helper);
	Editor.axis_helper = new THREE.AxisHelper(100);
	Editor.tool_scene.add(Editor.axis_helper);

	//Box helper
	Editor.box_helper = new THREE.BoxHelper();
	Editor.box_helper.visible = false
	Editor.tool_scene.add(Editor.box_helper);

	// Camera Helper
	Editor.camera_helper = new THREE.CameraHelper(Editor.camera)
	Editor.activateHelper(Editor.camera_helper, false)
	Editor.tool_scene.add(Editor.camera_helper)

	// DirectionalLight Helper
	Editor.directional_light_helper = new THREE.DirectionalLightHelper(new THREE.DirectionalLight(), 1)
	Editor.activateHelper(Editor.directional_light_helper, false)
	Editor.tool_scene.add(Editor.directional_light_helper)

	// PointLight Helper
	Editor.point_light_helper = new THREE.PointLightHelper(new THREE.PointLight(), 1)
	Editor.activateHelper(Editor.point_light_helper, false)
	Editor.tool_scene.add(Editor.point_light_helper)

	// SpotLight Helper
	Editor.spot_light_helper = new THREE.SpotLightHelper(new THREE.SpotLight(), 1)
	Editor.activateHelper(Editor.spot_light_helper, false)
	Editor.tool_scene.add(Editor.spot_light_helper)

	// HemisphereLight helper
	Editor.hemisphere_light_helper = new THREE.HemisphereLightHelper(new THREE.HemisphereLight, 1)
	Editor.activateHelper(Editor.hemisphere_light_helper, false)
	Editor.tool_scene.add(Editor.hemisphere_light_helper)

	// Move Tool
	Editor.move_tool = new MoveTool();
	Editor.move_tool.visible = false;
	Editor.tool_scene_top.add(Editor.move_tool);

	// Resize Tool
	Editor.resize_tool = new ResizeTool();
	Editor.resize_tool.visible = false;
	Editor.tool_scene_top.add(Editor.resize_tool);

	// Rotate Tool
	Editor.rotate_tool = new RotateTool();
	Editor.rotate_tool.visible = false;
	Editor.tool_scene_top.add(Editor.rotate_tool);

	// TODO: Delete
	Editor.updateTreeView()
}

//Update Editor
Editor.update = function()
{
	Editor.block_camera_move = false;

	//Editing a scene
	if(Editor.state === Editor.STATE_EDITING)
	{
		//If object select display tools
		if(Editor.selected_object !== null && Editor.selected_object !== undefined)
		{
			Editor.updateObjectHelper()

			if(Editor.tool_mode === Editor.MODE_MOVE)
			{
				Editor.move_tool.visible = true;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;

				var position = ObjectUtils.objectAbsolutePosition(Editor.selected_object)
				var distance = Editor.camera.position.distanceTo(position)/5
				Editor.move_tool.scale.set(distance, distance, distance)
				Editor.move_tool.position.copy(position);
			}
			else if(Editor.tool_mode === Editor.MODE_RESIZE)
			{
				Editor.resize_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;

				var position = ObjectUtils.objectAbsolutePosition(Editor.selected_object)
				var distance = Editor.camera.position.distanceTo(position)/5
				Editor.resize_tool.scale.set(distance, distance, distance)
				Editor.resize_tool.position.copy(position);
				
			}
			else if(Editor.tool_mode === Editor.MODE_ROTATE)
			{
				Editor.rotate_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.resize_tool.visible = false;

				var position = ObjectUtils.objectAbsolutePosition(Editor.selected_object)
				var distance = Editor.camera.position.distanceTo(position)/5
				Editor.rotate_tool.scale.set(distance, distance, distance)
				Editor.rotate_tool.rotation.copy(Editor.selected_object.rotation)
				Editor.rotate_tool.position.copy(position);
			}
			else
			{
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;
			}

			// Keyboard shortcuts
			if (Keyboard.isKeyJustPressed(Keyboard.DEL)) {
				// Delete Selected Object
				Editor.deleteSelectedObject()
			} else if (Keyboard.isKeyJustPressed(Keyboard.CTRL)) {
				// Shortcuts with the CTRL key
				if (Keyboard.isKeyPressed(Keyboard.C)) {
					// Copy selected object
					Editor.copySelectedObject()
				} else if (Keyboard.isKeyJustPressed(Keyboard.V)) {
					// Paste into selected object
					Editor.pasteIntoSelectedObject()
				} else if (Keyboard.isKeyJustPressed(Keyboard.X)) {
					// Cut selected object
					Editor.cutSelectedObject()
				}
			}
		}
		else
		{
			Editor.move_tool.visible = false;
			Editor.rotate_tool.visible = false;
			Editor.resize_tool.visible = false;
		}

		//Check if editing object
		if(Editor.is_editing_object)
		{	
			//If mouse button released exit edit mode
			if(Mouse.buttonJustReleased(Mouse.LEFT))
			{
				Editor.is_editing_object = false;
				EditorUI.updateInspector()
			}
			else
			{
				Editor.block_camera_move = true;

				//Moving object
				if(Editor.tool_mode === Editor.MODE_MOVE)
				{
					var speed = Editor.camera.position.distanceTo(ObjectUtils.objectAbsolutePosition(Editor.selected_object))/500;
					if(Editor.editing_object_args.x)
					{
						Editor.selected_object.position.x -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x);
						Editor.selected_object.position.x -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x);

					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.position.y -= Mouse.pos_diff.y * speed;

					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.position.z -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x + Editor.pid2);
						Editor.selected_object.position.z -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x + Editor.pid2);

					}
				}
				//Resize mode
				else if(Editor.tool_mode === Editor.MODE_RESIZE)
				{
					var speed = Editor.camera.position.distanceTo(ObjectUtils.objectAbsolutePosition(Editor.selected_object))/1000;
					if(Editor.editing_object_args.center) {
						var size = (Mouse.pos_diff.x - Mouse.pos_diff.y) * speed/3

						Editor.selected_object.scale.x += size
						Editor.selected_object.scale.y += size
						Editor.selected_object.scale.z += size
					} else if(Editor.editing_object_args.x)
					{
						Editor.selected_object.scale.x -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x);
						Editor.selected_object.scale.x -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x);

					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.scale.y -= Mouse.pos_diff.y * speed;

					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.scale.z -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x + Editor.pid2);
						Editor.selected_object.scale.z -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x + Editor.pid2);

					}
				}
				//Rotate Mode
				else if(Editor.tool_mode === Editor.MODE_ROTATE)
				{
					var speed = 1/300;
					if(Editor.editing_object_args.x)
					{
						var delta = new THREE.Quaternion()
						delta.setFromEuler(new THREE.Euler(-(Mouse.pos_diff.y + Mouse.pos_diff.x) * speed, 0, 0, 'XYZ'))
						Editor.selected_object.quaternion.multiplyQuaternions(delta, Editor.selected_object.quaternion)
					}
					else if(Editor.editing_object_args.y)
					{
						var delta = new THREE.Quaternion()
						delta.setFromEuler(new THREE.Euler(0, -(Mouse.pos_diff.y + Mouse.pos_diff.x) * speed, 0, 'XYZ'))
						Editor.selected_object.quaternion.multiplyQuaternions(delta, Editor.selected_object.quaternion)
					}
					else if(Editor.editing_object_args.z)
					{
						var delta = new THREE.Quaternion()
						delta.setFromEuler(new THREE.Euler(0, 0, (Mouse.pos_diff.y + Mouse.pos_diff.x) * speed, 'XYZ'))
						Editor.selected_object.quaternion.multiplyQuaternions(delta, Editor.selected_object.quaternion)
					}
				}
			}
		}

		//Check if mouse inside canvas
		if(Mouse.insideCanvas())
		{
			//Select objects
			if(Editor.tool_mode === Editor.MODE_SELECT)
			{
				if(Mouse.buttonJustPressed(Mouse.LEFT))
				{
					Editor.updateRaycaster();
					var intersects =  Editor.raycaster.intersectObjects(Editor.program.scene.children, true);
					if(intersects.length > 0)
					{
						Editor.selectObject(intersects[0].object)
					}
				}
			}

			//Move objects
			else if(Editor.tool_mode === Editor.MODE_MOVE)
			{
				Editor.updateRaycaster();
				var move = Editor.move_tool.highlightSelectedComponents(Editor.raycaster);
				if(move.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = move;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Resize
			else if(Editor.tool_mode === Editor.MODE_RESIZE)
			{
				Editor.updateRaycaster();
				var resize = Editor.resize_tool.highlightSelectedComponents(Editor.raycaster);
				if(resize.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = resize;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Rotate
			else if(Editor.tool_mode === Editor.MODE_ROTATE)
			{
				Editor.updateRaycaster();
				var rotate = Editor.rotate_tool.highlightSelectedComponents(Editor.raycaster);
				if(rotate.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = rotate;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Rotate camera
			if(Mouse.buttonPressed(Mouse.LEFT) && !Editor.block_camera_move)
			{
				Editor.camera_rotation.x -= 0.01 * Mouse.SENSITIVITY * Mouse.pos_diff.x;
				Editor.camera_rotation.y -= 0.01 * Mouse.SENSITIVITY * Mouse.pos_diff.y;

				//Limit Vertical Rotation to 90 degrees
				var pid2 = 1.57;
				if(Editor.camera_rotation.y < -pid2)
				{
					Editor.camera_rotation.y = -pid2;
				}
				else if(Editor.camera_rotation.y > pid2)
				{
					Editor.camera_rotation.y = pid2;
				}

				Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);
			}

			//Move Camera on X and Z
			else if(Mouse.buttonPressed(Mouse.RIGHT))
			{
				//Move Camera Front and Back
				var speed = 0.1;
				var angle_cos = Math.cos(Editor.camera_rotation.x);
				var angle_sin = Math.sin(Editor.camera_rotation.x);
				Editor.camera.position.z += Mouse.pos_diff.y * speed * angle_cos;
				Editor.camera.position.x += Mouse.pos_diff.y * speed * angle_sin;

				//Move Camera Lateral
				var angle_cos = Math.cos(Editor.camera_rotation.x + Editor.pid2);
				var angle_sin = Math.sin(Editor.camera_rotation.x + Editor.pid2);
				Editor.camera.position.z += Mouse.pos_diff.x * speed * angle_cos;
				Editor.camera.position.x += Mouse.pos_diff.x * speed * angle_sin;
			}
			
			//Move in camera direction using mouse scroll
			if(Mouse.wheel != 0)
			{
				var direction = Editor.camera.getWorldDirection();
				var speed = 0.01 * Mouse.wheel;
				Editor.camera.position.x -= speed * direction.x;
				Editor.camera.position.y -= speed * direction.y;
				Editor.camera.position.z -= speed * direction.z;
			}
		}
	}
	//Update Scene if on test mode
	else if(Editor.state === Editor.STATE_TESTING)
	{
		Editor.program_running.scene.update();
	}
}

Editor.selectObject = function(obj) {
	Editor.selected_object = obj
	EditorUI.hierarchy.setSelectedItem(Editor.selected_object.name)
	EditorUI.updateInspector()
}

// Check if object is selected
Editor.isObjectSelected = function(obj) {
	Editor.selected_object === obj
}

// Delete selected Object
Editor.deleteSelectedObject = function() {
	if (Editor.selected_object.parent !== null) {
		Editor.selected_object.parent.remove(Editor.selected_object)
		Editor.updateTreeView()
		Editor.resetEditingFlags()
	}
}

// Copy selected object
Editor.copySelectedObject = function() {
	if (Editor.selected_object !== null) {
		try {
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
		} catch(e) {
			console.error("Error copying the object: " + e)
		}
	}
}

// Cut selected object
Editor.cutSelectedObject = function() {
	if (Editor.selected_object !== null) {
		try {
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
			if (Editor.selected_object.parent !== null) {
				Editor.selected_object.parent.remove(Editor.selected_object)
				Editor.updateTreeView()
				Editor.resetEditingFlags()
			}
		} catch(e) {
			console.error("Error cutting object: " + e)
		}
	}
}

// Paste as children of the selected object
Editor.pasteIntoSelectedObject = function() {
	try {
		var content = App.clipboard.get("text")
		var loader = new ObjectLoader()
		var data = JSON.parse(content)

		// Create object
		var obj = loader.parse(data)
		obj.uuid = THREE.Math.generateUUID()
		obj.position.set(0, 0, 0)
		Editor.renameObject(obj, obj.name)

		// Add object
		if (Editor.selected_object !== null) {
			Editor.selected_object.add(obj)
		} else {
			Editor.program.scene.add(obj)
		}

		Editor.updateTreeView()
	} catch(e) {
		console.error("Error pasting object: " + e)
	}
}

// Add object to actual scene
Editor.addToActualScene = function(obj) {
	Editor.program.scene.add(obj)
	Editor.updateTreeView()
	Editor.renameObject(obj, obj.name)
}

// Checks if an object's name is unique, if not, renames it
Editor.renameObject = function(obj, name) {
	if(EditorUI.hierarchy !== undefined) {
		var toName = name
		if (EditorUI.hierarchy.getItem(toName)) {
			toName += "_" + Editor.nameId
			Editor.nameId++
		}
		obj.name = toName

		if (obj.children.length > 0) {
			for(var i = 0; i < obj.children.length; i++) {
				Editor.renameObject(obj.children[i], obj.children[i].name)
			}
		}

		Editor.updateTreeView()
	}
}

// Update Tree View to Match Actual Scene
Editor.updateTreeView = function() {
	EditorUI.hierarchyFromScene(Editor.program.scene)
	EditorUI.updateInspector()
}

//Draw stuff into screen
Editor.draw = function()
{
	Editor.renderer.clear();

	//Render debug scene
	if(Editor.state == Editor.STATE_EDITING)
	{
		// Render scene
		Editor.renderer.render(Editor.program.scene, Editor.camera)

		Editor.cannon_renderer.update();
		Editor.renderer.render(Editor.tool_scene, Editor.camera);
		Editor.renderer.clearDepth();
		Editor.renderer.render(Editor.tool_scene_top, Editor.camera);
	} else if (Editor.state === Editor.STATE_TESTING) {
		Editor.renderer.render(Editor.program_running.scene, Editor.program_running.scene.camera)
	}
}

//Resize to fit window
Editor.resize = function()
{
	EditorUI.updateInterface();
}

// Show appropriate helper to selected object
Editor.updateObjectHelper = function() {
	Editor.activateHelper(Editor.box_helper, false)
	Editor.activateHelper(Editor.camera_helper, false)
	Editor.activateHelper(Editor.point_light_helper, false)
	Editor.activateHelper(Editor.spot_light_helper, false)
	Editor.activateHelper(Editor.directional_light_helper, false)

	if (Editor.selected_object !== null && Editor.selected_object !== undefined) {
		
		var position = ObjectUtils.objectAbsolutePosition(Editor.selected_object)
		if (Editor.selected_object instanceof THREE.Camera) {
			Editor.activateHelper(Editor.camera_helper, true)
			Editor.camera_helper.camera = Editor.selected_object
			Editor.camera_helper.position.copy(position)
			Editor.camera_helper.rotation.copy(Editor.selected_object.rotation)
			Editor.camera_helper.update()
		} else if (Editor.selected_object instanceof THREE.DirectionalLight) {
			Editor.activateHelper(Editor.directional_light_helper, true)
			Editor.directional_light_helper.light = Editor.selected_object
			Editor.directional_light_helper.position.copy(position)
			Editor.directional_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.PointLight) {
			Editor.activateHelper(Editor.point_light_helper, true)
			Editor.point_light_helper.light = Editor.selected_object
			Editor.point_light_helper.position.copy(position)
			Editor.point_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.SpotLight) {
			Editor.activateHelper(Editor.spot_light_helper, true)
			Editor.spot_light_helper.light = Editor.selected_object
			Editor.spot_light_helper.position.copy(position)
			Editor.spot_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.HemisphereLight) {
			Editor.activateHelper(Editor.hemisphere_light_helper, true)
			Editor.hemisphere_light_helper.light = Editor.selected_object
			Editor.hemisphere_light_helper.position.copy(position)
			Editor.hemisphere_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.Mesh) {
			Editor.activateHelper(Editor.box_helper, true)
			Editor.box_helper.update(Editor.selected_object)
		}
	
	}
}

// Activate Helper
Editor.activateHelper = function(helper, value) {
	helper.visible = value
	helper.matrixAutoUpdate = value
}

//Resize Camera
Editor.resizeCamera = function()
{
	if (Editor.canvas !== null && Editor.renderer !== null) {
		Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height)
		Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height
		Editor.camera.updateProjectionMatrix()
	}
}

//Set camera rotation
Editor.setCameraRotation = function(camera_rotation, camera)
{
	//Calculate direction vector
	var cos_angle_y = Math.cos(camera_rotation.y);
	var direction = new THREE.Vector3(Math.sin(camera_rotation.x)*cos_angle_y, Math.sin(camera_rotation.y), Math.cos(camera_rotation.x)*cos_angle_y);

	//Add position offset and set camera direction
	direction.x += camera.position.x;
	direction.y += camera.position.y;
	direction.z += camera.position.z;
	camera.lookAt(direction);
}

//Update editor raycaster
Editor.updateRaycaster = function()
{
	var mouse = new THREE.Vector2((Mouse.pos.x/Editor.canvas.width )*2 - 1, -(Mouse.pos.y/Editor.canvas.height)*2 + 1);
	Editor.raycaster.setFromCamera(mouse, Editor.camera);
}

// Reset editing flags
Editor.resetEditingFlags = function() {
	Editor.selected_object = null
	Editor.block_camera_move = false
	Editor.is_editing_object = false
	Editor.editing_object_args = null

	try {
		Editor.updateObjectHelper()
	} catch(e) {}

	if(EditorUI.form !== undefined) {
		EditorUI.form.clear()
	}
}

// Save program to file
Editor.saveProgram = function(fname) {
	var output = Editor.program.toJSON()
	var json = null

	try {
		json = JSON.stringify(output, null, "\t")
		json = json.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")
	} catch(e) {
		json = JSON.stringify(output)
	}

	if (json !== null) {
		App.writeFile(fname, json)
	}
}

// Load program from file
Editor.loadProgram = function(fname) {
	var loader = new ObjectLoader()
	var data = JSON.parse(App.readFile(fname))
	var program = loader.parse(data)

	Editor.program = program
	Editor.resetEditingFlags()
	Editor.updateTreeView()
}

// New Program
Editor.createNewProgram = function() {
	Editor.nameId = 1

	Editor.program = new Program()
	Editor.program.addDefaultScene()

	Editor.resetEditingFlags()
}

// Set editor state
Editor.setState = function(state) {
	if (state === Editor.STATE_EDITING) {
		// Clean program running variable
		Editor.program_running.scene.stop()
		Editor.program_running = null
	} else if (state === Editor.STATE_TESTING) {
		// Copy program and initialize scene
		Editor.program_running = Editor.program.clone()
		Editor.program_running.scene.initialize()

		// If no camera attached, attach camera
		if (Editor.program_running.scene.camera === null) {
			Editor.program_running.scene.camera = Editor.camera
		}
	}
	Editor.state = state
}

// Set render canvas
Editor.setRenderCanvas = function(canvas) {
	Mouse.canvas = canvas
	Editor.canvas = canvas
	Editor.initializeRenderer(canvas)
}

// Initialize the renderer
Editor.initializeRenderer = function(canvas) {
	Editor.renderer = new THREE.WebGLRenderer({canvas: canvas})
	Editor.renderer.autoClear = false

	// Enable shadow maps
	Editor.renderer.shadowMap.enabled = true
	Editor.renderer.shadowMap.type = THREE.PCFShadowMao
	Editor.renderer.setSize(canvas.width, canvas.height)
}

// Exit Editor
Editor.exit = function() {
	process.exit()
}