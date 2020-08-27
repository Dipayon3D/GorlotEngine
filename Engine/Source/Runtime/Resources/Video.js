"use strict"

/**
 * Video resources are used to store video data in Base64
 *
 * @class Video
 * @constructor
 * @extends {Resource}
 * @module Resources
 * @param {String} url URL to video file
 */
function Video(url) {
	this.name = "video"
	this.uuid = THREE.Math.generateUUID()
	this.type = "Video"

	this.format = ""
	this.encoding = ""
	this.data = ""

	this.path = "/"

	if (url !== undefined) {
		this.encoding = url.split(".").pop().toLowerCase()
		this.data = "data:video/" + this.encoding + ";base64," + FileSystem.readFileBase64(url)
		this.format = "base64"
    }
}

/**
 * Sets the video path
 * @param {String} path
 * @method setPath
 */
Video.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Serialise resource to JSON
 * Video is stored in Base64
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
Video.prototype.toJSON = function(meta) {

	if (meta.videos[this.uuid] !== undefined) {
		return meta.videos[this.uuid]
	}

	var data = {}

	data.name = this.name
	data.uuid = this.uuid
	data.type = this.type
	data.encoding = this.encoding
    data.format = this.format
    data.data = this.data
    data.path = this.path

	meta.videos[this.uuid] = data

	return data
}
