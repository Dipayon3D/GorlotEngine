function ParticlesNode() {
	this.addInput("Direction", "string")
	this.addInput("Count", "number")
	this.addInput("Rate", "number")
	this.addInput("Duration", "number")
	this.addInput("Wiggle", "number")

	this.serialize_widgets = true
	this.properties = {direction: "Forward", directions: "Forward;Backward", count: 2000, rate: 2000, duration: 0, wiggle: 0}
}
ParticlesNode.title = "Particles"
ParticlesNode.skip_list = true
ParticlesNode.prototype.onAdded = function() {
	var self = this
	var emitter = this.graph.extra.particles.emitter
	var group = this.graph.extra.particles.group

	this.emitter = emitter
	this.group = group

	this.properties.direction = (emitter.direction === 1) ? "Forward" : "Backward"
	this.properties.count = group.maxParticleCount
	this.properties.rate = emitter.particleCount
	this.properties.duration = emitter.duration
	this.properties.wiggle = emitter.wiggle.value

	this.dir = this.addWidget("combo", "Direction", this.properties.direction, (v) => {self.properties.direction = v}, {property: "direction", values: this.properties.directions.split(";")})
	this.count = this.addWidget("number", "Max Count", this.properties.count, "count")
	this.rate = this.addWidget("slider", "Rate", this.properties.rate, (v) => {self.properties.rate = v}, {value: this.properties.rate, min: 0, max: this.properties.count, property: "rate"})
	this.duration = this.addWidget("number", "Duration", this.properties.duration, "duration")
	this.wiggle = this.addWidget("number", "Wiggle", this.properties.wiggle, "wiggle")
}
ParticlesNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "direction")
		if (v === "Forward")
			this.emitter.direction = 1
		else if (v === "Backward")
			this.emitter.direction = -1

	if (n === "count") {
		this.group.maxParticleCount = parseInt(v)
		this.rate.options.max = parseInt(v)

		if (this.rate.value > parseInt(v)) {
			this.emitter.particleCount = parseInt(v)
			this.rate.value = parseInt(v)
		}
	}

	if (n === "rate") {
		this.emitter.particleCount = parseInt(v)
	}

	if (n === "duration") {
		if (v < 0.01) {
			this.emitter.duration = null
		} else {
			this.emitter.duration = v
		}
	}

	if (n === "wiggle") {
		this.emitter.wiggle.value = parseInt(v)
	}

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesTextureNode() {
	this.serialize_widgets = true
	this.addInput("Texture", "texture")
	this.size = [120, 26]
}
ParticlesTextureNode.title = "Texture"
ParticlesTextureNode.prototype.onAdded = function() {
	this.group = this.graph.extra.particles.group
}
ParticlesTextureNode.prototype.onExecute = function() {
	var t = this.getInputData(0)

	if (t === undefined)
		return

	this.group.texture = t
}

