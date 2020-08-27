"use strict"

/**
 * Same as THREE.SpotLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/SpotLight
 *
 * @param {Number} hex Light colour in hex RGB
 * @param {Number} intensity Light intensity
 * @param {Number} distance SpotLight maximum range
 * @param {Number} angle
 * @param {Number} exponent
 * @param {Number} decay
 * 
 * @class SpotLight
 * @extends {SpotLight}
 * @module Lights
 * @constructor
 */
function SpotLight(hex, intensity, distance, angle, exponent, decay)
{
	THREE.SpotLight.call(this, hex, intensity, distance, angle, exponent, decay)

	this.name = "spot light"
	
	this.castShadow = true

	this.shadow.camera.near = 0.5
	this.shadow.camera.far = 5000
	this.shadow.mapSize.width = 512
	this.shadow.mapSize.height = 512

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new LightComponent())
}

SpotLight.prototype = Object.create(THREE.SpotLight.prototype)

/**
 * Update light shadow map attributes at runtime
 * @method updateShadowMap
 */
SpotLight.prototype.updateShadowMap = function()
{
	this.shadow.map.dispose()
	this.shadow.map = null

	this.shadow.camera.updateProjectionMatrix()
}
