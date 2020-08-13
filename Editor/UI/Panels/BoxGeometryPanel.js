"use strict"

function BoxGeometryPanel(parent) {
    EditorPanel.call(this, parent)

    var self = this

    this.form.addText("Size")
    this.size = new CoordinatesBox(this.form.element)
    this.size.setOnChange(() => {
        // TODO: This
    })
    this.form.add(this.size)
    this.form.nextRow()

    this.form.addText("Segments")
    this.segments = new CoordinatesBox(this.form.element)
    this.segments.setOnChange(() => {
        // TODO: This
    })
    this.form.add(this.segments)
    this.form.nextRow()

    this.buffered = new CheckBox(this.form.element)
    this.buffered.setText("Buffered")
    this.buffered.size.set(200, 15)
    this.buffered.setOnChange(() => {
        // TODO: This
    })
    this.form.add(this.buffered)
    this.form.nextRow()

    this.form.updateInterface()
}

BoxGeometryPanel.prototype = Object.create(Panel.prototype)

BoxGeometryPanel.prototype.updatePanel = function() {
    if(this.obj !== null) {

    }
}