function ParticlesBlendingModeNode() {
	this.serialize_widgets = true
	this.properties = {blending: "NaN", modes: "None;Normal;Additive;Subtractive;Multiply"}
}
ParticlesBlendingModeNode.title = "Blending"
ParticlesBlendingModeNode.prototype.onAdded = function() {
	this.group = this.graph.extra.particles.group
	this.blending = this.group.blending

	var mode = ""
	var self = this

	if (this.blending === THREE.NoBlending)
		mode = "None"
	else if (this.blending === THREE.NormalBlending)
		mode = "Normal"
	else if (this.blending === THREE.AdditiveBlending)
		mode = "Additive"
	else if (this.blending === THREE.SubtractiveBlending)
		mode = "Subtractive"
	else if (this.blending === THREE.MultiplyBlending)
		mode = "Multiply"

	this.properties.blending = mode
	this.addWidget("combo", "Blending", mode, (v) => {self.properties.blending = v}, {property: "blending", values: this.properties.modes.split(";"), width: 200})

	this.size = [200, 26]
}
ParticlesBlendingModeNode.prototype.onPropertyChanged = function(n, v) {

	if (n === "blending") {
		if (v === "None")
			this.group.blending = THREE.NoBlending
		else if (v === "Normal")
			this.group.blending = THREE.NormalBlending
		else if (v === "Additive")
			this.group.blending = THREE.AdditiveBlending
		else if (v === "Subtractive")
			this.group.blending = THREE.SubtractiveBlending
		else if (v === "Multiply")
			this.group.blending = THREE.MultiplyBlending
	}

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesEmitterTypeNode() {
	this.serialize_widgets = true
	this.properties = {type: "NaN", types: "Box;Sphere;Disc"}
}
ParticlesEmitterTypeNode.title = "Emitter Type"
ParticlesEmitterTypeNode.prototype.onAdded = function() {
	this.emitter = this.graph.extra.particles.emitter

	var type = ""
	var self = this

	if (this.emitter.type === SPE.distributions.BOX)
		type = "Box"
	else if (this.emitter.type === SPE.distributions.SPHERE)
		type = "Sphere"
	else if (this.emitter.type === SPE.distributions.DISC)
		type = "Disc"

	this.properties.type = type
	this.addWidget("combo", "Type", type, (v) => {self.properties.type = v}, {property: "type", values: this.properties.types.split(";"), width: 180})

	this.size = [180, 26]
}
ParticlesEmitterTypeNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "type")
		if (v === "Box")
			this.emitter.type = SPE.distributions.BOX
		else if (v === "Sphere")
			this.emitter.type = SPE.distributions.SPHERE
		else if (v === "Disc")
			this.emitter.type = SPE.distributions.DISC

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesMaxAgeNode() {
	this.serialize_widgets = true
	this.properties = {value: 0, spread: 0}
}
ParticlesMaxAgeNode.title = "Max Age"
ParticlesMaxAgeNode.prototype.onAdded = function() {
	this.maxAge = this.graph.extra.particles.emitter.maxAge
	this.value = this.maxAge.value
	this.spread = this.maxAge.spread

	this.properties.value = this.value
	this.properties.spread = this.spread

	this.addWidget("number", "Value", this.properties.value, "value")
	this.addWidget("number", "Spread", this.properties.spread, "spread")

	this.size = [160, 52]
}
ParticlesMaxAgeNode.prototype.onPropertyChanged = function(n, v) {

	if (n === "value")
		this.value = v
	else if (n === "spread")
		this.spread = v

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesPositionNode() {
	this.serialize_widgets = true
	this.properties = {x: 0, y: 0, z: 0, spreadx: 0, spready: 0, spreadz: 0}
}
ParticlesPositionNode.title = "Position"
ParticlesPositionNode.prototype.onAdded = function() {
	this.position = this.graph.extra.particles.emitter.position

	this.value = this.position.value
	this.spread = this.position.spread

	this.addWidget("number", "Value X", this.value.x, "x")
	this.addWidget("number", "Value Y", this.value.y, "y")
	this.addWidget("number", "Value Z", this.value.z, "z")

	this.addWidget("number", "Spread X", this.spread.x, "spreadx")
	this.addWidget("number", "Spread Y", this.spread.y, "spready")
	this.addWidget("number", "Spread Z", this.spread.z, "spreadz")

	this.size = [180, 150]
}
ParticlesPositionNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "x" || n === "y" || n === "z") {
		this.value.x = this.properties.x
		this.value.y = this.properties.y
		this.value.z = this.properties.z
	} else if (n === "spreadx" || n === "spready" || n === "spreadz") {
		this.spread.x = this.properties.spreadx
		this.spread.y = this.properties.spready
		this.spread.z = this.properties.spreadz
	}

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesVelocityNode() {
	this.serialize_widgets = true
	this.properties = {x: 0, y: 0, z: 0, spreadx: 0, spready: 0, spreadz: 0}
}
ParticlesVelocityNode.title = "Velocity"
ParticlesVelocityNode.prototype.onAdded = function() {
	this.velocity = this.graph.extra.particles.emitter.velocity

	this.value = this.velocity.value
	this.spread = this.velocity.spread

	this.addWidget("number", "Value X", this.value.x, "x")
	this.addWidget("number", "Value Y", this.value.y, "y")
	this.addWidget("number", "Value Z", this.value.z, "z")

	this.addWidget("number", "Spread X", this.spread.x, "spreadx")
	this.addWidget("number", "Spread Y", this.spread.y, "spready")
	this.addWidget("number", "Spread Z", this.spread.z, "spreadz")

	this.size = [180, 150]
}
ParticlesVelocityNode.prototype.onPropertyChanged = function(n, v) {

	if (n === "x" || n === "y" || n === "z") {
		this.value.x = this.properties.x
		this.value.y = this.properties.y
		this.value.z = this.properties.z
	} else if (n === "spreadx" || n === "spready" || n === "spreadz") {
		this.spread.x = this.properties.spreadx
		this.spread.y = this.properties.spready
		this.spread.z = this.properties.spreadz
	}

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesAccelerationNode() {
	this.serialize_widgets = true
	this.properties = {x: 0, y: 0, z: 0, spreadx: 0, spready: 0, spreadz: 0}
}
ParticlesAccelerationNode.title = "Acceleration"
ParticlesAccelerationNode.prototype.onAdded = function() {
	this.acceleration = this.graph.extra.particles.emitter.velocity

	this.value = this.acceleration.value
	this.spread = this.acceleration.spread

	this.addWidget("number", "Value X", this.value.x, "x")
	this.addWidget("number", "Value Y", this.value.y, "y")
	this.addWidget("number", "Value Z", this.value.z, "z")

	this.addWidget("number", "Spread X", this.spread.x, "spreadx")
	this.addWidget("number", "Spread Y", this.spread.y, "spready")
	this.addWidget("number", "Spread Z", this.spread.z, "spreadz")

	this.size = [180, 150]
}
ParticlesAccelerationNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "x" || n === "y" || n === "z") {
		this.value.x = this.properties.x
		this.value.y = this.properties.y
		this.value.z = this.properties.z
	} else if (n === "spreadx" || n === "spready" || n === "spreadz") {
		this.spread.x = this.properties.spreadx
		this.spread.y = this.properties.spready
		this.spread.z = this.properties.spreadz
	}

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesWiggleNode() {
	this.serialize_widgets = true
	this.properties = {wiggle: 0, spread: 0}
}
ParticlesWiggleNode.title = "Wiggle"
ParticlesWiggleNode.prototype.onAdded = function() {
	this.wiggle = this.graph.extra.particles.emitter.wiggle

	this.value = this.wiggle.value
	this.spread = this.wiggle.spread

	this.addWidget("number", "Value", this.value, "wiggle")
	this.addWidget("number", "Spread", this.spread, "spread")
}
ParticlesWiggleNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "wiggle") 
		this.value = v
	else if (n === "spread")
		this.spread = v

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function ParticlesOpacityNode() {
	this.addInput("Value", "array")
	this.addInput("Spread", "array")
}
ParticlesOpacityNode.title = "Opacity"
ParticlesOpacityNode.prototype.onAdded = function() {
	this.opacity = this.graph.extra.particles.emitter.opacity
}
ParticlesOpacityNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var s = this.getInputData(1)

	if (v === undefined || v.length < 4)
		return

	if (s !== undefined && s.length > 4)
		this.opacity.spread = s

	this.opacity.value = v
}

