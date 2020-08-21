"use strict"

function SceneComponent() {
	Component.call(this)

	this.componentName = "Scene"
	this.className = "SceneComponent"

	this.values = {
		name: "scene",
		default: false,
		background: [0,0,0],
		fog: THREE.Fog.NONE
	}
}

SceneComponent.prototype = Object.create(Component.prototype)

SceneComponent.prototype.initUI = function(pos, obj) {
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

	// Name
	this.form.addText("Name")
	this.name = new TextBox(this.form.element)
	this.name.size.set(200, 18)
	this.name.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.name = self.name.getText()
			Editor.updateObjectViews()
		}
	})
	this.form.add(this.name)
	this.form.nextRow()

	//Select scene as default
	this.default = new CheckBox(this.form.element)
	this.form.addText("Default Scene")
	this.default.size.set(20, 15)
	this.default.setOnChange(() => {
		if (self.obj !== null) {
			var program = self.obj.parent
			if (self.default.getValue()) {
				program.defaultScene = self.obj.uuid
			} else {
				program.defaultScene = null
			}
		}
	})
	this.form.add(this.default)
	this.form.nextRow()

	// Background colour
	this.form.addText("Background")
	this.background = new ColorChooser(this.form.element)
	this.background.size.set(80, 18)
	this.background.setValue(0, 0, 0)
	this.background.setOnChange(() => {
		if (self.obj !== null) {
			if (self.obj.background === null) {
				self.obj.background = new THREE.Color()
			}
			self.obj.background.setHex(self.background.getValueHex())
		}
	})
	this.form.add(this.background)
	this.form.nextRow()

	// Fog
	this.form.addText("Fog")
	this.fog = new DropdownList(this.form.element)
	this.fog.size.set(100, 20)
	this.fog.addValue("None", THREE.Fog.NONE)
	this.fog.addValue("Linear", THREE.Fog.LINEAR)
	this.fog.addValue("Exponential", THREE.Fog.EXPONENTIAL)
	this.fog.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.setFogMode(self.fog.getSelectedIndex())
			self.updateData()
		}
	})
	this.form.add(this.fog)
	this.form.nextRow()

	this.form.addText("Fog Settings")
	this.form.nextRow()

	// linear fog
	this.fogLinearForm = new Form(this.form.element)
	this.fogLinearForm.spacing.set(5, 5)

    this.fogLinearForm.addText("Linear Fog")
    this.fogLinearForm.nextRow()

	// Linear fog colour
	this.fogLinearForm.addText("Colour")
	this.fogLinearColour = new ColorChooser(this.fogLinearForm.element)
	this.fogLinearColour.size.set(80, 18)
	this.fogLinearColour.setOnChange(() => {
		if (self.obj !== null) {
			var colour = self.fogLinearColour.getValueHex()
			self.obj.fog.color.setHex(colour)
		}
	})
	this.fogLinearForm.add(this.fogLinearColour)
	this.fogLinearForm.nextRow()

	// Linear fog near
	this.fogLinearForm.addText("Near")
	this.fogNear = new NumberBox(this.fogLinearForm.element)
	this.fogNear.size.set(60, 18)
	this.fogNear.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.fog.near = self.fogNear.getValue()
		}
	})
	this.fogLinearForm.add(this.fogNear)
	this.fogLinearForm.nextRow()

	// Linear fog far
	this.fogLinearForm.addText("Far")
	this.fogFar = new NumberBox(this.fogLinearForm.element)
	this.fogFar.size.set(60, 18)
	this.fogFar.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.fog.far = self.fogFar.getValue()
		}
	})
	this.fogLinearForm.add(this.fogFar)
	this.fogLinearForm.nextRow()
	this.fogLinearForm.updateInterface()

	// Add linear fog form
	this.form.add(this.fogLinearForm)
	this.form.nextRow()

	// Exponential fog properties
	this.fogExponentialForm = new Form(this.form.element)
	this.fogExponentialForm.spacing.set(5, 5)

    this.fogExponentialForm.addText("Exponential Fog")
    this.fogExponentialForm.nextRow()

	// Exponential fog density
	this.fogExponentialForm.addText("Density")
	this.fogDensity = new NumberBox(this.fogExponentialForm.element)
	this.fogDensity.size.set(100, 18)
	this.fogDensity.setStep(0.0001)
	this.fogDensity.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.fog.density = self.fogDensity.getValue()
		}
	})
	this.fogExponentialForm.add(this.fogDensity)
	this.fogExponentialForm.nextRow()
	this.fogExponentialForm.updateInterface()

	// Add exponential fog form
	this.form.add(this.fogExponentialForm)
	this.form.nextRow()

	// Physics World
    this.form.addSeparator()
    this.form.nextRow()

	this.form.addText("Physics World")
	this.form.nextRow()

	// Gravity
	this.form.addText("Gravity")
	this.gravity = new CoordinatesBox(this.form.element)
	this.gravity.setOnChange(() => {
		if (self.obj !== null) {
			var gravity = self.gravity.getValue()
			self.obj.world.gravity.set(gravity.x, gravity.y, gravity.z)
		}
	})
	this.form.add(this.gravity)
	this.form.nextRow()

	// Set position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

SceneComponent.prototype.updateData = function() {
	this.name.setText(this.obj.name)
	this.default.setValue(this.obj.uuid === this.obj.parent.defaultScene)

	if (this.obj.fog instanceof THREE.Fog) {
		this.fog.setValue(THREE.Fog.LINEAR)
	} else if (this.obj.fog instanceof THREE.FogExp2) {
		this.fog.setValue(THREE.Fog.EXPONENTIAL)
	} else {
		this.fog.setValue(THREE.Fog.NONE)
	}

	if (this.obj.fog !== null) {
		this.fogLinearColour.setValueHex(this.obj.fog.color.getHex())
		this.fogNear.setValue((this.obj.fog.near !== undefined) ? this.obj.fog.near : 0)
		this.fogFar.setValue((this.obj.fog.far !== undefined) ? this.obj.fog.far : 0)
		this.fogDensity.setValue((this.obj.fog.density !== undefined) ? this.obj.fog.density : 0)
	} else {
		this.fogLinearColour.setValueHex(0x000000)
		this.fogNear.setValue(0)
		this.fogFar.setValue(0)
		this.fogDensity.setValue(0)
	}

	if (this.obj.background !== null) {
		this.background.setValue(this.obj.background.r, this.obj.background.g, this.obj.background.b)
	}

	this.gravity.setValue(this.obj.world.gravity.x, this.obj.world.gravity.y, this.obj.world.gravity.z)
}

SceneComponent.prototype.onReset = function() {
	this.obj.name = this.values.name
	this.obj.default = this.values.default
	this.obj.parent.defaultScene = null
	this.obj.setFogMode(this.values.fog)

	this.updateData()
	Editor.updateObjectViews()
}
