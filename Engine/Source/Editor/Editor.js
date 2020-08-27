"use strict"

function Editor(){}

Editor.CURRENT_PATH = "/"
Editor.componentManager = []

// NWJS Modules
try {
	Editor.fs = require("fs")
    Editor.os = require('os')
	Editor.gui = require("nw.gui")

	Editor.clipboard = Editor.gui.Clipboard.get()
	Editor.args = Editor.gui.App.argv
} catch(e) {
	Editor.args = []
}

// Gorlot global
include("Source/Runtime/Gorlot.js")

// Runtime dependencies
include("Libraries/THREE/three.min.js")
include("Libraries/THREE/effects/VREffect.js")

include("Libraries/THREE/animation/Animation.js")
include("Libraries/THREE/animation/AnimationHandler.js")
include("Libraries/THREE/animation/KeyFrameAnimation.js")

include("Libraries/CANNON/cannon.min.js")

include("Libraries/Leap/leap.min.js")

include("Libraries/stats.min.js")

include("Libraries/SPE/SPE.min.js")

include("Libraries/Spine/spine.min.js")

include("Libraries/Opentype/opentype.min.js")

include("Libraries/litegraph/litegraph.js")

// Core runtime modules
include("Source/Runtime/Global.js")
include("Source/Runtime/FileSystem.js")

include("Source/Runtime/Input/Key.js")
include("Source/Runtime/Input/Keyboard.js")
include("Source/Runtime/Input/Mouse.js")

include("Source/Runtime/WebVR/VRControls.js")

include("Source/Runtime/Resources/Resource.js")
include("Source/Runtime/Resources/Font.js")
include("Source/Runtime/Resources/Video.js")
include("Source/Runtime/Resources/Audio.js")
include("Source/Runtime/Resources/Image.js")
include("Source/Runtime/Resources/Folder.js")
include("Source/Runtime/Resources/ResourceManager.js")

include("Source/Runtime/Texture/CanvasTexture.js")
include("Source/Runtime/Texture/VideoTexture.js")
include("Source/Runtime/Texture/WebcamTexture.js")
include("Source/Runtime/Texture/Texture.js")

include("Source/Runtime/Loaders/FontLoader.js")
include("Source/Runtime/Loaders/ImageLoader.js")
include("Source/Runtime/Loaders/VideoLoader.js")

include("Source/Runtime/Loaders/AudioLoader.js")
include("Source/Runtime/Loaders/TextureLoader.js")
include("Source/Runtime/Loaders/ObjectLoader.js")
include("Source/Runtime/Loaders/MaterialLoader.js")
include("Source/Runtime/Loaders/TTFLoader.js")

include("Source/Runtime/Objects/Device/LeapMotion.js")
include("Source/Runtime/Objects/Device/KinectDevice.js")

include("Source/Runtime/Objects/Basic/Mesh.js")
include("Source/Runtime/Objects/Basic/SkinnedMesh.js")
include("Source/Runtime/Objects/Basic/Text3D.js")

include("Source/Runtime/Objects/Sprite/Sprite.js")

include("Source/Runtime/Objects/Lighting/PointLight.js")
include("Source/Runtime/Objects/Lighting/SpotLight.js")
include("Source/Runtime/Objects/Lighting/AmbientLight.js")
include("Source/Runtime/Objects/Lighting/DirectionalLight.js")
include("Source/Runtime/Objects/Lighting/HemisphereLight.js")
include("Source/Runtime/Objects/Lighting/RectAreaLight.js")
include("Source/Runtime/Objects/Lighting/Sky.js")

include("Source/Runtime/Objects/Cinematic/PerspectiveCamera.js")
include("Source/Runtime/Objects/Cinematic/OrthographicCamera.js")

include("Source/Runtime/Objects/Sound/AudioEmitter.js")
include("Source/Runtime/Objects/Sound/PositionalAudio.js")

include("Source/Runtime/Objects/Script/Script.js")
include("Source/Runtime/Objects/Script/BlockScript.js")

include("Source/Runtime/Objects/Physics/PhysicsObject.js")

include("Source/Runtime/Objects/Spine/SpineAnimation.js")
include("Source/Runtime/Objects/Spine/SpineTexture.js")

include("Source/Runtime/Objects/Animation/Bone.js")

include("Source/Runtime/Objects/Misc/Empty.js")

include("Source/Runtime/Objects/Particle/ParticleEmitter.js")

include("Source/Runtime/Objects/Program.js")
include("Source/Runtime/Objects/Scene.js")

include("Source/Runtime/Objects/Special/ObjectCaller.js")

include("Source/Runtime/Utils/Base64Utils.js")
include("Source/Runtime/Utils/ArraybufferUtils.js")
include("Source/Runtime/Utils/MathUtils.js")
include("Source/Runtime/Utils/ObjectUtils.js")
include("Source/Runtime/Utils/BufferUtils.js")

// Assets
include("Source/Runtime/Assets/Materials/MeshBasicMaterial.js")
include("Source/Runtime/Assets/Materials/MeshLambertMaterial.js")
include("Source/Runtime/Assets/Materials/MeshNormalMaterial.js")
include("Source/Runtime/Assets/Materials/MeshPhongMaterial.js")
include("Source/Runtime/Assets/Materials/MeshShaderMaterial.js")
include("Source/Runtime/Assets/Materials/MeshStandardMaterial.js")
include("Source/Runtime/Assets/Materials/MeshToonMaterial.js")
include("Source/Runtime/Assets/Materials/SpriteMaterial.js")

// Components
include("Source/Runtime/Components/Panel.js")
include("Source/Runtime/Components/Component.js")

include("Source/Runtime/Components/Sound/AudioComponent.js")

include("Source/Runtime/Components/Physics/PhysicsComponent.js")

include("Source/Runtime/Components/Scripts/ScriptComponent.js")
include("Source/Runtime/Components/Scripts/BlockComponent.js")

include("Source/Runtime/Components/Elements/ElementComponent.js")
include("Source/Runtime/Components/Elements/ObjectComponent.js")
include("Source/Runtime/Components/Elements/ProgramComponent.js")
include("Source/Runtime/Components/Elements/SceneComponent.js")

include("Source/Runtime/Components/Elements/Basic/Text3DComponent.js")

include("Source/Runtime/Components/Device/KinectComponent.js")
include("Source/Runtime/Components/Device/LeapComponent.js")

include("Source/Runtime/Components/Cameras/CameraComponent.js")

include("Source/Runtime/Components/Lights/LightComponent.js")
include("Source/Runtime/Components/Lights/SkyComponent.js")

include("Source/Runtime/Components/Geometry/GeometryForm.js")
include("Source/Runtime/Components/Geometry/BoxGeometryComponent.js")
include("Source/Runtime/Components/Geometry/ConeGeometryComponent.js")
include("Source/Runtime/Components/Geometry/PlaneGeometryComponent.js")
include("Source/Runtime/Components/Geometry/SphereGeometryComponent.js")
include("Source/Runtime/Components/Geometry/TorusGeometryComponent.js")
include("Source/Runtime/Components/Geometry/CylinderGeometryComponent.js")
include("Source/Runtime/Components/Geometry/TetrahedronGeometryComponent.js")

