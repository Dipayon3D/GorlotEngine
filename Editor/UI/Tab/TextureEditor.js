"use strict"

function TextureEditor(parent) {
    // Parent
    this.parent = (parent !== undefined) ? parent : document.body

    // Id
    var id = "texture_editor" + TextureEditor.id
    TextureEditor.id++

    Register.unregisterAll()
    Register.registerTextureNodes()

    // Create element
    this.element = document.createElement("div")
    this.element.id = id
    this.element.style.position = "absolute"

    this.element.ondrop = function(e) {
        e.preventDefault()
    }

    this.element.ondragover = function(e) {
        e.preventDefault()
    }

    // Self pointer
    var self = this

    // Graph canvas
    this.graph_canvas = new Canvas(this.element)
    this.graph_canvas.updateInterface()

    this.graph = null

    // Element attributes
    this.children = []
    this.fit_parent = false
    this.size = new THREE.Vector2(0, 0)
    this.position = new THREE.Vector2(0, 0)
    this.visible = true

    // Texture UI File element
    this.texture_file = null

    // Attached texture
    this.texture = null
}

// Texture editor counter
TextureEditor.id = 0

// Attach texture to the editor
TextureEditor.prototype.attachTexture = function(texture, texture_file) {
    // Store texture file pointer
    if(texture_file !== undefined) {
        this.texture_file = texture_file
    }

    // Store texture
    this.texture = texture
}

// Activate texture editor
TextureEditor.prototype.activate = function() {
    Editor.setState(Editor.STATE_IDLE)
    Mouse.setCanvas(this.canvas.element)
    Editor.resetEditingFlags()
}

// Remove element
TextureEditor.prototype.destroy = function() {
    try {
        this.parent.removeChild(this.element)
    } catch(e) {}
}

// On Close
TextureEditor.prototype.close = function() {
    // TODO: Update the texture nodes
}

// Update metadata
TextureEditor.prototype.updateMetadata = function() {
}

// Update the attached texture
TextureEditor.prototype.updateTexture = function() {
}

// Update texture editor
TextureEditor.prototype.update = function() {
}    

// Update Division size
TextureEditor.prototype.updateInterface = function() {
}
