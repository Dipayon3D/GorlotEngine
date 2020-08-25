"use strict";

/**
 * This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space.
 * This page provides documentation for some of the main features of this class, the original documentation can be found at https://threejs.org/docs/index.html#api/en/core/Object3D
 * All Gorlot objects extend the Object3D class of some other higher level class from three.js
 * Code examples provided for three.js should also work inside Gorlot
 *
 * @class Object3D
 * @module ThreeJS
 * @constructor
 */

/**
 * Array with the object's children
 * @property children
 * @type {Array}
 */

/**
 * When this is set to true, it checks every frame if the object is in the frustum of the camera before rendering the object. Otherwise the object gets rendered every frame even if it isn't visible
 * @property frustumCulled
 * @default true
 * @type {Boolean}
 */

/**
 * The layer membership of the object. The object is only visible if it has at least one layer in common with the Camera in use
 * @property layers
 * @type {Layers}
 */

/**
 * The local transform matrix
 * @property matrix
 * @type {Matrix}
 */

/**
 * When this is set to true, it calculates the matrix of position (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property
 * @property matrixAutoUpdate
 * @default true
 * @type {Boolean}
 */

/**
 * The global transform of the object. If the Object3D has no parent, then it's identical to the local transform
 * @property matrixWorld
 * @type {Matrix4}
 */

/**
 * Name of the object (doesn't need to be unique)
 * @property name
 * @type {String}
 */

/**
 * The object's local position
 * @property position
 * @type {Vector3}
 */

/**
 * Object's local rotation as a Quaternion
 * @property quaternion
 * @type {Quaternion}
 */

/**
 * Object's local rotation (see Euler angles), in radians
 * @property rotation
 * @type {Euler}
 */

/**
 * The object's local scale
 * @property scale
 * @type {Vector3}
 */

/**
 * This is used by the lookAt method, for example, to determine the orientation of the result
 * @property up
 * @type {Vector3}
 */

/**
 * UUID of this object instance. It gets automatically assigned, so it shouldn't be edited
 * @property uuid
 * @type {String}
 */

/**
 * Object gets rendered if true
 * @property visible
 * @type {Boolean}
 * @default true
 */

/**
 * This value allows the default rendering order of scene graphs objects to be overriden although opaque and transparent objects remain sorted independently
 * @property renderOrder
 * @default 0
 * @type {Number}
 */

/**
 * Whether the object gets rendererd into shadow map
 * @property castShadow
 * @default false
 * @type {Boolean}
 */

/**
 * Whether the material receives shadows
 * @property receiveShadow
 * @default false
 * @type {Boolean}
 */

/**
 * Space reserved for user data, can be used for variables in runtime or can be used by scripts to store values on an object
 * @property userData
 * @type {Object}
 */

//Folded attribute
THREE.Object3D.prototype.folded = false

// Components
THREE.Object3D.prototype.components = []
THREE.Object3D.prototype.defaultComponents = []

if (THREE.Object3D.prototype.defaultComponents.length === 0) {
    THREE.Object3D.prototype.defaultComponents.push(new ElementComponent())
    THREE.Object3D.prototype.defaultComponents.push(new ObjectComponent())
}

//Hidden attribute (hidden objects are not serialised and dont show up in the editor)
THREE.Object3D.prototype.hidden = false

/**
 * Initialise the object
 * @method initialize
 */
THREE.Object3D.prototype.initialize = function()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize()
	}
}

/**
 * Update the object state
 * @method update
 */
THREE.Object3D.prototype.update = function()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update()
	}
}

/**
 * Dispose the object (to avoid memory leaks)
 * @method dispose
 */
THREE.Object3D.prototype.dispose = function()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose()
	}
}

/**
 * Remove all children from the object
 * @method removeAll
 */
THREE.Object3D.prototype.removeAll = function()
{
	for(var i = this.children.length - 1; i > -1; i--)
	{
		this.remove(this.children[i])
	}
}

/**
 * Destroy object, dispose and remove from its parent
 * @method destroy
 */
THREE.Object3D.prototype.destroy = function()
{
	while(this.children.length > 0) {
		this.children[0].destroy()
	}

	if(this.parent !== null)
	{
		if(this.dispose)
		{
			this.dispose()
		}
		this.parent.remove(this)
	}
}

/**
 * Serialise object as JSON
 * @method toJSON
 * @param {Object} meta
 * @param {Function} resourceAccess
 * @param {Boolean} recursive
 * @return {Object} json
 */