// THREE Modifiers
include("Source/Runtime/THREE/Object3D.js")
include("Source/Runtime/THREE/Vector3.js")
include("Source/Runtime/THREE/Vector2.js")
include("Source/Runtime/THREE/Texture.js")
include("Source/Runtime/THREE/LightShadow.js")
include("Source/Runtime/THREE/Fog.js")
include("Source/Runtime/THREE/Material.js")
include("Source/Runtime/THREE/MultiMaterial.js")

// Nodes
include("Source/Runtime/Nodes/Register.js")
include("Source/Runtime/Nodes/NodesHelper.js")

// Blocks
include("Source/Runtime/Nodes/Blocks/Base/Base.js")
include("Source/Runtime/Nodes/Blocks/Base/Events.js")
include("Source/Runtime/Nodes/Blocks/Base/Lists.js")
include("Source/Runtime/Nodes/Blocks/Base/Widgets.js")
include("Source/Runtime/Nodes/Blocks/Base/Elements.js")
include("Source/Runtime/Nodes/Blocks/Base/Hierarchy.js")
include("Source/Runtime/Nodes/Blocks/Base/Utils.js")

include("Source/Runtime/Nodes/Blocks/Math/Colour.js")
include("Source/Runtime/Nodes/Blocks/Math/Vector.js")
include("Source/Runtime/Nodes/Blocks/Math/Euler.js")

include("Source/Runtime/Nodes/Blocks/Input/Keyboard.js")

// Material
include("Source/Runtime/Nodes/Material/MaterialNodes.js")

// Particles
include("Source/Runtime/Nodes/Particles/ParticlesNodes.js")

// Texture
include("Source/Runtime/Nodes/Texture/TextureNodes.js")
include("Source/Runtime/Nodes/Texture/VideoTextureNodes.js")

//Codemirror
include("Libraries/codemirror/codemirror.min.js")
include("Libraries/codemirror/codemirror.css")
include("Libraries/codemirror/keymap/sublime.js")
include("Libraries/codemirror/keymap/emacs.js")
include("Libraries/codemirror/keymap/vim.js")
include("Libraries/codemirror/addon/edit/closebrackets.js")
include("Libraries/codemirror/addon/edit/matchbrackets.js")
include("Libraries/codemirror/addon/search/search.js")
include("Libraries/codemirror/addon/search/searchcursor.js")
include("Libraries/codemirror/addon/search/jump-to-line.js")
include("Libraries/codemirror/addon/hint/show-hint.js")
include("Libraries/codemirror/addon/hint/show-hint.css")
include("Libraries/codemirror/addon/hint/anyword-hint.js")
include("Libraries/codemirror/addon/dialog/dialog.js")
include("Libraries/codemirror/addon/dialog/dialog.css")
include("Libraries/codemirror/addon/selection/active-line.js")
include("Libraries/codemirror/mode/javascript.js")
include("Libraries/codemirror/mode/glsl.js")
include("Libraries/codemirror/addon/lint/lint.css")
include("Libraries/codemirror/addon/lint/lint.js")
include("Libraries/codemirror/addon/lint/javascript-lint")
include("Libraries/codemirror/theme/*")

include("Libraries/Editor/Jshint.min.js")
include("Libraries/Editor/Jscolor.min.js")
include("Libraries/Editor/Quickhull.js")

// Core modules
include("Source/Runtime/Utils/Mesh2Shape.js")

include("Libraries/litegraph/litegraph.css")
include("Libraries/litegraph/litegui.css")

//Threejs
include("Libraries/THREE/loaders/OBJLoader.js")
include("Libraries/THREE/loaders/MTLLoader.js")
include("Libraries/THREE/loaders/VRMLLoader.js")
include("Libraries/THREE/loaders/FBXLoader2.js")
include("Libraries/THREE/loaders/GLTFLoader.js")
include("Libraries/THREE/loaders/ColladaLoader.js")
include("Libraries/THREE/loaders/PLYLoader.js")
include("Libraries/THREE/loaders/VTKLoader.js")
include("Libraries/THREE/loaders/AWDLoader.js")
include("Libraries/THREE/loaders/TGALoader.js")
include("Libraries/THREE/loaders/PCDLoader.js")

//Internal modules
include("Source/Editor/UI/Element/Bar.js")
include("Source/Editor/UI/Element/Button.js")
include("Source/Editor/UI/Element/Text.js")
include("Source/Editor/UI/Element/Division.js")
include("Source/Editor/UI/Element/ImageBox.js")
include("Source/Editor/UI/Element/DivisionResizable.js")
include("Source/Editor/UI/Element/ButtonImage.js")
include("Source/Editor/UI/Element/ButtonDrawer.js")
include("Source/Editor/UI/Element/Canvas.js")
include("Source/Editor/UI/Element/DualDivisionResizable.js")
include("Source/Editor/UI/Element/ButtonImageToggle.js")
include("Source/Editor/UI/Element/Form.js")
include("Source/Editor/UI/Element/FormSeparator.js")
include("Source/Editor/UI/Element/AudioPlayer.js")

include("Source/Editor/UI/Element/Input/Graph.js")
include("Source/Editor/UI/Element/Input/CodeEditor.js")
include("Source/Editor/UI/Element/Input/CheckBox.js")
include("Source/Editor/UI/Element/Input/TextBox.js")
include("Source/Editor/UI/Element/Input/TextArea.js")
include("Source/Editor/UI/Element/Input/ColorChooser.js")
include("Source/Editor/UI/Element/Input/Slider.js")
include("Source/Editor/UI/Element/Input/DropdownList.js")
include("Source/Editor/UI/Element/Input/NumberBox.js")
include("Source/Editor/UI/Element/Input/CoordinatesBox.js")
include("Source/Editor/UI/Element/Input/ImageChooser.js")
include("Source/Editor/UI/Element/Input/TextureBox.js")

include("Source/Editor/UI/DropdownMenu.js")
include("Source/Editor/UI/TreeView.js")
include("Source/Editor/UI/TreeElement.js")
include("Source/Editor/UI/FolderTree.js")
include("Source/Editor/UI/FolderElement.js")
include("Source/Editor/UI/ContextMenu.js")
include("Source/Editor/UI/AssetExplorer.js")
include("Source/Editor/UI/TabGroup.js")
include("Source/Editor/UI/TabElement.js")
include("Source/Editor/UI/TabButton.js")

include("Source/Editor/UI/Asset/Asset.js")
include("Source/Editor/UI/Asset/MaterialAsset.js")
include("Source/Editor/UI/Asset/TextureAsset.js")
include("Source/Editor/UI/Asset/BlockAsset.js")
include("Source/Editor/UI/Asset/FontAsset.js")
include("Source/Editor/UI/Asset/AudioAsset.js")
include("Source/Editor/UI/Asset/FolderAsset.js")

include("Source/Editor/Files/Style/Editor.css")

include("Source/Editor/UI/Theme/Theme.js")
include("Source/Editor/UI/Theme/ThemeDark.js")

include("Source/Editor/UI/Tab/ScriptEditor.js")
include("Source/Editor/UI/Tab/SceneEditor.js")
include("Source/Editor/UI/Tab/ParticleEditor.js")
include("Source/Editor/UI/Tab/AboutTab.js")
include("Source/Editor/UI/Tab/BlockEditor.js")

