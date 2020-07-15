"use strict";

//Codemirror
include("lib/codemirror/codemirror.min.js");
include("lib/codemirror/codemirror.css");
include("lib/codemirror/keymap/sublime.js");
include("lib/codemirror/keymap/emacs.js");
include("lib/codemirror/keymap/vim.js");
include("lib/codemirror/addon/edit/closebrackets.js");
include("lib/codemirror/addon/edit/matchbrackets.js");
include("lib/codemirror/addon/search/search.js");
include("lib/codemirror/addon/search/searchcursor.js");
include("lib/codemirror/addon/search/jump-to-line.js");
include("lib/codemirror/addon/hint/show-hint.js");
include("lib/codemirror/addon/hint/show-hint.css");
include("lib/codemirror/addon/hint/anyword-hint.js");
include("lib/codemirror/addon/dialog/dialog.js");
include("lib/codemirror/addon/dialog/dialog.css");
include("lib/codemirror/addon/selection/active-line.js");
include("lib/codemirror/mode/javascript.js");
include("lib/codemirror/mode/glsl.js");
include("lib/codemirror/theme/*");

include("lib/litegraph/litegraph.css")
include("lib/litegraph/litegui.js")
include("lib/litegraph/litegui.css")

//Threejs
include("lib/three/loaders/OBJLoader.js");
include("lib/three/loaders/MTLLoader.js");
include("lib/three/loaders/VRMLLoader.js");
include("lib/three/loaders/FBXLoader.js");
include("lib/three/loaders/GLTFLoader.js");
include("lib/three/loaders/ColladaLoader.js");

include("lib/three/animation/Animation.js");
include("lib/three/animation/AnimationHandler.js");
include("lib/three/animation/KeyFrameAnimation.js");

include("lib/jscolor.min.js");

//Internal modules
include("src/editor/ui/Bar.js");
include("src/editor/ui/Button.js");
include("src/editor/ui/DropdownMenu.js");
include("src/editor/ui/Text.js");
include("src/editor/ui/Division.js");
include("src/editor/ui/Image.js");
include("src/editor/ui/DivisionResizable.js");
include("src/editor/ui/ButtonImage.js");
include("src/editor/ui/ButtonDrawer.js");
include("src/editor/ui/Canvas.js");
include("src/editor/ui/TabGroup.js");
include("src/editor/ui/TabElement.js");
include("src/editor/ui/DualDivisionResizable.js");
include("src/editor/ui/ButtonImageToggle.js");
include("src/editor/ui/TreeView.js");
include("src/editor/ui/TreeElement.js");
include("src/editor/ui/ContextMenu.js");
include("src/editor/ui/Form.js");
include("src/editor/ui/DragBuffer.js");
include("src/editor/ui/AssetExplorer.js");

include("src/editor/ui/asset/Asset.js");
include("src/editor/ui/asset/MaterialAsset.js");

include("src/editor/files/style/editor.css");
include("src/editor/ui/theme/Theme.js");
include("src/editor/ui/theme/ThemeDark.js");
include("src/editor/ui/theme/ThemeLight.js");

include("src/editor/ui/tab/ScriptEditor.js");
include("src/editor/ui/tab/SceneEditor.js");
include("src/editor/ui/tab/SettingsTab.js");
include("src/editor/ui/tab/ParticleEditor.js");
include("src/editor/ui/tab/AboutTab.js");
include("src/editor/ui/tab/MaterialEditor.js");
include("src/editor/ui/tab/BlockEditor.js");
include("src/editor/ui/tab/ShaderMaterialEditor.js");

include("src/editor/ui/input/Graph.js");
include("src/editor/ui/input/CodeEditor.js");
include("src/editor/ui/input/CheckBox.js");
include("src/editor/ui/input/TextBox.js");
include("src/editor/ui/input/ColorChooser.js");
include("src/editor/ui/input/Slider.js");
include("src/editor/ui/input/DropdownList.js");
include("src/editor/ui/input/NumberBox.js");
include("src/editor/ui/input/CoordinatesBox.js");
include("src/editor/ui/input/ImageBox.js");
include("src/editor/ui/input/TextureBox.js");

