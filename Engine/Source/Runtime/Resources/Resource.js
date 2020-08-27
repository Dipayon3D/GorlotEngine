"use strict"

/**
 * Resource class is used to represent resources
 * Resources store data that is used by objects
 *
 * @class Resource
 * @module Resources
 * @constructor
 */
function Resource() {
    /**
     * Resource name. Not required to be unique
     * @property name
     * @type {String}
     */
    this.name = "file"

    /**
     * Universal Unique identifier
     * @property uuid
     * @type {String}
     */
    this.uuid = THREE.Math.generateUUID()

    /**
     * Resource type. Used to identify the type of the resource, useful for serialisation
     * @property type
     * @type {String}
     */
    this.type = "File"

    /**
     * Data format (Base64, ArrayBuffer, ...)
     * Indicates in which format the data is being stored
     * @property format
     * @type {String}
     */
    this.format = ""

    /**
     * Data encoding (MP3, JPEG, MP4, ...)
     * Indicated how the data is encoded
     * @property encoding
     * @type {String, ArrayBuffer, ...}
     */
    this.encoding = ""

    /**
     * Data
     * @property data
     * @type {Object}
     */
    this.data = null
}

/**
 * Serialise resource to JSON
 * @param {Object} meta
 * @return {Object} json
 * @method toJSON
 */
Resource.prototype.toJSON = function(meta) {
    var data = {}
    data.name = this.name
    data.uuid = this.uuid
    data.type = this.type

    data.encoding = this.encoding
    return data
}
