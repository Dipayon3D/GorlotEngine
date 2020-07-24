"use strict";

//Program constructor
function Program(name)
{
	THREE.Object3D.call(this);

	//Program Type
	this.type = "Program";

	//Matrix auto update
	this.matrixAutoUpdate = false;

	//Program Info
	this.name = (name !== undefined) ? name : "program";
	this.description = "";
	this.author = "";
	this.version = "0";

	//Hardware flags
	this.lock_pointer = false;
	
	//VR flags
	this.vr = false;
	this.vr_scale = 1;

	//Rendering quality
	this.antialiasing = false;
	this.shadows = true;
	this.shadows_type = THREE.PCFSoftShadowMap;

	//Resources
	this.images = []
	this.videos = []
	this.audio = []
	this.fonts = []
	this.materials = []
	this.textures = []
	this.geometries = []
	this.asset_objects = []

	//Initial values
	this.default_scene = null;
	this.default_camera = null;

	//Runtime variables
	this.html = null
	this.renderer = null;
	this.scene = null;

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ProgramComponent())
}

Program.prototype = Object.create(THREE.Object3D.prototype);

//Add material to materials list
Program.prototype.addMaterial = function(material)
{
	if(material instanceof THREE.Material)
	{
 		this.materials[material.uuid] = material;
 	}
}

//Remove material from materials list (also receives default used to replace)
Program.prototype.removeMaterial = function(material, default_material, default_material_sprite)
{
	if(material instanceof THREE.Material)
	{
		delete this.materials[material.uuid];
		
		this.traverse(function(child)
		{
			if(child.material !== undefined)
			{
				if(child.material.uuid === material.uuid)
				{
					if(child instanceof THREE.Sprite)
					{
						child.material = default_material_sprite;
					}
					else
					{
						child.material = default_material;
					}
				}
			}
		});
	}
}

//Add texture to texture list
Program.prototype.addTexture = function(texture)
{
 	this.textures[texture.uuid] = texture;
}

// Add an object to objects list
Program.prototype.addObject = function(object) {
	this.asset_objects[object.uuid] = object
}

//Set actual scene (to be used in runtime)
Program.prototype.setScene = function(scene)
{
	if(scene instanceof Scene)
	{
		this.scene = scene;
		this.scene.initialize();
		if(this.scene.camera === null)
		{
			this.scene.camera = this.default_camera;
		}
	}
	else if(typeof scene === "string")
	{
		this.scene = this.getObjectByName(scene);
		this.scene.initialize();
		if(this.scene.camera === null)
		{
			this.scene.camera = this.default_camera;
		}
	}
}

//Select initial scene and initialize that scene
Program.prototype.initialize = function()
{
	if(this.default_scene !== null)
	{
		for(var i = 0; i < this.children.length; i++)
		{
			if(this.children[i].uuid === this.default_scene)
			{
				this.setScene(this.children[i]);
				break;
			}
		}
	}
	else
	{
		this.setScene(this.children[0]);
	}
}

//Screen resize
Program.prototype.resize = function(x, y)
{
	if(this.scene !== null)
	{
		this.scene.camera.aspect = x/y;
		this.scene.camera.updateProjectionMatrix();
	}
}

//Remove Scene from program
Program.prototype.remove = function(scene)
{
	var index = this.children.indexOf(scene);
	if(index > -1)
	{
		this.children.splice(index, 1);
		scene.parent = null;
	}

	//If no scene on program set actual scene to null
	if(this.children.length === 0)
	{
		this.scene = null;
	}
}

//Add children to program (only allows Scenes to be added)
Program.prototype.add = function(scene)
{
	if(scene instanceof Scene)
	{
		this.children.push(scene);
		scene.parent = this;

		//If first scene set as actual scene
		if(this.children.length === 1)
		{
			this.scene = this.children[0];
		}
	}
}

//Clone program (keep uuid and everything else)
Program.prototype.clone = function()
{
	return new ObjectLoader().parse(this.toJSON());
}

//Set as initial scene (from uuid reference)
Program.prototype.setInitialScene = function(scene)
{
	this.default_scene = scene.uuid;
}

//Create a default scene with sky
Program.prototype.addDefaultScene = function(material)
{
	if(material === undefined)
	{
		material = new MeshStandardMaterial({roughness: 0.6, metalness: 0.2});
		material.name = "default";
	}

	//Create new scene
	var scene = new Scene();

	//Sky
	var sky = new Sky();
	sky.auto_update = false;
	scene.add(sky);

	//Box
	var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
	var model = new Mesh(geometry, material);
	model.receiveShadow = true;
	model.castShadow = true;
	model.name = "box";
	scene.add(model);

	//Floor
	model = new Mesh(geometry, material);
	model.scale.set(20, 1, 20);
 	model.position.set(0, -1, 0);
	model.receiveShadow = true;
	model.castShadow = true;
	model.name = "ground";
	scene.add(model);

	//Add scene to program
	this.add(scene);
}

//Dispose program data (to avoid memory leaks)
Program.prototype.dispose = function()
{
	//Dispose materials
	for(var i = 0; i < this.materials.length; i++)
	{
		this.materials[i].dispose();
	}

	//Dispose textures
	for(var i = 0; i < this.textures.length; i++)
	{
		this.textures[i].dispose();
	}

	//Dipose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

//Create JSON for object
Program.prototype.toJSON = function(meta)
{
	var self = this;

	var data = THREE.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
	{
		// Fonts
		/*var fonts = self.fonts
		for(var i in fonts) {
			fonts[i].toJSON(meta)
		}

		// Videos
		var videos = self.videos
		for(i in videos) {
			videos[i].toJSON(meta)
		}

		// Audio
		var audio = self.audio
		for(i in audio) {
			audio[i].toJSON(meta)
		}

		// Images
		var images = self.images
		for(i in images) {
			images[i].toJSON(meta)
		}

		// Textures
		var textures = self.textures
		for(i in textures) {
			textures[i].toJSON(meta)
		}

		// Geometries
		var geometries = self.geometries
		for(i in geometries) {
			var geometry = geometries[i]
			if (meta.geometries[geometry.uuid] === undefined) {
				meta.geometries[geometry.uuid] = geometry.toJSON(meta)
			}
		}*/

		// Materials
		var materials = self.materials
		for(var i in materials) {
			var material = materials[i]
			if (meta.materials[material.uuid] === undefined) {
				meta.materials[material.uuid] = material.toJSON(meta)
			}
		}

		// Objects
		var objects = self.asset_objects
		for(var i in objects) {
			var object = objects[i]
			if (meta.asset_objects[object.uuid] === undefined) {
				meta.asset_objects[object.uuid] = object.toJSON(meta)
			}
		}
	});

	//Program info
	data.object.author = this.author;
	data.object.description = this.description;
	data.object.version = this.version;

	//Hardware flags
	data.object.lock_pointer = this.lock_pointer;

	//VR flags
	data.object.vr = this.vr;
	data.object.vr_scale = this.vr_scale;

	//Initial scene
	if(this.default_scene !== null)
	{
		data.object.default_scene = this.default_scene;
	}

	return data;
}