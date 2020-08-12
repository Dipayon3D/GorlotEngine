function ThisNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("This", "object")
}
ThisNode.title = "This"
ThisNode.collapsable = true
ThisNode.blocks = "Blocks"
ThisNode.prototype.resizable = false
ThisNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ThisNode.prototype.onStart = function() {
	this.setOutputData(2, this.graph.config.self)

	this.triggerSlot(0, this.graph.config.self)
	this.triggerSlot(1)
}

function SceneNode() {
    this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
    this.addOutput("Scene", "object")
}
SceneNode.title = "Scene"
SceneNode.collapsable = true
SceneNode.prototype.resizable = false
SceneNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SceneNode.prototype.onStart = function() {
    if(this.graph.config.scene !== undefined) {
        this.setOutputData(2, this.graph.config.scene)

        this.triggerSlot(0, this.graph.config.scene)
        this.triggerSlot(1)
    }
}

function ProgramNode() {
    this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
    this.addOutput("Program", "object")
}
ProgramNode.title = "Program"
ProgramNode.collapsable = true
ProgramNode.prototype.resizable = false
ProgramNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ProgramNode.prototype.onStart = function() {
    if(this.graph.config.program !== undefined) {
        this.setOutputData(2, this.graph.config.program)

        this.triggerSlot(0, this.graph.config.program)
        this.triggerSlot(1)
    }
}

function GetPositionNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Position", "vector")
}
GetPositionNode.title = "Get Position"
GetPositionNode.collapsable = true
GetPositionNode.blocks = "Blocks"
GetPositionNode.prototype.resizable = false
GetPositionNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetPositionNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (target === undefined) 
		target = this.graph.config.self

	var pos = target.position

	this.setOutputData(2, pos)

	this.triggerSlot(0, pos)
	this.triggerSlot(1)
}

function GetRotationNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Rotation", "euler")
}
GetRotationNode.title = "Get Rotation"
GetRotationNode.collapsable = true
GetRotationNode.blocks = "Blocks"
GetRotationNode.prototype.resizable = false
GetRotationNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetRotationNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D))
		target = data

	if (target === undefined)
		target = this.graph.config.self

	var rot = target.rotation

	this.setOutputData(2, rot)

	this.triggerSlot(0, rot)
	this.triggerSlot(1)
}

function GetScaleNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Scale", "vector")
}
GetScaleNode.title = "Get Scale"
GetScaleNode.collapsable = true
GetScaleNode.blocks = "Blocks"
GetScaleNode.prototype.resizable = false
GetScaleNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetScaleNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D))
		target = data

	if (target === undefined)
		target = this.graph.config.self

	var scale = target.scale

	this.setOutputData(2, scale)

	this.triggerSlot(0, scale)
	this.triggerSlot(1)
}

function SetPositionNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")
	this.addInput("Position", "vector")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("New Position", "vector")
}
SetPositionNode.title = "Set Position"
SetPositionNode.collapsable = true
SetPositionNode.blocks = "Blocks"
SetPositionNode.prototype.resizable = false
SetPositionNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SetPositionNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)
	var pos = this.getInputData(2)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D))
		target = data

	if (target === undefined)
		target = this.graph.config.self

	if (pos === undefined && (data !== undefined && data instanceof THREE.Vector3))
		pos = data

	if (pos === undefined)
		pos = new THREE.Vector3(0, 0, 0)

	target.position.copy(pos)

	this.setOutputData(2, pos)
	this.triggerSlot(0, pos)
	this.triggerSlot(1)
}

function SetRotationNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")
	this.addInput("Rotation", "euler")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("New Rotation", "euler")
}
SetRotationNode.title = "Set Rotation"
SetRotationNode.collapsable = true
SetRotationNode.blocks = "Blocks"
SetRotationNode.prototype.resizable = false
SetRotationNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SetRotationNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)
	var rot = this.getInputData(2)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D))
		target = data

	if (target === undefined)
		target = this.graph.config.self

	if (rot === undefined && (data !== undefined && data instanceof THREE.Euler))
		rot = data

	if (rot === undefined)
		rot = new THREE.Euler(0, 0, 0, "XYZ")

	target.rotation.copy(rot)

	this.setOutputData(2, rot)
	this.triggerSlot(0, rot)
	this.triggerSlot(1)
}

function SetScaleNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")
	this.addInput("Scale", "vector")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("New Scale", "vector")
}
SetScaleNode.title = "Set Scale"
SetScaleNode.collapsable = true
SetScaleNode.blocks = "Blocks"
SetScaleNode.prototype.resizable = false
SetScaleNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SetScaleNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)
	var scale = this.getInputData(2)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D))
		target = data

	if (target === undefined)
		target = this.graph.config.self

	if (scale === undefined && (data !== undefined && data instanceof THREE.Vector3))
		scale = data

	if (scale === undefined)
		scale = new THREE.Vector3(1, 1, 1)

	target.scale.copy(scale)

	this.setOutputData(2, scale)
	this.triggerSlot(0, scale)
	this.triggerSlot(1)
}

function registerObjects() {
	LiteGraph.registerNodeType("Elements/This", ThisNode)
	LiteGraph.registerNodeType("Elements/Scene", SceneNode)
	LiteGraph.registerNodeType("Elements/Program", ProgramNode)

	LiteGraph.registerNodeType("Elements/Objects/GetPosition", GetPositionNode)
	LiteGraph.registerNodeType("Elements/Objects/GetRotation", GetRotationNode)
	LiteGraph.registerNodeType("Elements/Objects/GetScale", GetScaleNode)
	LiteGraph.registerNodeType("Elements/Objects/SetPosition", SetPositionNode)
	LiteGraph.registerNodeType("Elements/Objects/SetRotation", SetRotationNode)
	LiteGraph.registerNodeType("Elements/Objects/SetScale", SetScaleNode)
}
