"use strict"

/*
 * Program class contains all the data of a Gorlot program
 * Program is also used to store and manage all available resource
 *
 * @class Program
 * @module Core
 * @constructor
 * @param {String} name Program name
 * @extends {Object3D}
 * @extends {ResourceManager}
 */
function Program(name)
{
	THREE.Object3D.call(this)
    ResourceManager.call(this)

	this.type = "Program"

	// Disable matrix auto update
	this.matrixAutoUpdate = false

    /**
     * GorlotApp instance, used to communication between an app and the host webpage
     * @property app
     * @default null
     */
    this.app = null

	// Program Info
	this.name = (name !== undefined) ? name : "program"

    /**
     * Program description
     * @property description
     * @type {String}
     */
	this.description = ""

    /**
     * Program author
     * @property author
     * @type {String}
     */
	this.author = ""

    /**
     * Program version
     * @property version
     * @type {String}
     * @default "0"
     */
	this.version = "0"

    /**
     * Flag to control pointer locking
     * @property lockPointer
     * @type {Boolean}
     * @default false
     */
	this.lockPointer = false
	
	// VR flags
    /**
     * Enable virtual reality flag
     * @property vr
     * @default false
     * @type {Boolean}
     */
	this.vr = false
    
    /**
     * Virtual reality movement scale
     * @property vrScale
     * @default 1.0
     * @type {Number}
     */
	this.vrScale = 1

	// Render quality
    /**
     * If true, the program is rendered with antialiasing
     * @property antialiasing
     * @type {Boolean}
     * @default false
     */
	this.antialiasing = false

    /**
     * If true, the program is rendered with shadows
     * @property shadows
     * @type {Boolean}
     * @default true
     */
	this.shadows = true

    /**
     * Shadow type
     * @property shadowsType
     * @type {Number}
     * @default PCFSoftShadowMap
     */
	this.shadowsType = THREE.PCFSoftShadowMap

	// Defaults
	this.defaultScene = null
	this.defaultCamera = null

	//Runtime variables
    this.keyboard = null
	this.renderer = null
    this.canvas = null
	this.scene = null

    // VR Objects
    this.useVr = false
    this.vrEffect = null
    this.vrControls = null

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ProgramComponent())
}

Program.prototype = Object.create(THREE.Object3D.prototype)

Program.prototype.getMaterialByName = ResourceManager.prototype.getMaterialByName
Program.prototype.addMaterial = ResourceManager.prototype.addMaterial
Program.prototype.removeMaterial = ResourceManager.prototype.removeMaterial
Program.prototype.getTextureByName = ResourceManager.prototype.getTextureByName
Program.prototype.addTexture = ResourceManager.prototype.addTexture
Program.prototype.removeTexture = ResourceManager.prototype.removeTexture
Program.prototype.getFontByName = ResourceManager.prototype.getFontByName
Program.prototype.addFont = ResourceManager.prototype.addFont
Program.prototype.removeFont = ResourceManager.prototype.removeFont 
Program.prototype.getAudioByName = ResourceManager.prototype.getAudioByName
Program.prototype.addAudio = ResourceManager.prototype.addAudio
Program.prototype.removeAudio = ResourceManager.prototype.removeAudio
Program.prototype.addObject = ResourceManager.prototype.addObject
Program.prototype.getAssetObjectByName = ResourceManager.prototype.getAssetObjectByName
Program.prototype.removeObject = ResourceManager.prototype.removeObject
Program.prototype.addFolder = ResourceManager.prototype.addFolder
Program.prototype.removeFolder = ResourceManager.prototype.removeFolder

/**
 * Select initial scene and initialise that scene
 * AutOmatically called by the runtime handler ( Editor / App )
 * @method initialize
 */
Program.prototype.initialize = function() {
    // If input null create input object
    if(this.mouse === null) {
        this.mouse = new Mouse()
    }
    if(this.keyboard === null) {
        this.keyboard = new Keyboard()
    }

	// Get default scene
	if (this.defaultScene !== null) {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].uuid === this.defaultScene) {
				this.setScene(this.children[i])
				break
			}
		}
	} else if(this.children.length > 0) {
		this.setScene(this.children[0])
	}
}

/**
 * Set program mouse and keyboard
 * @method setMouseKeyboard
 * @param {Mouse} mouse
 * @param {Keyboard} keyboard
 */
Program.prototype.setMouseKeyboard = function(mouse, keyboard) {
    this.mouse = mouse
    this.keyboard = keyboard
}

/**
 * Set program renderer
 * @method setRenderer
 * @param {WebGLRenderer} renderer Three.js renderer to be used by this program
 */
Program.prototype.setRenderer = function(renderer) {
    this.renderer = renderer
    this.canvas = renderer.domElement
}

/**
 * Enter VR mode
 * @method displayVR
 */
