"use strict"

function TorusGeometryComponent(form, obj) {
    this.form = form
    this.obj = obj

    // Self pointer
    var self = this

    // Update geometry function
    var updateGeometry = function() {
        self.updateGeometry()
    }

    this.form.addText("Torus Geometry")
    this.form.nextRow()

    // Radius
    this.form.addText("Radius")
    this.radius = new NumberBox(this.form.element)
    this.radius.size.set(40, 18)
    this.radius.setStep(0.1)
    this.radius.setOnChange(updateGeometry)
    this.form.add(this.radius)
    this.form.nextRow()

    // Tube
    this.form.addText("Tube")
    this.tube = new NumberBox(this.form.element)
    this.tube.size.set(40, 18)
    this.tube.setStep(0.1)
    this.tube.setOnChange(updateGeometry)
    this.form.add(this.tube)
    this.form.nextRow()

    // Segments
    this.form.addText("Segments")
    this.form.nextRow()

    this.form.addText("Radial")
    this.radialSegments = new NumberBox(this.form.element)
    this.radialSegments.size.set(60, 18)
    this.radialSegments.setStep(1)
    this.radialSegments.setOnChange(updateGeometry)
    this.form.add(this.radialSegments)
    this.form.nextRow()

    this.form.addText("Tubular")
    this.tubularSegments = new NumberBox(this.form.element)
    this.tubularSegments.size.set(60, 18)
    this.tubularSegments.setStep(1)
    this.tubularSegments.setOnChange(updateGeometry)
    this.form.add(this.tubularSegments)
    this.form.nextRow()

    // Arc
    this.form.addText("Arc")
    this.arc = new NumberBox(this.form.element)
    this.arc.size.set(60, 18)
    this.arc.setStep(0.1)
    this.arc.setRange(0, Math.PI * 2)
    this.arc.setOnChange(updateGeometry)
    this.form.add(this.arc)
    this.form.nextRow()

    // Buffer
    this.buffer = new CheckBox(this.form.element)
    this.form.addText("Buffered")
    this.buffer.size.set(200, 15)
    this.buffer.setOnChange(updateGeometry)
    this.form.add(this.buffer)
    this.form.nextRow()

    this.updateValues()
}

TorusGeometryComponent.prototype.updateGeometry = function() {
    this.obj.geometry.dispose()

    if(this.buffer.getValue()) {
        this.obj.geometry = new TorusBufferGeometry(this.radius.getValue(), this.tube.getValue(), this.radialSegments.getValue(), this.tubularSegments.getValue(), this.arc.getValue())
    } else {
        this.obj.geometry = new TorusGeometry(this.radius.getValue(), this.tube.getValue(), this.radialSegments.getValue(), this.tubularSegments.getValue(), this.arc.getValue())
    }
}

TorusGeometryComponent.prototype.updateValues = function() {
    this.radius.setValue(this.obj.geometry.parameters.radius || 100)
	this.tube.setValue(this.obj.geometry.parameters.tube || 40)
	this.radialSegments.setValue(this.obj.geometry.parameters.radialSegments || 8)
	this.tubularSegments.setValue(this.obj.geometry.parameters.tubularSegments || 6)
	this.arc.setValue(this.obj.geometry.parameters.arc || Math.PI * 2)
	this.buffer.setValue(this.obj.geometry instanceof THREE.BufferGeometry)
}
