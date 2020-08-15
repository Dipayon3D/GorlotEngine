function ANode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
ANode.title = "A"
ANode.collapsable = true
ANode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ANode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.A)
}
ANode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.A)) 
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.A)) 
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.A)) 
		this.triggerSlot(2, "Released")
}

function AltNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
AltNode.title = "Alt"
AltNode.collapsable = true
AltNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
AltNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.ALT)
}
AltNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.ALT)) 
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.ALT))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.ALT)) 
		this.triggerSlot(2, "Released")
}

function BNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
BNode.title = "B"
BNode.collapsable = true
BNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
BNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.B)
}
BNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.B)) 
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.B)) 
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.B)) 
		this.triggerSlot(2, "Released")
}

function BackspaceNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
BackspaceNode.title = "Backspace"
BackspaceNode.collapsable = true
BackspaceNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
BackspaceNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.BACKSPACE)
}
BackspaceNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.BACKSPACE))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.BACKSPACE))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.BACKSPACE))
		this.triggerSlot(2, "Released")
}

function CNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
CNode.title = "C"
CNode.collapsable = true
CNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
CNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.C)
}
CNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.C))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.C))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.C))
		this.triggerSlot(2, "Released")
}

function CapsLockNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
CapsLockNode.title = "CapsLock"
CapsLockNode.collapsable = true
CapsLockNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
CapsLockNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.CAPS_LOCK)
}
CapsLockNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.CAPS_LOCK))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.CAPS_LOCK))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.CAPS_LOCK))
		this.triggerSlot(2, "Released")
}

function CtrlNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
CtrlNode.title = "Ctrl"
CtrlNode.collapsable = true
CtrlNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
CtrlNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.CTRL)
}
CtrlNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.CTRL))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.CTRL))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.CTRL))
		this.triggerSlot(2, "Released")
}

function DNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
DNode.title = "D"
DNode.collapsable = true
DNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
DNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.D)
}
DNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.D))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.D))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.D))
		this.triggerSlot(2, "Released")
}

function DelNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
DelNode.title = "Del"
DelNode.collapsable = true
DelNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
DelNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.DEL)
}
DelNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.DEL))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.DEL))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.DEL))
		this.triggerSlot(2, "Released")
}

function DownNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
DownNode.title = "Down"
DownNode.collapsable = true
DownNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
DownNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.DOWN)
}
DownNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.DOWN))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.DOWN))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.DOWN))
		this.triggerSlot(2, "Released")
}

function ENode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
ENode.title = "E"
ENode.collapsable = true
ENode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ENode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.E)
}
ENode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.E))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.E))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.E))
		this.triggerSlot(2, "Released")
}

function EndNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
EndNode.title = "End"
EndNode.collapsable = true
EndNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
EndNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.END)
}
EndNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.END))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.END))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.END))
		this.triggerSlot(2, "Released")
}

function EnterNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
EnterNode.title = "Enter"
EnterNode.collapsable = true
EnterNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
EnterNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.ENTER)
}
EnterNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.ENTER))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.ENTER))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.ENTER))
		this.triggerSlot(2, "Released")
}

function EscNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
EscNode.title = "Esc"
EscNode.collapsable = true
EscNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
EscNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.ESC)
}
EscNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.ESC))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.ESC))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.ESC))
		this.triggerSlot(2, "Released")
}

function FNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
FNode.title = "F"
FNode.collapsable = true
FNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
FNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F)
}
FNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F))
		this.triggerSlot(2, "Released")
}

function F1Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F1Node.title = "F1"
F1Node.collapsable = true
F1Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F1Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F1)
}
F1Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F1))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F1))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F1))
		this.triggerSlot(2, "Released")
}

function F2Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F2Node.title = "F2"
F2Node.collapsable = true
F2Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F2Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F2)
}
F2Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F2))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F2))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F2))
		this.triggerSlot(2, "Released")
}

function F3Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F3Node.title = "F3"
F3Node.collapsable = true
F3Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F3Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F3)
}
F3Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F3))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F3))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F3))
		this.triggerSlot(2, "Released")
}

function F4Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F4Node.title = "F4"
F4Node.collapsable = true
F4Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F4Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F4)
}
F4Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F4))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F4))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F4))
		this.triggerSlot(2, "Released")
}

function F5Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F5Node.title = "F5"
F5Node.collapsable = true
F5Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F5Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F5)
}
F5Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F5))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F5))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F5))
		this.triggerSlot(2, "Released")
}

