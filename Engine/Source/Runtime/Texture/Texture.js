"use strict"

/**
 * Image texture constructor, supports GIF animations
 *
 * @class Texture
 * @constructor
 * @extends {Texture}
 * @module Textures
 * @param {Image} image
 * @param {Number} mapping
 * @param {Number} wrapS
 * @param {Number} wrapT
 * @param {Number} magFilter
 * @param {Number} minFilter
 * @param {Number} format
 * @param {Number} type
 * @param {Number} anisotropy
 * @param {Number} encoding
 */
function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
	// If image is a URL
	if (typeof image === "string") {
		this.img = new GORLOT.Image(image)
    } else if(image === undefined) {
        this.img = new GORLOT.Image()
	} else {
		this.img = image
	}

	// Texture constructor
	THREE.Texture.call(this, document.createElement("img"), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding)

    // If the image is not transparent, use RGB instead of RGBA to save space
    var transparent = this.img.encoding === "png" || this.img.encoding === "gif"
	var texture = this

	this.name = "texture"
	this.category = "Image"
	this.path = "/"
    this.nodes = {}
    this.disposed = false
    this.format = transparent ? THREE.RGBAFormat : THREE.RGBFormat

	// Set image source
	this.image.src = this.img.data
	this.image.onload = function() {
		texture.needsUpdate = true
	}

	// Check if image is animated
	if (this.img.encoding === "gif") {
		function update() {
			if (!texture.disposed) {
				texture.needsUpdate = true
				requestAnimationFrame(update)
			}
		}
		update()
	}
}

Texture.prototype = Object.create(THREE.Texture.prototype);

/**
 * Sets the texture path
 * @param {String} path
 * @method setPath
 */
Texture.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Update nodes
 * @param {Object} nodes
 * @method updateNodes
 */
Texture.prototype.updateNodes = function(nodes) {
    this.nodes = {}
    this.nodes = nodes
}

/**
 * Dispose texture
 * @method dispose
 */
Texture.prototype.dispose = function() {
	THREE.Texture.prototype.dispose.call(this)

	this.disposed = true
}

/**
 * Create JSON description for texture, serialises image used in the texture
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
Texture.prototype.toJSON = function(meta)
{
	var data = THREE.Texture.prototype.toJSON.call(this, meta)
	var image = this.img.toJSON(meta)

	data.image = image.uuid
	data.path = this.path
    data.nodes = this.nodes

	return data
}
