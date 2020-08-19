"use strict"

function MaterialEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Material Editor", "Source/Editor/Files/Icons/Misc/Material.png")

    // Registers only the material nodes
	Register.unregisterAll()
	Register.registerMaterialNodes()

	// Graph canvas
	this.graph_canvas = new Canvas(this.element)
	this.graph_canvas.updateInterface()

	// Canvas
	this.canvas = new Canvas(this.element)
	this.canvas.updateInterface()

	this.graph = null

    // Element attributes
    this.children = []

	// Material UI File element
	this.asset = null

	// Attached material
	this.material = null
	this.nodes = null

	// Material renderer and scene
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, alpha: true})
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)

	// Material camera
    this.camera = new OrthographicCamera(2.15, 1)
    //this.camera = new THREE.PerspectiveCamera(90, this.canvas.size.x/this.canvas.size.y)

	// Material preview scene
	this.scene = new THREE.Scene()
	this.scene.add(new PointLight(0x666666))
	this.scene.add(new AmbientLight(0x555555))

	this.mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 64, 64), null)
	this.mesh.position.set(0, 0, -2.5)
	this.mesh.visible = false
	this.scene.add(this.mesh)

	this.sprite = new THREE.Sprite(null)
	this.sprite.position.set(0, 0, -1.5)
	this.sprite.visible = false
	this.scene.add(this.sprite)
}

MaterialEditor.prototype = Object.create(TabElement.prototype)

// Check if material is attached to tab
MaterialEditor.prototype.isAttached = function(material) {
    return this.material === material
}

// Attach material to material editor
MaterialEditor.prototype.attach = function(material, asset) {
	// Check is if sprite material and ajust preview
	if(material instanceof THREE.SpriteMaterial) {
		this.sprite.material = material
		this.sprite.visible = true
		this.mesh.visible = false
	} else {
		this.mesh.material = material
		this.mesh.visible = true
		this.sprite.visible = false
	}

	// Store material file pointer
	if(asset !== undefined) {
		this.asset = asset
	}

	// Store material
	this.material = material
    this.updateMetadata()

	// The default material nodes
	this.defaultNodes = {
		config: {},
		groups: [],
		last_link_id: 0,
		last_node_id: 1,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				mode: 0,
				inputs: [],
				outputs: [],
				pos: [208, 140],
				properties: {
					reflectivity: (this.material.reflectivity !== undefined) ? this.material.reflectivity : 0,
					shininess: (this.material.shininess !== undefined) ? this.material.shininess : 0,
					wireframe: (this.material.wireframe !== undefined) ? this.material.wireframe : false,
					depthwrite: (this.material.depthWrite !== undefined) ? this.material.depthWrite : false,
					transparent: (this.material.transparent !== undefined) ? this.material.transparent : false,
					opacity: (this.material.opacity !== undefined) ? this.material.opacity : 0,
					abf: (this.material.fog !== undefined) ? this.material.fog : false
				},
				size: [210, 382],
				type: "Material/Material"
			}
		],
		version: 0.4
	}

	if(JSON.stringify(this.material.nodes) === "{}") {
		this.nodes = this.defaultNodes
		
		if (this.material instanceof MeshShaderMaterial) {
			this.nodes.nodes.push({
				flags: {},
				id: 2,
				// TODO: Uniforms
				inputs: [],
				order: 1,
				pos: [502, 141],
				properties: {},
				type: "Material/Shader"
			})
		}
		
	} else {
		this.nodes = this.material.nodes
	}

	this.initNodeEditor()
}

// Initialise node editor
MaterialEditor.prototype.initNodeEditor = function() {

	this.nodes.extra = {}
	this.nodes.extra.material = this.material
	this.nodes.extra.file = this.material_file

	this.graph = new LGraph(this.nodes)

	var self = this
	this.graph.onNodeConnectionChange = function() {
		self.material.needsUpdate = true
	}
	
	this.graphCanvas = new LGraphCanvas(this.graph_canvas.element, this.graph)
	this.graph.start(1000/60)
}

