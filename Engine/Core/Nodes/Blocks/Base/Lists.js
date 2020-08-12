function ArrayNode() {
	this.addInput("", LiteGraph.EVENT)

	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
	this.addOutput("Array", "array")
}
ArrayNode.title = "Array"
ArrayNode.collapsable = false
ArrayNode.prototype.resizable = false
ArrayNode.prototype.onGetInputs = function() {
	var item =  [["Item", null]]
	return item
}
ArrayNode.prototype.onExecute = function() {
	if (this.isInputConnected(0))
		return

	this.setOutputData(2, this.createArray())
}
ArrayNode.prototype.onAction = function() {
	var arr = this.createArray()

	this.setOutputData(2, arr)
	
	this.triggerSlot(0, arr)
	this.triggerSlot(1)
}
ArrayNode.prototype.createArray = function() {
	var arr = []

	if (this.inputs) {
		for(var i = 0; i < this.inputs.length; i++) {
			var value = this.getInputData(i)
			
			if(value !== undefined) {
				arr.push(value)
			}
		}
	}

	return arr
}

function ArrayPushNode() {
	this.addInput("", LiteGraph.EVENT)
	this.addInput("Array", "array")
	this.addInput("Element", "")

	this.addOutput("", LiteGraph.EVENT)
}
ArrayPushNode.title = "Push"
ArrayPushNode.collapsable = false
ArrayPushNode.prototype.resizable = false
ArrayPushNode.prototype.onAction = function() {
	if (this.getInputData(2) !== undefined) {
		var ar = this.getInputData(1)
		ar.push(this.getInputData(2))

		this.triggerSlot(0)
	}
}

function registerArray() {
	LiteGraph.registerNodeType("Lists/Arrays/Array", ArrayNode)
	LiteGraph.registerNodeType("Lists/Arrays/Push", ArrayPushNode)
}
