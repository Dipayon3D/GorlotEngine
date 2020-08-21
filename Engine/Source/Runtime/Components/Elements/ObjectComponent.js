"use strict"

function ObjectComponent() {
	Component.call(this)

	this.componentName = "Object 3D"
	this.className = "ObjectComponent"

	this.values = {
		visible: true,
		static: false,
		castShadow: true,
		receiveShadow: true
	}
}

ObjectComponent.prototype = Object.create(Component.prototype)

ObjectComponent.prototype.initUI = function(pos, obj) {
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

	// Visible
	this.visible = new CheckBox(this.form.element)
	this.form.addText("Visible")
	this.visible.size.set(20, 15)
	this.visible.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.visible = self.visible.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.visible)
	this.form.nextRow()

	// Static
	this.static = new CheckBox(this.form.element)
	this.form.addText("Static Object")
	this.static.size.set(20, 15)
	this.static.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.matrixAutoUpdate = !(self.static.getValue())
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.static)
	this.form.nextRow()

	// Cast shadow
	this.form.addText("Cast Shadow")
	this.castShadow = new CheckBox(this.form.element)
	this.castShadow.size.set(20, 15)
	this.castShadow.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.castShadow = self.castShadow.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.castShadow)
	this.form.nextRow()

	// Receive Shadow
	this.form.addText("React Shadow")
	this.receiveShadow = new CheckBox(this.form.element)
	this.receiveShadow.size.set(20, 15)
	this.receiveShadow.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.receiveShadow = self.receiveShadow.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.receiveShadow)
	this.form.nextRow()

	// Set form position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

ObjectComponent.prototype.updateData = function() {
	this.visible.setValue(this.obj.visible)
	this.static.setValue(!this.obj.matrixAutoUpdate)
	this.castShadow.setValue(this.obj.castShadow)
	this.receiveShadow.setValue(this.obj.receiveShadow)
}

ObjectComponent.prototype.onReset = function() {
	this.obj.visible = this.values.visible
	this.obj.matrixAutoUpdate = !this.values.static
	this.obj.castShadow = this.values.castShadow
	this.obj.receiveShadow = this.values.receiveShadow

	this.updateData()
}
