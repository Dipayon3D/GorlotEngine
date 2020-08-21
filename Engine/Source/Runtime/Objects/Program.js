"use strict"

//Program constructor
function Program(name)
{
	THREE.Object3D.call(this)

	this.type = "Program"

	// Disable matrix auto update
	this.matrixAutoUpdate = false

    // Pointer to gorlot app
    this.app = null

	// Program Info
	this.name = (name !== undefined) ? name : "program"
	this.description = ""
	this.author = ""
	this.version = "0"

	// Hardware flags
	this.lockPointer = false
	
	// VR flags
	this.vr = false
	this.vrScale = 1

	// Render quality
	this.antialiasing = false
	this.shadows = true
	this.shadowsType = THREE.PCFSoftShadowMap

	//Resources
	this.images = []
	this.videos = []
	this.audio = []
	this.fonts = []
	this.textures = []
	this.geometries = []
	this.materials = []
	this.assetObjects = []
	this.folders = []

	// Defaults
	this.defaultScene = null
	this.defaultCamera = null

	//Runtime variables
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

// Select initial scene and initialise it
Program.prototype.initialize = function() {
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

	// Set mouse lock
    if(this.lockPointer) {
        Mouse.setLock(true)
    }
}

// Set program renderer
Program.prototype.setRenderer = function(renderer) {
    this.renderer = renderer
    this.canvas = renderer.domElement
}

// Enter VR Mode
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

// Exit VR Mode
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

// Update program
Program.prototype.update = function() {
	this.scene.update()
}

// Render program (renderer passed as argument)
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

// Screen program cameras
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

//Set actual scene (to be used in runtime)
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

//Remove Scene from program
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

//Add children to program (only allows Scenes to be added)
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

//Clone program (keep uuid and everything else)
Program.prototype.clone = function()
{
	return new ObjectLoader().parse(this.toJSON())
}

//Set as initial scene (from uuid reference)
Program.prototype.setInitialScene = function(scene)
{
	this.defaultScene = scene.uuid
}

//Create a default scene with sky
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

//Dispose program data
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

	// Children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose()
	}
}

// Receive external data and pass it to all script and blocks instances
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

// Send data to external app instance
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

// Get material by name
Program.prototype.getMaterialByName = function(name) {
	for(var i in this.materials.length) {
		if (this.materials[i].name === name) {
			return this.materials[i]
		}
	}

	return null
}

//Add material to materials list
Program.prototype.addMaterial = function(material)
{
	if(material instanceof THREE.Material)
	{
 		this.materials[material.uuid] = material
 	}
}

//Remove material from materials list (also receives default used to replace)
Program.prototype.removeMaterial = function(material, defaultMaterial, defaultMaterialSprite)
{
	if (defaultMaterial === undefined) {
		defaultMaterial = new MeshBasicMaterial()
	}

	if (defaultMaterialSprite === undefined) {
		defaultMaterialSprite = new SpriteMaterial()
	}

	if(material instanceof THREE.Material)
	{
		delete this.materials[material.uuid]
		
		this.traverse(function(child)
		{
			if(child.material !== undefined && child.material.uuid === material.uuid)
			{
				if (child instanceof THREE.Sprite) {
					child.material = defaultMaterialSprite
				} else {
					child.material = defaultMaterial
				}
			}
		});
	}
}

//Add texture to texture list
Program.prototype.addTexture = function(texture)
{
 	this.textures[texture.uuid] = texture
}

// Get texture by name
Program.prototype.getTextureByName = function(name) {
	for(var i in this.textures.length) {
		if (this.textures[i].name === name) {
			return this.textures[i]
		}
	}

	return null
}

