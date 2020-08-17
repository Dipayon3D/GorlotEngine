"use strict"

function ConsoleTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Console", "Editor/Files/Icons/Misc/Console.png")

    this.element.style.backgroundColor = Editor.theme.bar_color
    
    // TODO: This
}

ConsoleTab.prototype = Object.create(TabElement.prototype)

// Update division size
ConsoleTab.prototype.updateInterface = function() {
    // Set visibility
    if(this.visible) {
        this.element.style.visibility = "visible"
    } else {
        this.element.style.visibility = "hidden"
    }

    // TODO: This
    
    // Update base element
    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"
}
