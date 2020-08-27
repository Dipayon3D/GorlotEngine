"use strict"

/**
 * Class used to store gorlot version and timestamp used for development
 *
 * @class GORLOT
 * @module Runtime
 */
function GORLOT() {}

/**
 * @attribute NAME
 * @type {String}
 * @default "Gorlot"
 */
GORLOT.NAME = "Gorlot"

/**
 * Stores the gorlot runtime version
 * @attribute VERSION
 * @type {String}
 */
GORLOT.VERSION = "0.0.1-alpha"

/**
 * Shows the GORLOT runtime timestamp
 * @attribute TIMESTAMP
 * @type {String}
 */
GORLOT.TIMESTAMP = "Wed Aug 19, 22:06 PM"

/**
 * Check if host has WebVR available
 * @method WebVRAvailable
 * @return {Boolean} Returns true if available
 */
GORLOT.WebVRAvailable = function() {
    return navigator.getVRDisplays !== undefined
}
