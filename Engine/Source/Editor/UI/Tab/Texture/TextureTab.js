"use strict"

function TextureTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Texture", "Source/Editor/Files/Icons/Assets/Image.png")
    
    this.texture = null
}

TextureTab.prototype = Object.create(TabElement.prototype)

// Check if texture is attached to tab
TextureTab.prototype.isAttached = function(texture) {
    return this.texture === texture
}

// Activate
TextureTab.prototype.activate = function() {
    Editor.setState(Editor.STATE_IDLE)
    Editor.resetEditingFlags()
}

// Update object data
TextureTab.prototype.updateMetadata = function() {
    if(this.texture !== null) {
        // Set name
        if(this.texture.name !== undefined) {
            this.setName(this.texture.name)
        }

        // If not found, close tab
        if(Editor.program.textures[this.texture.uuid] === undefined) {
            this.close()
        }
    }
}

// Attach texture
TextureTab.prototype.attach = function(texture) {
    this.texture = texture
    this.updateMetadata()
}

// Update division size
TextureTab.prototype.updateInterface = function() {
    // Set visibility
    this.element.visibility = this.visible ? "visible" : "hidden"

    // Element
    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"
}
