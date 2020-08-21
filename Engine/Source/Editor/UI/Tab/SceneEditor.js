"use strict"

function SceneEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Scene", "Source/Editor/Files/Icons/Misc/Scene.png")

	// Canvas
	this.canvas = document.createElement("canvas")
	this.canvas.style.position = "absolute"
	this.element.appendChild(this.canvas)

	// Performance meter
	this.stats = new Stats()
	this.stats.dom.style.position = "absolute"
	this.stats.dom.style.left = "0px"
	this.stats.dom.style.top = "0px"
	this.stats.dom.style.zIndex = "0"
	this.element.appendChild(this.stats.dom)

	// Self pointer
	var self = this

	// Drop event
	this.canvas.ondrop = function(event) {
		event.preventDefault()

		if(self.scene !== null) {
			// Canvas element
			var canvas = self.element
			var rect = canvas.getBoundingClientRect()

			// Update raycaster direction
			var position = new THREE.Vector2(event.clientX - rect.left, event.clientY - rect.top)
			Editor.updateRaycaster(position.x / self.canvas.width * 2 - 1, -2 * position.y / self.canvas.height + 1)

			// Get object from drag buffer
			var uuid = event.dataTransfer.getData("uuid")
			var draggedObject = DragBuffer.popDragElement(uuid)

			// Check intersected objects
			var intersections = Editor.raycaster.intersectObjects(self.scene.children, true)

			// Dragged file into object
			if (intersections.length > 0 && event.dataTransfer.files.length > 0) {
				var file = event.dataTransfer.files[0]
                var name = FileSystem.getFileName(file.path)
                var object = intersections[0].object

				// Image
				if (file.type.startsWith("image")) {
					if (object instanceof THREE.Mesh) {
						// Create new material with selected image
						var texture = new Texture(file.path)
                        texture.name = name
                        
						var material = new MeshStandardMaterial({map: texture, color: 0xffffff, roughness: 0.6, metalness: 0.2})
						material.name = name
                        material.path = Editor.CURRENT_PATH
						object.material = material

						// Update asset explorer
						Editor.updateObjectViews()
					} else if (object instanceof THREE.Sprite) {
						// Create new material with selected image
						var texture = new Texture(file.path)
                        texture.name = name

						var material = new SpriteMaterial({map: texture, color: 0xffffff})
						material.name = name
                        material.path = Editor.CURRENT_PATH
						object.material = material

						Editor.updateObjectViews()
					}
				}
				// Video
				else if (file.type.startsWith("video")) {
					if (object instanceof THREE.Mesh) {
						var texture = new VideoTexture(file.path)
                        texture.name = name

						var material = new MeshStandardMaterial({map: texture, color: 0xffffff, roughness: 0.6, metalness: 0.2})
						material.name = name
                        material.path = Editor.CURRENT_PATH
						object.material = material
						Editor.updateObjectViews()
					} else if (object instanceof THREE.Sprite) {
						var texture = new VideoTexture(file.path)
                        texture.name = name

						var material = new SpriteMaterial({map: texture, color: 0xffffff})
						material.name = name
                        material.path = Editor.CURRENT_PATH
						Editor.updateObjectViews()
					}
				}
                // Font
                else if(FontLoader.fileIsFont(file.path)) {
                    if(object.font !== undefined) {
                        var font = new Font(file.path)
                        object.setFont(font)
                        Editor.updateObjectViews()
                    }
                }
			}
			// Dragged resource into object
			else if (intersections.length > 0 && draggedObject !== null) {
				var object = intersections[0].object

				if (draggedObject instanceof SpriteMaterial) {
					if (object instanceof THREE.Sprite) {
						object.material = draggedObject
						Editor.updateObjectViews()
					}
				} else if (draggedObject instanceof THREE.Material) {
					if (object instanceof THREE.Mesh) {
						object.material = draggedObject
						Editor.updateObjectViews()
					}
				} else if(draggedObject instanceof THREE.Texture) {
                    if(object instanceof THREE.Mesh) {
                        var material = new MeshStandardMaterial({ map: draggedObject, color: 0xffffff, roughness: 0.6, metalness: 0.2 })
                        material.path = Editor.CURRENT_PATH
                        object.material = material
                        Editor.updateObjectViews()
                    } else if(object instanceof THREE.Sprite) {
                        var material = new SpriteMaterial({ map: draggedObject, color: 0xffffff })
                        material.path = Editor.CURRENT_PATH
                        object.material = material
                        Editor.updateObjectViews()
                    }
                }else if (draggedObject instanceof Font) {
					if (object.font !== undefined) {
						object.setFont(draggedObject)
						Editor.updateObjectViews()
					}
				}
			}
			// Create an object caller
			else if (draggedObject !== null) {
				var obj = new ObjectCaller()
				obj.setObject(draggedObject)
				Editor.addToScene(obj)
			}
		}
	}

	// Prevent deafault when object dragged over
	this.canvas.ondragover = function(event) {
		event.preventDefault()
	}

	// Buttons
	this.showButtonsFullscreen = false
	this.showButtonsTools = false
	this.showButtonsVr = false

	// Fullscreen button
	this.fullscreenButton = new ButtonImage(this.element)
	this.fullscreenButton.size.set(25, 25)
	this.fullscreenButton.setImage("Source/Editor/Files/Icons/Misc/Fullscreen.png")
	this.fullscreenButton.visible = false
	this.fullscreenButton.updateInterface()
	this.fullscreenButton.element.onmouseenter = function() {
		self.fullscreenButton.img.style.opacity = 0.5
	}
	this.fullscreenButton.element.onmouseleave = function() {
		self.fullscreenButton.img.style.opacity = 1.0
	}

	var fullscreen = true
	this.fullscreenButton.setCallback(function() {
		self.setFullscreen(fullscreen)
		fullscreen = !fullscreen
	})

	// Select tool
	this.toolSelectButton = new ButtonImage(this.element)
	this.toolSelectButton.size.set(15, 15)
	this.toolSelectButton.setImage("Source/Editor/Files/Icons/Tools/Select.png")
    this.toolSelectButton.setAltText("Select tool")
	this.toolSelectButton.visible = false
	this.toolSelectButton.updateInterface()

	this.toolSelectButton.element.onmouseenter = function() {
		self.toolSelectButton.img.style.opacity = 0.5
	}
	this.toolSelectButton.element.onmouseleave = function() {
		self.toolSelectButton.img.style.opacity = 1
	}

	this.toolSelectButton.setCallback(() => {
		Editor.selectTool(Editor.MODE_SELECT)

		self.updateInterface()
	})

	// Move tool
	this.toolMoveButton = new ButtonImage(this.element)
	this.toolMoveButton.size.set(15, 15)
	this.toolMoveButton.setImage("Source/Editor/Files/Icons/Tools/Move.png")
    this.toolMoveButton.setAltText("Move tool")
	this.toolMoveButton.visible = false
	this.toolMoveButton.updateInterface()
	this.toolMoveButton.img.style.filter = "contrast(0%)"

	this.toolMoveButton.element.onmouseenter = function() {
		self.toolMoveButton.img.style.opacity = 0.5
	}

	this.toolMoveButton.element.onmouseleave = function() {
		self.toolMoveButton.img.style.opacity = 1
	}

	this.toolMoveButton.setCallback(() => {
		Editor.selectTool(Editor.MODE_MOVE)

		self.updateInterface()
	})

	// Rotate tool
	this.toolRotateButton = new ButtonImage(this.element)
	this.toolRotateButton.size.set(15, 15)
	this.toolRotateButton.setImage("Source/Editor/Files/Icons/Tools/Rotate.png")
    this.toolRotateButton.setAltText("Rotate tool")
	this.toolRotateButton.visible = false
	this.toolRotateButton.updateInterface()
	this.toolRotateButton.img.style.filter = "contrast(0%)"

	this.toolRotateButton.element.onmouseenter = function() {
		self.toolRotateButton.img.style.opacity = 0.5
	}

	this.toolRotateButton.element.onmouseleave = function() {
		self.toolRotateButton.img.style.opacity = 1
	}

	this.toolRotateButton.setCallback(() => {
		Editor.selectTool(Editor.MODE_ROTATE)

		self.updateInterface()
	})

	// Scale tool
	this.toolScaleButton = new ButtonImage(this.element)
	this.toolScaleButton.size.set(15, 15)
	this.toolScaleButton.setImage("Source/Editor/Files/Icons/Tools/Resize.png")
    this.toolScaleButton.setAltText("Scale tool")
	this.toolScaleButton.visible = false
	this.toolScaleButton.updateInterface()
	this.toolScaleButton.img.style.filter = "contrast(0%)"

	this.toolScaleButton.element.onmouseenter = function() {
		self.toolScaleButton.img.style.opacity = 0.5
	}

	this.toolScaleButton.element.onmouseleave = function() {
		self.toolScaleButton.img.style.opacity = 1
	}

	this.toolScaleButton.setCallback(() => {
		Editor.selectTool(Editor.MODE_SCALE)

		self.updateInterface()
	})

	// Switch 2D
	this.cameraButton2d = new ButtonImage(this.element)
	this.cameraButton2d.size.set(15, 15)
	this.cameraButton2d.setImage("Source/Editor/Files/Icons/Misc/2D.png")
    this.cameraButton2d.setAltText("Change camera to 2D mode")
	this.cameraButton2d.visible = true
	this.cameraButton2d.updateInterface()
	this.cameraButton2d.img.style.filter = "contrast(0%)"

	this.cameraButton2d.element.onmouseenter = function() {
		self.cameraButton2d.img.style.opacity = 0.5
	}

	this.cameraButton2d.element.onmouseleave = function() {
		self.cameraButton2d.img.style.opacity = 1
	}

	this.cameraButton2d.setCallback(() => {
		Editor.setCameraMode(Editor.CAMERA_ORTHOGRAPHIC)

		self.cameraButton2d.img.style.filter = "contrast(100%)"
		self.cameraButton3d.img.style.filter = "contrast(0%)"
	})

	// Switch 3D
	this.cameraButton3d = new ButtonImage(this.element)
	this.cameraButton3d.size.set(15, 15)
	this.cameraButton3d.setImage("Source/Editor/Files/Icons/Misc/3D.png")
    this.cameraButton3d.setAltText("Change camera to 3D mode")
	this.cameraButton3d.visible = true
	this.cameraButton3d.updateInterface()
	this.cameraButton3d.img.style.filter = "contrast(100%)"

	this.cameraButton3d.element.onmouseenter = function() {
		self.cameraButton3d.img.style.opacity = 0.5
	}

	this.cameraButton3d.element.onmouseleave = function() {
		self.cameraButton3d.img.style.opacity = 1
	}

	this.cameraButton3d.setCallback(() => {
		Editor.setCameraMode(Editor.CAMERA_PERSPECTIVE)

		self.cameraButton2d.img.style.filter = "contrast(0%)"
		self.cameraButton3d.img.style.filter = "contrast(100%)"
	})

	// VR button
	this.vrButton = new ButtonImage(this.element)
	this.vrButton.size.set(25, 25)
	this.vrButton.setImage("Source/Editor/Files/Icons/Misc/VR.png")
	this.vrButton.visible = false
	this.vrButton.updateInterface()
	this.vrButton.element.onmouseenter = function() {
		self.vrButton.img.style.opacity = 0.5
	}
	this.vrButton.element.onmouseleave = function() {
		self.vrButton.img.style.opacity = 1.0
	}

	// Scene
	this.scene = null
}

