"use strict"

// Image constructor
function Image() {
	this.name = "image"
	this.uuid = THREE.Math.generateUUID()
	this.type = "Image"

	this.encoding = ""
	this.data = null
}

// Create JSON description
Image.prototype.toJSON = function(meta) {
	var data = {}

	data.name = this.name
	data.uuid = this.uuid
	data.type = this.type

	data.encoding = this.encoding
	data.data = this.data

	return data
}