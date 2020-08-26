"use strict"

/**
 * A material to define multiple material for the same geometry. The geometry decides which material is used for which faces by the faces material index.
 * The material index corresponds with the index of the material in the .materials array
 *
 * @class MultiMaterial
 * @module THREE
 */

/**
 * Resource name. Not required to be unique
 * @property name
 * @type {String}
 */
THREE.MultiMaterial.prototype.name = "material"

/**
 * Dispose materials inside the container
 * @method dispose
 */
THREE.MultiMaterial.prototype.dispose = function() {
    for(var i in this.materials) {
        this.materials[i].dispose()
    }
}