function F6Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F6Node.title = "F6"
F6Node.collapsable = true
F6Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F6Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F6)
}
F6Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F6))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F6))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F6))
		this.triggerSlot(2, "Released")
}

function F7Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F7Node.title = "F7"
F7Node.collapsable = true
F7Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F7Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F7)
}
F7Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F7))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F7))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F7))
		this.triggerSlot(2, "Released")
}

function F8Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F8Node.title = "F8"
F8Node.collapsable = true
F8Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F8Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F8)
}
F8Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F8))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F8))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F8))
		this.triggerSlot(2, "Released")
}

function F9Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F9Node.title = "F9"
F9Node.collapsable = true
F9Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F9Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F9)
}
F9Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F9))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F9))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F9))
		this.triggerSlot(2, "Released")
}

function F10Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F10Node.title = "F10"
F10Node.collapsable = true
F10Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F10Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F10)
}
F10Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F10))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F10))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F10))
		this.triggerSlot(2, "Released")
}

function F11Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F11Node.title = "F11"
F11Node.collapsable = true
F11Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F11Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F11)
}
F11Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F11))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F11))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F11))
		this.triggerSlot(2, "Released")
}

function F12Node() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
F12Node.title = "F12"
F12Node.collapsable = true
F12Node.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
F12Node.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.F12)
}
F12Node.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.F12))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.F12))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.F12))
		this.triggerSlot(2, "Released")
}

function GNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
GNode.title = "G"
GNode.collapsable = true
GNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.G)
}
GNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.G))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.G))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.G))
		this.triggerSlot(2, "Released")
}

function HNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
HNode.title = "H"
HNode.collapsable = true
HNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
HNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.H)
}
HNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.H))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.H))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.H))
		this.triggerSlot(2, "Released")
}

function HomeNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
HomeNode.title = "Home"
HomeNode.collapsable = true
HomeNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
HomeNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.HOME)
}
HomeNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.HOME))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.HOME))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.HOME))
		this.triggerSlot(2, "Released")
}

function INode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
INode.title = "I"
INode.collapsable = true
INode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
INode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.I)
}
INode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.I))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.I))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.I))
		this.triggerSlot(2, "Released")
}

function InsertNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
InsertNode.title = "Insert"
InsertNode.collapsable = true
InsertNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
InsertNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.INSERT)
}
InsertNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.INSERT))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.INSERT))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.INSERT))
		this.triggerSlot(2, "Released")
}

function JNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
JNode.title = "J"
JNode.collapsable = true
JNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
JNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.J)
}
JNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.J))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.J))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.J))
		this.triggerSlot(2, "Released")
}

function KNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
KNode.title = "K"
KNode.collapsable = true
KNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
KNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.K)
}
KNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.K))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.K))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.K))
		this.triggerSlot(2, "Released")
}

function LNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
LNode.title = "L"
LNode.collapsable = true
LNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
LNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.L)
}
LNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.L))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.L))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.L))
		this.triggerSlot(2, "Released")
}

function LeftNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
LeftNode.title = "Left"
LeftNode.collapsable = true
LeftNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
LeftNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.LEFT)
}
LeftNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.LEFT))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.LEFT))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.LEFT))
		this.triggerSlot(2, "Released")
}

function MNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
MNode.title = "M"
MNode.collapsable = true
MNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
MNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.M)
}
MNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.M))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.M))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.M))
		this.triggerSlot(2, "Released")
}

function NNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
NNode.title = "N"
NNode.collapsable = true
NNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
NNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.N)
}
NNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.N))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.N))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.N))
		this.triggerSlot(2, "Released")
}

function ONode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
ONode.title = "O"
ONode.collapsable = true
ONode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ONode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.O)
}
ONode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.O))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.O))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.O))
		this.triggerSlot(2, "Released")
}

function PNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
PNode.title = "P"
PNode.collapsable = true
PNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
PNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.P)
}
PNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.P))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.P))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.P))
		this.triggerSlot(2, "Released")
}

function PageUpNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
PageUpNode.title = "PageUp"
PageUpNode.collapsable = true
PageUpNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
PageUpNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.PAGE_UP)
}
PageUpNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.PAGE_UP))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.PAGE_UP))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.PAGE_UP))
		this.triggerSlot(2, "Released")
}

function PageDownNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
PageDownNode.title = "PageDown"
PageDownNode.collapsable = true
PageDownNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
PageDownNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.PAGE_DOWN)
}
PageDownNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.PAGE_DOWN))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.PAGE_DOWN))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.PAGE_DOWN))
		this.triggerSlot(2, "Released")
}

function QNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
QNode.title = "Q"
QNode.collapsable = true
QNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
QNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.Q)
}
QNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.Q))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.Q))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.Q))
		this.triggerSlot(2, "Released")
}

function RNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
RNode.title = "R"
RNode.collapsable = true
RNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
RNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.R)
}
RNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.R))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.R))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.R))
		this.triggerSlot(2, "Released")
}

function RightNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
RightNode.title = "Right"
RightNode.collapsable = true
RightNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
RightNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.RIGHT)
}
RightNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.RIGHT))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.RIGHT))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.RIGHT))
		this.triggerSlot(2, "Released")
}

function SNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
SNode.title = "S"
SNode.collapsable = true
SNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.S)
}
SNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.S))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.S))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.S))
		this.triggerSlot(2, "Released")
}

function ShiftNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
ShiftNode.title = "Shift"
ShiftNode.collapsable = true
ShiftNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ShiftNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.SHIFT)
}
ShiftNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.SHIFT))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.SHIFT))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.SHIFT))
		this.triggerSlot(2, "Released")
}

function SpacebarNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
SpacebarNode.title = "Spacebar"
SpacebarNode.collapsable = true
SpacebarNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
SpacebarNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.SPACEBAR)
}
SpacebarNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.SPACEBAR))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.SPACEBAR))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.SPACEBAR))
		this.triggerSlot(2, "Released")
}

function TNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
TNode.title = "T"
TNode.collapsable = true
TNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
TNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.T)
}
TNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.T))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.T))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.T))
		this.triggerSlot(2, "Released")
}

function TabNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
TabNode.title = "Tab"
TabNode.collapsable = true
TabNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
TabNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.TAB)
}
TabNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.TAB))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.TAB))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.TAB))
		this.triggerSlot(2, "Released")
}

function UNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
UNode.title = "U"
UNode.collapsable = true
UNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
UNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.U)
}
UNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.U))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.U))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.U))
		this.triggerSlot(2, "Released")
}

function UpNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
UpNode.title = "Up"
UpNode.collapsable = true
UpNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
UpNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.UP)
}
UpNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.UP))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.UP))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.UP))
		this.triggerSlot(2, "Released")
}

function VNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
VNode.title = "V"
VNode.collapsable = true
VNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
VNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.V)
}
VNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.V))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.V))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.V))
		this.triggerSlot(2, "Released")
}

function WNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
WNode.title = "W"
WNode.collapsable = true
WNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
WNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.W)
}
WNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.W))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.W))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.W))
		this.triggerSlot(2, "Released")
}

function XNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
XNode.title = "X"
XNode.collapsable = true
XNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
XNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.X)
}
XNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.X))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.X))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.X))
		this.triggerSlot(2, "Released")
}

function YNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
YNode.title = "Y"
YNode.collapsable = true
YNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
YNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.Y)
}
YNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.Y))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.Y))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.Y))
		this.triggerSlot(2, "Released")
}

function ZNode() {
	this.addOutput("Pressed", LiteGraph.EVENT)
	this.addOutput("Just Pressed", LiteGraph.EVENT)
	this.addOutput("Released", LiteGraph.EVENT)

	this.addOutput("Key", "key")
}
ZNode.title = "Z"
ZNode.collapsable = true
ZNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ZNode.prototype.onStart = function() {
	this.setOutputData(3, Keyboard.Z)
}
ZNode.prototype.onExecute = function() {
	if (Keyboard.keyPressed(Keyboard.Z))
		this.triggerSlot(0, "Pressed")
	if (Keyboard.keyJustPressed(Keyboard.Z))
		this.triggerSlot(1, "JustPressed")
	if (Keyboard.keyJustReleased(Keyboard.Z))
		this.triggerSlot(2, "Released")
}