include("Source/Editor/UI/Tab/Material/MaterialEditor.js")
include("Source/Editor/UI/Tab/Material/ShaderMaterialEditor.js")

include("Source/Editor/UI/Tab/Texture/TextureEditor.js")

include("Source/Editor/UI/Tab/Settings/SettingsTab.js")
include("Source/Editor/UI/Tab/Settings/CodeSettingsTab.js")
include("Source/Editor/UI/Tab/Settings/GeneralSettingsTab.js")

include("Source/Editor/Interface/ObjectChooser/ObjectChooserBasicTab.js")
include("Source/Editor/Interface/ObjectChooser/ObjectChooserLightingTab.js")
include("Source/Editor/Interface/ObjectChooser/ObjectChooserCinematicTab.js")
include("Source/Editor/Interface/ObjectChooser/ObjectChooserEffectsTab.js")
include("Source/Editor/Interface/ObjectChooser/ObjectChooserPhysicsTab.js")
include("Source/Editor/Interface/ObjectChooser/ObjectChooserDeviceTab.js")

include("Source/Editor/Tools/TransformControls.js")
include("Source/Editor/Tools/GizmoMaterial.js")
include("Source/Editor/Tools/GizmoLineMaterial.js")
include("Source/Editor/Tools/TransformGizmo.js")
include("Source/Editor/Tools/TransformGizmoRotate.js")
include("Source/Editor/Tools/TransformGizmoScale.js")
include("Source/Editor/Tools/TransformGizmoTranslate.js")

include("Source/Editor/Helpers/ParticleEmitterHelper.js")
include("Source/Editor/Helpers/ObjectIconHelper.js")
include("Source/Editor/Helpers/PhysicsObjectHelper.js")
include("Source/Editor/Helpers/BoundingBoxHelper.js")
include("Source/Editor/Helpers/WireframeHelper.js")
include("Source/Editor/Helpers/GridHelper.js")
include("Source/Editor/Helpers/RectAreaLightHelper.js")

include("Source/Editor/Utils/FontRenderer.js")
include("Source/Editor/Utils/MaterialRenderer.js")
include("Source/Editor/Utils/ObjectIcons.js")

include("Source/Editor/History/History.js")
include("Source/Editor/History/Action.js")

include("Source/Editor/DragBuffer.js")
include("Source/Editor/Settings.js")

// Internal console
include("Source/Editor/UI/Tab/ConsoleTab.js")
include("Source/Editor/Console.js")

include("Source/Editor/ComponentManager.js")

include("Source/Editor/Interface/Interface.js")

// Editor state
Editor.STATE_IDLE = 8
Editor.STATE_EDITING = 9
Editor.STATE_TESTING = 11

// Editor editing modes
Editor.MODE_SELECT = 0
Editor.MODE_MOVE = 1
Editor.MODE_SCALE = 2
Editor.MODE_ROTATE = 3

// Editor camera mode
Editor.CAMERA_ORTHOGRAPHIC = 20
Editor.CAMERA_PERSPECTIVE = 21

// Initialize Main
Editor.initialize = function() {
	Editor.fullscreen = false

	document.body.style.overflow = "hidden"

    // Open ISP file if dragged to the window
    document.body.ondrop = (e) => {
        if(e.dataTransfer.files.length > 0) {
            var file = e.dataTransfer.files[0]

            // Open project
            if(file.name.endsWith(".isp")) {
                if(confirm("All unsaved changes to the project will be lost! Load file?")) {
                    Editor.loadProgram(file.path)
                    Editor.resetEditingFlags()
                    Editor.updateObjectViews()
                }
            }
        }
    }

    // Initialise input
    Editor.keyboard = new Keyboard()
    Editor.mouse = new Mouse()

	// Load settings
	Settings.load()

	// Load interface theme
	Editor.theme = Theme.get(Settings.general.theme)

	// Set windows close event
	if(Editor.gui !== undefined) {
		// Close event
		Editor.gui.Window.get().on("close", function() {
			if(confirm("All unsaved changes to the project will be lost! Do you really wanna exit?")) {
				Editor.exit()
			}
		})
	}

	// Set window title
	document.title = GORLOT.NAME + " " + GORLOT.VERSION + " (" + GORLOT.TIMESTAMP + ")"

	// Editor initial state
	Editor.toolMode = Editor.MODE_SELECT
	Editor.state = Editor.STATE_EDITING

    // Open file
    Editor.openFile = null

	// Editor Selected object
	Editor.selectedObject = null
	Editor.isEditingObject = false

	// Performance meter
	Editor.stats = null

	// History
	Editor.history = new History()

	// Editor program and scene
	Editor.program = null
	Editor.programRunning = null

	// Renderer and canvas
	Editor.renderer = null
	Editor.canvas = null
	Editor.gl = null

	// Material renderer for material previews
	Editor.materialRenderer = new MaterialRenderer()
    Editor.fontRenderer = new FontRenderer()

	// Default resources
	Editor.createDefaultResources()

	// Initialize User Interface
	Interface.initialize()

	// Debug Elements
	Editor.toolScene = new THREE.Scene()
	Editor.toolSceneTop = new THREE.Scene()

	// Raycaster
	Editor.raycaster = new THREE.Raycaster();

	// Grid and axis helpers
	Editor.gridHelper = new GridHelper(Settings.gridSize, Settings.editor.gridSpacing)
    Editor.gridHelper.visible = Settings.editor.gridEnabled
    Editor.toolScene.add(Editor.gridHelper)

	Editor.axisHelper = new THREE.AxisHelper(Settings.editor.gridSize)
	Editor.axisHelper.material.depthWrite = false
	Editor.axisHelper.material.transparent = true
	Editor.axisHelper.material.opacity = 1
	Editor.axisHelper.visible = Settings.editor.axisEnabled
	Editor.toolScene.add(Editor.axisHelper)

	// Object helper container
	Editor.objectHelper = new THREE.Scene()
	Editor.toolScene.add(Editor.objectHelper)

	// Tool container
	Editor.toolContainer = new THREE.Scene()
	Editor.toolSceneTop.add(Editor.toolContainer)
	Editor.tool = null

	// Editor Camera
	Editor.cameraMode = Editor.CAMERA_PERSPECTIVE
	Editor.cameraRotation = new THREE.Vector2(0, 0)
	Editor.setCameraMode(Editor.CAMERA_PERSPECTIVE)

	// Check if some .isp is passed as argument
	for(var i = 0; i < Editor.args.length; i++) {
		if (Editor.args[i].endsWith(".isp")) {
			Editor.loadProgram(Editor.args[i])
			break
		}
	}

	// Create new program
	if(Editor.program === null) {
		Editor.createNewProgram()
	}

	// Update views and start update loop
	Editor.updateObjectViews()
	Editor.update()
}