function ParticlesScaleNode() {
	this.addInput("Value", "array")
	this.addInput("Spread", "array")
}
ParticlesScaleNode.title = "Scale"
ParticlesScaleNode.prototype.onAdded = function() {
	this.scale = this.graph.extra.particles.emitter.size
}
ParticlesScaleNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var s = this.getInputData(1)

	if (v === undefined || v.length < 4)
		return

	if (s !== undefined && s.length > 4)
		this.scale.spread = s

	this.scale.value = v
}

function ParticlesRotationNode() {
	this.addInput("Value", "array")
	this.addInput("Spread", "array")
}
ParticlesRotationNode.title = "Rotation"
ParticlesRotationNode.prototype.onAdded = function() {
	this.rotation = this.graph.extra.particles.emitter.angle
}
ParticlesRotationNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var s = this.getInputData(1)

	if (v === undefined || v.length < 4)
		return

	if (s !== undefined && s.length > 4)
		this.rotation.spread = s

	this.rotation.value = v
}

function ParticlesColourNode() {
	this.addInput("Value", "array")
	this.addInput("Spread", "array")
}
ParticlesColourNode.title = "Colour"
ParticlesColourNode.prototype.onAdded = function() {
	this.colour = this.graph.extra.particles.emitter.color
}
ParticlesColourNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var s = this.getInputData(1)

	if (v === undefined || v.length < 4)
		return

	if (s !== undefined && s.length > 4)
		this.colour.spread = s

	this.colour.value = v
}

function registerParticlesNodes() {
	LiteGraph.registerNodeType("Particles/Particles", ParticlesNode)
	LiteGraph.registerNodeType("Particles/ParticlesTexture", ParticlesTextureNode)
	LiteGraph.registerNodeType("Particles/ParticlesBlending", ParticlesBlendingModeNode)
	LiteGraph.registerNodeType("Particles/ParticlesEmitterType", ParticlesEmitterTypeNode)
	LiteGraph.registerNodeType("Particles/ParticlesMaxAge", ParticlesMaxAgeNode)
	LiteGraph.registerNodeType("Particles/ParticlesPosition", ParticlesPositionNode)
	LiteGraph.registerNodeType("Particles/ParticlesVelocity", ParticlesVelocityNode)
	LiteGraph.registerNodeType("Particles/ParticlesAcceleration", ParticlesAccelerationNode)
	LiteGraph.registerNodeType("Particles/ParticlesWiggle", ParticlesWiggleNode)
	LiteGraph.registerNodeType("Particles/ParticlesOpacity", ParticlesOpacityNode)
	LiteGraph.registerNodeType("Particles/ParticlesScale", ParticlesScaleNode)
	LiteGraph.registerNodeType("Particles/ParticlesRotation", ParticlesRotationNode)
	LiteGraph.registerNodeType("Particles/ParticlesColour", ParticlesColourNode)
}
