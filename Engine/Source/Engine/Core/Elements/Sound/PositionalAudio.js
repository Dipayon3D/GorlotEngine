"use strict"

function PositionalAudio(audio) {
    THREE.PositionalAudio.call(this, AudioEmitter.listener)

    this.name = "audio"
    this.type = "PositionalAudio"

    this.audio = (audio !== undefined) ? audio : null

    this.volume = 1.0

    this.autoplay = true
    this.playbackRate = 1.0
    this.startTime = 0
    this.loop = true

    this.isPlaying = false
    this.hasPlaybackControl = true

    // Runtime variables
    this.cameras = null

    this.temp_a = new THREE.Vector3()
    this.temp_b = new THREE.Vector3()

    this.components = []
    this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new AudioComponent())
}

// Super prototypes
PositionalAudio.prototype = Object.create(THREE.Audio.prototype)

// Initialise audio object
PositionalAudio.prototype.initialize = function() {
    var self = this

    if(this.audio !== null) {
        THREE,AudioContext.getContext().decodeAudioData(this.audio.data, (buffer) => {
            self.setBuffer(buffer)
        })
    }

    this.setVolume(this.volume)

    // Get cameras
    var node = this
    while(node.parent !== null) {
        node = node.parent
        if(node instanceof Scene) {
            this.cameras = node.cameras
        }
    }

    for(var i = 0; i < this.children.length; i++) {
        this.children[i].initialize()
    }
}

// Update audio position
PositionalAudio.prototype.update = function() {
    this.temp_a.setFromMatrixPosition(this.matrixWorld)

    if(this.cameras.length > 0) {
        this.temp_b.setFromMatrixPosition(this.cameras[0].matrixWorld)
        this.temp_a.sub(this.temp_b)
    }

    this.panner.setPosition(this.temp_a.x, this.temp_a.y, this.temp_a.z)

    // Update children
    for(var i = 0; i < this.children.length; i++) {
        this.children[i].update()
    }
}

// Dispose audio object
PositionalAudio.prototype.dispose = function() {
    if(this.isPlaying) {
        this.stop()
        this.disconnect()
    }

    for(var i = 0; i < this.children.length; i++) {
        this.children[i].dispose()
    }
}

// Set volume
PositionalAudio.prototype.setVolume = function(value) {
    this.volume = value
    this.gain.gain.value = value

    return this
}

// Update world matrix
/*PositionalAudio.prototype.updateMatrixWorld = function(force) {
    Object3D.prototype.updateMatrixWorld.call(this, force)
}*/

// Create JSON description
PositionalAudio.prototype.toJSON = function(meta) {
    var audio = this.audio
    var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
        audio = audio.toJSON(meta)
    })

    data.object.audio = audio.uuid
    data.object.volume = this.volume
    data.object.autoplay = this.autoplay
    data.object.startTime = this.startTime
    data.object.playbackRate = this.playbackRate
    data.object.loop = this.loop

    return data
}
