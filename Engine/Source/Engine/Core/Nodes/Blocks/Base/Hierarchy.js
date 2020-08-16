// Get All Child
function GetAllChildrenNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Children", "array")
}
GetAllChildrenNode.title = "Get All Children"
GetAllChildrenNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetAllChildrenNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (target === undefined)
		target = this.graph.config.self

	var children = target.children

	this.setOutputData(2, children)

	this.triggerSlot(0, children)
	this.triggerSlot(1)
}

// Get Children Through Name
function GetChildByNameNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")
	this.addInput("Name", "string")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Child", "object")

	this.addProperty("name", "")
	this.name_widget = this.addWidget("text", "", "", "name")
	this.name_widget.width = 120
}
GetChildByNameNode.title = "Get Child By Name"
GetChildByNameNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetChildByNameNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)
	var name = this.getInputData(2)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (name === undefined && (data !== undefined && data instanceof String)) 
		name = data

	if (target === undefined) 
		target = this.graph.config.self

	if (name === undefined) 
		name = this.properties.name

	var child = target.getObjectByName(name)

	this.setOutputData(2, child)

	this.triggerSlot(0, child)
	this.triggerSlot(1)
}

// Get Parent
function GetParentNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Parent", "object")
}
GetParentNode.title = "Get Parent"
GetParentNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetParentNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (target === undefined) 
		target = this.graph.config.self

	var parent = target.parent

	this.setOutputData(2, parent)

	this.triggerSlot(0, parent)
	this.triggerSlot(1)
}

// Is child
function IsChildNode() {
	this.addInput("", LiteGraph.ACTION)
	this.addInput("Target", "object")

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Is Child?", "bool")
}
IsChildNode.title = "Is Child"
IsChildNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
IsChildNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(1)
	var output = false

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (target === undefined) 
		target = this.graph.config.self

	var parent = target.parent

	// If the parent ain't a scene, then the target object is a child
	output = (parent instanceof THREE.Scene) ? false : true

	this.setOutputData(2, output)

	this.triggerSlot(0, output)
	this.triggerSlot(1)
}

function registerHierarchy() {
	LiteGraph.registerNodeType("Hierarchy/GetAllChildNode", GetAllChildrenNode)
	LiteGraph.registerNodeType("Hierarchy/GetChildByName", GetChildByNameNode)
	LiteGraph.registerNodeType("Hierarchy/GetParent", GetParentNode)
	LiteGraph.registerNodeType("Hierarchy/IsChild", IsChildNode)
}
