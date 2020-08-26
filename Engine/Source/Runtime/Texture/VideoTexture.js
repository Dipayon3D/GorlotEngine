"use strict";

/**
 * Video texture, uses a video DOm element instead of an img element, it's similar to THREE.VideoTexture
 * VideoTexture also provides methods for playback control
 *
 * @class VideoTexture
 * @constructor
 * @extends {THREE.Texture}
 * @module Textures
 * @param {Video} video
 * @param {Number} mapping
 * @param {Number} wrapS
 * @param {Number} wrapT
 * @param {Number} type
 * @param {Number} anisotropy
 */
function VideoTexture(video, mapping, wrapS, wrapT, type, anisotropy) {
	if (typeof video === "string") {
		this.video = new Video(video)
	} else if (video instanceof Video) {
		this.video = video
	}

	// Call super constructor
	THREE.Texture.call(this, document.createElement("video"), mapping, wrapS, wrapT, THREE.LinearFilter, THREE.LinearFilter, THREE.RGBFormat, type, anisotropy);

    // Texture control
	this.generateMipmaps = false
	this.disposed = false

	// Name
	this.name = "video"
	this.category = "Video"
	this.path = "/"
    this.nodes = {}

    /**
     * If autoplay, starts automatically
     * @property autoplay
     * @default true
     * @type {Boolean}
     */
	this.autoplay = true

    /**
     * If true, the video plays in loop
     * @property loop
     * @default true
     * @type {Boolean}
     */
	this.loop = true
    
    /**
     * Playback speed
     * @property playbackRate
     * @default 1.0
     * @type {Number}
     */
    this.playbackRate = 1.0

    /**
     * Video audio volume
     * @property volume
     * @default 1.0
     * @type {Number}
     */
    this.volume = 1.0

	// Video
	this.image.src = this.video.data
	this.image.autoplay = this.autoplay
    this.image.playbackRate = this.playbackRate
	this.image.loop = this.loop
    this.image.volume = this.volume

	// Video update loop
	var texture = this
	var video = this.image
	function update() {
		if (video.readyState >= video.HAVE_CURRENT_DATA) {
			texture.needsUpdate = true
		}

		if (!texture.disposed) {
			requestAnimationFrame(update)
		}
	}

	update()
}

VideoTexture.prototype = Object.create(THREE.Texture.prototype);

/**
 * Set video time in seconds
 * @param {Number} time
 * @method setTime
 */
VideoTexture.prototype.setTime = function(time) {
    this.image.currentImage = time
}

/**
 * Set loop mode
 * @param {Boolean} loop
 * @method setLoop
 */
VideoTexture.prototype.setLoop = function(loop) {
    this.loop = loop
    this.image.loop = loop
}

/**
 * Set video volume
 * @param {Number} volume
 * @method setVolume
 */
VideoTexture.prototype.setVolume = function(volume) {
    this.volume = (volume >= 0 && volume <= 1) ? volume : (volume >= 0) ? 1.0 : 0.0
    this.image.volume = this.volume
}

/**
 * Set video speed
 * @method setPlaybackRate
 * @param {Number} playbackRate
 */
VideoTexture.prototype.setPlaybackRate = function(playbackRate) {
    this.playbackRate = playbackRate
    this.image.playbackRate = playbackRate
}

/**
 * Pause video playback
 * @method pause
 */
VideoTexture.prototype.pause = function() {
    if(!this.image.paused) {
        this.image.pause()
    }
}

/**
 * Start playing video
 * @method play
 */
VideoTexture.prototype.play = function() {
    if(this.image.paused) {
        this.image.play()
    }
}

/**
 * Set video path
 * @param {String} path
 * @method setPath
 */
VideoTexture.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Update nodes
 * @param {Object} nods
 * @method updateNodes
 */
VideoTexture.prototype.updateNodes = function(nodes) {
    this.nodes = {}
    this.nodes = nodes
}

/**
 * Dispose video texture
 * @method dispose
 */
VideoTexture.prototype.dispose = function()
{
	THREE.Texture.prototype.dispose.call(this);

	this.disposed = true

	if(!this.image.paused)
	{
		this.image.pause();
	}
}

/**
 * Create video texture json description
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
VideoTexture.prototype.toJSON = function(meta) {
	var data = THREE.Texture.prototype.toJSON.call(this, meta)
	var video = this.video.toJSON(meta)

	data.video = video.uuid
	data.loop = this.loop
	data.autoplay = this.autoplay

	data.path = this.path
    data.nodes = this.nodes

    data.playbackRate = this.playbackRate
    data.volume = this.volume

	return data
}
