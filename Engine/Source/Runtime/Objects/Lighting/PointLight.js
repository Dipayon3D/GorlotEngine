"use strict"

/**
 * Same as THREE.PointLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/PointLight
 *
 * @param {Number} hex Light colour in hex RGB
 * @param {Number} intensity Light intensity
 * @param {Number} distance Maximum PointLight range
 * @param {Number} decay
 * 
 * @class PointLight
 * @extends {PointLight}
 * @module Lights
 * @constructor
 */
function PointLight(hex, intensity, distance, decay)
{
	THREE.PointLight.call(this, hex, intensity, distance, decay)

	this.name = "point"
	
	this.castShadow = true

	this.shadow.camera.near = 0.05
	this.shadow.camera.far = 5000
	this.shadow.bias = 0.01;

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new LightComponent())
}

PointLight.prototype = Object.create(THREE.PointLight.prototype)

/**
 * Update light shadow map attributes at runtime
 * @method updateShadowMap
 */
PointLight.prototype.updateShadowMap = function()
{
	this.shadow.map.dispose()
	this.shadow.map = null

	this.shadow.camera.updateProjectionMatrix()
}