function registerKeyboardNodes() {
	LiteGraph.registerNodeType("Input/Keyboard/A", ANode)
	LiteGraph.registerNodeType("Input/Keyboard/Alt", AltNode)
	LiteGraph.registerNodeType("Input/Keyboard/B", BNode)
	LiteGraph.registerNodeType("Input/Keyboard/Backspace", BackspaceNode)
	LiteGraph.registerNodeType("Input/Keyboard/C", CNode)
	LiteGraph.registerNodeType("Input/Keyboard/CapsLock", CapsLockNode)
	LiteGraph.registerNodeType("Input/Keyboard/Ctrl", CtrlNode)
	LiteGraph.registerNodeType("Input/Keyboard/D", DNode)
	LiteGraph.registerNodeType("Input/Keyboard/Del", DelNode)
	LiteGraph.registerNodeType("Input/Keyboard/Down", DownNode)
	LiteGraph.registerNodeType("Input/Keyboard/E", ENode)
	LiteGraph.registerNodeType("Input/Keyboard/End", EndNode)
	LiteGraph.registerNodeType("Input/Keyboard/Enter", EnterNode)
	LiteGraph.registerNodeType("Input/Keyboard/Esc", EscNode)
	LiteGraph.registerNodeType("Input/Keyboard/F", FNode)
	LiteGraph.registerNodeType("Input/Keyboard/F1", F1Node)
	LiteGraph.registerNodeType("Input/Keyboard/F2", F2Node)
	LiteGraph.registerNodeType("Input/Keyboard/F3", F3Node)
	LiteGraph.registerNodeType("Input/Keyboard/F4", F4Node)
	LiteGraph.registerNodeType("Input/Keyboard/F5", F5Node)
	LiteGraph.registerNodeType("Input/Keyboard/F6", F6Node)
	LiteGraph.registerNodeType("Input/Keyboard/F7", F7Node)
	LiteGraph.registerNodeType("Input/Keyboard/F8", F8Node)
	LiteGraph.registerNodeType("Input/Keyboard/F9", F9Node)
	LiteGraph.registerNodeType("Input/Keyboard/F10", F10Node)
	LiteGraph.registerNodeType("Input/Keyboard/F11", F11Node)
	LiteGraph.registerNodeType("Input/Keyboard/F12", F12Node)
	LiteGraph.registerNodeType("Input/Keyboard/G", GNode)
	LiteGraph.registerNodeType("Input/Keyboard/H", HNode)
	LiteGraph.registerNodeType("Input/Keyboard/Home", HomeNode)
	LiteGraph.registerNodeType("Input/Keyboard/I", INode)
	LiteGraph.registerNodeType("Input/Keyboard/Insert", InsertNode)
	LiteGraph.registerNodeType("Input/Keyboard/J", JNode)
	LiteGraph.registerNodeType("Input/Keyboard/K", KNode)
	LiteGraph.registerNodeType("Input/Keyboard/L", LNode)
	LiteGraph.registerNodeType("Input/Keyboard/Left", LeftNode)
	LiteGraph.registerNodeType("Input/Keyboard/M", MNode)
	LiteGraph.registerNodeType("Input/Keyboard/N", NNode)
	LiteGraph.registerNodeType("Input/Keyboard/O", ONode)
	LiteGraph.registerNodeType("Input/Keyboard/P", PNode)
	LiteGraph.registerNodeType("Input/Keyboard/PageUp", PageUpNode)
	LiteGraph.registerNodeType("Input/Keyboard/PageDown", PageDownNode)
	LiteGraph.registerNodeType("Input/Keyboard/Q", QNode)
	LiteGraph.registerNodeType("Input/Keyboard/R", RNode)
	LiteGraph.registerNodeType("Input/Keyboard/Right", RightNode)
	LiteGraph.registerNodeType("Input/Keyboard/S", SNode)
	LiteGraph.registerNodeType("Input/Keyboard/Shift", ShiftNode)
	LiteGraph.registerNodeType("Input/Keyboard/Spacebar", SpacebarNode)
	LiteGraph.registerNodeType("Input/Keyboard/T", TNode)
	LiteGraph.registerNodeType("Input/Keyboard/Tab", TabNode)
	LiteGraph.registerNodeType("Input/Keyboard/U", UNode)
	LiteGraph.registerNodeType("Input/Keyboard/Up", UpNode)
	LiteGraph.registerNodeType("Input/Keyboard/V", VNode)
	LiteGraph.registerNodeType("Input/Keyboard/W", WNode)
	LiteGraph.registerNodeType("Input/Keyboard/X", XNode)
	LiteGraph.registerNodeType("Input/Keyboard/Y", YNode)
	LiteGraph.registerNodeType("Input/Keyboard/Z", ZNode)
}
