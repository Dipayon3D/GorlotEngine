"use strict"

THREE.Material.prototype.nodes = {}
THREE.Material.prototype.path = "/"

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
