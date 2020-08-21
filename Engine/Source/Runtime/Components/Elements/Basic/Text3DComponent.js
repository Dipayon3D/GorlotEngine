"use strict"

function Text3DComponent() {
        Component.call(this)

        this.componentName = "Text"
        this.className = "Text3DComponent"

        this.values = {
                text: "text",
                size: 1,
                curveSegments: 15,
                thickness: 0.5,
                bevel: false,
                bevelThickness: 10,
                bevelSize: 8
        }
}

Text3DComponent.prototype = Object.create(Component.prototype)

Text3DComponent.prototype.initUI = function(pos, obj) {
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

        // Text
        this.form.addText("Text")
        this.text = new TextArea(this.form.element)
        this.text.size.set(190, 60)
        this.text.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.setText(self.text.getText())
                }
        })
        this.form.add(this.text)
        this.form.nextRow()

        // Size
        this.form.addText("Size")
        this.size = new NumberBox(this.form.element)
        this.size.size.set(60, 18)
        this.size.setRange(0, Number.MAX_SAFE_INTEGER)
        this.size.setStep(0.1)
        this.size.setOnChange(() => {
            if(self.obj !== null) {
                self.obj.size = self.size.getValue()
                self.obj.setText()
            }
        })
        this.form.add(this.size)
        this.form.nextRow()

        // Height
        this.form.addText("Thickness")
        this.height = new NumberBox(this.form.element)
        this.height.size.set(60, 18)
        this.height.setRange(0, Number.MAX_SAFE_INTEGER)
        this.height.setStep(0.1)
        this.height.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.height = self.height.getValue()
                        self.obj.setText()
                }
        })
        this.form.add(this.height)
        this.form.nextRow()

        // Curve segments
        this.form.addText("Curve Detail")
        this.curveSegments = new NumberBox(this.form.element)
        this.curveSegments.size.set(60, 18)
        this.curveSegments.setRange(0, Number.MAX_SAFE_INTEGER)
        this.curveSegments.setStep(1.0)
        this.curveSegments.setOnChange(() => {
            if(self.obj !== null) {
                self.obj.curveSegments = self.curveSegments
                self.obj.setText()
            }
        })
        this.form.add(this.curveSegments)
        this.form.nextRow()

        // Bevel

        this.form.addText("Bevel")
        this.form.nextRow()

        this.bevel = new CheckBox(this.form.element)
        this.form.addText("Enabled")
        this.bevel.size.set(20, 15)
        this.bevel.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.bevel = self.bevel.getValue()
                        self.obj.setText()
                }
        })
        this.form.add(this.bevel)
        this.form.nextRow()

        // Bevel thickness
        this.form.addText("Thickness")
        this.bevelThickness = new NumberBox(this.form.element)
        this.bevelThickness.size.set(60, 18)
        this.bevelThickness.setRange(0, Number.MAX_SAFE_INTEGER)
        this.bevelThickness.setStep(0.1)
        this.bevelThickness.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.bevelThickness = self.bevelThickness.getValue()
                        self.obj.setText()
                }
        })
        this.form.add(this.bevelThickness)
        this.form.nextRow()

        // Bevel size
        this.form.addText("Size")
        this.bevelSize = new NumberBox(this.form.element)
        this.bevelSize.size.set(60, 18)
        this.bevelSize.setRange(0, Number.MAX_SAFE_INTEGER)
        this.bevelSize.setStep(0.1)
        this.bevelSize.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.bevelSize = self.bevelSize.getValue()
                        self.obj.setText()
                }
        })
        this.form.add(this.bevelSize)
        this.form.nextRow()

        // Set position and update interface
        this.form.position.copy(this.widgetsPos)
        this.form.updateInterface()

        this.widgetsPos.y += this.form.size.y
        this.addResetButton()

        return this.element
}

Text3DComponent.prototype.updateData = function() {
        this.text.setText(this.obj.text)
        this.size.setValue(this.obj.size)
        this.height.setValue(this.obj.height)
        this.curveSegments.setValue(this.obj.curveSegments)
        this.bevel.setValue(this.obj.bevel)
        this.bevelThickness.setValue(this.obj.bevelThickness)
        this.bevelSize.setValue(this.obj.bevelSize)
}

Text3DComponent.prototype.onReset = function() {

        this.obj.height = this.values.thickness
        this.obj.size = this.values.size
        this.obj.curveSegments = this.values.curveSegments
        this.obj.bevel = this.values.bevel
        this.obj.bevelThickness = this.values.bevelThickness
        this.obj.bevelSize = this.values.bevelSize
        this.obj.setText(this.values.text)

        this.updateData()
        Editor.updateObjectViews()
}