Program.prototype.displayVR = function() {
    if(this.vr) {
        try {
            this.useVr = true

            this.vrEffect = new THREE.VREffect(this.renderer)
            this.vrEffect.setFullScreen(true)
        } catch(e) {
            this.useVr = false
            this.vrEffect = null

            console.warn("Program: Failed to enter in VR Mode", e)
        }
    }
}

/**
 * Exit VR mode
 * @method exitVR
 */
Program.prototype.exitVR = function() {
    if(this.vr) {
        this.useVr = false

        if(this.vrEffect !== null) {
            this.vrEffect.setFullScreen(false)
            this.vrEffect.dispose()
            this.vrEffect = null
        }
    }
}

/**
 * Update program state
 * Automatically called by the runtime handler ( Editor / App )
 * @method update
 */
Program.prototype.update = function() {
	this.scene.update()
}

/**
 * Render program to canvas
 * Renderer passed as argument
 * @method render
 * @param {Renderer} renderer
 */
Program.prototype.render = function(renderer) {
    // Render as a VR application (ignores camera parameters)
    if(this.useVr) {
        for(var i = 0; i < this.scene.cameras.length; i++) {
            var camera = this.scene.cameras[i]
            this.vrEffect.render(this.scene, camera)
        }
    }
    // Render normally
    else {
        var x = renderer.domElement.width
        var y = renderer.domElement.height

        renderer.setScissorTest(true)

        for(var i = 0; i < this.scene.cameras.length; i++) {
            var camera = this.scene.cameras[i]

            if (camera.clearColor) {
                renderer.clearColor()
            }

            if (camera.clearDepth) {
                renderer.clearDepth()
            }

            renderer.setViewport(x * camera.offset.x, y * camera.offset.y, x * camera.viewport.x, y * camera.viewport.y)
            renderer.setScissor(x * camera.offset.x, y * camera.offset.y, x * camera.viewport.x, y * camera.viewport.y)

            renderer.render(this.scene, camera)
        }

        renderer.setScissorTest(false)
    }
}

/**
 * Resize program elements
 * Called by the runtime every time the window is resized
 * @method resize
 * @param {Number} x Width
 * @param {Number} y Height
 */
Program.prototype.resize = function(x, y) {
    // Resize cameras
	for(var i = 0; i < this.scene.cameras.length; i++) {
		this.scene.cameras[i].aspect = x / y
		this.scene.cameras[i].updateProjectionMatrix()
	}

    // Resize scripts
    this.traverse((child) => {
        if(child instanceof Script) {
            child.resize()
        }
    })
}

/**
 * Change scene during runtime, this method can receive both a scene name or a scene object
 * This method should be used inside of script objects during runtime
 * @method setScene
 * @param {Scene|String} scene
 */
Program.prototype.setScene = function(scene)
{
	if(scene instanceof Scene)
	{
		this.scene = scene
	}
	else if(typeof scene === "string")
	{
		this.scene = this.getObjectByName(scene)
	}

	if(this.scene !== null) {
		this.scene.initialize()
		
		if(this.scene.cameras.length === 0)
		{
			this.scene.cameras.push(this.defaultCamera)
		}
	}
}

/**
 * Remove scene from program
 * @method remove
 * @param {Scene} scene
 */
Program.prototype.remove = function(scene)
{
	var index = this.children.indexOf(scene)
	if(index > -1)
	{
		this.children.splice(index, 1)
		scene.parent = null
	}

	//If no scene on program set actual scene to null
	if(this.children.length === 0)
	{
		this.scene = null
	}
}

/**
 * Add new scene to this program
 * On the program class only scenes can be added as children
 * @method add
 * @param {Scene} scene
 */
Program.prototype.add = function(scene)
{
	if(scene instanceof Scene)
	{
		this.children.push(scene)
		scene.parent = this

		//If first scene set as actual scene
		if(this.children.length === 1)
		{
			this.scene = this.children[0]
		}
	}
}

/**
 * Clone program, keeping uuids and every identification attribute
 * Clone method uses the ObjectLoader to serialise and create a new program instance with the same data
 * @method clone
 * @return {Program} Cloned program
 */
Program.prototype.clone = function()
{
	return new ObjectLoader().parse(this.toJSON())
}

/**
 * Set a scene as initial scene using its uuid
 * This method is used by the editor
 * @method setInitialScene
 * @param {String} uuid Scene UUID
 */
Program.prototype.setInitialScene = function(scene)
{
	this.defaultScene = scene.uuid
}

/**
 * Create a scene using a defaul template
 * This is the scene used when creating a new program os scene inside the editor
 * @method addDefaultScene
 * @param {Material} material Default material used by objects, if empty a new material is created
 */
