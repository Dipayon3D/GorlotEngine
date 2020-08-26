"use strict";

/**
 * Meshes are used to combine a geometry and a material, forming a complete renderisable
 * @class Mesh
 * @module Meshes
 * @param {Geometry} geometry Geometry used by this mesh
 * @param {Material} material Material used to shade the surface of the geometry
 * @constructor
 * @extends {Mesh}
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
 * Determines how the mesh triangles are constructed from the vertices.
 * Only works when the geometry is a BufferGeometry
 * @property drawMode
 * @default TrianglesDrawMode
 */
function Mesh(geometry, material)
{
	THREE.Mesh.call(this, geometry, material);

	this.name = "model";

	this.receiveShadow = true;
	this.castShadow = true;

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

Mesh.prototype = Object.create(THREE.Mesh.prototype);

/**
 * Dispose model along with its material and geometry
 * @method dispose
 */
Mesh.prototype.dispose = function()
{
	//Dipose material and geometry
	if(this.material !== null && this.material.dispose !== undefined)
	{
		this.material.dispose();
	}
	this.geometry.dispose();

	//Dipose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}