// Remove texture from textures list (also receives default used to replace)
Program.prototype.removeTexture = function(texture, defaultTexture) {
	if (defaultTexture === undefined) {
		defaultTexture = new THREE.Texture()
	}

	if (texture instanceof THREE.Texture) {
		delete this.textures[texture.uuid]

		this.traverse((child) => {
			if (child.material !== undefined) {
				var material = child.material

				if (material.map != null && material.map.uuid === texture.uuid) {
					material.map = defaultTexture
					material.needsUpdate = true
				} else if (material.bumpMap != null && material.bumpMap.uuid === texture.uuid) {
					material.bumpMap = defaultTexture
					material.needsUpdate = true
				} else if (material.normalMap != null && material.normalMap.uuid === texture.uuid) {
					material.normalMap = defaultTexture
					material.needsUpdate = true
				} else if (material.displacementMap != null && material.displacementMap.uuid === texture.uuid) {
					material.displacementMap = defaultTexture
					material.needsUpdate = true
				} else if (material.specularMap != null && material.specularMap.uuid === texture.uuid) {
					material.specularMap = defaultTexture
					material.needsUpdate = true
				} else if (material.emissiveMap != null && material.emissiveMap.uuid === texture.uuid) {
					material.emissiveMap = defaultTexture
					material.needsUpdate = true
				} else if (material.alphaMap != null && material.alphaMap.uuid === texture.uuid) {
					material.alphaMap = defaultTexture
					material.needsUpdate = true
				} else if (material.roughnessMap != null && material.roughnessMap === texture.uuid) {
					material.roughnessMap = defaultTexture
					material.needsUpdate = true
				} else if (material.metalnessMap != null && material.metalnessMap) {
					material.metalnessMap = defaultTexture
					material.needsUpdate = true
				}
			} else if (child instanceof ParticleEmitter) {
				if (child.group.texture.uuid === texture.uuid) {
					child.group.texture = defaultTexture
				}
			}
		})
	}
}

// Get font by name
Program.prototype.getFontByName = function(name) {
    for(var i in this.fonts) {
        if(this.fonts[i],name === name) {
            return this.fonts[i]
        }
    }

    return null
}

// Add font to fonts list
Program.prototype.addFont = function(font) {
	if (font instanceof Font) {
		this.fonts[font.uuid] = font
	}
}

// Remove font from font list
Program.prototype.removeFont = function(font, defaultFont) {
	if (defaultFont === undefined) {
		defaultFont = new Font()
	}

	if (font instanceof Font) {
		delete this.fonts[font.uuid]

		this.traverse((child) => {
			if (child.font !== undefined && child.font.uuid === font.uuid) {
				child.setFont(defaultFont)
			}
		})
	}
}

// Get audio by name
Program.prototype.getAudioByName = function(name) {
    for(var i in this.audio) {
        if(this.audio[i].name === name) {
            return this.audio[i]
        }
    }

    return null
}

// Add audio to audio list
Program.prototype.addAudio = function(audio) {
	if (audio instanceof Audio) {
		this.audio[audio.uuid] = audio
	}
}

// Remove audio
Program.prototype.removeAudio = function(audio, defaultAudio) {
    if(defaultAudio === undefined) {
        defaultAudio = new Audio()
    }

    if(audio instanceof Audio) {
        delete this.audio[audio.uuid]

        this.traverse((child) => {
            if(child.audio !== undefined && child.audio.uuid === audio.uuid) {
                // TODO: Set default audio
            }
        })
    }
}

// Add an object to objects list
Program.prototype.addObject = function(object) {
	this.assetObjects[object.uuid] = object
}

// Adds a folder
Program.prototype.addFolder = function(folder) {
	if(folder instanceof Folder) {
		this.folders[folder.uuid] = folder
	}
}

// Removes a folder
Program.prototype.removeFolder = function(folder) {
	if (folder instanceof Folder) {
		delete this.folders[folder.uuid]

		var oldPath = folder.path + folder.name + "/"
        var pathParts = oldPath.split("/")
        pathParts.splice(pathParts.length-2, 1)
        var newPath = pathParts.toString()

        if(newPath === "") {
            newPath = "/"
        } else {
            newPath = pathParts.toString().replace(/,/gi, '/')
        }

		for(var i in this.materials) {
			if (this.materials[i].path === oldPath) {
				this.materials[i].path = newPath
			}
		}

		for(var i in this.textures) {
			if (this.textures[i].path === oldPath) {
				this.textures[i].path = newPath
			}
		}

		for(var i in this.fonts) {
			if (this.fonts[i].path === oldPath) {
				this.fonts[i].path = newPath
			}
		}

		for(var i in this.assetOobjects) {
			if (this.assetOobjects[i].path === oldPath) {
				this.assetOobjects[i].path = newPath
			}
		}

		for(var i in this.audio) {
			if (this.audio[i].path === oldPath) {
				this.audio[i].path = newPath
			}
		}

	}
}

// Get object by name
Program.prototype.getAssetObjectByname = function(name) {
	for(var i in this.assetOobjects.length) {
		if (this.assetOobjects[i].name === name) {
			return this.assetOobjects[i]
		}
	}

	return null
} 

// Remove object from objects list
Program.prototype.removeObject = function(object) {
	if (object instanceof THREE.Object3D) {
		delete this.assetOobjects[object.uuid]
	}
}

//Create JSON for object
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
