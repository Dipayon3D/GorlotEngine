"use strict"

function KinectComponent() {
	Component.call(this)

	this.componentName = "Kinect"
	this.className = "KinectComponent"

	this.values = {
		debugModel: true
	}
}

KinectComponent.prototype = Object.create(Component.prototype)

KinectComponent.prototype.initUI = function(pos, obj) {
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

	// Debug model
	this.form.addText("Debug model")
	this.debugModel = new CheckBox(this.form.element)
	this.debugModel.size.set(20, 15)
	this.debugModel.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.debugModel = self.debugModel.getValue()
		}
	})
	this.form.add(this.debugModel)

	// Set position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

KinectComponent.prototype.updateData = function() {
	this.debugModel.setValue(this.obj.debugModel)
}

KinectComponent.prototype.onReset = function() {
	this.obj.debugModel = this.values.debugModel

	Editor.updateObjectViews()
	this.updateData()
}
