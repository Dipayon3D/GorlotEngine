"use strict"

//Perspective camera from fov, aspect ration and near and far planes
function PerspectiveCamera(fov, aspect, near, far)
{
	THREE.PerspectiveCamera.call(this, fov, aspect, near, far)

	this.name = "camera"

	this.offset = new THREE.Vector2(0.0, 0.0)
	this.viewport = new THREE.Vector2(1.0, 1.0)
	this.clearColor = false
	this.clearDepth = false
    this.order = 0

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
	this.defaultComponents.push(new CameraComponent())
}

PerspectiveCamera.prototype = Object.create(THREE.PerspectiveCamera.prototype)

// Destroy camera
PerspectiveCamera.prototype.destroy = function() {
	var scene = ObjectUtils.getScene(this)
	if (scene !== null) {
		scene.removeCamera(this)
	}

	THREE.Object3D.prototype.destroy.call(this)
}

// Update world transformation matrix
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

// Update projection matrix
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

// Create JSON for object
PerspectiveCamera.prototype.toJSON = function(meta) {
	var data = THREE.PerspectiveCamera.prototype.toJSON.call(this, meta)

	data.object.clearColor = this.clearColor
	data.object.clearDepth = this.clearDepth
	data.object.viewport = this.viewport.toArray()
	data.object.offset = this.offset.toArray()
    data.object.order = this.order

	return data
}