SceneEditor.prototype = Object.create(TabElement.prototype)

// Update container object data
SceneEditor.prototype.updateMetadata = function() {
	if(this.scene !== null) {
        this.setName(this.scene.name)

        var scenes = Editor.program.children
        for(var i = 0; i < scenes.length; i++) {
            if(this.scene.uuid === scenes[i].uuid) {
                return
            }

            if(i >= scenes.length) {
                this.close()
            }
        }
	}
}

// Set fullscreen mode
SceneEditor.prototype.setFullscreen = function(value) {
	// Apply fullscreen mode
	if(value) {
		// Set to fullscreen mode
		Editor.setFullscreen(true, this.element)

		this.element.style.zIndex = 10000
		this.position.set(0, 0)
		this.size.set(window.screen.width, window.screen.height)
		this.updateInterface()

		Editor.resizeCamera()
	} else {
		//  Leave fullscreen mode
		Editor.setFullscreen(false)
	
		// Restore elements
		this.element.style.zIndex = 0
		Interface.updateInterface()
	}
}

// Activate scene editor
SceneEditor.prototype.activate = function() {
    if(this.scene !== null ){
        Editor.program.scene = this.scene
    }
	Editor.setPerformanceMeter(this.stats)
	Editor.setRenderCanvas(this.canvas)
	Editor.setState(Editor.STATE_EDITING)
	Editor.resetEditingFlags()
	Editor.resize()
}

