"use strict"

/**
 * Creates an empty object
 * @class Container
 * @constructor
 * @extends {THREE.Object3D}
 * @module Misc
 */
function Empty() {
	THREE.Object3D.call(this)

	this.name = "empty"
	this.type = "Group"

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

Empty.prototype = Object.create(THREE.Object3D.prototype);
