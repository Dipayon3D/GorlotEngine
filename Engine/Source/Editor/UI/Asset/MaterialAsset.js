"use strict"

function MaterialAsset(parent) {
	Asset.call(this, parent)

	// Material
	this.material = null
    this.setIcon(Interface.fileDir + "Icons/Misc/Material.png")

	// Self pointer
	var self = this

	// Used to store original material color on highlight
	this.materialColor = new THREE.Color(0, 0, 0)
	this.materialHighlighted = false

    // Material preview
    this.image = document.createElement("img")
    this.image.style.position = "absolute"
    this.image.style.top = "5px"
    this.element.appendChild(this.image)

	// Mouse over event
	this.element.onmouseenter = function() {
		this.style.backgroundColor = Editor.theme.buttonOverColor
		self.highlightMaterial()
	}

	// Mouse leave event
	this.element.onmouseleave = function() {
		this.style.backgroundColor = ""
		self.restoreMaterial()
	}

	// Double click
	this.element.ondblclick = function() {
		if(self.material instanceof THREE.Material) {
            if(self.material instanceof THREE.ShaderMaterial) {
                var tab = Interface.tab.getTab(ShaderMaterialEditor, self.material)
            } else {
                var tab = Interface.tab.getTab(MaterialEditor, self.material)
            }

            if(tab === null) {
                if(self.material instanceof THREE.ShaderMaterial) {
                    tab = Interface.tab.addTab(ShaderMaterialEditor, true)
                } else {
                    tab = Interface.tab.addTab(MaterialEditor, true)
                }
                tab.attach(self.material)
            }
            tab.select()
		}
	}

	// Context menu event
	this.element.oncontextmenu = function(event) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(event.clientX - 5, event.clientY - 5)
		
		context.addOption("Rename", function() {
			if(self.material !== null) {
                var name = prompt("Rename material", self.material.name)
                if(name !== null && name !== "") {
                    self.material.name = name
                    self.updateMetadata()
                    Editor.updateTabsData()
                }
			}
		})
		
		context.addOption("Delete", function() {
			if(self.material !== null && confirm("Delete material?")) {
				Editor.program.removeMaterial(self.material, Editor.defaultMaterial, Editor.defaultSpriteMaterial)
				Editor.updateObjectViews()
			}
		})

		context.addOption("Copy", function() {
			if(self.material !== null) {
				try {
					Editor.clipboard.set(JSON.stringify(self.material.toJSON()), "text")
				}
				catch(e){}
			}
		})

        context.addOption("Cut", () => {
            if(self.material !== null) {
                try {
                    Editor.clipboard.set(JSON.stringify(self.material.toJSON()), "text")

                    Editor.program.removeMaterial(self.material, Editor.defaultMaterial, Editor.defaultSpriteMaterial)
                    Editor.updateObjectViews()
                } catch(e) {}
            }
        })

		context.addOption("Duplicate", function() {
			if(self.material !== null) {
				try {
					// Object loader
					var json = self.material.toJSON()
					var loader = new ObjectLoader()

					// Load images
					var images = loader.parseImages(json.images)
					for(var i = 0; i < images.length; i++) {
						images[i].uuid = THREE.Math.generateUUID()
					}

					// Load textures
					var textures = loader.parseTextures(json.textures, images)
					for(i = 0; i < textures.length; i++) {
						textures[i].uuid = THREE.Math.generateUUID()
					}

					// Load Material
					loader = new THREE.MaterialLoader()
					loader.setTextures(textures)
					var material = loader.parse(json)
					material.uuid = THREE.Math.generateUUID()
					
					// Add material
					Editor.program.addMaterial(material)
					Editor.updateAssetExplorer()
				} catch(e) {
					alert("Material duplication failed\n(" + e + ")");
				}
			}
		})
	}

	// Drag start
	this.element.ondragstart = function(event) {
		// Restore material color
		self.restoreMaterial()

		// Insert material into drag buffer
		if(self.material !== null) {
			event.dataTransfer.setData("uuid", self.material.uuid)
			DragBuffer.pushDragElement(self.material)
		}

		// To avoid camera movement
		Editor.mouse.updateKey(Mouse.LEFT, Key.UP)
	}

	// Drag end (called after of ondrop)
	this.element.ondragend = function(event) {
		// Try to remove material from drag buffer
		var uuid = event.dataTransfer.getData("uuid")
		var obj = DragBuffer.popDragElement(uuid)
	}
}

// Super prototypes
MaterialAsset.prototype = Object.create(Asset.prototype)

// Destroy material file
MaterialAsset.prototype.destroy = function() {
	Asset.prototype.destroy.call(this)
	this.restoreMaterial()
}

// Set object to file
MaterialAsset.prototype.setMaterial = function(material) {
	if(material instanceof THREE.Material) {
		this.setText(material.name)
		this.material = material
		this.updateMetadata()
	}
}

// Highlight material
MaterialAsset.prototype.highlightMaterial = function() {
	if(this.material instanceof THREE.Material) {
		if(this.material.color !== undefined) {
			this.materialColor.copy(this.material.color)
			this.material.color.setRGB(1, 1, 0)
			this.materialHighlighted = true
		}
	}
}

// Restore material to normal color
MaterialAsset.prototype.restoreMaterial = function() {
	if(this.materialHighlighted) {
		if(this.material instanceof THREE.Material) {
			if(this.material.color !== undefined) {
				this.material.color.copy(this.materialColor)
				this.materialHighlighted = false
			}
		}
	}
}

// Update material preview
MaterialAsset.prototype.updateMetadata = function() {
	if(this.material !== null) {
		Editor.materialRenderer.renderMaterial(this.material, this.image)
		this.setText(this.material.name)
		this.path = this.material.path
	}
}

// Update Interface
MaterialAsset.prototype.updateInterface = function() {
    Asset.prototype.updateInterface.call(this)

    // Update image
    this.image.width = this.size.x * this.scale.x
    this.image.height = this.size.y * this.scale.y
    this.image.style.left = ((this.size.x - (this.size.x * this.scale.x))/2) + "px"
}
