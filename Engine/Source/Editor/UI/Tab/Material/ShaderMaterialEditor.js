"use strict"

function ShaderMaterialEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Shader Material", "Source/Editor/Files/Icons/Misc/Material.png")

	// Main container
	this.main = new DualDivisionResizable(this.element)
	this.main.tabPsition = 0.5
	this.main.tabPositionMin = 0.3
	this.main.tabPositionMax = 0.7
	this.main.updateInterface()

	this.preview = new DualDivisionResizable(this.main.divA)
	this.preview.orientation = DualDivisionResizable.VERTICAL
	this.preview.tabPosition = 0.8
	this.preview.tabPositionMin = 0.3
	this.preview.tabPositionMax = 0.8
	this.preview.updateInterface()

	// Change preview div aspect
	this.preview.divA.style.overflow = "auto"
	this.preview.divA.style.cursor = "default"
	this.preview.divA.style.backgroundColor = Editor.theme.panelColor

	// Change main div aspect
	this.main.divB.style.overflow = "auto"
	this.main.divB.style.cursor = "default"
	this.main.divB.style.backgroundColor = Editor.theme.panelColor

	// Self pointer
	var self = this

	//-------------------------------------- Material Preview --------------------------------------
	// Canvas
	this.canvas = new Canvas(this.preview.divA)
	this.canvas.updateInterface()

	// Element attributes
	this.children = []
	this.fitParent = false
	this.size = new THREE.Vector2(0, 0)
	this.position = new THREE.Vector2(0, 0)
	this.visible = true

	// Material UI File element
	this.materialFile = null

	// Attached material
	this.material = null

	// Material renderer and scene
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, antialias: Settings.render.antialiasing})
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
	this.renderer.shadowMap.enabled = Settings.render.shadows
	this.renderer.shadowMap.type = Settings.render.shadowsType

	// Material camera
	this.camera = new PerspectiveCamera(90, this.canvas.size.x/this.canvas.size.y)

	// Material preview scene
	this.scene = new Scene()
	this.sky = new Sky()
	var sun = this.sky.sun
	sun.shadow.camera.left = -5
	sun.shadow.camera.right = 5
	sun.shadow.camera.top = 5
	sun.shadow.camera.bottom = -5
	this.scene.add(this.sky)
	this.scene.add(new PointLight(0x666666))
	this.scene.add(new AmbientLight(0x555555))
	this.obj = new Mesh(new THREE.SphereBufferGeometry(1, 64, 64), null)
	this.obj.position.set(0, 0, -2.5)
	this.obj.visible = false
	this.scene.add(this.obj)

	//-------------------------------- Material preview configuration --------------------------------
	// Text
	var text = new Text(this.preview.divB)
	text.setAlignment(Text.LEFT)
	text.setText("Configuration")
	text.position.set(10, 20)
	text.fitContent = true
	text.updateInterface()
	this.children.push(text)

	// Test model
	var text = new Text(this.preview.divB)
	text.setAlignment(Text.LEFT)
	text.setText("Test Model")
	text.position.set(10, 45)
	text.fitContent = true
	text.updateInterface()
	this.children.push(text)

	this.testModel = new DropdownList(this.preview.divB)
	this.testModel.position.set(80, 35)
	this.testModel.size.set(150, 18)
	this.testModel.addValue("Sphere", 0)
	this.testModel.addValue("Torus", 1)
	this.testModel.addValue("Cube", 2)
	this.testModel.addValue("Torus Knot", 3)
	this.testModel.updateInterface()
	this.testModel.setOnChange(() => {
		var value = self.testModel.getSelectedIndex()

		// Sphere
		if (value === 0) {
			self.obj.geometry = new THREE.SphereBufferGeometry(1, 64, 64)
		}
		// Torus
		else if (value === 1) {
			self.obj.geometry = new THREE.TorusBufferGeometry(0.8, 0.4, 32, 64)
		}
		// Cube
		else if (value === 2) {
			self.obj.geometry = new THREE.BoxBufferGeometry(1, 1, 1, 64, 64, 64)
		}
		// Torus Knot
		else if (value === 3) {
			self.obj.geometry = new THREE.TorusKnotBufferGeometry(0.7, 0.3, 128, 64)
		}
	})
	this.children.push(this.testModel)

    text = new Text(this.preview.divB)
    text.setAlignment(Text.LEFT)
    text.setText("Sky Enabled")
    text.position.set(10, 68)
    text.fitContent = true
    text.updateInterface()
    this.children.push(text)

	// Sky enabled
	this.skyEnabled = new CheckBox(this.preview.divB)
	this.skyEnabled.size.set(20, 15)
	this.skyEnabled.position.set(90, 60)
	this.skyEnabled.setValue(true)
	this.skyEnabled.updateInterface()
	this.skyEnabled.setOnChange(() => {
		self.sky.visible = self.skyEnabled.getValue()
	})
	this.children.push(this.skyEnabled)

	//-------------------------------- Right Division resizable --------------------------------
	this.right = new DualDivisionResizable(this.main.divB)
	this.right.orientation = DualDivisionResizable.VERTICAL
	this.right.tabPosition = 0.5
	this.right.tabPositionMin = 0.3
	this.right.tabPositionMax = 0.5
	this.right.updateInterface()

	// Change right div aspect
	this.right.divB.style.overflow = "hidden"
	this.right.divB.style.cursor = "default"
	this.right.divB.style.backgroundColor = Editor.theme.panelColor

	// Shaders
	this.fragmentShader = new CodeEditor(this.right.divB)
	this.fragmentShader.setMode("glsl")
	this.fragmentShader.size.set(350, 250)
	this.fragmentShader.setOnChange(() => {
		if (self.material !== null) {
			self.material.fragmentShader = self.fragmentShader.getValue()
			self.material.needsUpdate = true
		}
	})

	this.vertexShader = new CodeEditor(this.right.divB)
	this.vertexShader.setMode("glsl")
	this.vertexShader.size.set(320, 250)
	this.vertexShader.setOnChange(() => {
		if (self.material !== null) {
			self.material.vertexShader = self.vertexShader.getValue()
			self.material.needsUpdate = true
		}
	})

	this.parent.appendChild(this.element)
}

