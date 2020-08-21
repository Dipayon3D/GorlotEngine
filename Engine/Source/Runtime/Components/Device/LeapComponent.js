"use strict"

function LeapComponent() {
	Component.call(this)

	this.componentName = "Leap"
	this.className = "LeapComponent"

	this.values = {
		mode: 0,
		debugModel: true,
		gesturesEnabled: true,
		posesEnabled: true
	}
}

LeapComponent.prototype = Object.create(Component.prototype)

LeapComponent.prototype.initUI = function(pos, obj) {
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

	// Mode
	this.form.addText("Mode")
	this.mode = new DropdownList(this.form.element)
	this.mode.size.set(80, 18)
	this.mode.addValue("Desk", Script.INIT)
	this.mode.addValue("HMD", Script.LOOP)
	this.mode.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.mode = self.mode.getSelectedIndex()
		}
	})
	this.form.add(this.mode)
	this.form.nextRow()

	// Debug model
	this.form.addText("Debug Model")
	this.debugModel = new CheckBox(this.form.element)
	this.debugModel.size.set(20, 15)
	this.debugModel.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.debugModel = self.debugModel.getValue()
		}
	})
	this.form.add(this.debugModel)
	this.form.nextRow()

	// Gestures enabled
	this.form.addText("Gestures Enabled")
	this.gesturesEnabled = new CheckBox(this.form.element)
	this.gesturesEnabled.size.set(20, 15)
	this.gesturesEnabled.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.gesturesEnabled = self.gesturesEnabled.getValue()
		}
	})
	this.form.add(this.gesturesEnabled)
	this.form.nextRow()

	// Poses enabled
	this.form.addText("Poses Enabled")
	this.posesEnabled = new CheckBox(this.form.element)
	this.posesEnabled.size.set(20, 15)
	this.posesEnabled.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.posesEnabled = self.posesEnabled.getValue()
		}
	})
	this.form.add(this.posesEnabled)
	this.form.nextRow()

	// Set position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

LeapComponent.prototype.updateData = function() {
	this.mode.setSelectedIndex(this.obj.mode)
	this.debugModel.setValue(this.obj.debugModel)
	this.gesturesEnabled.setValue(this.obj.gesturesEnabled)
	this.posesEnabled.setValue(this.obj.posesEnabled)
}

LeapComponent.prototype.onReset = function() {
	this.obj.mode = this.values.mode
	this.obj.debugModel = this.values.debugModel
	this.obj.gesturesEnabled = this.values.gesturesEnabled
	this.obj.posesEnabled = this.values.posesEnabled

	Editor.updateObjectViews()
	this.updateData()
}
