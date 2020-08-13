"use strict"

function GORLOT() {}

GORLOT.NAME = "Gorlot"
GORLOT.VERSION = "0.0.1-alpha"
GORLOT.TIMESTAMP = "Thu Aug 13, 16:02 PM"

// Check if WebVR is Available
GORLOT.WebVRAvailable = function() {
    return navigator.getVRDisplays !== undefined
}
