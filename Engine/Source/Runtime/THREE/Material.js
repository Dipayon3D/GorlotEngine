"use strict"

/**
 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer
 *
 * @class Material
 * @Module THREE
 */

/**
 * The materials nodes
 * @property nodes
 * @type {Object}
 */
THREE.Material.prototype.nodes = {}

/**
 * The material path
 * @property path
 * @type {String}
 */
THREE.Material.prototype.path = "/"

/**
 * Dispose material
 * @method dispose
 */
THREE.Material.prototype.dispose = function() {
    function disposeTexture(texture) {
		if(texture !== undefined && texture !== null) {
			texture.dispose()
		}
	}

	this.dispatchEvent({type:"dispose"})

	disposeTexture(this.map)
	disposeTexture(this.bumpMap)
	disposeTexture(this.normalMap)
	disposeTexture(this.displacementMap)
	disposeTexture(this.specularMap)
	disposeTexture(this.emissiveMap)
	disposeTexture(this.alphaMap)
	disposeTexture(this.roughnessMap)
	disposeTexture(this.metalnessMap)
}

THREE.Material.prototype.updateNodes = function(nodes) {
	if (this.nodes !== undefined) {
		this.nodes = {}
		this.nodes = nodes
	}
}

THREE.Material.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}
