"use strict";

/**
 * Same as THREE.HemisphereLight
 * Documentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/HemisphereLight
 * @param {Number} skyColor Sky light colour in hex RGB
 * @param {Number} groundColor Ground light colour in hex RGB
 * @param {Number} intensity Light intensity
 * @class HemisphereLight
 * @extends {HemisphereLight}
 * @module Lights
 * @constructor
 */
function HemisphereLight(skyColor, groundColor, intensity)
{
	THREE.HemisphereLight.call(this, skyColor, groundColor, intensity);

	this.name = "hemisphere";

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new LightComponent())
}

HemisphereLight.prototype = Object.create(THREE.HemisphereLight.prototype);
