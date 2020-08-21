"use strict";

//Texture constructor
function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding)
{
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

// Super prototypes
Texture.prototype = Object.create(THREE.Texture.prototype);

// Set path
Texture.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

// Dispose Texture
Texture.prototype.dispose = function() {
	THREE.Texture.prototype.dispose.call(this)

	this.disposed = true
}

//Create JSON description
Texture.prototype.toJSON = function(meta)
{
	var data = THREE.Texture.prototype.toJSON.call(this, meta)
	var image = this.img.toJSON(meta)

	data.image = image.uuid
	data.path = this.path

	return data
}
