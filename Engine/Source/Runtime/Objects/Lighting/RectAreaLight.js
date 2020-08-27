"use strict"

/**
 * Same as THREE.RectAreaLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/RectAreaLight
 *
 * @param {Number} color Light colour in hex RGB
 * @param {Number} intensity Light intensity
 * @param {Number} width
 * @param {Number} height
 *
 * @class RectAreaLight
 * @extends {RectAreaLight}
 * @module Lights
 * @constructor
 */
function RectAreaLight(color, intensity, width, height) {
    THREE.RectAreaLight.call(this, color, intensity, width, height)

    this.name = "rectarea"

    this.components = []
    this.defaultComponents = []

    this.defaultComponents.push(new ElementComponent())
    this.defaultComponents.push(new ObjectComponent())
    this.defaultComponents.push(new LightComponent())
}

RectAreaLight.prototype = Object.create(THREE.RectAreaLight.prototype)

/**
 * Create JSON description
 * @method toJSON
 * @param {Object} meta
 * @return {Object} JSON description
 */
RectAreaLight.prototype.toJSON = function(meta) {
    var data = THREE.Light.prototype.toJSON.call(this, meta)

    data.object.width = this.width
    data.object.height = this.height

    return data
}
