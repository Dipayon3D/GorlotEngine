"use strict"

/**
 * Same as THREE.DirectionalLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/DirectionalLight
 *
 * @param {Number} hex Light colour in hex RGB
 * @param {Number} intensity Light intensity
 *
 * @class DirectionalLight
 * @extends {DirectionalLight}
 * @module Lights
 * @constructor
 */
function DirectionalLight(hex, intensity)
{
	THREE.DirectionalLight.call(this, hex, intensity)

	this.name = "directional"
	
	this.castShadow = true
	
	this.shadow.camera.near = 0.5
	this.shadow.camera.far = 10000

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new LightComponent())
}

DirectionalLight.prototype = Object.create(THREE.DirectionalLight.prototype)

/**
 * Update light shadow map attributes at runtime
 * @method updateShadowMap
 */
DirectionalLight.prototype.updateShadowMap = function()
{
	this.shadow.map.dispose()
	this.shadow.map = null

	this.shadow.camera.updateProjectionMatrix()
}
