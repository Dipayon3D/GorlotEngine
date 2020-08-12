function WidgetFloatNode() {
	this.properties = {value: 1}
	this.addOutput("Value", "number")
	this.addWidget("number", "Value", this.properties.value, "value")
}
WidgetFloatNode.title = "Float"
WidgetFloatNode.collapsable = false
WidgetFloatNode.prototype.resizable = false
WidgetFloatNode.prototype.onStart = function() {
	if (this.properties.value !== undefined)
		this.setOutputData(0, this.properties.value)
}
WidgetFloatNode.prototype.onPropertyChanged = function() {
	this.setOutputData(0, this.properties.value)

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function registerWidgets() {
	LiteGraph.registerNodeType("Base/Widgets/Float", WidgetFloatNode)
}
