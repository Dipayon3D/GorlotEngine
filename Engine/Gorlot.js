"use strict"

function GORLOT() {}

GORLOT.NAME = "Gorlot"
GORLOT.VERSION = "0.0.1-alpha"
GORLOT.TIMESTAMP = "Sat Aug 08, 16:20 PM"

// Check if WebVR is Available
GORLOT.WebVRAvailable = function() {
    return navigator.getVRDisplays !== undefined
}
