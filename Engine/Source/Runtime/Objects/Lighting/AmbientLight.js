"use strict";

/**
 * Same as THREE.AmbientLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/AmbientLight
 * @param {Number} hex Light colour in hex RGB
 * @class AmbientLight
 * @extends {AmbientLight}
 * @module Lights
 * @constructor
 */
function AmbientLight(hex)
{
	THREE.AmbientLight.call(this, hex);
	
	this.name = "ambient";

	this.matrixAutoUpdate = false;

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new LightComponent())
}

AmbientLight.prototype = Object.create(THREE.AmbientLight.prototype);
