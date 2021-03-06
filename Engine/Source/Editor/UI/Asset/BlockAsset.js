"use strict"

function BlockAsset(parent) {
	Asset.call(this, parent)

	// Block
	this.blocks = null
    this.setIcon(Interface.fileDir + "Icons/Script/Blocks.png")

	// Self pointer
	var self = this

    // Blocks icon
    this.image = document.createElement("img")
    this.image.style.position = "absolute"
    this.image.style.top = "5px"
    this.element.appendChild(this.image)

	// Context menu event
	this.element.oncontextmenu = function(e) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(event.clientX - 5, event.clientY - 5)

		context.addOption("Rename", () => {
			if (self.blocks !== null) {
                var name = prompt("Rename blocks", self.blocks.name)
                if(name !== null && name !== "") {
                    self.blocks.name = name
                    self.updateMetadata()
                    Editor.updateTabsData()
                }
			}
		})

		context.addOption("Delete", () => {
			if (self.blocks !== null && confirm("Delete Blocks?")) {
				Editor.program.removeObject(self.blocks)
				Editor.updateObjectViews()
			}
		})

		context.addOption("Duplicate", () => {
			if (self.blocks !== null) {
				try {
					// Object loader
					var json = self.blocks.toJSON()
					var loader = new ObjectLoader()

					// Parse Blocks
					var blocks = loader.parse(json)
					blocks.uuid = THREE.Math.generateUUID()

					// Add Blocks
					Editor.program.addObject(blocks)
					Editor.updateAssetExplorer()
				} catch(e) {}
			}
		})
	}

	// Drag start
	this.element.ondragstart = function(e) {
		// Insert blocks into drag buffer
		if (self.blocks !== null) {
			e.dataTransfer.setData("uuid", self.blocks.uuid)
			DragBuffer.pushDragElement(self.blocks)
		}

		// To avoid camera movement
		Editor.mouse.updateKey(Mouse.LEFT, Key.UP)
	}

	// Drag end (called after ondrop)
	this.element.ondragend = function(e) {
		// Try to remove blocks from drag buffer
		var uuid = event.dataTransfer.getData("uuid")
		var obj = DragBuffer.popDragElement(uuid)
	}

	// Double click
	this.element.ondblclick = function() {
		if (self.blocks instanceof BlockScript) {
            var tab = Interface.tab.getTab(BlockEditor, self.blocks)
            if(tab === null) {
                tab = Interface.tab.addTab(BlockEditor, true)
                tab.attach(self.blocks)
            }
            tab.select()
		}
	}
}

// Super prototypes
BlockAsset.prototype = Object.create(Asset.prototype)

// Destroy material file
BlockAsset.prototype.destroy = function() {
	Asset.prototype.destroy.call(this)
}

// Set blocks to this file
BlockAsset.prototype.setBlocks = function(blocks) {
	if (blocks instanceof BlockScript) {
		this.setText(blocks.name)
		this.blocks = blocks
		this.updateMetadata()
	}
}

// Update metadata
BlockAsset.prototype.updateMetadata = function() {
	if (this.blocks !== null) {
        this.image.src = Interface.fileDir + "Icons/Script/Blocks.png"
		this.setText(this.blocks.name)
		this.path = this.blocks.path
	}
}

// Update interface
BlockAsset.prototype.updateInterface = function() {
    Asset.prototype.updateInterface.call(this)

    // Update image
    this.image.width = this.size.x * this.scale.x
    this.image.height = this.size.y * this.scale.y
    this.image.style.left = ((this.size.x - (this.size.x * this.scale.x))/2) + "px"
}
