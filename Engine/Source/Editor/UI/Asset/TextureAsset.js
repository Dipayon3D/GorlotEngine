"use strict";

function TextureAsset(parent) {
	Asset.call(this, parent)

	// Texture pointer
	this.texture = null
    this.setIcon(Interface.file_dir + "Icons/Assets/Image.png")

	// Self pointer
	var self = this

	// Context menu event
	this.element.oncontextmenu = function(event) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(event.clientX - 5, event.clientY - 5)
		
		context.addOption("Rename", function() {
			if(self.texture !== null) {
                var name = prompt("Rename texture", self.texture.name)
                if(name !== null && name !== "") {
                    self.texture.name = name
                    Editor.updateObjectViews()
                }
			}
		})
		
		context.addOption("Delete", function() {
			if(self.texture !== null && confirm("Delete texture?")) {
				self.texture.dispose()
				Editor.program.removeTexture(self.texture, Editor.default_texture)
				Editor.updateObjectViews()
			}
		})

        if(self.texture instanceof Texture) {
            context.addOption("Export Image", () => {
                var image = self.texture.img
                image.encodeData()

                FileSystem.chooseFile((files) => {
                    if(files.length > 0) {
                        var file = files[0].path
                        FileSystem.writeFileBase64(file, image.data)
                    }
                }, "." + image.encoding, true)
            })
        } else if(self.texture instanceof VideoTexture) {
        context.addOption("Export Video", () => {
            var video = self.texture.video

            FileSystem.chooseFile((files) => {
                if(files.length > 0) {
                    var file = files[0].path
                    FileSystem.writeFileBase64(file, video.data)
                }
            }, "." + video.encoding, true)
        })
    }


        context.addOption("Cut", () => {
            if(self.texture !== null) {
                try {
                    Editor.clipboard.set(JSON.stringify(self.texture.toJSON()), "text")

                    self.texture.dispose()
                    Editor.program.removeTexture(self.texture, Editor.default_texture)
                    Editor.updateObjectViews()
                } catch(e) {throw e}
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
		Mouse.updateKey(Mouse.LEFT, Key.UP)
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
    this.texture = texture

	if(texture instanceof VideoTexture || texture instanceof WebcamTexture) {
        this.preview = document.createElement("video")
        this.preview.draggable = true
        this.preview.style.position = "absolute"
        this.preview.style.top = "5px"
        this.preview.volume = 0.0
        this.preview.src = texture.image.src

        this.preview.onload = function() {
            this.preview.loop = true
            this.preview.autostart = true
        }

        this.element.appendChild(this.preview)
    } else if(texture instanceof THREE.Texture) {
        this.preview = document.createElement("img")
        this.preview.style.position = "absolute"
        this.preview.style.top = "5px"
        this.preview.src = texture.image.src
        this.element.appendChild(this.preview)
    }

    this.updateMetadata()
}

// Update material preview
TextureAsset.prototype.updateMetadata = function() {
	if(this.texture !== null) {
		this.setText(this.texture.name)
		this.path = this.texture.path
	}
}

// Update interface
TextureAsset.prototype.updateInterface = function() {
    Asset.prototype.updateInterface.call(this)

    this.preview.width = this.size.x * this.scale.x
    this.preview.height = this.size.y * this.scale.y
    this.preview.style.left = ((this.size.x - (this.size.x * this.scale.x))/2) + "px"
}
