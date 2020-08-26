"use strict"

/**
 * Orthographic Camera is used for 2D-like image projection
 * Based on THREE.OrthographicCamera, original documentation available at https://threejs.org/docs/#api/en/cameras/OrthographicCamera
 * @class OrthographicCamera
 * @constructor
 * @extends {OrthographicCamera}
 * @module Cameras
 * @param {Number} size Camera size relative to resize mode
 * @param {Number} aspect Aspect ratio X/Y
 * @param {Number} mode Camera resize mode (RESIZE_HORIZONTAL or RESIZE_VERTICAL)
 * @param {Number} near Near projection plane
 * @param {Number} far Far projection plane
 */
function OrthographicCamera(size, aspect, mode, near, far)
{
	THREE.OrthographicCamera.call(this, -1.0, 1.0, 1.0, -1.0, near, far)

	this.name = "camera"
	
    /**
     * Camera size (relative to resize mode)
     * @property size
     * @default 1.0
     * @type {Number}
     */
	this.size = (size !== undefined) ? size : 1.0

    /**
     * Aspect ratio (X/Y)
     * @property aspect
     * @default 1.0
     * @type {Number}
     */
	this.aspect = (aspect !== undefined) ? aspect : 1.0

    /**
     * Camera resize mode
     * @property mode
     * @default RESIZE_HORIZONTAL
     * @type {Number}
     */
	this.mode = (mode !== undefined) ? mode : OrthographicCamera.RESIZE_HORIZONTAL

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
     * If more than one camera has the same order value, the draw order is undefined to those cameras
     * @property order
     * @default 0
     * @type {Number}
     */
    this.order = 0

	this.updateProjectionMatrix()

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new CameraComponent())
}

OrthographicCamera.prototype = Object.create(THREE.OrthographicCamera.prototype)

/**
 * Used to set camera to resize horizontally
 * @attribute RESIZE_HORIZONTAL
 * @type {Number}
 */
OrthographicCamera.RESIZE_HORIZONTAL = 0

/**
 * Used to set camera to resize vertically
 * @attribute RESIZE_VERTICAL
 * @type {Number}
 */
OrthographicCamera.RESIZE_VERTICAL = 1

/**
 * Destroy camera object and remove it from the scene
 * @method destroy
 */
OrthographicCamera.prototype.destroy = function() {
	var scene = ObjectUtils.getScene(this)
	if (scene !== null) {
		scene.removeCamera(this)
	}

	THREE.Object3D.prototype.destroy.call(this)
}

/**
 * Update camera projection matrix
 * Should be called after changing projection parameters
 * @method updateProjectionMatrix
 */
OrthographicCamera.prototype.updateProjectionMatrix = function()
{
	//Update left right, top and bottom values from aspect and size
	if(this.mode === OrthographicCamera.RESIZE_HORIZONTAL)
	{
		this.top = this.size/2
		this.bottom = -this.top
		this.right = this.top * this.aspect * (this.viewport.x / this.viewport.y)
		this.left = -this.right
	}
	else if(this.mode === OrthographicCamera.RESIZE_VERTICAL)
	{
		this.right = this.size/2
		this.left = -this.right
		this.top = this.right / this.aspect * (this.viewport.x / this.viewport.y)
		this.bottom = -this.top
	}

	THREE.OrthographicCamera.prototype.updateProjectionMatrix.call(this)
}

/**
 * Create JSON description
 * @method toJSON
 * @param {Object} meta
 * @return {Object} JSON description
 */
OrthographicCamera.prototype.toJSON = function(meta)
{
	var data = THREE.OrthographicCamera.prototype.toJSON.call(this, meta)

	data.object.size = this.size
	data.object.aspect = this.aspect
	data.object.mode = this.mode

	data.object.clearColor = this.clearColor
	data.object.clearDepth = this.clearDepth
	data.object.viewport = this.viewport.toArray()
	data.object.offset = this.offset.toArray()
    data.object.order = this.order

	return data;
}
