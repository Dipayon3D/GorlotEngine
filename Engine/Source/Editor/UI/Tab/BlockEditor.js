"use strict"

function BlockEditor(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Block Editor", "Source/Editor/Files/Icons/Script/Blocks.png")

    // In order to avoid errors, registers the nodes here and when it's activated
	Register.unregisterAll()
	Register.registerBlocksNodes()

	// Canvas
	this.canvas = new Canvas(this.element)
	this.canvas.updateInterface()
	this.canvas.element.style.position = "absolute"

	this.graph = null

	// Blocks file
	this.blocks = null
	this.nodes = null
}

BlockEditor.prototype = Object.create(TabElement.prototype)

// Attach Blocks to the editor
BlockEditor.prototype.attach = function(blocks) {
	// Store Blocks
	this.blocks = blocks
	this.nodes = this.blocks.nodes

	this.initNodeEditor()
}

// Check if blocks attached to tab
BlockEditor.prototype.isAttached = function(blocks) {
    return this.blocks === blocks
}

// Initialise node editor
BlockEditor.prototype.initNodeEditor = function() {
	this.graph = new LGraph(this.nodes)
	this.graphCanvas = new LGraphCanvas(this.canvas.element, this.graph)
}

// Activate code editor
BlockEditor.prototype.activate = function() {
	Register.unregisterAll()
	Register.registerBlocksNodes()

	Editor.setState(Editor.STATE_IDLE)
	Editor.resetEditingFlags()
}

// On close
BlockEditor.prototype.close = function() {
    TabElement.prototype.close.call(this)
	this.updateBlocks()
}

// Update container metadata
BlockEditor.prototype.updateMetadata = function() {
	if (this.blocks !== null) {
		var blocks = this.blocks

		// Set container name
		this.setName(blocks.name)

		// Check if particle exists in program
		var found = false
		Editor.program.traverse((obj) => {
			if (obj.uuid === blocks.uuid) {
				found = true
			}
		})

		// If not found, close tab
		if (!found) {
			this.close()
		}
	}
}

// Update the attached blocks
BlockEditor.prototype.updateBlocks = function() {
	if (this.blocks !== null) {
		this.blocks.updateNodes(this.graph.serialize())
	}
}

// Update Block Editor
BlockEditor.prototype.update = function() {
	if (this.blocks !== null) {
		this.updateBlocks()
	}
}

// Update interface
BlockEditor.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

	// Update canvas
	this.canvas.visible = this.visible
	this.canvas.position.set(0, 0)
	this.canvas.size.set(this.size.x, this.size.y)
	this.canvas.updateInterface()
}