include("src/editor/ui/panels/Panel.js");
include("src/editor/ui/panels/AudioPanel.js");
include("src/editor/ui/panels/ObjectPanel.js");
include("src/editor/ui/panels/SkyPanel.js");
include("src/editor/ui/panels/LeapPanel.js");
include("src/editor/ui/panels/ScriptPanel.js");
include("src/editor/ui/panels/KinectPanel.js");
include("src/editor/ui/panels/ScenePanel.js");
include("src/editor/ui/panels/ProgramPanel.js");
include("src/editor/ui/panels/TextPanel.js");
include("src/editor/ui/panels/PhysicsPanel.js");
include("src/editor/ui/panels/cameras/PerspectiveCameraPanel.js");
include("src/editor/ui/panels/cameras/OrthographicCameraPanel.js");
include("src/editor/ui/panels/lights/LightPanel.js");
include("src/editor/ui/panels/lights/HemisphereLightPanel.js");
include("src/editor/ui/panels/lights/PointLightPanel.js");
include("src/editor/ui/panels/lights/DirectionalLightPanel.js");
include("src/editor/ui/panels/lights/SpotLightPanel.js");

include("src/editor/tools/MoveTool.js");
include("src/editor/tools/ResizeTool.js");
include("src/editor/tools/RotateTool.js");

include("src/editor/helpers/ParticleEmitterHelper.js");
include("src/editor/helpers/ObjectIconHelper.js");
include("src/editor/helpers/PhysicsObjectHelper.js");

include("src/editor/utils/MaterialRenderer.js");
include("src/editor/utils/ObjectIcons.js");

include("src/editor/Interface.js");
include("src/editor/Settings.js");

function Editor(){}

//Editor state
Editor.STATE_IDLE = 8; //Non scene window open
Editor.STATE_EDITING = 9; //Editing a scene
Editor.STATE_TESTING = 11; //Testing a scene

//Editor editing modes
Editor.MODE_SELECT = 0;
Editor.MODE_MOVE = 1;
Editor.MODE_RESIZE = 2;
Editor.MODE_ROTATE = 3;

//Editor version
Editor.NAME = "Gorlot"
Editor.VERSION = "2020.0-Alpha"
Editor.TIMESTAMP = "Web Jul 15 2020 13:00:00 GMT+0000 (UTC)"

//Initialize Main
Editor.initialize = function(canvas)
{
	//Load settings
	Settings.load();

	//Load interface theme
	Editor.theme = Theme.get(Settings.general.theme);

	//Set windows close event
	if(App.gui !== undefined)
	{
		//Close event
		App.gui.Window.get().on("close", function()
		{
			if(confirm("All unsaved changes to the project will be lost! Do you really wanna exit?"))
			{
				Editor.exit();
			}
		});
	}

	//Set window title
	document.title = Editor.NAME + " " + Editor.VERSION + " (" + Editor.TIMESTAMP + ")";

	//Editor initial state
	Editor.tool_mode = Editor.MODE_SELECT;
	Editor.state = Editor.STATE_EDITING;

	//Editor Selected object
	Editor.selected_object = null;
	Editor.is_editing_object = false;

	//Performance meter
	Editor.stats = null;

	//Editor program and scene
	Editor.program = null;
	Editor.program_running = null;

	//VR effect and controls
	Editor.vr_controls = new VRControls();
	Editor.vr_effect = null;

	//Renderer and canvas
	Editor.renderer = null;
	Editor.canvas = null;

	//Material renderer for material previews
	Editor.material_renderer = new MaterialRenderer();

	//Default materials to be used when creating objects
	Editor.default_material = new MeshStandardMaterial({roughness: 0.6, metalness: 0.2});
	Editor.default_material.name = "default";
	Editor.default_sprite_material = new THREE.SpriteMaterial({map: new Texture("data/sample.png"), color: 0xffffff});
	Editor.default_sprite_material.name = "default";

	//Initialize User Interface
	Interface.initialize();

	//Debug Elements
	Editor.tool_scene = new THREE.Scene();
	Editor.tool_scene_top = new THREE.Scene();

	//Raycaster
	Editor.raycaster = new THREE.Raycaster(); 

	//Editor Camera
	Editor.default_camera = new PerspectiveCamera(60, 1, 0.01, 1000000);
	Editor.default_camera.position.set(0, 5, 5);
	Editor.camera = Editor.default_camera;
	Editor.camera_rotation = new THREE.Vector2(3.14, 0);
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);

	//Update interface
	Interface.updateInterface();

	//Grid and axis helpers
	Editor.grid_helper = new THREE.GridHelper(Settings.editor.grid_size, Math.round(Settings.editor.grid_size/Settings.editor.grid_spacing)*2, 0x888888, 0x888888);
	Editor.grid_helper.material.depthWrite = false;
	Editor.grid_helper.material.transparent = true;
	Editor.grid_helper.material.opacity = 0.3;
	Editor.grid_helper.visible = Settings.editor.grid_enabled;
	Editor.tool_scene.add(Editor.grid_helper);

	Editor.axis_helper = new THREE.AxisHelper(Settings.editor.grid_size);
	Editor.axis_helper.material.depthWrite = false;
	Editor.axis_helper.material.transparent = true;
	Editor.axis_helper.material.opacity = 1;
	Editor.axis_helper.visible = Settings.editor.axis_enabled;
	Editor.tool_scene.add(Editor.axis_helper);

	//Object helper container
	Editor.object_helper = new THREE.Scene();
	Editor.tool_scene.add(Editor.object_helper);

	//Tool container
	Editor.tool_container = new THREE.Scene();
	Editor.tool_scene_top.add(Editor.tool_container);
	Editor.tool = null;

	// Check if some .isp is passed as argument
	for(var i = 0; i < App.args.length; i++) {
		if (App.args[i].endsWith(".isp")) {
			Editor.loadProgram(App.args[i])
			break;
		}
	}

	//Create new program
	if(i === App.args.length) {
		Editor.createNewProgram();
	}

	//Update interface explorer tree view
	Editor.updateObjectViews();
}

