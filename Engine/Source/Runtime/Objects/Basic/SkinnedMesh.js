"use strict"

/**
 * A mesh that has a Skeleton with bones that can be used to animate the vertices of the geometry
 *
 * @class SkinnedMesh
 * @module Meshes
 *
 * @param {Geometry} geometry Geometry used by this mesh
 * @param {Material} material Material used to shade the surface of the geometry
 * 
 * @constructor
 * @extends {SkinnedMesh}
 */

/**
 * Geometry defined by the object structure
 * @property geometry
 * @type {Geometry}
 */

/**
 * Material is used to define how the geometry surface is shaded
 * @property material
 * @type {Material}
 */

/**
 * Determines how the mesh triangles are constructed from the vertices
 * Only works when the geometry is a BufferGeometry
 * @property drawMode
 * @default TrianglesDrawMode
 */

/**
 * Array with the bones attached to this mesh
 * @property bones
 * @type {Array}
 */
function SkinnedMesh(geometry, material, useVertexTexture) {
	THREE.SkinnedMesh.call(this, geometry, material, useVertexTexture)

	this.name = "model"

	this.receiveShadow = true
	this.castShadow = true

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

SkinnedMesh.prototype = Object.create(THREE.SkinnedMesh.prototype)

/**
 * Dispose mesh along with its material and geometry
 * @method dispose
 */
SkinnedMesh.prototype.dispose = function() {
	// Dispose material and geometry
	if (this.material !== null && this.material.dispose !== undefined) {
		this.material.dispose()
	}
	this.geometry.dispose()

	// Dispose children
	for(var i = 0; i < this.children.length; i++) { 
		this.children[i].dispose()
	}
}

/**
 * Bind a skeleton to the skinned mesh. The bindMatrix gets saved from .bindMatrix property and the .bindMatrixInverse gets calculated.
 * This is called automatically in the constructor, and the skeleton is created from the bones of the Geometry passed in the constructor
 * @method bind
 * @param {Skeleton} skeleton
 * @param {Matrix4} bindMatrix
 */
