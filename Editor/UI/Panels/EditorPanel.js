"use strict"

function EditorPanel(parent) {
    // Parent
    this.parent = (parent !== undefined) ? parent : document.body

    // Create element
    this.element = document.createElement("div")
    this.element.style.position = "absolute"
    this.element.style.overflow = "auto"
    this.element.style.cursor = "default"
    this.element.style.backgroundColor = Editor.theme.panel_color

    // Prevent Drop event
    this.element.ondrop = function(event) {
       event.preventDefault() 
    }

    // Prevent default when object dragged over
    this.element.ondragover = function(event) {
        event.preventDefault()
    }

    // Attributes
    this.fit_parent = true
    this.size = new THREE.Vector2(0, 0)
    this.position = new THREE.Vector2(0, 0)
    this.visible = true

    // Self pointer
    var self = this

    // Mouse inside panel
    this.focused = false

    this.element.onmouseenter = function() {
        self.focused = true
    }

    this.element.onmouseleave = function() {
        self.focused = false
    }

    // Default form
    this.form = new Form(this.element)
    this.form.position.set(5, 10)
    this.form.spacing.set(5, 5)

    // Object attached
    this.obj = null

    // Name
    this.form.addText("Name")
    this.name = new TextBox(this.form.element)
    this.name.size.set(200, 18)
    this.name.setOnChange(() => {
        if(self.obj !== null) {
            self.obj.name = self.name.getText()
            Editor.updateObjectViews()
        }
    })
    this.form.add(this.name)
    this.form.nextRow()

    // Append child to document
    this.parent.appendChild(this.element)
}

// Update panel with object data
EditorPanel.prototype.updatePanel = function() {}

// Attach object to panel
EditorPanel.prototype.attach = function() {
    if(obj instanceof THREE.Object3D) {
        this.obj = obj
        this.updatePanel()
    }
}

// Remove element
EditorPanel.prototype.destroy = function() {
    try {
        this.parent.removeChild(this.element)
    } catch(e) {}
}

// Update panel
EditorPanel.prototype.update = function() {}

// Update panel UI
EditorPanel.prototype.updateInterface = function() {
    if(this.fit_parent) {
        this.size.x = this.parent.offsetWidth
        this.size.y = this.parent.offsetHeight
    }

    if(this.visible) {
        this.element.style.visibility = "visible"
    } else {
        this.element.style.visibility = "hidden"
    }

    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"
}

// Update panel information
EditorPanel.prototype.updatePanel = function() {
    if(this.obj !== null) {
        this.name.setText(this.obj.name)
    }
}