ShaderMaterialEditor.prototype = Object.create(TabElement.prototype)

ShaderMaterialEditor.prototype.isAttached = function(material) {
    return this.material === material
}

// Attach material to material editor
ShaderMaterialEditor.prototype.attach = function(material, materialFile) {
	this.obj.material = material
	this.obj.visible = true

	// Store material file pointer
	if (materialFile !== undefined) {
		this.materialFile = materialFile
	}

	this.fragmentShader.setValue(material.fragmentShader)
	this.vertexShader.setValue(material.vertexShader)

	// Store material
	this.material = material
}

// Activate this tab
ShaderMaterialEditor.prototype.activate = function() {
	Editor.setState(Editor.STATE_IDLE)
	Editor.resetEditingFlags()
	Mouse.canvas = this.canvas.element
}

// Remove element
ShaderMaterialEditor.prototype.updateMetadata = function() {
	if (this.material !== null) {
		var material = this.material

		// Set container name
		if (material.name !== undefined) {
			this.setName(material.name)
		}

		// Check if scene exists in program
		var found = false
		var materials = Editor.program.materials
		for(var i in materials) {
			if (materials[i].uuid === material.uuid) {
				found = true
				break;
			}
		}

		// If not found, close tab
		if (!found) {
			this.close()
		}
	}
}

// Update material editor
ShaderMaterialEditor.prototype.update = function() {
	// Update UI containers
	this.main.update()
	this.preview.update()
	this.right.update()

	// Render material
	if (this.material !== null) {
		// If needs update file metadata
		if (this.material.needsUpdate) {
			Editor.updateAssetExplorer()
		}

		// Render scene
		this.renderer.render(this.scene, this.camera)
	}

	// Move material view
	if (Mouse.insideCanvas()) {
		// Rotate object
		if (Mouse.buttonPressed(Mouse.LEFT)) {
			var delta = new THREE.Quaternion()
			delta.setFromEuler(new THREE.Euler(Mouse.delta.y * 0.005, Mouse.delta.x * 0.005, 0, 'XYZ'))
			this.obj.quaternion.multiplyQuaternions(delta, this.obj.quaternion)
		}

		// Zoom
		this.camera.position.z += Mouse.wheel * 0.003

		if (this.camera.position.z > 5) {
			this.camera.position.z = 5
		} else if (this.camera.position.z < -1.5) {
			this.camera.position.z = -1.5
		}
	}
}

// Update division size
ShaderMaterialEditor.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

	// Update main container
	this.main.visible = this.visible
	this.main.size.copy(this.size)
	this.main.updateInterface()

	// Update preview container
	this.preview.visible = this.visible
	this.preview.size.set(this.size.x * this.main.tabPosition, this.size.y)
	this.preview.updateInterface()

	// Update right
	this.right.visible = this.visible
	this.right.size.set(this.size.x * this.main.tabPosition, this.size.y)
	this.right.updateInterface()

	// Update code editors
	this.fragmentShader.size.set(this.right.size.x, this.right.size.y)
	this.fragmentShader.visible = this.visible
	this.fragmentShader.updateInterface()
	this.vertexShader.size.set(this.right.size.x, this.right.size.y)
	this.vertexShader.visible = this.visible
	this.vertexShader.updateInterface()

	// Update canvas
	this.canvas.visible = this.visible
	this.canvas.size.set(this.preview.divA.offsetWidth, this.preview.divA.offsetHeight)
	this.canvas.updateInterface()

	// Update renderer and canvas
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y)
	this.camera.aspect = this.canvas.size.x/this.canvas.size.y
	this.camera.updateProjectionMatrix()

	// Update children
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].visible = this.visible
		this.children[i].updateInterface()
	}
}
