"use strict"

function AudioComponent() {
	Component.call(this)

	this.componentName = "Audio"
	this.className = "AudioComponent"

	this.values = {
        volume: 1.0,
        static: false,
		autoplay: true,
		loop: true,
		playbackRate: 1
	}
}

AudioComponent.prototype = Object.create(Component.prototype)

AudioComponent.prototype.initUI = function(pos, obj) {
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

    // Audio player
    this.form.addText("Audio")
    this.player = new AudioPlayer(this.form.element)
    this.player.size.set(190, 20)
    this.form.add(this.player)
    this.form.nextRow()

    // Volume
    this.form.addText("Volume")
    this.volume = new Slider(this.form.element)
    this.volume.size.set(80, 18)
    this.volume.setRange(0, 1)
    this.volume.setStep(0.01)
    this.volume.setOnChange(() => {
        if(self.obj !== null) {
            self.obj.volume = self.volume.getValue()
        }
    })
    this.form.add(this.volume)
    this.form.nextRow()

	// Playback Rate
	this.form.addText("Speed")
	this.playbackRate = new NumberBox(this.form.element)
	this.playbackRate.size.set(60, 18)
	this.playbackRate.setStep(0.01)
	this.playbackRate.setRange(0, Number.MAX_SAFE_INTEGER)
	this.playbackRate.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.playbackRate = self.playbackRate.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.playbackRate)
	this.form.nextRow()

	// Auto play
	this.autoplay = new CheckBox(this.form.element)
	this.form.addText("Autoplay")
	this.autoplay.size.set(150, 15)
	this.autoplay.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.autoplay = self.autoplay.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.autoplay)
	this.form.nextRow()

	// Loop
	this.loop = new CheckBox(this.form.element)
	this.form.addText("Loop")
	this.loop.size.set(150, 15)
	this.loop.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.loop = self.loop.getValue()
            Editor.history.push(self.obj, Action.CHANGED)
		}
	})
	this.form.add(this.loop)
	this.form.nextRow()

    // Static
    this.form.addText("Static Object")
    this.static = new CheckBox(this.form.element)
    this.static.size.set(20, 15)
    this.static.setOnChange(() => {
        if(this.obj !== null) {
            self.obj.matrixAutoUpdate = !(self.static.getValue())
            Editor.history.push(self.obj, Action.CHANGED)
        }
    })
    this.form.add(this.static)
    this.form.nextRow()

	// Set position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton(this.onReset)

	return this.element
}

AudioComponent.prototype.updateData = function() {
    this.player.setAudioBuffer(this.obj.audio.data)
    this.volume.setValue(this.obj.volume)
    this.static.setValue(this.obj.matrixAutoUpdate)
	this.autoplay.setValue(this.obj.autoplay)
	this.loop.setValue(this.obj.loop)
	this.playbackRate.setValue(this.obj.playbackRate)
}

AudioComponent.prototype.onReset = function() {
    this.obj.volume = this.values.volume
    this.obj.matrixAutoUpdate = this.values.static
	this.obj.autoplay = this.values.autoplay
	this.obj.loop = this.values.loop
	this.obj.playbackRate = this.values.playbackRate

	Editor.updateObjectViews()
	this.updateData()
}
