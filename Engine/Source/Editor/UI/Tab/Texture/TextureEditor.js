"use strict"

function TextureEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Texture", "Source/Editor/Files/Icons/Misc/Image.png")

    // In order to avoid errors, registers the nodes here and when it's activated
	Register.unregisterAll()
	Register.registerTextureNodes()

    // Texture constants
    this.texture = null
    this.nodes = null

    // Self pointer
    var self = this

    // Dual division
    this.division = new DualDivisionResizable(this.element)
    this.division.setOnResize(() => {
        self.updateInterface()
    })
    this.division.tabPosition = 0.325
    this.division.tabPositionMin = 0.325
    this.division.tabPositionMax = 0.7

    // LiteGraph constants
    this.graph = null

    // Preview canvas
    this.canvas = new Canvas(this.division.divA)

    // Graph canvas
    this.graphCanvas = new Canvas(this.division.divB)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.element, antialias: Settings.render.antialiasing })
    this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
    this.renderer.shadowMap.enabled = false

    // Camera
    this.camera = new OrthographicCamera(1.2, 1, OrthographicCamera.RESIZE_VERTICAL)

    // Scene
    this.scene = new THREE.Scene()

    // Background
    this.alpha = new Texture("Source/Editor/Files/Alpha.png")
    this.alpha.wrapS = THREE.RepeatWrapping
    this.alpha.wrapT = THREE.RepeatWrapping
    this.alpha.magFilter = THREE.Nearest
    this.alpha.minFilter = THREE.Nearest
    this.alpha.repeat.set(5, 5)

    this.background = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.alpha }))
    this.background.position.set(0, 0, -2)
    this.background.scale.set(2.5, 2.5, 0)
    this.scene.add(this.background)

    // Sprite
    this.sprite = new THREE.Sprite(new SpriteMaterial())
    this.sprite.position.set(0, 0, -1)
    this.scene.add(this.sprite)
}

TextureEditor.prototype = Object.create(TabElement.prototype)

// Update texture preview
TextureEditor.prototype.updateTexture = function() {
    this.sprite.material.map.needsUpdate = true

    // TODO: This
}

// Check if texture is attached to tab
TextureEditor.prototype.isAttached = function(texture) {
    return this.texture === texture
}

// Activate
TextureEditor.prototype.activate = function() {
	Register.unregisterAll()
	Register.registerTextureNodes()

    Editor.setState(Editor.STATE_IDLE)
    Editor.resetEditingFlags()
}

// Update object data
TextureEditor.prototype.updateMetadata = function() {
    if(this.texture !== null) {
        // Set name
        if(this.texture.name !== undefined) {
            this.setName(this.texture.name)
        }

        // If not found, close tab
        if(Editor.program.textures[this.texture.uuid] === undefined) {
            this.close()
        }
    }
}

// Attach texture
TextureEditor.prototype.attach = function(texture) {
    this.texture = texture
    this.updateMetadata()

    if(this.texture.nodes !== undefined) {
        this.nodes = this.texture.nodes
    }

    if(JSON.stringify(this.texture.nodes) === "{}") {
        this.nodes = {
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
                    properties: {},
                    size: [140, 26],
                    type: "Texture/Texture"
                }
            ],
            version: 0.4
        }
    }

    // Initialise node editor
    this.initNodeEditor()

    // Update sprite
    this.sprite.material.map = texture
    this.sprite.material.needsUpdate = true
}

// Update
TextureEditor.prototype.update = function() {
    this.division.update()
    this.renderer.render(this.scene, this.camera)
}

// Initialise node editor
TextureEditor.prototype.initNodeEditor = function() {
    var self = this

    this.nodes.extra = {}
    this.nodes.extra.texture = this.texture
    this.nodes.extra.alpha = this.alpha

    this.graph = new LGraph(this.nodes !== null ? this.nodes : {})

    this.liteGraphCanvas = new LGraphCanvas(this.graphCanvas.element, this.graph)
    this.graph.start(1000/60)

    this.graph.onNodeConnectionChange = function() {
        self.graph.sendEventToAllNodes("connectionChange")
        self.updateTexture()
    }
}

// When the tab is closed
TextureEditor.prototype.close = function() {
    TabElement.prototype.close.call(this)

    delete this.graph.extra

    this.updateNodes()
}

// Update Texture nodes
TextureEditor.prototype.updateNodes = function() {
    if(this.blocks !== null) {
        this.texture.updateNodes(this.graph.serialize())
    }
}

// Update interface
TextureEditor.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

    // Dual division
    this.division.visible = this.visible
    this.division.size.copy(this.size)
    this.division.updateInterface()

    // Canvas
    this.canvas.visible = this.visible
    this.canvas.size.set(this.division.divA.offsetWidth, this.division.divB.offsetHeight)
    this.canvas.updateInterface()

    // Renderer
    this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
    this.camera.aspect = this.canvas.size.x / this.canvas.size.y
    this.camera.mode = (this.camera.aspect > 1) ? OrthographicCamera.RESIZE_HORIZONTAL : OrthographicCamera.RESIZE_VERTICAL
    this.camera.updateProjectionMatrix()

    // Graph canvas
    this.graphCanvas.visible = this.visible
    this.graphCanvas.size.set(this.division.divB.offsetWidth, this.division.divB.offsetHeight)
    this.graphCanvas.updateInterface()
}
