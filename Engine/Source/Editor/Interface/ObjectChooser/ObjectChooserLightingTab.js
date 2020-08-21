"use strict"

function ObjectChooserLightingTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Lighting", "Source/Editor/Files/Icons/Lights/Point.png")

    this.items = []
    this.icons = []

    this.form = new Form(this.element)
    this.form.position.set(0, 0)
    this.form.spacing.set(0, 0)

    this.point = this.addElement("Point", Interface.fileDir + "Icons/Lights/Point.png", () => {
        Editor.addToScene(new PointLight(0x444444))
    })

    this.ambient = this.addElement("Ambient", Interface.fileDir + "Icons/Lights/Ambient.png", () => {
        Editor.addToScene(new AmbientLight(0x444444))
    })

    this.spot = this.addElement("Spot", Interface.fileDir + "Icons/Lights/Spot.png", () => {
        Editor.addToScene(new SpotLight(0x444444))
    })

    this.directional = this.addElement("Directional", Interface.fileDir + "Icons/Lights/Directional.png", () => {
        Editor.addToScene(new DirectionalLight(0x444444))
    })

    this.hemisphere = this.addElement("Hemisphere", Interface.fileDir + "Icons/Lights/Hemisphere.png", () => {
        Editor.addToScene(new HemisphereLight(0x444444))
    })

    this.rect = this.addElement("Rect Area", Interface.fileDir + "Icons/Lights/RectArea.png", () => {
        Editor.addToScene(new RectAreaLight(0x444444, 100, 1, 1))
    })

    this.sky = this.addElement("Sky", Interface.fileDir + "Icons/Lights/Sky.png", () => {
        Editor.addToScene(new Sky())
    })
}

ObjectChooserLightingTab.prototype = Object.create(TabElement.prototype)

ObjectChooserLightingTab.prototype.addElement = function(name, icon, callback) {
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

ObjectChooserLightingTab.prototype.updateInterface = function() {
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
