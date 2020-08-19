"use strict"

function ObjectChooserDeviceTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Device", "Source/Editor/Files/Icons/Hw/Hw.png")

    this.items = []
    this.icons = []

    this.form = new Form(this.element)
    this.form.position.set(0, 0)
    this.form.spacing.set(0, 0)

    this.leap = this.addElement("Leap", Interface.file_dir + "Icons/Hw/Leap.png", () => {
        Editor.addToScene(new LeapMotion())
    })

    this.kinect = this.addElement("Kinect", Interface.file_dir + "Icons/Hw/Kinect.png", () => {
        Editor.addToScene(new KinectDevice())
    })
}

ObjectChooserDeviceTab.prototype = Object.create(TabElement.prototype)

ObjectChooserDeviceTab.prototype.addElement = function(name, icon, callback) {
    var item = new Button(this.element)
    item.size.set(this.size.x, 45)
    item.setText(name)
    item.setCallback(callback)
    item.updateInterface()

    var itemIcon = new ImageBox(item.element)
    itemIcon.size.set(40, 40)
    itemIcon.position.set(5, 2)
    itemIcon.setImage(icon)
    itemIcon.updateInterface()

    this.form.add(item)
    this.form.nextRow()

    this.items.push(item)
    this.icons.push(itemIcon)

    return item
}

ObjectChooserDeviceTab.prototype.updateInterface = function() {
    TabElement.prototype.updateInterface.call(this)

    for(var i = 0; i < this.items.length; i++) {
        this.items[i].size.x = this.size.x
        this.items[i].visible = this.visible
        this.items[i].updateInterface()

        this.icons[i].visible = this.items[i].visible
        this.icons[i].updateInterface()
    }

    this.form.size.x = this.size.x
    this.form.size.y = this.size.y
    this.form.updateInterface()
}