// Check if material is attached to tab
MaterialEditor.prototype.isAttached = function(material) {
    return this.material === material
}

// Activate material editor
MaterialEditor.prototype.activate = function() {
	Editor.setState(Editor.STATE_IDLE)
	Mouse.setCanvas(this.canvas.element)
	Editor.resetEditingFlags()
}

// On close
MaterialEditor.prototype.close = function() {
    TabElement.prototype.close.call(this)

	if (this.graph !== null) {
		this.graph.stop()
		delete this.graph.extra

		this.material.updateNodes(this.graph.serialize())
	}
}

//Update container object data
MaterialEditor.prototype.updateMetadata = function() {
	if(this.material !== null) {
		var material = this.material

		// Set container name
		if(material.name !== undefined) {
			this.setName(material.name)
		}

		// Check if scene exists in program
		var found = false
		var materials = Editor.program.materials
		for(var i in materials) {
			if(materials[i].uuid === material.uuid) {
				found = true
				break
			}
		}

		// If not found close tab
		if(!found) {
			this.close()
		}
	}
}

// Update the attached material
MaterialEditor.prototype.updateMaterial = function() {
	// this.material_file.updateMetadata()
	Editor.updateAssetExplorer()

	if (this.nodes.nodes !== undefined) {
		for(var i = 0; i < this.nodes.nodes.length; i++) {
			if (this.nodes.nodes[i].type === "Material/MeshPhongMaterial") {
				this.material.setValues(this.graph.extra.material)
			}
		}
	}

	this.mesh.material = this.material

	this.material.updateNodes(this.graph.serialize())
}

// Update material editor
MaterialEditor.prototype.update = function() {
	// Render Material
	if(this.material !== null) {
		if(this.material.needsUpdate) {
			this.updateMaterial()
		}

		// Render scene
		this.renderer.render(this.scene, this.camera);
	}

	// Move material view
	if(Mouse.insideCanvas()) {
		// Rotate object
		if(Mouse.buttonPressed(Mouse.LEFT)) {
			var delta = new THREE.Quaternion()
			delta.setFromEuler(new THREE.Euler(Mouse.delta.y * 0.005, Mouse.delta.x * 0.005, 0, 'XYZ'))
			this.mesh.quaternion.multiplyQuaternions(delta, this.mesh.quaternion)
		}

		// Change Geometry
		if (Mouse.buttonJustPressed(Mouse.RIGHT)) {
			if (this.mesh.geometry instanceof THREE.SphereBufferGeometry)
				this.mesh.geometry = new THREE.TorusBufferGeometry(0.8, 0.4, 32, 64)
			else if (this.mesh.geometry instanceof THREE.TorusBufferGeometry)
				this.mesh.geometry = new THREE.BoxBufferGeometry(1, 1, 1, 64, 64, 64)
			else if (this.mesh.geometry instanceof THREE.BoxBufferGeometry)
				this.mesh.geometry = new THREE.TorusKnotBufferGeometry(0.7, 0.3, 128, 64)
			else if (this.mesh.geometry instanceof THREE.TorusKnotBufferGeometry)
				this.mesh.geometry = new THREE.SphereBufferGeometry(1, 64, 64)
		}

		// Zoom
		this.camera.position.z += Mouse.wheel * 0.003
		if(this.camera.position.z > 5) {
			this.camera.position.z = 5
		} else if(this.camera.position.z < -1.5) {
			this.camera.position.z = -1.5
		}
	}
}

// Update division Size
MaterialEditor.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

	// Update graph canvas
	this.graph_canvas.visible = this.visible
	this.graph_canvas.size.set(this.size.x, this.size.y)
	this.graph_canvas.updateInterface()

	// Update canvas
	this.canvas.visible = this.visible
	this.canvas.size.set(200, 200)
	this.canvas.updateInterface()

	// Update renderer and canvas
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
	this.camera.aspect = this.canvas.size.x/this.canvas.size.y
	this.camera.updateProjectionMatrix()
}