// Update Editor
Editor.update = function() {
	requestAnimationFrame(Editor.update)

	// Update input
    Editor.mouse.update()
    Editor.keyboard.update()

	// End performance measure
	if(Editor.stats !== null) {
		Editor.stats.begin()
	}

	// Update editor interface
	Interface.update()
	Editor.isEditingObject = false

	// If not on test mode
	if(Editor.state !== Editor.STATE_TESTING) {
		// Close tab, Save and load project
		if(Editor.keyboard.keyPressed(Keyboard.CTRL)) {
            if(Editor.keyboard.keyJustPressed(Keyboard.S)) {
                if(Editor.openFile === null) {
                    Interface.saveProgram()
                } else {
                    Editor.saveProgram(undefined, false)
                }
            } else if(Editor.keyboard.keyJustPressed(Keyboard.O)) {
                Interface.loadProgram()
            } else if(Editor.keyboard.keyJustPressed(Keyboard.W) || Editor.keyboard.keyJustPressed(Keyboard.F4)) {
                Interface.tab.closeActual()
            } else if (Editor.keyboard.keyJustPressed(Keyboard.TAB) || Editor.keyboard.keyJustPressed(Keyboard.PAGE_DOWN)) {
                Interface.tab.selectNextTab()
            } else if (Editor.keyboard.keyJustPressed(Keyboard.PAGE_UP)) {
                Interface.tab.selectPreviousTab()
            }
        }
	}

	// Editing a scene
	if(Editor.state === Editor.STATE_EDITING) {
		// Keyboard shortcuts
		if(Editor.keyboard.keyJustPressed(Keyboard.DEL)) {
			Editor.deleteObject()
		} else if(Editor.keyboard.keyJustPressed(Keyboard.F5)) {
            Editor.setState(Editor.STATE_TESTING)
        } else if(Editor.keyboard.keyJustPressed(Keyboard.F2)) {
            if(Editor.selectedObject !== null) {
                var name = prompt("Rename object", Editor.selectedObject.name)
                if(name !== null && name !== "") {
                    Editor.selectedObject.name = name
                    Editor.updateObjectViews()
                }
            }
        } else if(Editor.keyboard.keyPressed(Keyboard.CTRL)) {
            if(Interface.panel !== null && !Interface.panel.focused) {
                if(Editor.keyboard.keyJustPressed(Keyboard.C)) {
                    Editor.copyObject()
                } else if(Editor.keyboard.keyJustPressed(Keyboard.V)) {
                    Editor.pasteObject()
                } else if(Editor.keyboard.keyJustPressed(Keyboard.X)) {
                    Editor.cutObject()
                } else if(Editor.keyboard.keyJustPressed(Keyboard.Y)) {
                    Editor.redo()
                } else if(Editor.keyboard.keyJustPressed(Keyboard.Z)) {
                    Editor.undo()
                }
            }
		}

		// Select objects
		if(Editor.toolMode === Editor.MODE_SELECT) {
			if(Editor.mouse.buttonJustPressed(Mouse.LEFT) && Editor.mouse.insideCanvas()) {
				Editor.selectObjectWithMouse()
			}

			Editor.isEditingObject = false
		} else {
			// If mouse double clicked, select object
			if (Editor.mouse.buttonDoubleClicked() && Editor.mouse.insideCanvas()) {
				Editor.selectObjectWithMouse()
			}

			// If no object selected, update tool
			if(Editor.selectedObject !== null) {
				if(Editor.tool !== null) {
					Editor.isEditingObject = Editor.tool.update()

                    if(Editor.mouse.buttonJustPressed(Mouse.LEFT) && Editor.is_editing_object) {
                        Editor.history.push(Editor.selected_object, Action.CHANGED)
                    }

					if (Editor.isEditingObject) {
						Editor.updateObjectPanel()
					}
				} else {
					Editor.isEditingObject = false
				}
			}
		}

		// Update object transformation matrix
		if (Editor.selectedObject !== null) {
			if (!Editor.selectedObject.matrixAutoUpdate) {
				Editor.selectedObject.updateMatrix()
			}
		}
		
		// Update object helper
		Editor.objectHelper.update()

		// Check if mouse is inside canvas
		if(Editor.mouse.insideCanvas()) {
			// Lock mouse wheen camera is moving
			if(Settings.editor.lockMouse) {
				if(!Editor.isEditingObject && (Editor.mouse.buttonJustPressed(Mouse.LEFT) || Editor.mouse.buttonJustPressed(Mouse.RIGHT) || Editor.mouse.buttonJustPressed(Mouse.MIDDLE))) {
					Editor.mouse.setLock(true)
				} else if(Editor.mouse.buttonJustReleased(Mouse.LEFT) || Editor.mouse.buttonJustReleased(Mouse.RIGHT) || Editor.mouse.buttonJustReleased(Mouse.MIDDLE)) {
					Editor.mouse.setLock(false)
				}
			}

			//  Orthographic Camera (2D Mode)
			if(Editor.cameraMode === Editor.CAMERA_ORTHOGRAPHIC) {
					// Move camera on x / y
				if(Editor.mouse.buttonPressed(Mouse.RIGHT)) {
					var ratio = Editor.camera.size / Editor.canvas.width * 2

					Editor.camera.position.x -= Editor.mouse.delta.x * ratio
					Editor.camera.position.y += Editor.mouse.delta.y * ratio
				}

				// Camera zoom
				if (Editor.mouse.wheel !== 0) {
                    Editor.camera.size += Editor.mouse.wheel * Editor.camera.size / 1000

					Editor.camera.updateProjectionMatrix()
				}
			}

			// Perspective camera
			else {

				// Look camera
				if (Editor.mouse.buttonPressed(Mouse.LEFT) && !Editor.isEditingObject) {
					Editor.cameraRotation.x -= 0.002 * Editor.mouse.delta.x
					Editor.cameraRotation.y -= 0.002 * Editor.mouse.delta.y

					// Limit vertical rotation to 90 degrees
					var pid2 = 1.57
					if (Editor.cameraRotation.y < -pid2) {
						Editor.cameraRotation.y = -pid2
					} else if (Editor.cameraRotation.y > pid2) {
						Editor.cameraRotation.y = pid2
					}

						Editor.setCameraRotation(Editor.cameraRotation, Editor.camera)
				}

				// Move Camera on X and Z
				else if (Editor.mouse.buttonPressed(Mouse.RIGHT)) {
					// Move speed
					var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 1000
					if (speed < 0.02) {
						speed = 0.02
					}

					// Move Camera Front and Back
					var angleCos = Math.cos(Editor.cameraRotation.x)
					var angleSin = Math.sin(Editor.cameraRotation.x)
					Editor.camera.position.z += Editor.mouse.delta.y * speed * angleCos
					Editor.camera.position.x += Editor.mouse.delta.y * speed * angleSin

					// Move Camera Lateral
					var angleCos = Math.cos(Editor.cameraRotation.x + MathUtils.pid2)
					var angleSin = Math.sin(Editor.cameraRotation.x + MathUtils.pid2)
					Editor.camera.position.z += Editor.mouse.delta.x * speed * angleCos
					Editor.camera.position.x += Editor.mouse.delta.x * speed * angleSin
				}

				// Move Camera on Y
				else if (Editor.mouse.buttonPressed(Mouse.MIDDLE)) {
					Editor.camera.position.y += Editor.mouse.delta.y * 0.1
				}

				// Move in camera direction using mouse scroll
				if (Editor.mouse.wheel !== 0) {
					// Move speed
					var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 2000
					speed *= Editor.mouse.wheel

					// Limit zoom speed
					if (speed < 0 && speed > -0.03) {
						speed = -0.03
					} else if (speed > 0 && speed < 0.03) {
						speed = 0.03
					}

					// Move camera
					var direction = Editor.camera.getWorldDirection()
					Editor.camera.position.x -= speed * direction.x
					Editor.camera.position.y -= speed * direction.y
					Editor.camera.position.z -= speed * direction.z
				}
			}
		}
	}
	// Update Scene if on test mode
	else if(Editor.state === Editor.STATE_TESTING) {
		Editor.programRunning.update()

        if(Editor.keyboard.keyJustPressed(Keyboard.F5)) {
            Editor.setState(Editor.STATE_EDITING)
        }
	}

	Editor.render()
}

