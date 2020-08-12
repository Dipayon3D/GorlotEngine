// Begin play
function BeginPlayNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
}
BeginPlayNode.title = "Begin Play"
BeginPlayNode.skip_list = true
BeginPlayNode.collapsable = false
BeginPlayNode.blocks = "Blocks"
BeginPlayNode.prototype.resizable = false
BeginPlayNode.prototype.ignore_remove = true
BeginPlayNode.prototype.clonable = false
BeginPlayNode.prototype.getMenuOptions = () => {return []}
BeginPlayNode.prototype.onStart = function() {
	this.triggerSlot(0, "BeginPlay")
	this.triggerSlot(1)
}

// Event Tick
function EventTickNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.passer)
	this.addOutput("", LiteGraph.EVENT)
}
EventTickNode.title = "Event Tick"
EventTickNode.skip_list = true
EventTickNode.collapsable = false
EventTickNode.blocks = "Blocks"
EventTickNode.prototype.resizable = false
EventTickNode.prototype.ignore_remove = true
EventTickNode.prototype.clonable = false
EventTickNode.prototype.getMenuOptions = () => {return []}
EventTickNode.prototype.onStart = function() {
	this.triggerSlot(1, "EventTickStarted")
}
EventTickNode.prototype.onExecute = function() {
	this.triggerSlot(0, "Tick")
}

// On Game Start
function OnGameStartNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
}
OnGameStartNode.title = "On Game Start"
OnGameStartNode.collapsable = false
OnGameStartNode.blocks = "Blocks"
OnGameStartNode.prototype.reiszable = false
OnGameStartNode.prototype.onStart = function() {
	this.triggerSlot(0, "GameStart")
	this.triggerSlot(1)
}

// Event Destroy
function EventDestroyedNode() {
	this.addInput("Target", "object")
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT)
}
EventDestroyedNode.title = "On Destroyed"
EventDestroyedNode.collapsable = false
EventDestroyedNode.blocks = "Blocks"
EventDestroyedNode.prototype.resizable = false
EventDestroyedNode.prototype.onStart = function() {
	
	var obj = this.getInputData(0)

	if (obj === undefined) {
		obj = this.graph.config.self
	}

	var self = this
	obj.addEventListener("removed", (e) => {
		self.triggerSlot(0, obj.uuid)
		self.triggerSlot(1)
	})
}

// Event Dispose
function EventDisposeNode() {
	this.addOutput("", LiteGraph.EVENT)
}
EventDisposeNode.title = "On Dispose"
EventDisposeNode.collapsable = false
EventDisposeNode.blocks = "Blocks"
EventDisposeNode.prototype.resizable = false
EventDisposeNode.prototype.onDispose = function() {
	this.triggerSlot(0)
}

// Create Event
function EventListenerNode() {
	this.addProperty("event", "event")

	this.addInput("", LiteGraph.ACTION)
	this.addInput("Object", "object")
	this.addInput("Data", "")
	this.addInput("Event", "string")

	this.event_widget = this.addWidget("text", "", this.properties.event, "event")
	this.event_widget.width = 110

	this.addOutput("On Fired", LiteGraph.EVENT)
}
EventListenerNode.title = "Event Listener"
EventListenerNode.collapsable = false
EventListenerNode.blocks = "Blocks"
EventListenerNode.prototype.resizable = false
EventListenerNode.prototype.onStart = function() {
	if (this.inputs[0].link === null) {
		this.addListener()
	}
}
EventListenerNode.prototype.onAction = function(action, data) {
	this.addListener()
}
EventListenerNode.prototype.addListener = function() {
	this.object = this.getInputData(1)
	this.data = this.getInputData(2)
	this.event = this.getInputData(3)

	if (this.object === undefined) 
		this.object = this.graph.config.self

	if (this.data === undefined) 
		this.data = {}

	if (this.event === undefined) 
		this.event = this.properties.event

	if (this.event !== "") {
		var self = this
		this.object.addEventListener(this.event, () => {self.listen()})
	}
}
EventListenerNode.prototype.listen = function() {
	this.triggerSlot(0, this.data)
}
EventListenerNode.prototype.onDispose = function() {
	// When the object is disposed, the event listener is removed
	if (this.object !== undefined) {
		this.object.removeEventListener(this.event, this.listen)
	}
}

// Fire Event
function FireEventNode() {
	this.addProperty("event", "event")

	this.addInput("", LiteGraph.ACTION)
	this.addInput("Object", "object")
	this.addInput("Event", "string")

	this.event_widget = this.addWidget("text", "", this.properties.event, "event")
	this.event_widget.width = 110
}
FireEventNode.title = "Fire Event"
FireEventNode.collapsable = false
FireEventNode.blocks = "Blocks"
FireEventNode.prototype.resizable = false
FireEventNode.prototype.onAction = function(action, data) {
	this.object = this.getInputData(1)
	this.event = this.getInputData(2)

	if (this.object === undefined) 
		this.object = this.graph.config.self

	if (this.event === undefined) 
		this.event = this.properties.event

	if(this.event !== "") {
		this.object.dispatchEvent({type: this.event})
	}
}

// Timeout Event
function TimeOutEvent() {
	this.addProperty("time", "100")

	this.addInput("", LiteGraph.ACTION)
	this.addInput("Time", "number")
	var tim = this.addWidget("text", "Time", this.properties.time, "time")
	tim.width = 140

	this.addOutput("On TimeOut")
}
TimeOutEvent.title = "Time Out"
TimeOutEvent.collapsable = false
TimeOutEvent.blocks = "Blocks"
TimeOutEvent.prototype.resizable = false
TimeOutEvent.prototype.onStart = function() {
	if (this.inputs[0].link === null)
		this.addTimeout()
}
TimeOutEvent.prototype.onAction = function(action, data) {
	this.addTimeout()
}
TimeOutEvent.prototype.addTimeout = function() {
	var time = this.getInputData(1)

	if (time === undefined)
		time = this.properties.time

	var self = this
	var timeout = setTimeout(() => {
		self.triggerSlot(0)
	}, parseInt(time))
}

// Test Event
function TestEvent() {
	this.addInput("Event", LiteGraph.ACTION)
	this.addInput("Input")
}
TestEvent.title = "Test"
TestEvent.blocks = "Blocks"
TestEvent.prototype.onAction = function(action, data) {
	console.log(action, data)
	console.log(this.getInputData(1))
}

function registerEvents() {
	LiteGraph.registerNodeType("Events/BeginPlay", BeginPlayNode)
	LiteGraph.registerNodeType("Events/EventTick", EventTickNode)
	LiteGraph.registerNodeType("Events/OnGameStart", OnGameStartNode)
	LiteGraph.registerNodeType("Events/EventDestroyed", EventDestroyedNode)
	LiteGraph.registerNodeType("Events/EventDispose", EventDisposeNode)
	LiteGraph.registerNodeType("Events/EventListener", EventListenerNode)
	LiteGraph.registerNodeType("Events/FireEvent", FireEventNode)
	LiteGraph.registerNodeType("Events/TimeOut", TimeOutEvent)
	LiteGraph.registerNodeType("Events/TestEvent", TestEvent)
}