THREE.Object3D.prototype.toJSON = function(meta, resourceAccess, recursive)
{
	var isRootObject = (meta === undefined)
	var output = {}

	//If root object initialize base structure
	if(isRootObject)
	{
		meta =
		{
			fonts: {},
			videos: {},
			images: {},
			audio: {},
			geometries: {},
			materials: {},
			textures: {},
			assetObjects: {}
		}

		output.metadata =
		{
			version: GORLOT.VERSION,
			type: "GorlotProgram"
		}
	}

	var object = {}

	object.uuid = this.uuid
	object.type = this.type
	object.name = this.name

	object.folded = this.folded
	object.hidden = this.hidden

	object.castShadow = this.castShadow
	object.receiveShadow = this.receiveShadow
	object.visible = this.visible

	object.matrixAutoUpdate = this.matrixAutoUpdate
	object.matrix = this.matrix.toArray()

	if (this.components !== undefined) {
		object.components = this.components
	}

	if (JSON.stringify(this.userData) !== "{}") {
		object.userData = this.userData
	}

	//If there is geometry store it
	if(this.geometry !== undefined)
	{
		if(meta.geometries[this.geometry.uuid] === undefined)
		{
			meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta)
		}

		object.geometry = this.geometry.uuid
	}

	//If there is a material store it
	if(this.material !== undefined)
	{
		if(meta.materials[this.material.uuid] === undefined)
		{
			meta.materials[this.material.uuid] = this.material.toJSON(meta)
		}

		object.material = this.material.uuid
	}

	//Resource access callback
	if(resourceAccess !== undefined)
	{
		resourceAccess(meta, object)
	}

	//Serialise children data
	if(recursive !== false && this.children.length > 0)
	{
		object.children = []

		for(var i = 0; i < this.children.length; i ++)
		{
			if((this.children[i] instanceof BlockScript) || (!this.children[i].hidden))
			{
				object.children.push(this.children[i].toJSON(meta).object)
			}
		}
	}

	//If root object add assets
	if(isRootObject)
	{
		output.geometries = extractFromCache(meta.geometries)
		output.materials = extractFromCache(meta.materials)
		output.textures = extractFromCache(meta.textures)
		output.images = extractFromCache(meta.images)
		output.videos = extractFromCache(meta.videos)
		output.audio = extractFromCache(meta.audio)
		output.fonts = extractFromCache(meta.fonts)
		output.assetObjects = extractFromCache(meta.assetObjects)
	}

	output.object = object
	return output

	//Extract data from the cache hash remove metadata on each item and return as array
	function extractFromCache(cache)
	{
		var values = []

		for(var key in cache)
		{
			var data = cache[key]
			delete data.metadata
			values.push(data)
		}

		return values
	}
}

/**
 * Remove children from this object
 * @param {Object3D} objects Removes object as child of this object. An arbitrary number of objects may be removed
 * @method remove
 */

/**
 * Converts the vector from local space to world space
 * @param {Vector3} vector Vector representing a position in local (object) space
 * @method localToWorld
 */

/**
 * Updates the vector world from world space to local space
 * @param {Vector3} vector A world vector
 * @method worldToLocal
 */

/**
 * Adds object as child of this object. An arbitrary number of objects may be added
 * @method add
 * @param {Object3D} objects
 */

/**
 * This updates the position, rotation and scale with the matrix
 * @method applyMatrix
 * @param {Matrix4} matrix
 */

/**
 * Returns a clone ot his object - and optionally - its descendants
 * @method clone
 * @param {Boolean} recursive If true, descendants of the object are also cloned. Default is true
 */

/**
 * Copy the given object into this object
 * @method copy
 * @param {Object3D} object
 * @param {Boolean} recursive If true, descendants of the object are also copied. Default is true
 */

/**
 * Searches through the object's children and returns the first with a matchin name
 * @param {String} name String to match the children's Object3D.name property
 * @method getObjectByName
 */

/**
 * Searches through the object's children and returns the first with a property that matches the aclue given
 * @param {String} name The property name to search for
 * @param {Object} value Value of the given property
 * @method getObjectByProperty
 */

/**
 * @param {Vector3} optionalTarget Target to set the result. Otherwise, a new Vector3 is instantiated.
 * @return {Vector3} Returns a vector representing the position of the object in world space.
 * @method getWorldPosition
 */

/**
 * Returns a quaternion representing the rotation of the object in world space.
 * @method getWorldQuaternion
 * @param {Quaternion} optionalTarget If specified, the result will be copied into this Quaternion, otherwise a new Quaternion will be created. 
 */

/**
 * Returns the euler angles representing the rotation of the object in world space.
 * @method getWorldRotation
 * @param {Euler} optionalTarget If specified, the result will be copied into this Euler, otherwise a new Euler will be created. 
 */

/**
 * Returns a vector of the scaling factors applied to the object for each axis in world space.
 * @method getWorldScale
 * @param {Vector3} optionalTarget If specified, the result will be copied into this Vector3, otherwise a new Vector3 will be created. 
 */

/**
 * Returns a vector representing the direction of object's positive z-axis in world space.
 * @method getWorldDirection
 * @param {Vector3} optionalTarget If specified, the result will be copied into this Vector3, otherwise a new Vector3 will be created. 
 */

/**
 * Rotate an object along an axis in object space. The axis is assumed to be normalized..
 * @method rotateOnAxis
 * @param {Vector3} axis A normalized vector in object space.
 * @param {Number} angle The angle in radians.
 */

/**
 * Rotates the object around x axis in local space.
 * @method rotateX
 * @param {Number} rad The angle to rotate in radians.
 */

/**
 * Rotates the object around y axis in local space.
 * @method rotateY
 * @param {Number} rad The angle to rotate in radians.
 */

/**
 * Rotates the object around z axis in local space.
 * @method rotateZ
 * @param {Number} rad The angle to rotate in radians.
 */
