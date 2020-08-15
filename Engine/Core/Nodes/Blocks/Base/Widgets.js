function WidgetFloatNode() {
	this.properties = {value: 1}
	this.addOutput("Value", "number")
	this.addWidget("number", "Value", this.properties.value, "value")
    this.serialize_widgets = true
}
WidgetFloatNode.title = "Float"
WidgetFloatNode.prototype.onStart = function() {
	if (this.properties.value !== undefined)
		this.setOutputData(0, this.properties.value)
}
WidgetFloatNode.prototype.onPropertyChanged = function() {
	this.setOutputData(0, this.properties.value)

	if (this.graph && this.graph.onNodeConnectionChange)
		this.graph.onNodeConnectionChange()
}

function WidgetBoolean() {
    this.properties = {value: true}
    this.addOutput("", "boolean")
    this.widget = this.addWidget("toggle", "Value", this.properties.value, "value")
}
WidgetBoolean.title = "Boolean"
WidgetBoolean.prototype.onStart = function() {
    if(this.properties.value !== undefined)
        this.setOutputData(0, this.properties.value)
}
WidgetBoolean.onPropertyChanged = function() {
    this.setOutputData(0, this.properties.value)

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function WidgetString() {
    this.properties = { value: "Hello world!" }
    this.addOutput("", "string")
    this.widget = this.addWidget("text", "Value", this.properties.value, "value")
}
WidgetString.title = "String"
WidgetString.prototype.onStart = function() {
    if(this.properties.value !== undefined)
        this.setOutputData(0, this.properties.value)
}
WidgetString.prototype.onPropertyChanged = function() {
    this.setOutputData(0, this.properties.value)

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function registerWidgets() {
	LiteGraph.registerNodeType("Base/Widgets/Float", WidgetFloatNode)
	LiteGraph.registerNodeType("Base/Widgets/Boolean", WidgetBoolean)
	LiteGraph.registerNodeType("Base/Widgets/String", WidgetString)
}
