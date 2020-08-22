"use strict"

/**
 * GORLOT global namespace
 * @class GORLOT
 */
function GORLOT() {}

/**
 * Contains the engine name
 * @property NAME
 * @type "String"
 * @default "Gorlot"
 */
GORLOT.NAME = "Gorlot"

/**
 * The current engine version
 * @property VERSION
 * @type "String"
 */
GORLOT.VERSION = "0.0.1-alpha"

/**
 * The date in which the current version was compiled
 * @property TIMESTAMP
 */
GORLOT.TIMESTAMP = "Wed Aug 19, 22:06 PM"

/**
 * Checks if virtual reality is available
 * @method WebVRAvailable
 * @return {Boolean} Returns true if available
 */
GORLOT.WebVRAvailable = function() {
    return navigator.getVRDisplays !== undefined
}
