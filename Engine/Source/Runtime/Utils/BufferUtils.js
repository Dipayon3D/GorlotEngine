"use strict"

/**
 * BufferUtils contains methods to convert from and to NodeJS buffer binary format
 *
 * @class BufferUtils
 * @module BinaryData
 * @static
 */
function BufferUtils() {}

/**
 * Create nodejs buffer from arraybuffer
 *
 * @method fromArrayBuffer
 * @param {ArrayBuffer} array
 * @return {Buffer} buffer
 */
BufferUtils.fromArrayBuffer = function(array) {
    var buffer = new Buffer(array.byteLength)
    var view = new Uint8Array(array)

    for(var i = 0; i < buffer.length; i++) {
        buffer[i] = view[i]
    }

    return buffer
}
