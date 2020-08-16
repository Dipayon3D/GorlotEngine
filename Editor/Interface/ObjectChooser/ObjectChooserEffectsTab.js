"use strict"

function ObjectChooserEffectsTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Effects", "Editor/Files/Icons/Effects/Particles.png")

    this.items = []
    this.icons = []

    this.form = new Form(this.element)
    this.form.position.set(0, 0)
    this.form.spacing.set(0, 0)

    this.blocks = this.addElement("Scene Blocks", Interface.file_dir + "Icons/Script/Blocks.png", () => {
        Editor.addToScene(new BlockScript())
    })

    this.script = this.addElement("Script", Interface.file_dir + "Icons/Script/Script.png", () => {
        Editor.addToScene(new Script())
    })

    this.sprite = this.addElement("Sprite", Interface.file_dir + "Icons/Effects/Sprite.png", () => {
        Editor.addToScene(new Sprite(Editor.default_sprite_material))
    })

    this.particle = this.addElement("Particles", Interface.file_dir + "Icons/Effects/Particles.png", () => {
        Editor.addToScene(new ParticleEmitter())
    })

    this.empty = this.addElement("Empty", Interface.file_dir + "Icons/Effects/Empty.png", () => {
        Editor.addToScene(new Empty())
    })

    this.audio = this.addElement("Audio", Interface.file_dir + "Icons/Assets/Audio.png", () => {
        Editor.addToScene(new AudioEmitter(Editor.default_audio))
    })

    this.positionalAudio = this.addElement("Positional Audio", Interface.file_dir + "Icons/Assets/AudioPositional.png", () => {
        Editor.addToScene(new PositionalAudio(Editor.default_audio))
    })
}

ObjectChooserEffectsTab.prototype = Object.create(TabElement.prototype)

ObjectChooserEffectsTab.prototype.addElement = function(name, icon, callback) {
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

ObjectChooserEffectsTab.prototype.updateInterface = function() {
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
