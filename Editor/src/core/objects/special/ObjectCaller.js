"use strict"

//Container constructor
function ObjectCaller(obj_uuid) {
	THREE.Object3D.call(this)

	this.name = "caller"
	this.type = "ObjectCaller"

	this.obj = null
	this.obj_uuid = (obj_uuid === undefined) ? null : obj_uuid
	this.program = null

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

// Super prototype
ObjectCaller.prototype = Object.create(THREE.Object3D.prototype)

ObjectCaller.prototype.initialize = function() {
	this.program = (Editor.program_running !== undefined && Editor.program_running !== null) ? Editor.program_running : Main.program

	if (this.obj_uuid !== null) {
		if (this.program.asset_objects[this.obj_uuid] !== undefined) {
			this.obj = this.program.asset_objects[this.obj_uuid]
			this.obj.initialize()
		}
	}

	for(var i = 0; i < this.children.length; i++) {
		this.children[i].initialize()
	}
}

ObjectCaller.prototype.update = function() {
	if (this.obj === null) 
		return

	this.obj.update()

	for(var i = 0; i < this.children.length; i++) {
		this.children[i].update()
	}
}

ObjectCaller.prototype.setObject = function(uuid) {
	this.obj_uuid = uuid
}

ObjectCaller.prototype.toJSON = function(meta) {
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)

	data.object.obj_uuid = this.obj_uuid

	return data
}