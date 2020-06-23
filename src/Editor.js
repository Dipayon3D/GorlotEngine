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

//Editor component system
Editor.components = [] // For creating a new component, push a Component to this array
Editor.componentManager = new ComponentManager()

Editor.componentManager.addComponent(new Object3DComponent(), true)
Editor.componentManager.addComponent(new Text3DComponent(), true)

//Initialize Main
Editor.initialize = function(canvas)
{
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

	//Initialize User Interface
	EditorUI.Initialize();

	//Set mouse lock true
	App.setMouseLock(false);
	App.showStats(false);

	//Set render canvas
	Editor.canvas = EditorUI.canvas;
	Mouse.canvas = Editor.canvas;

	//Editor program and scene
	Editor.program = null;
	Editor.scene = null
	Editor.createNewProgram()

	//Debug Elements
	Editor.tool_scene = new THREE.Scene();
	Editor.tool_scene_top = new THREE.Scene();
	Editor.cannon_renderer = new THREE.CannonDebugRenderer(Editor.tool_scene, Editor.scene.world);

	//Editor Camera
	Editor.camera = new PerspectiveCamera(60, Editor.canvas.width/Editor.canvas.height, 0.1, 100000);
	Editor.camera.position.set(0, 5, -5);
	Editor.camera_rotation = new THREE.Vector2(0,0);
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);

	//Raycaster
	Editor.raycaster = new THREE.Raycaster();

	//Renderer
	Editor.renderer = new THREE.WebGLRenderer({canvas: Editor.canvas});
	Editor.renderer.autoClear = false;
	Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
	Editor.renderer.shadowMap.enabled = true;
	Editor.renderer.shadowMap.type = THREE.PCFShadowMap;

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
		if(Editor.selected_object !== null)
		{
			Editor.updateObjectHelper()

			if(Editor.tool_mode === Editor.MODE_MOVE)
			{
				Editor.move_tool.visible = true;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.move_tool.scale.set(distance, distance, distance)
				Editor.move_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
			}
			else if(Editor.tool_mode === Editor.MODE_RESIZE)
			{
				Editor.resize_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.resize_tool.scale.set(distance, distance, distance)
				Editor.resize_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
				
			}
			else if(Editor.tool_mode === Editor.MODE_ROTATE)
			{
				Editor.rotate_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.resize_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.rotate_tool.scale.set(distance, distance, distance)
				Editor.rotate_tool.rotation.copy(Editor.selected_object.rotation)
				Editor.rotate_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
			}
			else
			{
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;
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
					var speed = Editor.camera.position.distanceTo(Editor.selected_object.position)/500;
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
					var speed = Editor.camera.position.distanceTo(Editor.selected_object.position)/1000;
					if(Editor.editing_object_args.x)
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
					var speed = 1/200;
					if(Editor.editing_object_args.x)
					{
						Editor.selected_object.rotation.x -= Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.x -= Mouse.pos_diff.x * speed;

					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.rotation.y -= Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.y -= Mouse.pos_diff.x * speed;
					
					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.rotation.z += Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.z += Mouse.pos_diff.x * speed;
					
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
					var intersects =  Editor.raycaster.intersectObjects(Editor.scene.children, true);
					if(intersects.length > 0)
					{
						Editor.selected_object = intersects[0].object;
						EditorUI.updateInspector()
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
		Editor.scene.update();
	}
}

// Add object to actual scene
Editor.addToActualScene = function(obj) {
	Editor.scene.add(obj)
	Editor.updateTreeView()
}

// Renames an object and checks if its name is unique
Editor.renameObject = function(obj, name) {
	var toName = name
	if (EditorUI.hierarchy.getItem(toName)) {
		toName += "_" + Editor.nameId
		Editor.nameId++
	}
	obj.name = toName
	Editor.updateTreeView()
}

// Update Tree View to Match Actual Scene
Editor.updateTreeView = function() {
	EditorUI.hierarchyFromScene(Editor.scene)
	EditorUI.updateInspector()
}

//Draw stuff into screen
Editor.draw = function()
{
	Editor.renderer.clear();

	//Render scene
	Editor.renderer.render(Editor.scene, Editor.camera);

	//Render debug scene
	if(Editor.state == Editor.STATE_EDITING)
	{
		Editor.cannon_renderer.update();
		Editor.renderer.render(Editor.tool_scene, Editor.camera);

		Editor.renderer.clearDepth();
		Editor.renderer.render(Editor.tool_scene_top, Editor.camera);
	}
}

//Resize to fit window
Editor.resize = function()
{
	EditorUI.updateInterface();
    Editor.resizeCamera()
}

// Show appropriate helper to selected object
Editor.updateObjectHelper = function() {
	Editor.activateHelper(Editor.box_helper, false)
	Editor.activateHelper(Editor.camera_helper, false)
	Editor.activateHelper(Editor.point_light_helper, false)
	Editor.activateHelper(Editor.spot_light_helper, false)
	Editor.activateHelper(Editor.directional_light_helper, false)

	if (Editor.selected_object !== null) {
		
		if (Editor.selected_object instanceof THREE.Camera) {
			Editor.activateHelper(Editor.camera_helper, true)
			Editor.camera_helper.camera = Editor.selected_object
			Editor.camera_helper.position.copy(Editor.selected_object.position)
			Editor.camera_helper.rotation.copy(Editor.selected_object.rotation)
			Editor.camera_helper.update()
		} else if (Editor.selected_object instanceof THREE.DirectionalLight) {
			Editor.activateHelper(Editor.directional_light_helper, true)
			Editor.directional_light_helper.light = Editor.selected_object
			Editor.directional_light_helper.position.copy(Editor.selected_object.position)
			Editor.directional_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.PointLight) {
			Editor.activateHelper(Editor.point_light_helper, true)
			Editor.point_light_helper.light = Editor.selected_object
			Editor.point_light_helper.position.copy(Editor.selected_object.position)
			Editor.point_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.SpotLight) {
			Editor.activateHelper(Editor.spot_light_helper, true)
			Editor.spot_light_helper.light = Editor.selected_object
			Editor.spot_light_helper.position.copy(Editor.selected_object.position)
			Editor.spot_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.Mesh) {
			Editor.activateHelper(Editor.box_helper, true)
			Editor.box_helper.update(Editor.selected_object)
		}
	
	}
}

// Return object absolute position (not relative to parent)
Editor.objectAbsolutePosition = function(obj) {
	if (obj.parent !== null && obj.parent !== undefined) {
		var position = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z)
		position.add(Editor.objectAbsolutePosition(obj.parent))
		return position
	}

	return obj.position
}

// Activate Helper
Editor.activateHelper = function(helper, value) {
	helper.visible = value
	helper.matrixAutoUpdate = value
}

//Resize Camera
Editor.resizeCamera = function()
{
	Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
	Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height;
	Editor.camera.updateProjectionMatrix();
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

	EditorUI.form.clear()
}

// New Program
Editor.createNewProgram = function() {
	Editor.nameId = 1

	Editor.program = new Program()
	Editor.program.addDefaultScene()
	Editor.scene = Editor.program.actual_scene

	Editor.resetEditingFlags()
}

// Exit Editor
Editor.exit = function() {
	process.exit()
}