//Update Editor
Editor.update = function()
{
	//End performance measure
	if(Editor.stats !== null)
	{
		Editor.stats.begin();
	}

	//Update editor interface
	Interface.update();
	Editor.is_editing_object = false;

	//If not on test mode
	if(Editor.state !== Editor.STATE_TESTING)
	{
		//Close tab, Save and load project
		if(Keyboard.keyPressed(Keyboard.CTRL))
		{
			if(Keyboard.keyJustPressed(Keyboard.S))
			{
				Interface.saveProgram();
			}
			else if(Keyboard.keyJustPressed(Keyboard.O))
			{
				Interface.loadProgram();
			}
			else if(Keyboard.keyJustPressed(Keyboard.W))
			{
				Interface.tab.closeActual();
			}
		}
	}

	//Editing a scene
	if(Editor.state === Editor.STATE_EDITING)
	{
		//Keyboard shortcuts
		if(Keyboard.keyJustPressed(Keyboard.DEL))
		{
			Editor.deleteObject();
		}
		else if(Keyboard.keyPressed(Keyboard.CTRL))
		{
			if(Keyboard.keyJustPressed(Keyboard.C))
			{
				Editor.copyObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.V))
			{
				Editor.pasteObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.X))
			{
				Editor.cutObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.Y))
			{
				//TODO <ADD CODE HERE>
				alert("Undo and redo not implemented!");
			}
			else if(Keyboard.keyJustPressed(Keyboard.Z))
			{
				//TODO <ADD CODE HERE>
				alert("Undo and redo not implemented!");
			}
		}

		//Select objects
		if(Editor.tool_mode === Editor.MODE_SELECT)
		{
			if(Mouse.buttonJustPressed(Mouse.LEFT) && Mouse.insideCanvas())
			{
				Editor.updateRaycasterFromMouse();
				var intersects = Editor.raycaster.intersectObjects(Editor.program.scene.children, true);
				if(intersects.length > 0)
				{
					Editor.selectObject(intersects[0].object);
				}
			}

			Editor.is_editing_object = false;
		}
		else if(Editor.selected_object !== null)
		{
			//Update active tool status
			if(Editor.tool !== null)
			{
				Editor.is_editing_object = Editor.tool.update();

				if(Editor.is_editing_object)
				{	
					//Update object tranformation matrix
					if(!Editor.selected_object.matrixAutoUpdate)
					{
						Editor.selected_object.updateMatrix();
					}
				}
			}
			else
			{
				Editor.is_editing_object = false;
			}
		}
		
		//Update object helper
		Editor.object_helper.update();

		//Check if mouse is inside canvas
		if(Mouse.insideCanvas())
		{
			//Lock mouse wheen camera is moving
			if(Settings.editor.lock_mouse) {
				if(Mouse.buttonJustPressed(Mouse.LEFT) || Mouse.buttonJustPressed(Mouse.RIGHT) || Mouse.buttonJustPressed(Mouse.MIDDLE))
				{
					Mouse.setLock(true);
				}
				else if(Mouse.buttonJustReleased(Mouse.LEFT) || Mouse.buttonJustReleased(Mouse.RIGHT) || Mouse.buttonJustReleased(Mouse.MIDDLE))
				{
					Mouse.setLock(false);
				}
			}

			//Look camera
			if(Mouse.buttonPressed(Mouse.LEFT) && !Editor.is_editing_object)
			{
				Editor.camera_rotation.x -= 0.002 * Mouse.delta.x;
				Editor.camera_rotation.y -= 0.002 * Mouse.delta.y;

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
				//Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0,0,0)) / 1000;
				if(speed < 0.02)
				{
					speed = 0.02;
				}

				//Move Camera Front and Back
				var angle_cos = Math.cos(Editor.camera_rotation.x);
				var angle_sin = Math.sin(Editor.camera_rotation.x);
				Editor.camera.position.z += Mouse.delta.y * speed * angle_cos;
				Editor.camera.position.x += Mouse.delta.y * speed * angle_sin;

				//Move Camera Lateral
				var angle_cos = Math.cos(Editor.camera_rotation.x + MathUtils.pid2);
				var angle_sin = Math.sin(Editor.camera_rotation.x + MathUtils.pid2);
				Editor.camera.position.z += Mouse.delta.x * speed * angle_cos;
				Editor.camera.position.x += Mouse.delta.x * speed * angle_sin;
			}
			
			//Move Camera on Y
			else if(Mouse.buttonPressed(Mouse.MIDDLE))
			{
				Editor.camera.position.y += Mouse.delta.y * 0.1;
			}

			//Move in camera direction using mouse scroll
			if(Mouse.wheel != 0)
			{
				//Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0,0,0))/2000;
				speed *= Mouse.wheel;

				//Limit zoom speed
				if(speed < 0 && speed > -0.03)
				{
					speed = -0.03;
				}
				else if(speed > 0 && speed < 0.03)
				{
					speed = 0.03;
				}

				//Move camera
				var direction = Editor.camera.getWorldDirection();
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

//Draw stuff into screen
Editor.draw = function()
{
	Editor.renderer.clear();

	if(Editor.state === Editor.STATE_EDITING)
	{
		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height);
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height);
		Editor.renderer.render(Editor.program.scene, Editor.camera);

		Editor.renderer.render(Editor.tool_scene, Editor.camera);
		Editor.renderer.clearDepth();
		Editor.renderer.render(Editor.tool_scene_top, Editor.camera);

		if(Settings.editor.camera_preview_enabled && Editor.selected_object instanceof THREE.Camera)
		{
			var width = Settings.editor.camera_preview_percentage * Editor.canvas.width;
			var height = Settings.editor.camera_preview_percentage * Editor.canvas.height;
			var offset = Editor.canvas.width - width - 10;
			var camera = Editor.selected_object;

			camera.aspect = width/height;
			camera.updateProjectionMatrix();

			Editor.renderer.clearDepth();
			Editor.renderer.setViewport(offset, 10, width, height);
			Editor.renderer.setScissor(offset, 10, width, height);
			Editor.renderer.render(Editor.program.scene, camera);
		}
	}
	else if(Editor.state === Editor.STATE_TESTING)
	{
		//If VR is enabled
		if(Editor.vr_effect !== null)
		{
			//Update VR controls
			Editor.vr_controls.scale = Editor.program_running.vr_scale;
			Editor.vr_controls.update();

			//Backup camera atributes
			var camera = Editor.program_running.scene.camera;
			var position = camera.position.clone();
			var quaternion = camera.quaternion.clone();

			//Apply VR controller offsets to actual camera
			camera.position.add(Editor.vr_controls.position);
			camera.quaternion.multiply(Editor.vr_controls.quaternion);

			//Render scene
			Editor.vr_effect.render(Editor.program_running.scene, camera);

			//Backup camera atributes
			camera.position.copy(position);
			camera.quaternion.copy(quaternion);
		}
		else
		{
			Editor.renderer.render(Editor.program_running.scene, Editor.program_running.scene.camera);
		}
	}

	//End performance measure
	if(Editor.stats !== null)
	{
		Editor.stats.end();
	}
}

