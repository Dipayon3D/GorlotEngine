"use strict"

function BlockComponent() {
    Component.call(this)

    this.component_name = "Blocks"
    this.className = "BlockComponent"
}

BlockComponent.prototype = Object.create(Component.prototype)

BlockComponent.prototype.initUI = function(pos, obj) {
    // Clear the element
    this.clearElement()

    this.widgetsPos = pos

    // Self pointer
    var self = this
    this.obj = obj

    // Form
    this.form = new Form(this.element)
    this.form.spacing.set(5, 5)

    // Displays the component name
    this.form.addText(this.component_name)
    this.form.nextRow()

    // Set position and update interface
    this.form.position.copy(this.widgetsPos)
    this.form.updateInterface()

    this.widgetsPos.y += this.form.size.y

    this.addDeleteButton()

    return this.element
}