// Set scene
SceneEditor.prototype.attach = function(scene) {
	this.scene = scene
    this.updateMetadata()
}

// Check if scene is attached
SceneEditor.prototype.isAttached = function(scene) {
    return this.scene === scene
}

// Update SceneEditor
SceneEditor.prototype.update = function(){
    // TODO: This
}

// Update division Size
SceneEditor.prototype.updateInterface = function() {
	// Set visibilty
	if(this.visible) {
		this.element.style.visibility = "visible"
		this.canvas.style.visibility = "visible"

		if(Settings.general.showStats) {
			this.stats.dom.style.visibility = "visible"
		} else {
			this.stats.dom.style.visibility = "hidden"
		}

	} else {
		this.element.style.visibility = "hidden"
		this.canvas.style.visibility = "hidden"
		this.stats.dom.style.visibility = "hidden"
	}

	// Fullscreen button
	this.fullscreenButton.position.x = this.position.x + this.size.x - this.fullscreenButton.size.x - 5
	this.fullscreenButton.position.y = this.position.y + this.size.y - this.fullscreenButton.size.y - 5
	this.fullscreenButton.visible = this.visible && this.showButtonsFullscreen
	this.fullscreenButton.updateInterface()

	// Tools buttons

	this.toolSelectButton.img.style.filter = "contrast(0%)"
	this.toolMoveButton.img.style.filter = "contrast(0%)"
	this.toolRotateButton.img.style.filter = "contrast(0%)"
	this.toolScaleButton.img.style.filter = "contrast(0%)"

	if (Editor.toolMode === Editor.MODE_SELECT) {
		this.toolSelectButton.img.style.filter = "contrast(100%)"
	} else if (Editor.toolMode === Editor.MODE_MOVE) {
		this.toolMoveButton.img.style.filter = "contrast(100%)"
	} else if (Editor.toolMode === Editor.MODE_ROTATE) {
		this.toolRotateButton.img.style.filter = "contrast(100%)"
	} else if (Editor.toolMode === Editor.MODE_SCALE) {
		this.toolScaleButton.img.style.filter = "contrast(100%)"
	}

	this.toolSelectButton.position.x = this.position.x + this.size.x - this.toolSelectButton.size.x - (this.toolMoveButton.size.x + this.toolRotateButton.size.x + this.toolScaleButton.size.x) - 90
	this.toolSelectButton.position.y = this.position.y - this.toolSelectButton.size.y + 30
	this.toolSelectButton.visible = this.visible && this.showButtonsTools
	this.toolSelectButton.updateInterface()

	this.toolMoveButton.position.x =  this.position.x + this.size.x - this.toolMoveButton.size.x - (this.toolRotateButton.size.x + this.toolScaleButton.size.x) - 80 
	this.toolMoveButton.position.y = this.toolSelectButton.position.y
	this.toolMoveButton.visible = this.visible && this.showButtonsTools
	this.toolMoveButton.updateInterface()

	this.toolRotateButton.position.x = this.position.x + this.size.x - this.toolRotateButton.size.x - this.toolScaleButton.size.x - 70
	this.toolRotateButton.position.y = this.toolSelectButton.position.y
	this.toolRotateButton.visible = this.visible && this.showButtonsTools
	this.toolRotateButton.updateInterface()

	this.toolScaleButton.position.x = this.position.x + this.size.x - this.toolScaleButton.size.x - 60
	this.toolScaleButton.position.y = this.toolSelectButton.position.y
	this.toolScaleButton.visible = this.visible && this.showButtonsTools
	this.toolScaleButton.updateInterface()

	// Switch 2D button
	this.cameraButton2d.position.x = this.position.x + this.size.x - 40
	this.cameraButton2d.position.y = this.toolSelectButton.position.y
    this.cameraButton2d.visible = this.visible && this.showButtonsTools
	this.cameraButton2d.updateInterface()

	// Switch 3D button
	this.cameraButton3d.position.x = this.position.y + this.size.x - 20
	this.cameraButton3d.position.y = this.toolSelectButton.position.y
    this.cameraButton3d.visible = this.visible && this.showButtonsTools
	this.cameraButton3d.updateInterface()

	// VR button
	this.vrButton.position.x = this.fullscreenButton.position.x - this.vrButton.size.x - 10
	this.vrButton.position.y = this.fullscreenButton.position.y
	this.vrButton.visible = this.visible && this.showButtonsVr
	this.vrButton.updateInterface()

	// Update canvas
	this.canvas.width = this.size.x
	this.canvas.height = this.size.y
	this.canvas.style.width = this.size.x + "px"
	this.canvas.style.height = this.size.y + "px"

	// Update element
	this.element.style.top = this.position.y + "px"
	this.element.style.left = this.position.x + "px"
	this.element.style.width = this.size.x + "px"
	this.element.style.height = this.size.y + "px"
}