//Resize to fit window
Editor.resize = function()
{
	if(!App.fullscreen)
	{
		Interface.updateInterface();
	}
}

//Select a object
Editor.selectObject = function(obj)
{
	Editor.selected_object = obj;
	Editor.updateSelectedObjectUI();
	Editor.selectObjectHelper();

	if(Editor.tool !== null && Editor.selected_object !== null)
	{
		Editor.tool_container.add(Editor.tool);
		Editor.tool.attachObject(Editor.selected_object);
	}
}

//Check if object is selected
Editor.isObjectSelected = function(obj)
{
	if(Editor.selected_object !== null)
	{
		return Editor.selected_object.uuid === obj.uuid;
	}
	return false;
}

//Delete Selected Object
Editor.deleteObject = function(obj)
{
	if(obj !== undefined)
	{
		obj.destroy();
		Editor.updateObjectViews();
		if(Editor.isObjectSelected(obj))
		{
			Editor.resetEditingFlags();
		}
	}
	else if(Editor.selected_object !== null)
	{
		Editor.selected_object.destroy();
		Editor.updateObjectViews();
		Editor.resetEditingFlags();
	}
}

//Copy selected object
Editor.copyObject = function(obj)
{
	if(obj !== undefined)
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(obj.toJSON()), "text");
		}
	}
	else if(Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene))
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text");
		}
	}
}

