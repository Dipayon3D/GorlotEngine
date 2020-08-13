"use strict"

function GeometryForm() {
    Component.call(this)

    this.component_name = "Geometry Form"
    this.className = "GeometryForm"

    this.values = {
    }
}

GeometryForm.prototype = Object.create(Component.prototype)

GeometryForm.prototype.initUI = function(pos, obj) {
    // Clear the element
    this.clearElement()

    this.widgetsPos = pos

    // Self pointer
    var self = this
    this.obj = obj

    // Variables
    var obj = this.obj

    // Form
    this.form = new Form(this.element)
    this.form.spacing.set(5, 5)

    // Displays this component name
    this.form.addText(this.component_name)
    this.form.nextRow()

    if(obj instanceof THREE.Mesh) {
     
        var geometry = obj.geometry

        if(geometry instanceof THREE.BoxGeometry || geometry instanceof THREE.BoxBufferGeometry) {
            new BoxGeometryComponent(this.form, this.obj)
        } else if(geometry instanceof THREE.ConeGeometry || geometry instanceof THREE.ConeBufferGeometry) {
            new ConeGeometryComponent(this.form, this.obj)
        } else if(geometry instanceof THREE.PlaneGeometry || geometry instanceof THREE.PlaneBufferGeometry) {
            new PlaneGeometryComponent(this.form, this.obj)
        } else if(geometry instanceof THREE.SphereGeometry || geometry instanceof THREE.SphereBufferGeometry) {
            new SphereGeometryComponent(this.form, this.obj)
        } else if(geometry instanceof THREE.TorusGeometry || geometry instanceof THREE.TorusBufferGeometry) {
            new TorusGeometryComponent(this.form, this.obj)
        }
    } else {
        this.form.addText("This component can only be added in Meshes")
        this.form.nextRow()
    }

    // Set position and update interface
    this.form.position.copy(this.widgetsPos)
    this.form.updateInterface()

    this.widgetsPos.y += this.form.size.y
    this.addDeleteButton()

    return this.element
}

GeometryForm.prototype.updateData = function() {
}

GeometryForm.prototype.onReset = function() {
}
