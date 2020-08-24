"use strict"

/**
 * Perspective Camera
 * Based on THREE.PerspectiveCamera, original documentation available at https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 * @class PerspectiveCamera
 * @extends {THREE.PerspectiveCamera}
 * @module Cameras
 * @constructor
 * @param {Number} fov Field of View
 * @param {Number} aspect Aspect ratio
 * @param {Number} near Near projection plane (how closer can be objects visible by this camera)
 * @param {Number} far Far projection plane (how far can be objects visibile by this camera)
 */

/**
 * Camera field of view (in degrees)
 * @property fov
 * @default 50
 * @type {Number}
 */

/**
 * Camera aspect ratio (X/Y)
 * @property aspect
 * @default 1.0
 * @type {Number}
 */

/**
 * Camera zoom
 * @property zoom
 * @default 1.0
 * @type {Number}
 */
function PerspectiveCamera(fov, aspect, near, far)
{
	THREE.PerspectiveCamera.call(this, fov, aspect, near, far)

	this.name = "camera"

    /**
     * Camera viewport offset
     * Values range from 0.0 to 1.0 in screen space
     * @property offset
     * @type {Vector2}
     */
	this.offset = new THREE.Vector2(0.0, 0.0)

    /**
     * Camera viewport size
     * Values range from 0.0 to 1.0 in screen space
     * @property viewport
     * @type {Vector2}
     */
	this.viewport = new THREE.Vector2(1.0, 1.0)

    /**
     * Clear screen colour flag
     * @property clearColor
     * @default false
     * @type {Boolean}
     */
	this.clearColor = false

    /**
     * Clear depth flag
     * @property clearDepth
     * @default false
     * @type {Boolean}
     */
	this.clearDepth = false

    /**
     * Camera draw order preference
     * If more than once camera has the same order value, the draw order is undefined for those cameras
     * @property order
     * @default 0
     * @type {Number}
     */
    this.order = 0

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new CameraComponent())
}

PerspectiveCamera.prototype = Object.create(THREE.PerspectiveCamera.prototype)

/**
 * Destroy camera object and remove it from scene
 * @method destroy
 */
PerspectiveCamera.prototype.destroy = function() {
	var scene = ObjectUtils.getScene(this)
	if (scene !== null) {
		scene.removeCamera(this)
	}

	THREE.Object3D.prototype.destroy.call(this)
}

/**
 * Update world transformation matrinx ignoring parent scaling properties
 * @method updateMatrixWorld
 * @param {Boolean} force Force matrix update even if the attribute matrixWorldNeedsUpdate is not true
 */
PerspectiveCamera.prototype.updateMatrixWorld = function(force) {
	if (this.matrixAutoUpdate === true) {
		this.updateMatrix()
	}

	if (this.matrixWorldNeedsUpdate === true || force === true) {
		if (this.parent !== null) {
			this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)
		} else {
			this.matrixWorld = this.matrix
		}

		this.matrixWorldNeedsUpdate = false
		force = true
	}

	// Update children
	var children = this.children
	for(var i = 0; i < this.children.length; i++) {
		children[i].updateMatrixWorld(force)
	}
}

/**
 * Update camera projection matrix
 * Should be called after changing projection parameters
 * @method updateProjectionMatrix
 */
PerspectiveCamera.prototype.updateProjectionMatrix = function() {
	var top = this.near * Math.tan(THREE.Math.DEG2RAD * 0.5 * this.fov) / this.zoom
	var height = 2 * top
	var width = this.aspect * height * ((this.viewport !== undefined) ? (this.viewport.x / this.viewport.y) : 1.0)
	var left = - 0.5 * width

	if (this.filmOffset !== 0) {
		left += this.near * this.filmOffset / this.getFilmWidth()
	}

    this.projectionMatrix.makePerspective(left, left + width, top, top - height, this.near, this.far)
    //this.projectionMatrix.makePerspective(left, left + width, top, top - height, this.near, this.far);
}

/**
 * Create JSON description
 * @method JSON
 * @param {Object} meta
 * @return {Object} JSON description
 */
PerspectiveCamera.prototype.toJSON = function(meta) {
	var data = THREE.PerspectiveCamera.prototype.toJSON.call(this, meta)

	data.object.clearColor = this.clearColor
	data.object.clearDepth = this.clearDepth
	data.object.viewport = this.viewport.toArray()
	data.object.offset = this.offset.toArray()
    data.object.order = this.order

	return data
}