//Cut selected object
Editor.cutObject = function(obj)
{
	if(obj !== undefined)
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(obj.toJSON()), "text");
		}
		obj.destroy();
		Editor.updateObjectViews();
		if(Editor.isObjectSelected(obj))
		{
			Editor.resetEditingFlags();
		}
	}
	else if(Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene))
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text");
		}
		Editor.selected_object.destroy();
		Editor.updateObjectViews();
		Editor.resetEditingFlags();
	}
}

//Paste object as children of target object
Editor.pasteObject = function(target)
{
	try
	{
		var content = App.clipboard.get("text");
		var data = JSON.parse(content);

		//Create object
		var obj = new ObjectLoader().parse(data);
		obj.traverse(function(child)
		{
			child.uuid = THREE.Math.generateUUID();
		});

		//Add object to target
		if(target !== undefined)
		{
			target.add(obj);
		}
		else
		{
			Editor.program.scene.add(obj);
		}

		Editor.updateObjectViews();
	}
	catch(e){}
}

//Update UI panel to match selected object
Editor.updateSelectedObjectUI = function()
{
	Interface.tree_view.updateSelectedObject(Editor.selected_object);
	Interface.panel.destroy();

	if(Editor.selected_object !== null)
	{
		if(Editor.selected_object instanceof Text3D)
		{
			Interface.panel = new TextPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof THREE.PointLight)
		{
			Interface.panel = new PointLightPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof THREE.SpotLight)
		{
			Interface.panel = new SpotLightPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof THREE.DirectionalLight)
		{
			Interface.panel = new DirectionalLightPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof THREE.HemisphereLight)
		{
			Interface.panel = new HemisphereLightPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof THREE.Light)
		{
			Interface.panel = new LightPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof Sky)
		{
			Interface.panel = new SkyPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof LeapMotion)
		{
			Interface.panel = new LeapPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof KinectDevice)
		{
			Interface.panel = new KinectPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof Script)
		{
			Interface.panel = new ScriptPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof PerspectiveCamera)
		{
			Interface.panel = new PerspectiveCameraPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof OrthographicCamera)
		{
			Interface.panel = new OrthographicCameraPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof Audio)
		{
			Interface.panel = new AudioPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof Scene)
		{
			Interface.panel = new ScenePanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof Program)
		{
			Interface.panel = new ProgramPanel(Interface.explorer_resizable.div_b);
		}
		else if(Editor.selected_object instanceof PhysicsObject)
		{
			Interface.panel = new PhysicsPanel(Interface.explorer_resizable.div_b);
		}
		else
		{
			Interface.panel = new ObjectPanel(Interface.explorer_resizable.div_b);
		}
		Interface.panel.attachObject(Editor.selected_object);
		Interface.panel.updateInterface();
	}
	else
	{
		Interface.panel = null;
	}
}

//Update all object views
Editor.updateObjectViews = function()
{
	Editor.updateTreeView();
	Editor.updateObjectPanel();
	Editor.updateTabsData();
	Editor.selectObjectHelper();
	setTimeout(Editor.updateAssetExplorer, 50);
}

//Update tab names to match objects actual info
Editor.updateTabsData = function()
{
	Interface.tab.updateMetadata();
}

