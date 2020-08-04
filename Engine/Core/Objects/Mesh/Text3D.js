"use strict"

function Text3D(text, material, font)
{
	THREE.Mesh.call(this, undefined, material)
	
	this.name = "text"
	this.type = "Text3D"

	this.scale.set(0.02, 0.02, 0.02)

	this.font = font

	this.text = text

	this.height = 50
	this.bevel = false
	this.bevel_thickness = false
	this.bevel_size = 8

	this.setText("text")

	this.receiveShadow = true
	this.castShadow = true

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
    this.defaultComponents.push(new TextComponent())
}

Text3D.prototype = Object.create(THREE.Mesh.prototype)

//Set Text
Text3D.prototype.setText = function(text)
{
	this.text = text

	if (this.geometry !== undefined) {
		this.geometry.dispose()
	}

	var options = {
		font: this.font,
		height: this.height,
		bevelEnabled: this.bevel,
		bevelSize: this.bevel_size,
		bevelThickness: this.bevel_thickness
	}

	this.geometry = new THREE.TextGeometry(this.text, options)
}

// Dispose text object
Text3D.prototype.dispose = function()
{
	if(this.material.dispose !== undefined)
	{
		this.material.dispose()
	}

	if (this.geometry !== undefined) {
		this.geometry.dispose()
	}

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose()
	}
}

//Create JSON for object (need to backup geometry and set to undefined to avoid it from being stored)
Text3D.prototype.toJSON = function(meta)
{
	var geometry = this.geometry
	this.geometry = undefined

	var font = this.font
	var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
		font = font.toJSON(meta)
	})
	
	data.object.text = this.text
	data.object.font = font.uuid
	data.object.height = this.height
	data.object.bevel = this.bevel
	data.object.bevel_thickness = this.bevel_thickness
	data.object.bevel_size = this.bevel_size

	//Restore geometry
	this.geometry = geometry

	return data
}
