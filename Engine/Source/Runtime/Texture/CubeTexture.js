"use strict"

/**
 * CubeTextures represent 360 degrees view using six images, these images correspond to the faces of a cube
 * CubeTextures can be used to simulate reflections and transparency refraction in materials
 * It's also possible to create dynamic CubeTextures using the CubeCamera object
 *
 * @class CubeTexture
 * @constructor
 * @extends {Texture}
 * @param {Array} images Image array with 6 images
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
function CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    this.images = (images !== undefined) ? images : []
    mapping = (mapping !== undefined) ? mapping : THREE.CubeReflectionMapping

    THREE.Texture.call(this, this.images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding)

    this.flipY = false

    this.name = "cubetexture"
    this.category = "Cube"

    this.nodes = []
    this.path = "/"
}

CubeTexture.prototype = Object.create(Texture.prototype)

CubeTexture.prototype.isCubeTexture = true

/**
 * Set the texture path
 *
 * @method setPath
 * @param {String} path
 */
CubeTexture.prototype.setPath = function(path) {
    if(path !== undefined) {
        this.path = path
    }
}

/**
 * Serialise cubetexture to JSON
 *
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
CubeTexture.prototype.toJSON = function(meta) {
    // TODO: This
}