//Update tree view to match actual scene
Editor.updateTreeView = function()
{
	Interface.tree_view.fromObject(Editor.program);
}

//Update assets explorer content
Editor.updateAssetExplorer = function()
{
	//Clean asset explorer
	Interface.asset_explorer.clear();
	
	//Get material list
	var materials = ObjectUtils.getMaterials(Editor.program, Editor.program.materials);

	//Add materials to asset explorer
	for(var i in materials)
	{
		var file = new MaterialAsset(Interface.asset_explorer.element);
		file.setMaterial(materials[i]);
		Interface.asset_explorer.add(file);
	}

	Interface.asset_explorer.updateInterface();
}

//Updates object panel values
Editor.updateObjectPanel = function()
{
	if(Interface.panel !== null)
	{
		Interface.panel.updatePanel();
	}
}

//Add object to actual scene
Editor.addToScene = function(obj)
{
	if(Editor.program.scene !== null)
	{
		Editor.program.scene.add(obj);
		Editor.updateObjectViews();
	}
}

//Select tool to manipulate objects
Editor.selectTool = function(tool)
{
	Editor.tool_mode = tool;
	Editor.tool_container.removeAll();

	if(tool === Editor.MODE_MOVE)
	{
		Editor.tool = new MoveTool();
	}
	else if(tool === Editor.MODE_ROTATE)
	{
		Editor.tool = new RotateTool();
	}
	else if(tool === Editor.MODE_RESIZE)
	{
		Editor.tool = new ResizeTool();
	}
	else
	{
		Editor.tool = null;
	}

	if(Editor.tool !== null && Editor.selected_object !== null)
	{
		Editor.tool_container.add(Editor.tool);
		Editor.tool.attachObject(Editor.selected_object);
	}
}

//Select helper to debug selected object data
Editor.selectObjectHelper = function()
{
	Editor.object_helper.removeAll();

	if(Editor.selected_object !== null)
	{
		//Camera
		if(Editor.selected_object instanceof THREE.Camera)
		{
			Editor.object_helper.add(new THREE.CameraHelper(Editor.selected_object));
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, Interface.file_dir + "icons/camera/camera.png"));
		}
		//Directional light
		else if(Editor.selected_object instanceof THREE.DirectionalLight)
		{
			Editor.object_helper.add(new THREE.DirectionalLightHelper(Editor.selected_object, 1));
		}
		//Point light
		else if(Editor.selected_object instanceof THREE.PointLight)
		{
			Editor.object_helper.add(new THREE.PointLightHelper(Editor.selected_object, 1));
		}
		//Spot light
		else if(Editor.selected_object instanceof THREE.SpotLight)
		{
			Editor.object_helper.add(new THREE.SpotLightHelper(Editor.selected_object));
		}
		//Hemisphere light
		else if(Editor.selected_object instanceof THREE.HemisphereLight)
		{
			Editor.object_helper.add(new THREE.HemisphereLightHelper(Editor.selected_object, 1));
		}
		//Particle emitter
		else if(Editor.selected_object instanceof ParticleEmitter)
		{
			Editor.object_helper.add(new ParticleEmitterHelper(Editor.selected_object));
		}
		//Script
		if(Editor.selected_object instanceof Script)
		{
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, ObjectIcons.get(Editor.selected_object.type)));
		}
		// BlockScript
		if (Editor.selected_object instanceof BlockScript) {
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, ObjectIcons.get(Editor.selected_object.type)))
		}
		else if(Editor.selected_object instanceof PhysicsObject)
		{
			Editor.object_helper.add(new PhysicsObjectHelper(Editor.selected_object));
		}
		//Object 3D
		else if(Editor.selected_object instanceof THREE.Object3D)
		{
			Editor.object_helper.add(new THREE.BoundingBoxHelper(Editor.selected_object, 0xFFFF00));
		}
	}
}

//Resize Camera
Editor.resizeCamera = function()
{
	if(Editor.canvas !== null && Editor.renderer != null)
	{
		Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
		Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height;
		Editor.camera.updateProjectionMatrix();

		if(Editor.state === Editor.STATE_TESTING)
		{
			Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height);
		}
	}
}

