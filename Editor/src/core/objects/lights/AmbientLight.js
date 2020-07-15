"use strict";

function AmbientLight(hex)
{
	THREE.AmbientLight.call(this, hex);
	
	this.name = "ambient_light";

	this.matrixAutoUpdate = false;
}

//Function Prototype
AmbientLight.prototype = Object.create(THREE.AmbientLight.prototype);