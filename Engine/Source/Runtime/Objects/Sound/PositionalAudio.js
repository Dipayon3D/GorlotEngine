"use strict"

/**
 * PositionalAudio is used to play a sound with positional audio effect
 * @param {Audio} audio Audio used by this emitter
 * @class PositionalAudio
 * @extends {THREE.PositionalAudio}
 * @module Audio
 * @constructor
 */
function PositionalAudio(audio) {
    THREE.PositionalAudio.call(this, AudioEmitter.listener)

    this.name = "audio"
    this.type = "PositionalAudio"

    this.audio = (audio !== undefined) ? audio : null

    /**
     * Audio volume
     * @property volume
     * @default 1.0
     * @type {Number}
     */
    this.volume = 1.0

    /**
     * If true, the playback starts automatically
     * @property autoplay
     * @default true
     * @type {Boolean}
     */
    this.autoplay = true

    /**
     * Playback speed
     * @property playbackRate
     * @default 1.0
     * @type {Number}
     */
    this.playbackRate = 1.0

    /**
     * Start time (in seconds)
     * @property startTime
     * @default 0.0
     * @type {Number}
     */
    this.startTime = 0

    /**
     * If true, the audio plays in loop
     * @property loop
     * @default true
     * @type {Boolean}
     */
    this.loop = true

    this.isPlaying = false
    this.hasPlaybackControl = true

    // Runtime variables
    this.cameras = null

    this.tempA = new THREE.Vector3()
    this.tempB = new THREE.Vector3()

    this.components = []
    this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new AudioComponent())
}

PositionalAudio.prototype = Object.create(THREE.Audio.prototype)

/**
 * Initialise audio object (automatically called by runtime handler - Editor / App - )
 * @method initialize
 */
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

/**
 * Update positional audio state
 * @method update
 */
PositionalAudio.prototype.update = function() {
    this.tempA.setFromMatrixPosition(this.matrixWorld)

    if(this.cameras.length > 0) {
        this.tempB.setFromMatrixPosition(this.cameras[0].matrixWorld)
        this.tempA.sub(this.tempB)
    }

    this.panner.setPosition(this.tempA.x, this.tempA.y, this.tempA.z)

    // Update children
    for(var i = 0; i < this.children.length; i++) {
        this.children[i].update()
    }
}

/**
 * Dispose audio object
 * @method dispose
 */
PositionalAudio.prototype.dispose = function() {
    if(this.isPlaying) {
        this.stop()
        this.disconnect()
    }

    for(var i = 0; i < this.children.length; i++) {
        this.children[i].dispose()
    }
}

/**
 * Sets the audio emitter volume
 * @method setVolume
 * @param {Number} value Audio volume
 * @return {PositionalAudio} Self pointer for chaining
 */
PositionalAudio.prototype.setVolume = function(value) {
    this.volume = value
    this.gain.gain.value = value

    return this
}

// Update world matrix
/*PositionalAudio.prototype.updateMatrixWorld = function(force) {
    Object3D.prototype.updateMatrixWorld.call(this, force)
}*/

/**
 * Create JSON description
 * @method toJSON
 * @param {Object} meta
 * @return {Object} JSON description
 */
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

/**
 * Starts playback
 * @method play
 */

/**
 * Pauses playback
 * @method pause
 */

/**
 * Stops playback and resets time to 0
 * @method stop
 */

/**
 * Set loop mode
 * @param {Boolean} loop
 * @method setLoop
 */

/**
 * Set playback speed
 * @param {Number} speed
 * @method setPlaybackRate
 */

/**
 * Add the filter to the filters array
 * @method setFilter
 * @param {Object} filter
 */

/**
 * Sets the filters array to value
 * @method setFilters
 * @param {Array} value
 */