//Set camera rotation
Editor.setCameraRotation = function(camera_rotation, camera)
{
	//Calculate direction vector
	var cos_angle_y = Math.cos(camera_rotation.y);
	var direction = new THREE.Vector3(Math.sin(camera_rotation.x)*cos_angle_y, Math.sin(camera_rotation.y), Math.cos(camera_rotation.x)*cos_angle_y);

	//Add position offset and set camera direction
	direction.add(camera.position);
	camera.lookAt(direction);
}

//Update raycaster position from editor mouse position
Editor.updateRaycasterFromMouse = function()
{
	var mouse = new THREE.Vector2((Mouse.position.x/Editor.canvas.width)*2 - 1, -(Mouse.position.y/Editor.canvas.height)*2 + 1);
	Editor.raycaster.setFromCamera(mouse, Editor.camera);
}

//Update editor raycaster with new x and y positions (normalized -1 to 1)
Editor.updateRaycaster = function(x, y)
{
	Editor.raycaster.setFromCamera(new THREE.Vector2(x, y), Editor.camera);
}

//Reset editing flags
Editor.resetEditingFlags = function()
{
	Editor.selected_object = null;
	Editor.is_editing_object = false;
	
	Editor.selectTool(Editor.tool_mode);
	Editor.updateObjectViews();
}

//Craete new Program
Editor.createNewProgram = function()
{
	//Create new program
	Editor.program = new Program();
	Editor.program.addDefaultScene(Editor.default_material);
	Editor.resetEditingFlags();

	//Remove old tabs from interface
	if(Interface.tab !== undefined)
	{
		Interface.tab.clear();
		var scene = Interface.tab.addOption("scene", Interface.file_dir + "icons/tab/scene.png", true);
		var canvas = new SceneEditor(scene.element);
		canvas.setScene(Editor.program.scene);
		scene.attachComponent(canvas);
		Interface.tab.selectOption(0);
	}
}

//Save program to file
Editor.saveProgram = function(fname)
{
	var output = Editor.program.toJSON();
	var json = null;
	
	try
	{
		json = JSON.stringify(output, null, "\t");
		json = json.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
	}
	catch(e)
	{
		json = JSON.stringify(output);
	}

	App.writeFile(fname, json);
}

//Load program from file
Editor.loadProgram = function(fname)
{
	// Dispose old program
	if (Editor.program !== null) {
		Editor.program.dispose()
	}

	// Load program data file
	var loader = new ObjectLoader();
	var data = JSON.parse(App.readFile(fname));
	var program = loader.parse(data);
	Editor.program = program;
	
	//Remove old tabs from interface
	Interface.tab.clear();

	//Add new scene tab to interface
	if(Editor.program.scene !== null)
	{
		var scene = Interface.tab.addOption("scene", Interface.file_dir + "icons/tab/scene.png", true);
		var editor = new SceneEditor(scene.element);
		editor.setScene(Editor.program.scene);
		scene.attachComponent(editor);
		Interface.tab.selectOption(0);
	}
}

//Export web project
Editor.exportWebProject = function(dir)
{
	//Nunu core
	App.copyFolder("runtime", dir);
	App.copyFolder("core", dir + "\\core");
	App.copyFolder("input", dir + "\\input");
	App.copyFile("App.js", dir + "\\App.js");

	//Libraries
	App.makeDirectory(dir + "\\lib");
	App.copyFile("lib\\leap.min.js", dir + "\\lib\\leap.min.js");
	App.copyFile("lib\\SPE.min.js", dir + "\\lib\\SPE.min.js");
	App.copyFile("lib\\leap.min.js", dir + "\\lib\\leap.min.js");
	App.copyFile("lib\\stats.min.js", dir + "\\lib\\stats.min.js");
	App.copyFile("lib\\cannon.min.js", dir + "\\lib\\cannon.min.js");
	App.copyFile("lib\\webvr-polyfill.min.js", dir + "\\lib\\webvr-polyfill.min.js");	
	App.makeDirectory(dir + "\\lib\\three");
	App.copyFile("lib\\three\\three.min.js", dir + "\\lib\\three\\three.min.js");
	App.makeDirectory(dir + "\\lib\\three\\effects");
	App.copyFile("lib\\three\\effects\\VREffect.js", dir + "\\lib\\three\\effects\\VREffect.js");

	//Save program
	Editor.saveProgram(dir + "\\app.isp");
}

