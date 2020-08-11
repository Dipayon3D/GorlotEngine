"use strict"

function TextArea(parent) {
    // Parent
    this.parent = (parent !== undefined) ? parent : document.body

    // ID
    var id = "txt_area" + TextArea.id
    TextArea.id++

    // Create element
    this.element = document.createElement("textarea")
    this.element.style.overflow = "auto"
    this.element.style.resize = "none"
    this.element.style.position = "absolute"
    this.element.style.backgroundColor = Editor.theme.box_color
    this.element.style.color = Editor.theme.text_color
    this.element.style.borderStyle = "none"

    // Element attributes
    this.size = new THREE.Vector2(0, 0)
    this.position = new THREE.Vector2(0, 0)
    this.visible = true

    // Add element to document
    this.parent.appendChild(this.element)
}

// TextArea ID counter
TextArea.id = 0

// Set if element is disabled
TextArea.prototype.setDisabled = function(value) {
    this.element.disabled = value
}

// Set onchange callback
TextArea.prototype.setOnChange = function(callback) {
    this.element.onchange = callback
}

// Set text
TextArea.prototype.setText = function(text) {
    this.element.value = text
}

// Get text
TextArea.prototype.getText = function() {
    return this.element.value
}

// Remove element
TextArea.prototype.destroy = function() {
    try {
        this.parent.removeChild(this.element)
    } catch(e) {}
}

// Update
TextArea.prototype.update = function() {}

// Update interface
TextArea.prototype.updateInterface = function() {
    if(this.visible) {
        this.element.style.visibility = "visible"
    } else {
        this.element.style.visibility = "hidden"
    }

    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = (this.size.y - 5) + "px"
}
