"use strict"

function GORLOT() {}

GORLOT.NAME = "Gorlot"
GORLOT.VERSION = "0.0.1-alpha"
GORLOT.TIMESTAMP = "Wed Aug 19, 22:06 PM"

// Check if WebVR is Available
GORLOT.WebVRAvailable = function() {
    return navigator.getVRDisplays !== undefined
}
