"use strict"

/**
 * Folder class is used to store and organised some other resources in the editor asset explorer
 *
 * @class Folder
 * @extends {Resource}
 * @constructor
 * @module Resources
 * @param {String} name Name of the folder
 */
function Folder(name) {
	this.name = (name !== undefined) ? name : "Folder"
	this.uuid = THREE.Math.generateUUID()
	this.type = "Folder"
	this.path = "/"
}

/**
 * Sets the path of the folder (the one in which the folder will be stored)
 * @param {String} path
 * @method setPath
 */
Folder.prototype.setPath = function(path) {
	if (path !== undefined) {
		this.path = path
	}
}

/**
 * Serialise folder as JSON
 * @return {Object} data
 * @method toJSON
 */
Folder.prototype.toJSON = function() {
	var data = {}

	data.name = this.name
	data.uuid = this.uuid
	data.path = this.path

	return data
}
