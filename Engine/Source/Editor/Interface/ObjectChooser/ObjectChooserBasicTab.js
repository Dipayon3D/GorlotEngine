"use strict"

function ObjectChooserBasicTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Basic", "Source/Editor/Files/Icons/Models/Models.png")

    this.items = []
    this.icons = []

    this.form = new Form(this.element)
    this.form.position.set(0, 0)
    this.form.spacing.set(0, 0)

    this.cube = this.addElement("Cube", Interface.file_dir + "Icons/Models/Cube.png", () => {
        var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "cube"
        Editor.addToScene(model)
    })

    this.cylinder = this.addElement("Cylinder", Interface.file_dir + "Icons/Models/Cylinder.png", () => {
        var geometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "cylinder"
        Editor.addToScene(model)
    })

    this.sphere = this.addElement("Sphere", Interface.file_dir + "Icons/Models/Sphere.png", () => {
        var geometry = new THREE.SphereBufferGeometry(1, 32, 32)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "sphere"
        Editor.addToScene(model)
    })

    this.torus = this.addElement("Torus", Interface.file_dir + "Icons/Models/Torus.png", () => {
        var geometry = new THREE.TorusBufferGeometry(1, 0.5, 16, 96)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "torus"
        Editor.addToScene(model)
    })

    this.pyramid = this.addElement("Pyramid", Interface.file_dir + "Icons/Models/Cone.png", () => {
        var geometry = new THREE.ConeBufferGeometry(1, 2, 32)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "pyramid"
        Editor.addToScene(model)
    })

    this.text3d = this.addElement("Text 3D", Interface.file_dir + "Icons/Models/Text.png", () => {
        var model = new Text3D("text", Editor.default_material, Editor.default_font)
        Editor.addToScene(model)
    })

    this.plane = this.addElement("Plane", Interface.file_dir + "Icons/Models/Plane.png", () => {
        var geometry = new THREE.PlaneBufferGeometry(1, 1)
        var model = new Mesh(geometry, Editor.default_material)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "plane"
        Editor.addToScene(model)
    })

    this.tetra = this.addElement("Tetrahedron", Interface.file_dir + "Icons/Models/Pyramid.png", () => {
        var geometry = new THREE.TetrahedronBufferGeometry(1, 0)
        var model = new Mesh(geometry, Editor.default_material)
        model.name = "tetrahedron"
        Editor.addToScene(model)
    })
}

ObjectChooserBasicTab.prototype = Object.create(TabElement.prototype)

ObjectChooserBasicTab.prototype.addElement = function(name, icon, callback) {
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

ObjectChooserBasicTab.prototype.updateInterface = function() {
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