// Render stuff into screen
Editor.render = function() {
	var renderer = Editor.renderer
	renderer.clear()

	if(Editor.state === Editor.STATE_EDITING) {
		// Render scene
		renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height)
		renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)
		renderer.render(Editor.program.scene, Editor.camera)

		// Render tools
		renderer.render(Editor.toolScene, Editor.camera)
		renderer.clearDepth()
		renderer.render(Editor.toolSceneTop, Editor.camera)

		// Render camera preview
		if(Settings.editor.cameraPreviewEnabled && (Editor.selectedObject instanceof THREE.Camera || Editor.program.scene.cameras.length > 0))
		{
			var width = Settings.editor.cameraPreviewPercentage * Editor.canvas.width
			var height = Settings.editor.cameraPreviewPercentage * Editor.canvas.height

			renderer.setScissorTest(true)
			var offset = Editor.canvas.width - width - 10
			renderer.setViewport(offset, 10, width, height)
			renderer.setScissor(offset, 10, width, height)
			renderer.clear()

            // Preview selected camera
			if (Editor.selectedObject instanceof THREE.Camera) {
				var camera = Editor.selectedObject
				camera.aspect = width / height
				camera.updateProjectionMatrix()

				renderer.setViewport(offset + width * camera.offset.x, 10 + height * camera.offset.y, width * camera.viewport.x, height * camera.viewport.y)
				renderer.setScissor(offset + width * camera.offset.x, 10 + height * camera.offset.y, width * camera.viewport.x, height * camera.viewport.y)

				renderer.render(Editor.program.scene, camera)
			}
            // Preview all the cameras in use
            else {
				var scene = Editor.program.scene
				for(var i = 0; i < scene.cameras.length; i++) {
					var camera = scene.cameras[i]
					camera.aspect = width / height
					camera.updateProjectionMatrix()

					if (camera.clearColor) {
						renderer.clearColor()
					}

					if (camera.clearDepth) {
						renderer.clearDepth()
					}

					renderer.setViewport(offset + width * camera.offset.x, 10 + height * camera.offset.y, width * camera.viewport.x, height * camera.viewport.y)
					renderer.setScissor(offset + width * camera.offset.x, 10 + height * camera.offset.y, width * camera.viewport.x, height * camera.viewport.y)
					renderer.render(scene, camera)
				}
			}

			renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)
		}
	} else if(Editor.state === Editor.STATE_TESTING) {
		Editor.programRunning.render(renderer, Editor.canvas.width, Editor.canvas.height)
	}

	//End performance measure
	if(Editor.stats !== null)
	{
		Editor.stats.end()
	}
}

//Resize to fit window
Editor.resize = function()
{
	if(!Editor.fullscreen)
	{
		Interface.updateInterface()
	}
}

//Select a object
Editor.selectObject = function(object) {
	if (object instanceof THREE.Object3D) {
		Editor.selectedObject = object

		Editor.selectObjectPanel()
		Editor.selectObjectHelper()

		if (Editor.tool !== null) {
			Editor.tool.detach()
			Editor.tool.attach(object)
		} else {
			Editor.selectTool(Editor.toolMode)
		}
	} else {
		Editor.selectedObject = null
		Editor.resetEditingFlags()
	}
}

//Add object to actual scene
Editor.addToScene = function(obj)
{
	if(Editor.program.scene !== null)
	{
		Editor.program.scene.add(obj);

        Editor.history.push(obj, Action.ADDED)
		
        Editor.updateObjectViews();
	}
}

//Check if object is selected
Editor.isObjectSelected = function(obj)
{
	if(Editor.selectedObject !== null)
	{
		return Editor.selectedObject.uuid === obj.uuid
	}
	return false
}

// Delete Selected Object
Editor.deleteObject = function(obj)
{
	if(obj === undefined) {
		obj = Editor.selectedObject
	}

	if(obj instanceof THREE.Object3D)
	{
		if(Editor.isObjectSelected(obj))
		{
			Editor.resetEditingFlags()
		}

        Editor.history.push(obj, Action.REMOVED)

		obj.destroy()

		Editor.updateObjectViews()
	}
}

//Copy selected object
Editor.copyObject = function(obj)
{
	if(obj !== undefined)
	{
		if(Editor.clipboard !== undefined)
		{
			Editor.clipboard.set(JSON.stringify(obj.toJSON()), "text")
		}
	}
	else if(Editor.selectedObject !== null && !(Editor.selectedObject instanceof Program || Editor.selectedObject instanceof Scene))
	{
        // If no object is passed, copy selected object
		if(Editor.clipboard !== undefined)
		{
			Editor.clipboard.set(JSON.stringify(Editor.selectedObject.toJSON()), "text")
		}
	}
}

//Cut selected object
Editor.cutObject = function(obj)
{
	if(obj === undefined)
	{
		if(Editor.selectedObject !== undefined && !(Editor.selectedObject instanceof Program || Editor.selectedObject instanceof Scene))
		{
            obj = Editor.selectedObject
        } else {
            return
        }
	}
    
    if(Editor.clipboard !== undefined) {
        Editor.clipboard.set(JSON.stringify(obj.toJSON()), "text")
    }

    Editor.history.push(obj, Action.REMOVED)
    obj.destroy()

    Editor.updateObjectViews()
    if(Editor.isObjectSelected(obj)) {
        Editor.resetEditingFlags() 
    }
}

//Paste object as children of target object
Editor.pasteObject = function(target)
{
	try
	{
		var content = Editor.clipboard.get("text");
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

        Editor.history.push(obj, Action.REMOVED)

		Editor.updateObjectViews();
	}
	catch(e){}
}

// Redo action
Editor.redo = function() {
	// TODO: This
}

// Undo action
Editor.undo = function() {
    var action = Editor.history.undo()
    
    if(action !== null) {
        Editor.updateObjectViews()

        if(action.type === Action.CHANGED) {
            if(action.object.uuid === Editor.selectedObject.uuid) {
                Editor.selectObject(action.object)
            }
        }
    } else {
        alert("Not possible to undo any further")
    }

}

// Update all object views
Editor.updateObjectViews = function() {
    Editor.updateTreeView()
    Editor.updateObjectPanel()
    Editor.updateTabsData()
    Editor.updateAssetExplorer()
}

