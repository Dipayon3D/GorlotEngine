"use strict";

function TextureAsset(parent) {
	Asset.call(this, parent)

	// Texture pointer
	this.texture = null

	// Self pointer
	var self = this

    // Video
    this.video = document.createElement("video")
    this.video.style.position = "absolute"
    this.video.style.top = "5px"
    this.video.loop = true
    this.video.autostart = true
    this.video.volume = 0.0
    //this.element.appendChild(this.video)

    // Canvas
    this.canvas = document.createElement("canvas")
    this.canvas.style.position = "absolute"
    this.canvas.style.top = "5px"
    //this.element.appendChild(this.image)

	// Context menu event
	this.element.oncontextmenu = function(event) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(event.clientX - 5, event.clientY - 5)
		
		context.addOption("Rename", function() {
			if(self.texture !== null) {
				self.texture.name = prompt("Rename texture", self.texture.name)
				Editor.updateObjectViews()
			}
		})
		
		context.addOption("Delete", function() {
			if(self.texture !== null && confirm("Delete texture?")) {
				self.texture.dispose()
				Editor.program.removeTexture(self.texture, Editor.default_texture)
				Editor.updateObjectViews()
			}
		})

		context.addOption("Copy", function() {
			if(self.texture !== null) {
				try {
					Editor.clipboard.set(JSON.stringify(self.texture.toJSON()), "text");
				}
				catch(e){}
			}
		})
	}

	// Drag start
	this.element.ondragstart = function(e) {
		// Insert texture into drag buffer
		if (self.texture !== null) {
			e.dataTransfer.setData("uuid", self.texture.uuid)
			DragBuffer.pushDragElement(self.texture)
		}

		// To avoid camera movement
		Mouse.updateKey(Mouse.LEFT, Key.KEY_UP)
	}

	// Drag end (called after ondrop)
	this.element.ondragend = function(e) {
		// Try to remove texture from drag buffer
		var uuid = e.dataTransfer.getData("uuid")
		var obj = DragBuffer.popDragElement(uuid)
	}
}

TextureAsset.prototype = Object.create(Asset.prototype)

// Set object to file
TextureAsset.prototype.setTexture = function(texture) {
    // if(texture instanceof THREE.VideoTexture)
    // if(texture instanceof THREE.CanvasTexture)
	if(texture instanceof THREE.Texture) {
		this.texture = texture
		this.updateMetadata()
	}
}

// Update material preview
TextureAsset.prototype.updateMetadata = function() {
	if(this.texture !== null) {
		this.image.src = this.texture.image.src
		this.setText(this.texture.name)
		this.path = this.texture.path
	}
}
