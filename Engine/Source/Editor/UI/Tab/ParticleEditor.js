"use strict"

function ParticleEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Particle", "Source/Editor/Files/Icons/Effects/Particles.png")

    // In order to avoid errors, registers the nodes here and when it's activated
    Register.unregisterAll()
    Register.registerParticlesNodes()

	// Main container
	this.main = new DualDivisionResizable(this.element)
	this.main.tabPosition = 0.5
	this.main.tabPositionMin = 0.3
	this.main.tabPositionMax = 0.5
	this.main.updateInterface()

	// Change main div aspect
	this.main.divB.style.overflow = "hidden"
	this.main.divB.style.cursor = "default"
	this.main.divB.style.backgroundColor = Editor.theme.panelColor

	// Self pointer
	var self = this

	//---------------------------- Particle preview ----------------------------
	// Canvas
	this.canvas = new Canvas(this.main.divA)
	this.canvas.updateInterface()

	// Element attributes
	this.children = []

	// Particle renderer and scene
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, antialias: Settings.render.antialiasing})
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
	this.renderer.shadowMap.enabled = false

	// Particle preview scene
	this.scene = new Scene()
	this.scene.add(new AmbientLight(0xffffff))
	var grid = new THREE.GridHelper(50, 50, 0x888888)
	grid.material.depthWrite = false
	this.scene.add(grid)
	var axis = new THREE.AxisHelper(50)
	axis.material.depthWrite = false
	this.scene.add(axis)

	// particle
	this.particle = null
	this.nodes = null
	this.particleRuntime = null

	// Camera
	this.camera = new PerspectiveCamera(90, this.canvas.size.x/this.canvas.size.y)
	this.cameraRotation = new THREE.Vector2(0, 0.5)
	this.cameraDistance = 5
	this.updateCamera()

	//---------------------------- Particle editor ----------------------------
	// Graph editor
	this.graphEditor = new Canvas(this.main.divB)
	this.graphEditor.updateInterface()
	this.graph = null
}

ParticleEditor.prototype = Object.create(TabElement.prototype)

// Update container object data
ParticleEditor.prototype.updateMetadata = function() {
	if (this.particle !== null) {
		var particle = this.particle

		// Check if particle exists in program
		var found = false
		Editor.program.traverse((obj) => {
			if (obj.uuid === particle.uuid) {
				found = true
			}
		})

		// If not found, close tab
		if (!found) {
			this.close()
		}
	}
}

// Attach particle to particle editor
ParticleEditor.prototype.attach = function(particle) {
	// Attach particle
	this.particle = particle
    
    if(JSON.stringify(this.particle.nodes) === "{}") {
        this.particle.nodes = {
            config: {},
            extra: {},
            groups: [],
            last_link_id: 0,
            links: [],
            nodes: [{
                extra: {},
                flags: {},
                id: 1,
                mode: 0,
                order: 0,
                outputs: [],
                pos: [130, 130],
                properties: {},
                size: [210, 234],
                type: "Particles/Particles"
            }],
            version: 0.4
        }
    }

	this.nodes = this.particle.nodes
	this.updateRuntimeParticle()
	this.initNodeEditor()
}

// Check if particle is attached to tab
ParticleEditor.prototype.isAttached = function(particle) {
    return this.particle === particle
}

// Initialiase node editor
ParticleEditor.prototype.initNodeEditor = function() {
	this.nodes.extra = {}
	this.nodes.extra.particles = this.particle

	console.log(this.particle)

	this.graph = new LGraph(this.nodes)

	var self = this
	this.graph.onNodeConnectionChange = function() {
		setTimeout(() => {
			self.updateRuntimeParticle()
		}, 100)
	}

	this.graphCanvas = new LGraphCanvas(this.graphEditor.element, this.graph)
	this.graph.start(1000/60)
}

// Updates runtime particle to match attached particles
ParticleEditor.prototype.updateRuntimeParticle = function() {
	if (this.particle !== null) {
		if (this.particleRuntime !== null) {
			this.scene.remove(this.particleRuntime)
		}

		this.particleRuntime = new ObjectLoader().parse(this.particle.toJSON())
        this.particleRuntime.visible = true
		this.particleRuntime.scale.set(1, 1, 1)
		this.particleRuntime.position.set(0, 0, 0)
		this.particleRuntime.rotation.set(0, 0, 0)
		this.particleRuntime.initialize()
		this.scene.add(this.particleRuntime)
	}
}

// Update camera and rotation from variables
ParticleEditor.prototype.updateCamera = function() {
	// Calculate direction vector
	var cosAngleY = Math.cos(this.cameraRotation.y)
	var position = new THREE.Vector3(this.cameraDistance * Math.cos(this.cameraRotation.x) * cosAngleY, this.cameraDistance * Math.sin(this.cameraRotation.y), this.cameraDistance * Math.sin(this.cameraRotation.x) * cosAngleY)
	this.camera.position.copy(position)
	this.camera.lookAt(new THREE.Vector3(0, 0, 0))
}

// Activate code editor
ParticleEditor.prototype.activate = function() {
    Register.unregisterAll()
    Register.registerParticlesNodes()

	// Set editor state
	Editor.setState(Editor.STATE_IDLE)
	Editor.resetEditingFlags()

	// Set mouse canvas
	Mouse.setCanvas(this.canvas.element)
}

// On close
ParticleEditor.prototype.close = function() {
    TabElement.prototype.close.call(this)

	if (this.graph !== null) {
		this.graph.stop()

		this.nodes.extra = {}
		this.particle.updateNodes(this.graph.serialize())
	}

    console.log(this.nodes)
}

// Update particle editor
ParticleEditor.prototype.update = function() {
	// Main division
	this.main.update()

	// Get mouse input
	if (Mouse.insideCanvas()) {
		// Move camera
		if (Mouse.buttonPressed(Mouse.LEFT)) {
			this.cameraRotation.x -= 0.003 * Mouse.delta.x
			this.cameraRotation.y -= 0.003 * Mouse.delta.y

			// Limit Vertical Rotation to 90 degrees
			var pid2 = 1.57
			if (this.cameraRotation.y < -pid2) {
				this.cameraRotation.y = -pid2
			} else if (this.cameraRotation.y > pid2) {
				this.cameraRotation.y = pid2
			}
		}

		// Camera zoom
		this.cameraDistance += Mouse.wheel * 0.005
		if (this.cameraDistance < 0.1) {
			this.cameraDistance = 0.1
		}

		this.updateCamera()
	}

	// Update particle and render
	if (this.particleRuntime !== null) {
		this.particleRuntime.update()
	}

	// Render editor scene
	this.renderer.render(this.scene, this.camera)
}

// Update division size
ParticleEditor.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

	// Update main container
	this.main.visible = this.visible
	this.main.size.copy(this.size)
	this.main.updateInterface()

	// Update canvas
	this.canvas.visible = this.visible
	this.canvas.size.set(this.main.divA.offsetWidth, this.main.divA.offsetHeight)
	this.canvas.updateInterface()

	// Update graph editor
	this.graphEditor.visible = this.visible
	this.graphEditor.size.set(this.main.divB.offsetWidth, this.main.divB.offsetHeight)
	this.graphEditor.updateInterface()

	// Update renderer and canvas
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
	this.camera.aspect = this.canvas.size.x/this.canvas.size.y
	this.camera.updateProjectionMatrix()

	// Update children
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].visible = this.visible
		this.children[i].updateInterface()
	}

	// Update element
	this.element.style.top = this.position.y + "px"
	this.element.style.left = this.position.x + "px"
}
