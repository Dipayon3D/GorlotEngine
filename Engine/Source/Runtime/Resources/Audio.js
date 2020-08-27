"use strict"

/**
 * Audio class is used to store audio data as an arraybuffer to be used later by objects with the WebAudio API
 *
 * @class Audio
 * @extends {Resource}
 * @constructor
 * @module Resources
 * @param {String} url URL to Audio file
 */
function Audio(url) {
	this.name = "audio"
	this.uuid = THREE.Math.generateUUID()
	this.type = "Audio"

	this.path = "/"

    this.format = ""
    this.encoding = ""
    this.data = null

	if (url !== undefined) {
		this.data = FileSystem.readFileArrayBuffer(url)
		this.encoding = url.split(".").pop().toLowerCase()
		this.format = "arraybuffer"
	}
}

/**
 * Sets the path of the resource
 * @method setPath
 * @param {String} path
 */
Audio.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Serialise audio data as JSON, audio data is serialised in Base64
 * @method toJSON
 * @param {Object} meta
 * @return {Object} data
 */
Audio.prototype.toJSON = function(meta) {
	
	if (meta.audio[this.uuid] !== undefined) {
		return meta.audio[this.uuid]
	}

	var data = {}

	data.name = this.name
	data.uuid = this.uuid
	data.type = this.type
	data.encoding = this.encoding
	data.data = Base64Utils.fromArrayBuffer(this.data)
	data.format = "base64"
	data.path = this.path

	meta.audio[this.uuid] = data

	return data
}
