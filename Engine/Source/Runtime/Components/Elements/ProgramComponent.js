"use strict"

function ProgramComponent() {
	Component.call(this)

	this.componentName = "Program"
	this.className = "ProgramComponent"

	this.values = {
		name: "program",
		author: "",
		version: "0",
		lockPointer: false,
		vr: false,
		vrScale: 1,
        antialiasing: false,
        shadows: true,
        shadowsType: THREE.PCFSoftShadowMap
	}
}

ProgramComponent.prototype = Object.create(Component.prototype)

ProgramComponent.prototype.initUI = function(pos, obj) {
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

    // Program information
    this.form.addText("Information")
    this.form.nextRow()

	// Author
	this.form.addText("Author")
	this.author = new TextBox(this.form.element)
	this.author.position.set(50, 35)
	this.author.size.set(190, 18)
	this.author.updateInterface()
	this.author.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.author = self.author.getText()
		}
	})
	this.form.add(this.author)
	this.form.nextRow()

	// Version
	this.form.addText("Version")
	this.version = new TextBox(this.form.element)
	this.version.size.set(100, 18)
	this.version.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.version = self.version.getText()
		}
	})
	this.form.add(this.version)
	this.form.nextRow()

	// Mouse Lock
	this.form.addText("Lock Pointer")
	this.lockPointer = new CheckBox(this.form.element)
	this.lockPointer.size.set(50, 15)
	this.lockPointer.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.lockPointer = self.lockPointer.getValue()
		}
	})
	this.form.add(this.lockPointer)
	this.form.nextRow()

	// VR
	this.form.addText("Virtual Reality")
	this.form.nextRow()

	// VR Enabled
	this.vr = new CheckBox(this.form.element)
	this.form.addText("VR Enabled")
	this.vr.size.set(50, 15)
	this.vr.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.vr = self.vr.getValue()
		}
	})
	this.form.add(this.vr)
	this.form.nextRow()

	// VR Movement Scale
	this.form.addText("Room Scale")
	this.vrScale = new NumberBox(this.form.element)
	this.vrScale.size.set(50, 18)
	this.vrScale.setRange(0, 1000)
	this.vrScale.setStep(0.05)
	this.vrScale.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.vrScale = self.vrScale.getValue()
		}
	})
	this.form.add(this.vrScale)
	this.form.nextRow()

    // Rendering
    this.form.addText("Rendering")
    this.form.nextRow()

    // Antialiasing
    this.antialiasing = new CheckBox(this.form.element)
    this.form.addText("Antialiasing")
    this.antialiasing.size.set(50, 15)
    this.antialiasing.setOnChange(() => {
        if(self.obj !== null) {
            self.obj.antialiasing = self.antialiasing.getValue()
        }
    })
    this.form.add(this.antialiasing)
    this.form.nextRow()

    // Shadows
    this.shadows = new CheckBox(this.form.element)
    this.form.addText("Shadows")
    this.shadows.size.set(50, 15)
    this.shadows.setOnChange(() => {
        if(self.obj !== null) {
            self.obj.shadows = self.shadows.getValue()
        }
    })
    this.form.add(this.shadows)
    this.form.nextRow()

    // Shadow type
    this.form.addText("Shadows type")
    this.shadowsType = new DropdownList(this.form.element)
    this.shadowsType.size.set(120, 20)
    this.shadowsType.addValue("Basic", THREE.BasicShadowMap)
    this.shadowsType.addValue("PCF", THREE.PCFShadowMap)
    this.shadowsType.addValue("PCF Soft", THREE.PCFSoftShadowMap)
    this.shadowsType.addValue("PCSS Soft", THREE.PCSSoftShadowMap)
    this.shadowsType.setOnChange(() => {
        self.obj.shadowsType = self.shadowsType.getValue()
    })
    this.form.add(this.shadowsType)
    this.form.nextRow()

	// Set position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

ProgramComponent.prototype.updateData = function() {
	this.name.setText(this.obj.name)
	this.author.setText(this.obj.author)
	this.version.setText(this.obj.version)
	this.lockPointer.setValue(this.obj.lockPointer)
	this.vr.setValue(this.obj.vr)
	this.vrScale.setValue(this.obj.vrScale)

    this.antialiasing.setValue(this.obj.antialiasing)
    this.shadows.setValue(this.obj.shadows)
    this.shadowsType.setValue(this.obj.shadowsType)
}

ProgramComponent.prototype.onReset = function() {
	this.obj.name = this.values.name
	this.obj.author = this.values.author
	this.obj.version = this.values.version
	this.obj.lockPointer = this.values.lockPointer
	this.obj.vr = this.values.vr
	this.obj.vrScale = this.values.vrScale

    this.obj.antialiasing = this.values.antialiasing
    this.obj.shadows = this.values.shadows
    this.obj.shadowsType = this.values.shadowsType

	Editor.updateObjectViews()
	this.updateData()
}
