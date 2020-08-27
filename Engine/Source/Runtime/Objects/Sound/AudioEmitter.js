"use strict";

/**
 * AudioEmitter is a 3D object used to play audio inside the scene
 * @param {Audio} audio Audio used by this emitter
 *
 * @class AudioEmitter
 * @extends {Audio}
 * @module Audio
 * @constructor
 */
function AudioEmitter(audio)
{
	THREE.Audio.call(this, AudioEmitter.listener);

	// Name and type
	this.name = "audio";
	this.type = "Audio";

    this.matrixAutoUpdate = false

	this.audio = (audio !== undefined) ? audio : Editor.defaultAudio

    /**
     * Audio volume
     * @property volume
     * @default 1.0
     * @type {Number}
     */
    this.volume = 1.0

    /**
     * If true, the playback will start automatically
     * @property autoplay
     * @default true
     * @type {Boolean}
     */
	this.autoplay = true;

    /**
     * Playback speed
     * @property playbackRate
     * @default 1.0
     * @type {Number}
     */
	this.playbackRate = 1.0;

    /**
     * Start time (in seconds)
     * @property startTime
     * @default 0.0
     * @type {Number}
     */
	this.startTime = 0;

    /**
     * If true, the audio will play in loop
     * @property loop
     * @default true
     * @type {Boolean}
     */
	this.loop = true;

    this.isPlaying = false
    this.hasPlaybackControl = true

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new AudioComponent())
}

// Default audio listener
AudioEmitter.listener = new THREE.AudioListener();

// Super prototypes
AudioEmitter.prototype = Object.create(THREE.Audio.prototype);

/**
 * Initialise the audio object, loads audio data, decodes it and starts playback if autoplay is set to true
 * Automatically called by the runtime handler - Editor / App -
 *
 * @method initialize
 */
AudioEmitter.prototype.initialize = function()
{
	var self = this;

	if(this.audio !== null) {
		THREE.AudioContext.getContext().decodeAudioData(this.audio.data, (buffer) => {
			self.setBuffer(buffer)
		})
	}

    this.setVolume(this.volume)
    this.setPlaybackRate(this.playbackRate)

	// Initialise children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

/**
 * Dispose audio object
 * @method dispose
 */
AudioEmitter.prototype.dispose = function()
{
	if(this.isPlaying)
	{
		this.stop();
		this.disconnect();
	}

	// Dispose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

/**
 * Change audio emitter volume
 * @method setVolume
 * @param {Number} value Audio volume
 */
AudioEmitter.prototype.setVolume = function(value) {
    this.volume = value
    this.gain.gain.value = value

    return this
}

/**
 * Create JSON description
 * @method toJSON
 * @param {Object} meta
 * @return {Object} JSON description
 */
AudioEmitter.prototype.toJSON = function(meta)
{
    var audio = this.audio
    var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
            audio = audio.toJSON(meta)
    })

	data.object.audio = audio.uuid
    data.object.volume = this.volume
	data.object.autoplay = this.autoplay;
	data.object.startTime = this.startTime;
	data.object.playbackRate = this.playbackRate;

    data.object.loop = this.loop

	return data;
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
 * Sets playback speed
 * @param {Number} speed
 * @method setPlaybackRate
 */

/**
 * Add the filter to the filters array
 * @method setFilter
 * @param {Object} filter
 */

/**
 * Set the filters array to value
 * @method setFilters
 * @param {Array} value
 */
