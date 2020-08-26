"use strict";

/**
 * Webcam texture is used to capture and display video from a webcam in real-time
 * It uses WebRTC, the most must support it, otherwise WebcamTexture will display a black image
 * @class WebcamTexture
 * @constructor
 * @extends {THREE.Texture}
 * @param {Number} mapping
 * @param {Number} wrapS
 * @param {Number} wrapT
 * @param {Number} type
 * @param {Number} anisotropy
 */
function WebcamTexture(mapping, wrapS, wrapT, magFilter, minFilter, type, anisotropy)
{
	var video = document.createElement("video")
	video.autoplay = true
	video.loop = true

	// Chrome
	if(navigator.webkitGetUserMedia)
	{
		navigator.webkitGetUserMedia({video:true}, function(stream)
		{
			video.src = URL.createObjectURL(stream);
		},
		function(error)
		{
			console.warn("WebcamTexture: No webcam available");
		});		
	}
	// Firefox
	else if(navigator.mediaDevices.getUserMedia)
	{
		navigator.mediaDevices.getUserMedia({video:true}).then(function(stream)
		{
			video.src = URL.createObjectURL(stream);
		}).catch(function(error)
		{
			console.warn("No webcam available");
		});				
	}

	// Call super constructor
	THREE.Texture.call(this, video, mapping, wrapS, wrapT, THREE.LinearFilter, THREE.LinearFilter, THREE.RGBFormat, type, anisotropy);

	this.generateMipmaps = false
	this.disposed = false

	// Name
	this.name = "webcam"
	this.category = "Webcam"
	this.path = "/"
    this.nodes = {}

	// Webcam video update loop
	var texture = this
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

WebcamTexture.prototype = Object.create(THREE.VideoTexture.prototype);

/**
 * Set path
 * @param {String} path
 * @method setPath
 */
WebcamTexture.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Update nodes
 * @param {Object} nodes
 * @method updateNodes
 */
WebcamTexture.prototype.updateNodes = function(nodes) {
    this.nodes = {}
    this.nodes = nodes
}

/**
 * Dispose webcam texture
 * @method dispose
 */
WebcamTexture.prototype.dispose = function() {
	THREE.Texture.prototype.dispose.call(this)

	this.disposed = true
	if (!this.image.paused) {
		this.image.pause()
	}
}

/**
 * Create JSON description
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
WebcamTexture.prototype.toJSON = function(meta) {
	var data = THREE.VideoTexture.prototype.toJSON.call(this, meta)

	data.path = this.path
    data.nodes = this.nodes

	return data
}
