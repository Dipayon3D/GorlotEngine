"use strict"

function ScriptComponent() {
	Component.call(this)

    this.componentName = "Script"
    this.className = "ScriptComponent"
}

ScriptComponent.prototype = Object.create(Component.prototype)

ScriptComponent.prototype.initUI = function(pos, obj) {
        // Clear the element
        this.clearElement()
    
        this.widgetsPos = pos
    
        // Self pointer
        var self = this
        this.obj = obj
    
        // Form
        this.form = new Form(this.element)
        this.form.spacing.set(5, 5)
    
        // Displays this component name
        this.form.addText(this.componentName)
        this.form.nextRow()

        // Set position and update interface
        this.form.position.copy(this.widgetsPos)
        this.form.updateInterface()

        this.widgetsPos.y += this.form.size.y
        this.addResetButton()

        return this.element
}

ScriptComponent.prototype.onReset = function() {
        this.updateData()
        Editor.updateObjectViews()
}