//Update UI panel to match selected object
Editor.selectObjectPanel = function()
{
	Interface.treeView.updateSelectedObject(Editor.selectedObject)

	if(Interface.panel !== null)
	{
		Interface.panel.destroy()
	}

	if(Editor.selectedPanel !== null) {
		Interface.panel = new Panel(Interface.explorerResizable.divB)
		Interface.panel.attachObject(Editor.selectedObject)
		Interface.panel.updateInterface()
	}
	else
	{
		Interface.panel = null
	}
}

// Update tab names to match objects actual info
Editor.updateTabsData = function() {
	Interface.tab.updateMetadata()
}

//Update tree view to match actual scene
Editor.updateTreeView = function() {
	Interface.treeView.attachObject(Editor.program);
	Interface.treeView.updateView()
}

//Update assets explorer content
Editor.updateAssetExplorer = function()
{
	// Clean asset explorer
	Interface.assetExplorer.clear()
	
	Interface.foldersExplorer.clear()
	Interface.foldersExplorer.update()

	// Folders
	var folders = Editor.program.folders
	for(var i in folders) {
		var file = new FolderAsset(Interface.assetExplorer.element)
		file.setFolder(folders[i])
		Interface.assetExplorer.add(file)
	}

	// Materials
	var materials = ObjectUtils.getMaterials(Editor.program, Editor.program.materials)

	for(var i in materials) {
		var file = new MaterialAsset(Interface.assetExplorer.element)
		file.setMaterial(materials[i])
		Interface.assetExplorer.add(file)
	}

	// Objects
	var objects = Editor.program.assetObjects

	for(var i in objects) {
		var file = new BlockAsset(Interface.assetExplorer.element)
		file.setBlocks(objects[i])
		Interface.assetExplorer.add(file)
	}

	// Textures
	var textures = ObjectUtils.getTextures(Editor.program, Editor.program.textures)
	for(var i in textures) {
		var file = new TextureAsset(Interface.assetExplorer.element)
		file.setTexture(textures[i])
		Interface.assetExplorer.add(file)
	}

	// Fonts
	var fonts = ObjectUtils.getFonts(Editor.program, Editor.program.fonts)
	for(var i in fonts) {
		var file = new FontAsset(Interface.assetExplorer.element)
		file.setFont(fonts[i])
		Interface.assetExplorer.add(file)
	}

	// Audio
	var audio = ObjectUtils.getAudio(Editor.program, Editor.program.audio)
	for(var i in audio) {
		var file = new AudioAsset(Interface.assetExplorer.element)
		file.setAudio(audio[i])
		Interface.assetExplorer.add(file)
	}

	Interface.assetExplorer.updateInterface()
}

// Updates object panel values
Editor.updateObjectPanel = function() {
	if(Interface.panel !== null) {
		Interface.panel.updatePanel()
	}
}

// Create default resources to be used when creating new objects
Editor.createDefaultResources = function() {
	Editor.defaultImage = new GORLOT.Image("Source/Runtime/Data/sample.png")
	Editor.defaultFont = new Font("Source/Runtime/Data/Fonts/montserrat.json")
	Editor.defaultAudio = new Audio("Source/Runtime/Data/sample.ogg")
	Editor.defaultTexture = new Texture(Editor.defaultImage)
	Editor.defaultMaterial = new MeshStandardMaterial({roughness: 0.6, metalness: 0.2})
	Editor.defaultMaterial.name = "default"
	Editor.defaultSpriteMaterial = new SpriteMaterial({map: Editor.defaultTexture, color: 0xffffff})
	Editor.defaultSpriteMaterial.name = "default"
}

// Select tool to manipulate objects
Editor.selectTool = function(tool) {
	Editor.toolMode = tool
	Editor.toolContainer.removeAll()

	if (Editor.tool !== null) {
		Editor.tool.dispose()
	}

	for(var i = 0; i < Interface.tab.options.length; i++) {
		if (Interface.tab.options[i].component instanceof SceneEditor) {
			Interface.tab.options[i].component.updateInterface()
			break;
		}
	}

	if (Editor.selectedObject !== null && tool !== Editor.MODE_SELECT) {
		if(tool === Editor.MODE_MOVE) {
			Editor.tool = new TransformControls()
			Editor.tool.setMode("translate")
			Editor.tool.setSpace(Settings.editor.transformationSpace)
		}
		else if(tool === Editor.MODE_SCALE) {
			Editor.tool = new TransformControls()
			Editor.tool.setMode("scale")
		}
		else if (tool === Editor.MODE_ROTATE) {
			Editor.tool = new TransformControls()
			Editor.tool.setMode("rotate")
			Editor.tool.setSpace(Settings.editor.transformationSpace)
		}

		Editor.tool.attach(Editor.selectedObject)
		Editor.toolContainer.add(Editor.tool)
	} else {
		Editor.tool = null
	}

    if(Editor.program !== null) {
        var tab = Interface.tab.getTab(SceneEditor, Editor.program.scene)
        if(tab !== null) {
            tab.updateInterface()
        }
    }
}

// Select helper to debug selected object data
Editor.selectObjectHelper = function() {
	Editor.objectHelper.removeAll()

	if(Editor.selectedObject !== null) {
		// Camera
		if(Editor.selectedObject instanceof THREE.Camera) {
			Editor.objectHelper.add(new THREE.CameraHelper(Editor.selectedObject))
			Editor.objectHelper.add(new ObjectIconHelper(Editor.selectedObject, Interface.fileDir + "Icons/Camera/Camera.png"))
		}
        // Light
        else if(Editor.selectedObject instanceof THREE.Light) {
            // Directional light
            if(Editor.selectedObject instanceof THREE.DirectionalLight) {
                Editor.objectHelper.add(new THREE.DirectionalLightHelper(Editor.selectedObject, 1))
            }
            // Point light
            else if(Editor.selectedObject instanceof THREE.PointLight) {
                Editor.objectHelper.add(new THREE.PointLightHelper(Editor.selectedObject, 1))
            }
            // RectArea Light
            else if(Editor.selectedObject instanceof THREE.RectAreaLight) {
                Editor.objectHelper.add(new RectAreaLightHelper(Editor.selectedObject))
            }
            // Spot light
            else if(Editor.selectedObject instanceof THREE.SpotLight) {
                Editor.objectHelper.add(new THREE.SpotLightHelper(Editor.selectedObject))
            }
            // Hemisphere light
            else if(Editor.selectedObject instanceof THREE.HemisphereLight) {
                Editor.objectHelper.add(new THREE.HemisphereLightHelper(Editor.selectedObject, 1))
            }
        }
		// Particle
		else if(Editor.selectedObject instanceof ParticleEmitter) {
			Editor.objectHelper.add(new ParticleEmitterHelper(Editor.selectedObject))
		}
		// Physics
		else if(Editor.selectedObject instanceof PhysicsObject) {
			Editor.objectHelper.add(new PhysicsObjectHelper(Editor.selectedObject))
		}
		// Scripts
		else if (Editor.selectedObject instanceof Script || Editor.selectedObject instanceof THREE.Audio || Editor.selectedObject instanceof BlockScript) {
			Editor.objectHelper.add(new ObjectIconHelper(Editor.selectedObject, ObjectIcons.get(Editor.selectedObject.type)))
		}
		// Animated Mesh
		else if (Editor.selectedObject instanceof THREE.SkinnedMesh) {
            Editor.objectHelper.add(new WireframeHelper(Editor.selectedObject, 0xFFFF00))
			Editor.objectHelper.add(new THREE.SkeletonHelper(Editor.selectedObject))
		}
		// Mesh
		else if (Editor.selectedObject instanceof THREE.Mesh) {
			Editor.objectHelper.add(new WireframeHelper(Editor.selectedObject))
		}
		// Object Caller
		else if (Editor.selectedObject instanceof ObjectCaller) {
			// By default, the object caller will only have the ObjectIconHelper
			Editor.objectHelper.add(new ObjectIconHelper(Editor.selectedObject, ObjectIcons.get(Editor.selectedObject.objType)))
		}
		// Object 3D
		else if(Editor.selectedObject instanceof THREE.Object3D) {
			Editor.objectHelper.add(new BoundingBoxHelper(Editor.selectedObject, 0xFFFF00))
		}
	}
}

