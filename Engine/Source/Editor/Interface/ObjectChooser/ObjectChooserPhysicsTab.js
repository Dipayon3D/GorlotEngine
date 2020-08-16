"use strict"

function ObjectChooserPhysicsTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Physics", "Editor/Files/Icons/Misc/Physics.png")

    this.items = []
    this.icons = []

    this.form = new Form(this.element)
    this.form.position.set(0, 0)
    this.form.spacing.set(0, 0)

    this.cube = this.addElement("Cube", Interface.file_dir + "Icons/Models/Cube.png", () => {
        var obj = new PhysicsObject()
        obj.body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
        obj.name = "box"
        Editor.addToScene(obj)
    })

    this.sphere = this.addElement("Sphere", Interface.file_dir + "Icons/Models/Sphere.png", () => {
        var obj = new PhysicsObject()
        obj.body.addShape(new CANNON.Sphere(1.0))
        obj.name = "sphere"
        Editor.addToScene(obj)
    })

    this.cylinder = this.addElement("Cylinder", Interface.file_dir + "Icons/Models/Cylinder.png", () => {
        var obj = new PhysicsObject()
        obj.body.addShape(new CANNON.Cylinder(1.0, 1.0, 2.0, 8))
        obj.name = "cylinder"
        Editor.addToScene(obj)
    })

    this.plane = this.addElement("Ground", Interface.file_dir + "Icons/Models/Plane.png", () => {
        var obj = new PhysicsObject()
        obj.rotation.x = -1.57
        obj.body.addShape(new CANNON.Plane())
        obj.body.type = CANNON.Body.KINEMATIC
        obj.name = "ground"
        Editor.addToScene(obj)
    })

    this.point = this.addElement("Point", Interface.file_dir + "Icons/Models/Point.png", () => {
        var obj = new PhysicsObject()
        obj.body.addShape(new CANNON.Particle())
        obj.name = "point"
        Editor.addToScene(obj)
    })
}

ObjectChooserPhysicsTab.prototype = Object.create(TabElement.prototype)

ObjectChooserPhysicsTab.prototype.addElement = function(name, icon, callback) {
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

ObjectChooserPhysicsTab.prototype.updateInterface = function() {
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