//Export windows project
Editor.exportWindowsProject = function(dir)
{
	Editor.exportWebProject(dir);

	App.copyFolder("nwjs", dir + "\\nwjs");
	App.writeFile(dir + "\\package.json", JSON.stringify({name: Editor.program.name,main: "index.html",window:{frame: true}}));
	App.writeFile(dir + "\\" + Editor.program.name + ".bat", "cd nwjs/win\nstart nw.exe ../../");
	Editor.saveProgram(dir + "\\app.isp");
}

// Get an asset through its UUID
Editor.getAssetByUUID = function(uuid) {
	if (Interface.asset_explorer.files !== undefined && Interface.asset_explorer.files.length > 0) {
		for(var i = 0; i < Interface.asset_explorer.files.length; i++) {

			// If it's a file
			if (Interface.asset_explorer.files[i].material !== undefined) {
				if (Interface.asset_explorer.files[i].material.uuid === uuid) {
					return Interface.asset_explorer.files[i].material
				}
			}

		}
	}
}

//Set editor state
Editor.setState = function(state)
{
	if(state === Editor.STATE_EDITING)
	{
		//Dispose running program
		Editor.disposeRunningProgram();

		//Set run button text
		Interface.run.setText("Run");
		Interface.run.visible = true;
		Interface.run.updateInterface();

		//Hide fullscreen and VR buttons
		var tab = Interface.tab.getActual();
		if(tab instanceof SceneEditor)
		{
			tab.show_buttons_fullscreen = false;
			tab.show_buttons_vr = false;
			tab.updateInterface();
		}
	}
	else if(state === Editor.STATE_TESTING)
	{
		//Copy program
		Editor.program_running = Editor.program.clone();

		//Use editor camera as default camera for program
		Editor.program_running.default_camera = Editor.camera;
		Editor.program_running.renderer = Editor.renderer;

		//Initialize scene
		Editor.program_running.initialize();
		Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height);

		//Show full screen and VR buttons
		var tab = Interface.tab.getActual();
		tab.show_buttons_fullscreen = true;

		//If program uses VR set button
		if(Editor.program_running.vr)
		{
			if(App.webvrAvailable())
			{
				//Create VREffect instance
				Editor.vr_effect = new THREE.VREffect(Editor.renderer);
				
				//Show VR button
				tab.show_buttons_vr = true;

				//Create VR switch callback
				var vr_state = true;
				tab.vr_button.setCallback(function()
				{
					if(Editor.vr_effect !== null)
					{
						Editor.vr_effect.setFullScreen(vr_state);
						vr_state = !vr_state;
					}
				});
			}
		}

		//Set mouse lock
		if(Editor.program_running.lock_pointer)
		{
			Mouse.setLock(true);
		}

		//Update tab to show buttons
		tab.updateInterface();

		//Set renderer size
		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height);
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height);

		//Set run button text
		Interface.run.setText("Stop");
		Interface.run.visible = true;
		Interface.run.updateInterface();
	}
	else if(state === Editor.STATE_IDLE)
	{
		//Dispose running program
		Editor.disposeRunningProgram();

		//Hide run button
		Interface.run.visible = false;
		Interface.run.updateInterface();
	}

	//Set editor state
	Editor.state = state;
}

//Dispose running program if there is one
Editor.disposeRunningProgram = function()
{
	//Dispose running program if there is one
	if(Editor.program_running !== null)
	{
		Editor.program_running.dispose();
		Editor.program_running = null;
		Editor.vr_effect = null;
	}

	//Unlock mouse
	Mouse.setLock(false);
}

//Set performance meter to be used
Editor.setPerformanceMeter = function(stats)
{
	Editor.stats = stats;
}

//Set render canvas
Editor.setRenderCanvas = function(canvas)
{
	Mouse.setCanvas(canvas);
	Editor.canvas = canvas;
	Editor.initializeRenderer(canvas);
}

//Initialize renderer
Editor.initializeRenderer = function(canvas)
{
	Editor.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: Settings.render.antialiasing});
	Editor.renderer.setSize(canvas.width, canvas.height);
	Editor.renderer.setPixelRatio(window.devicePixelRatio || 1.0);
	Editor.renderer.autoClear = false;
	Editor.renderer.shadowMap.enabled = Settings.render.shadows;
	Editor.renderer.shadowMap.type = Settings.render.shadows_type;
}

//Exit editor
Editor.exit = function()
{
	Settings.store();
	if(App.gui !== undefined)
	{
		App.gui.App.closeAllWindows();
		App.gui.App.quit();
	}
}