// Resize Camera
Editor.resizeCamera = function() {
	if(Editor.canvas !== null && Editor.renderer !== null) {
		Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height)
		Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height
		Editor.camera.updateProjectionMatrix();

		if(Editor.state === Editor.STATE_TESTING) {
			Editor.programRunning.resize(Editor.canvas.width, Editor.canvas.height)
		}
	}
}

// Set camera mode (orthographic/perspective)
Editor.setCameraMode = function(mode) {

	if (mode === undefined) {
		mode = (Editor.cameraMode === Editor.CAMERA_PERSPECTIVE) ? Editor.CAMERA_ORTHOGRAPHIC : Editor.CAMERA_PERSPECTIVE
	}

	var aspect = (Editor.canvas !== null) ? Editor.canvas.width/Editor.canvas.height : 1.0

	if (mode === Editor.CAMERA_ORTHOGRAPHIC) {
		Editor.camera = new OrthographicCamera(10, aspect, OrthographicCamera.RESIZE_HORIZONTAL)
		Editor.camera.position.set(0, 0, 100)
		Editor.gridHelper.rotation.x = Math.PI / 2
	} else if (mode === Editor.CAMERA_PERSPECTIVE) {
		Editor.camera = new PerspectiveCamera(60, aspect)
		Editor.camera.position.set(0, 10, 30)
		Editor.cameraRotation.set(3.14, 0)
		Editor.gridHelper.rotation.x = 0
		Editor.setCameraRotation(Editor.cameraRotation, Editor.camera)
	}

	Editor.cameraMode = mode
	Editor.selectTool(Editor.toolMode)
}

// Set camera rotation
Editor.setCameraRotation = function(cameraRotation, camera) {
	// Calculate direction vector
	var cosAngleY = Math.cos(cameraRotation.y)
	var direction = new THREE.Vector3(Math.sin(cameraRotation.x)*cosAngleY, Math.sin(cameraRotation.y), Math.cos(cameraRotation.x)*cosAngleY)

	// Add position offset and set camera direction
	direction.add(camera.position)
	camera.lookAt(direction)
}

//Update raycaster position from editor mouse position
Editor.updateRaycasterFromMouse = function() {
	var mouse = new THREE.Vector2((Editor.mouse.position.x/Editor.canvas.width)*2 - 1, -(Editor.mouse.position.y/Editor.canvas.height)*2 + 1)
	Editor.raycaster.setFromCamera(mouse, Editor.camera)
}

// Select objects with mouse
Editor.selectObjectWithMouse = function() {
	Editor.updateRaycasterFromMouse()
	var intersects = Editor.raycaster.intersectObjects(Editor.program.scene.children, true)
	if (intersects.length > 0) {
		Editor.selectObject(intersects[0].object)
	}
}

// Update editor raycaster with new x and y positions (normalised -1 to 1)
Editor.updateRaycaster = function(x, y) {
	Editor.raycaster.setFromCamera(new THREE.Vector2(x, y), Editor.camera)
}

// Reset editing flags
Editor.resetEditingFlags = function() {
	Editor.selectedObject = null
	Editor.isEditingObject = false
	
	if (Interface.panel !== null) {
		Interface.panel.destroy()
		Interface.panel = null
	}

	Editor.selectTool(Editor.MODE_SELECT)
	Editor.selectObjectHelper()
}

// Create new Program
Editor.createNewProgram = function() {
	Editor.createDefaultResources()

	// Create new program
	Editor.program = new Program()
	Editor.program.addDefaultScene(Editor.defaultMaterial)
	Editor.resetEditingFlags()

    // Reset open file
    Editor.setOpenFile(null)

    // Reset the folder explorer tree
	Interface.foldersExplorer.clear()
    Editor.CURRENT_PATH = "/"
	
    //Remove old tabs from interface
	if(Interface.tab !== undefined)
	{
		Interface.tab.clear()
        var scene = Interface.tab.addTab(SceneEditor, true)
        scene.attach(Editor.program.scene)
		Interface.tab.selectTab(0)
	}
}

//Save program to file
Editor.saveProgram = function(fname, compressed, keepDirectory)
{
    if(fname === undefined && Editor.openFile !== null) {
        fname = Editor.openFile
    }

    // If compressed, don't store the resources
	if (compressed) {
		var json = JSON.stringify(Editor.program.toJSON())
	} else {
		var output = Editor.program.toJSON()
		var json = JSON.stringify(output, null, "\t").replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")
	}

	FileSystem.writeFile(fname, json)

    if(keepDirectory !== true && Editor.openFile !== fname) {
        Editor.setOpenFile(fname)
    }
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
	var data = JSON.parse(FileSystem.readFile(fname));
	var program = loader.parse(data);
	Editor.program = program;
	Editor.resetEditingFlags()
	
	//Remove old tabs from interface
	Interface.tab.clear();

    // Clears the old Folder tree
    Interface.foldersExplorer.clear()
    Editor.CURRENT_PATH = "/"

    // Set open file
    Editor.setOpenFile(fname)

	//Add new scene tab to interface
	if(Editor.program.scene !== null)
	{
        var scene = Interface.tab.addTab(SceneEditor, true)
        scene.attach(Editor.program.scene)
		Interface.tab.selectTab(0);
	}
}

// Set currently open file (also updates the editor title)
Editor.setOpenFile = function(fname) {
    Editor.openFile = (fname !== undefined) ? fname : null

    if(fname === null) {
        document.title = GORLOT.NAME + " " + GORLOT.VERSION + " (" + GORLOT.TIMESTAMP + ")"
    } else {
        document.title = GORLOT.NAME + " " + GORLOT.VERSION + " (" + GORLOT.TIMESTAMP + ") (" + fname + ")"
    }
}

//Export web project
Editor.exportWebProject = function(dir)
{
	FileSystem.makeDirectory(dir)
	FileSystem.copyFile("../Binaries/Runtime/vr.png", dir + "/vr.png")
	FileSystem.copyFile("../Binaries/Runtime/fullscreen.png", dir + "/fullscreen.png")
	FileSystem.copyFile("../Binaries/Runtime/index.html", dir + "/index.html")
	FileSystem.copyFile("../Binaries/Gorlot.min.js", dir + "/Gorlot.min.js")

	Editor.saveProgram(dir + "/app.isp", true, true)
}

