"use strict"

/**
 * Canvas textures can be used to draw content to the texture using runtime
 * Canvas textures always start with black background and a red text "Canvas Texture"
 *
 * @class CanvasTexture
 * @constructor
 * @extends {THREE.Texture}
 * @module Textures
 * @param {Number} width Canvas width
 * @param {Number} height Canvas height
 * @param {Number} mapping
 * @param {Number} wrapS
 * @param {Number} wrapT
 * @param {Number} magFilter
 * @param {Number} format
 * @param {Number} type
 * @param {Number} anisotropy
 * @param {Number} encoding
 */
function CanvasTexture(width, height, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    THREE.Texture.call(this, document.createElement("canvas"), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding)

    this.name = "canvas"
    this.category = "Canvas"
    this.path = "/"
    this.nodes = {}

    this.width = (width !== undefined) ? width : 512
    this.height = (height !== undefined) ? height: 512

    /**
     * Image is used to store a DOM canvas element
     * @property image
     * @type {DOM}
     */

    /**
     * Canvas width
     * @property width
     * @type {Number}
     */
    this.image.width = width

    /**
     * Canvas height
     * @property height
     * @type {Number}
     */
    this.image.height = height

    /**
     * Canvas context 2D, can be used to draw content to the canvas texture
     * @property context
     * @type {Context2D}
     */
    this.context = this.image.getContext("2d")
    this.context.font = "Normal 55px Arial"
    this.context.textAlign = "center"
    this.context.fillStyle = "#FFFF00"
    this.context.fillText("Canvas Texture", this.width/2, this.height/2)

    this.needsUpdate = true
}

CanvasTexture.prototype = Object.create(THREE.Texture.prototype)

/**
 * Sets the path of this texture
 * @param {String} path
 * @method setPath
 */
CanvasTexture.prototype.setPath = function(path) {
    if(path !== undefined) {
        this.path = path
    }
}

/**
 * Update nodes
 * @param {Object} nodes
 * @method updateNodes
 */
CanvasTexture.prototype.updateNodes = function(nodes) {
    this.nodes = {}
    this.nodes = nodes
}

/**
 * Create JSON description for canvas texture, canvas image is not serialised
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
CanvasTexture.prototype.toJSON = function(meta) {
    var data = THREE.Texture.prototype.toJSON.call(this)

    data.width = this.width
    data.height = this.height

    data.path = this.path
    data.nodes = this.nodes

    return data
}