Program.prototype.addDefaultScene = function(material)
{
	if(material === undefined)
	{
		material = new MeshStandardMaterial({roughness: 0.6, metalness: 0.2})
		material.name = "default"
	}

	//Create new scene
	var scene = new Scene()

	//Sky
	var sky = new Sky()
	sky.autoUpdate = false
	scene.add(sky)

	//Box
	var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
	var model = new Mesh(geometry, material)
	model.scale.set(4, 4, 4)
	model.position.set(0, 1.5, 0)
	model.receiveShadow = true
	model.castShadow = true
	model.name = "box"
	scene.add(model)

	//Floor
	model = new Mesh(geometry, material)
	model.scale.set(40, 2, 40)
 	model.position.set(0, -1.5, 0)
	model.receiveShadow = true
	model.castShadow = true
	model.name = "ground"
	scene.add(model)

	//Add scene to program
	this.add(scene)
}

/**
 * Dispose program data to avoid memory leaks
 * Called when exiting the program
 * @method dispose
 */
Program.prototype.dispose = function()
{
    // Geometry
    for(var i in this.geometries) {
        this.geometries[i].dispose()
    }

	// Textures
	for(var i in this.textures)
	{
		this.textures[i].dispose()
	}

    // Materials
    for(var i in this.materials) {
        this.materials[i].dispose()
    }

    // Objects
    for(var i in this.assetObjects) {
        this.assetObjects[i].dispose()
    }

	// Children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose()
	}
}

/**
 * Receive external data and pass it to all script instances and triggers the onAppData event on every block
 * @param {Object} data
 * @method receiveDataApp
 */
Program.prototype.receiveDataApp = function(data) {
    var found = false

    this.traverse((child) => {
        if(child instanceof Script) {
            if(child.script !== null && child.script.onAppData !== undefined) {
                child.appData(data)
                found = true
            }
        } else if(child instanceof BlockScript) {
            if(child.graph !== null) {
                child.graph.sendEventToAllNodes("onAppData", data)
                found = true
            }
        }
    })
    
    // Show warning message
    if(!found) {
        if(typeof data === "object") {
            console.warn("Program: No script or blocks with data receive event found", JSON.stringify(data))
        } else {
            console.warn("Program: No script or blocks with data receive event found", data)
        }
    }
}

/**
 * Send data to external app instances
 * @param {Object} data
 * @method sendDataApp
 */
Program.prototype.sendDataApp = function(data) {
    if(this.app !== null) {
        if(this.app.onDataReceived !== undefined) {
            this.gorlot.onDataReceived(data)
        } else {
            console.warn("Program: No app available", JSON.stringify(data))
        }
    } else {
        if(typeof data === "object") {
            alert(JSON.stringify(data))
        } else {
            console.warn("Program: No app available", data)
        }
    }
}

/**
 * Serialise object as JSON
 * @method toJSON
 * @param {Object} meta
 * @param {Boolean} exportResources If true, all resources in the program are exported, otherwise,  only resources attached to objects are exported
 * @return {Object} json
 */
Program.prototype.toJSON = function(meta, exportResources)
{
	var self = this

	var data = THREE.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
	{

		if (exportResources !== false) {

			// Textures
			var textures = self.textures
			for(var i in textures) {
				var texture = textures[i]
				if (meta.textures[texture.uuid] === undefined) {
					meta.textures[texture.uuid] = texture.toJSON(meta)
				}
			}

			// Materials
			var materials = self.materials
			for(var i in materials) {
				var material = materials[i]
				if (meta.materials[material.uuid] === undefined) {
					meta.materials[material.uuid] = material.toJSON(meta)
				}
			}

			// Fonts
			var fonts = self.fonts
			for(var i in fonts) {
				var font = fonts[i]
				if (meta.fonts[font.uuid] === undefined) {
					meta.fonts[font.uuid] = font.toJSON(meta)
				}
			}

			// Objects
			var objects = self.assetObjects
			for(var i in objects) {
				var object = objects[i]
				if (meta.assetObjects[object.uuid] === undefined) {
					meta.assetObjects[object.uuid] = object.toJSON(meta)
				}
			}

			// Audio
			var audio = self.audio
			for(var i in audio) {
				var aud = audio[i]
				if (meta.audio[aud.uuid] === undefined) {
					meta.audio[aud.uuid] = aud.toJSON(meta)
				}
			}
		}
	});

	// Initial scene
    if(this.defaultScene !== null) {
        data.object.defaultScene = this.defaultScene
    }

    // Information
	data.object.author = this.author
	data.object.description = this.description
	data.object.version = this.version

	// Misc
	data.object.lockPointer = this.lockPointer

	// Folders
	data.object.folders = []
	for(var i in this.folders) {
		data.object.folders.push(this.folders[i].toJSON())
	}

	// VR
	data.object.vr = this.vr
	data.object.vrScale = this.vrScale

    // Rendering
    data.object.antialiasing = this.antialiasing   
    data.object.shadows = this.shadows
    data.object.shadowsType = this.shadowsType

	return data
}