//Export windows project
Editor.exportWindowsProject = function(dir)
{
	Editor.exportWebProject(dir);

	FileSystem.copyFolder("nwjs", dir + "/nwjs")
	FileSystem.writeFile(dir + "/package.json", JSON.stringify({name: Editor.program.name,main: "index.html",window:{frame: true}}))
}

// Get an asset through its UUID
Editor.getAssetByUUID = function(uuid) {
	if (Interface.assetExplorer.files !== undefined && Interface.assetExplorer.files.length > 0) {
		for(var i = 0; i < Interface.assetExplorer.files.length; i++) {

			// If it's a file
			if (Interface.assetExplorer.files[i].material !== undefined) {
				if (Interface.assetExplorer.files[i].material.uuid === uuid) {
					return Interface.assetExplorer.files[i].material
				}
			}

		}
	}
}

// Set editor state
Editor.setState = function(state) {
	if(state === Editor.STATE_EDITING) {
		// Dispose running program
		Editor.disposeRunningProgram()

		// Set run button text
		Interface.run.setText("Run")
		Interface.run.visible = true
		Interface.run.updateInterface()

		// Hide fullscreen and VR buttons
		var tab = Interface.tab.getActual()
		if(tab instanceof SceneEditor) {
			tab.showButtonsTools = true
			tab.showButtonsFullscreen = false
			tab.showButtonsVr = false
			tab.updateInterface()
		}
	} else if(state === Editor.STATE_TESTING) {
		// Register all the nodes
		Register.registerAll()

		// Copy program
		Editor.programRunning = Editor.program.clone()

		// Use editor camera as default camera for program
		Editor.programRunning.defaultCamera = Editor.camera
        Editor.programRunning.setRenderer(Editor.renderer)

		// Initialize scene
        Editor.programRunning.setMouseKeyboard(Editor.mouse, Editor.keyboard)
		Editor.programRunning.initialize()
		Editor.programRunning.resize(Editor.canvas.width, Editor.canvas.height)

		//Show full screen and VR buttons
		var tab = Interface.tab.getActual()
		tab.showButtonsFullscreen = true
		tab.showButtonsTools = false

		// If program uses VR display button
		if(Editor.programRunning.vr) {
			if(GORLOT.WebVRAvailable()) {
				// Show VR button
				tab.showButtonsVr = true

				// Create VR switch callback
				var vr = true
				tab.vrButton.setCallback(function() {
                    if(vr) {
                        Editor.programRunning.displayVR()
                    } else {
                        Editor.programRunning.exitVR()
                    }

                    vr = !vr
				})
			}
		}

		// Update tab to show buttons
		tab.updateInterface()

		// Set renderer size
		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height)
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)

		// Set run button text
		Interface.run.setText("Stop")
		Interface.run.visible = true
		Interface.run.updateInterface()
	} else if(state === Editor.STATE_IDLE) {
		// Dispose running program
		Editor.disposeRunningProgram()

		// Hide run button
		Interface.run.visible = false
		Interface.run.updateInterface()
	}

	// Set editor state
	Editor.state = state
}

//Dispose running program if there is one
Editor.disposeRunningProgram = function() {
	// Dispose running program if there is one
	if(Editor.programRunning !== null) {
		Editor.programRunning.dispose()
		Editor.programRunning = null
	}

	// Unlock mouse
	Editor.mouse.setLock(false)
}

//Set performance meter to be used
Editor.setPerformanceMeter = function(stats)
{
	Editor.stats = stats;
}

//Set render canvas
Editor.setRenderCanvas = function(canvas)
{
	Editor.mouse.setCanvas(canvas);
	Editor.initializeRenderer(canvas);
}

//Initialize renderer
Editor.initializeRenderer = function(canvas)
{
    if(canvas === undefined) {
        canvas = Editor.canvas
    } else {
        Editor.canvas = canvas
    }

    // Get rendering quality settings
    var antialiasing = Settings.render.followProject ? Editor.program.antialiasing : Settings.render.antialiasing
    var shadows = Settings.render.followProject ? Editor.program.shadows : Settings.render.shadows
    var shadowsType = Settings.render.followProject ? Editor.program.shadowsType : Settings.render.shadowsType

    // Dispose old render
    if(Editor.renderer !== null) {
        Editor.renderer.dispose()
    }

    // Create renderer
    Editor.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: antialiasing })
	Editor.renderer.setSize(canvas.width, canvas.height)
    Editor.renderer.shadowMap.enabled = shadows
    Editor.renderer.shadowMap.type = shadowsType
	Editor.renderer.autoClear = false;

    // Get WebGL Context
	Editor.gl = Editor.renderer.context
}

// Set fullscreen mode
Editor.setFullscreen = function(fullscreen, element) {
	Editor.fullscreen = fullscreen

	if (fullscreen) {
		if (element === undefined) {
			element = document.body
		}

		element.requestFullscreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen

		if (element.requestFullscreen) {
			element.requestFullscreen()
		}
	} else {
		document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen

		if (document.exitFullscreen) {
			document.exitFullscreen()
		}
	}
}

// Opens a different window
Editor.openWindow = function(options) {
	
	var title = (options.title !== undefined) ? options.title : Editor.NAME
	var w = (options.width !== undefined) ? options.width : 800
	var h = (options.height !== undefined) ? options.height : 600

	var wind = window.open("", "", "width="+w+", height="+h+", location=no, status=no, menubar=no, titlebar=no, fullscreen=yes")
	wind.document.write(`<head><title>${title}</title></head><body oncontextmenu='return false'></body>`)

	// transfer files
	wind.document.write("<script src='Editor/Editor.js'></script>")

	wind.document.close()

	wind.window.editor = Editor

	return wind
}

// Check if WebVR is available
Editor.webvrAvailable = function() {
    return navigator.getVRDisplays !== undefined
}

//Exit editor
Editor.exit = function()
{
	Settings.store()

	if (Editor.gui !== undefined) {
		Editor.gui.App.closeAllWindows()
		Editor.gui.App.quit()
		process.exit()
	}
}

// Include javascript or css file in project
function include(file, onload) {
	if(file.endsWith(".js")) {
		var js = document.createElement("script")
		js.src = file
		js.type = "text/javascript"
		js.async = false

		if(onload) {
			js.onload = onload;
		}

		document.body.appendChild(js)
	} else if(file.endsWith(".css")) {
		var css = document.createElement("link")
		css.href = file
		css.rel = "stylesheet"
		document.body.appendChild(css)
	} else if(file.endsWith("*")) {
		if(Editor.fs !== undefined) {
			var directory = file.replace("*", "")
			var files = Editor.fs.readdirSync(directory)
			for(var i = 0; i < files.length; i++) {
				include(directory + files[i])
			}
		}
	} else {
		if(Editor.fs !== undefined) {
			var directory = file + "/"
			try {
				var files = Editor.fs.readdirSync(directory)
				for(var i = 0; i < files.length; i++) {
					include(directory + files[i])
				}
			}
			catch(e){}
		}
	}
} 
