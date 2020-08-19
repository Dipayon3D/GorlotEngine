"use strict"

function TextureTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Texture", "Source/Editor/Files/Icons/Assets/Image.png")
    
    // TODO: This
}

TextureTab.prototype = Object.create(TabElement.prototype)

// Update division size
TextureTab.prototype.updateInterface = function() {
    // Set visibility
    this.element.visibility = this.visible ? "visible" : "hidden"

    // Update base element
    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"
}
