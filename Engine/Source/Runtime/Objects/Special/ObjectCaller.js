"use strict"

//Container constructor
function ObjectCaller(objUuid, objType) {
	THREE.Object3D.call(this)

	this.name = "caller"
	this.type = "ObjectCaller"

	this.obj = null
	this.objUuid = (objUuid === undefined) ? null : objUuid
	this.objType = (objType === undefined) ? null : objType
	this.program = null

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

// Super prototype
ObjectCaller.prototype = Object.create(THREE.Object3D.prototype)

ObjectCaller.prototype.initialize = function() {
	this.program = (Editor.programRunning !== undefined && Editor.programRunning !== null) ? Editor.programRunning : Main.program

	if (this.objUuid !== null) {
		if (this.program.assetObjects[this.objUuid] !== undefined) {
			this.obj = this.program.assetObjects[this.objUuid]
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

ObjectCaller.prototype.dispose = function() {
	if (this.obj === null) 
		return

	this.obj.dispose()

	for(var i = 0; i < this.children.length; i++) {
		this.children[i].dispose()
	}	
}

ObjectCaller.prototype.setObject = function(object) {
	this.objUuid = object.uuid
	this.name = object.name
	this.objType = object.type
}

ObjectCaller.prototype.toJSON = function(meta) {
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)

	data.object.objUuid = this.objUuid
	data.object.objType = this.objType

	return data
}
