"use strict";

function MaterialRenderer()
{
	//Canvas
	this.canvas = document.createElement("canvas");
	this.canvas.width = 128;
	this.canvas.height = 128;

	//Material renderer and scene
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
	this.renderer.setSize(this.canvas.width, this.canvas.width);

	//Material camera
	this.camera = new PerspectiveCamera(90, this.canvas.width/this.canvas.height);

	//Material preview scene
	this.scene = new Scene();

	this.obj = new Mesh(new THREE.SphereBufferGeometry(1, 32, 32), null);
	this.obj.position.set(0, 0, -1.5);
	this.obj.visible = false;
	this.scene.add(this.obj);
	
	this.sprite = new Sprite(null);
	this.sprite.position.set(0, 0, -0.5);
	this.sprite.visible = false;
	this.scene.add(this.sprite);
	this.scene.add(new PointLight(0x666666));
	this.scene.add(new AmbientLight(0x666666));
}

//Set render size
MaterialRenderer.prototype.setSize = function(x, y)
{
	this.canvas.width = x;
	this.canvas.height = y;
	this.renderer.setSize(this.canvas.width, this.canvas.width);
}

//Render material to internal canvas and copy image to html image element
MaterialRenderer.prototype.renderMaterial = function(material, img)
{
	if(material instanceof SpriteMaterial)
	{
		this.sprite.material = material;
		this.sprite.visible = true;
		this.obj.visible = false;
	}
	else
	{
		this.obj.material = material;
		this.obj.visible = true;
		this.sprite.visible = false;
	}

	this.renderer.render(this.scene, this.camera);

	var self = this;
	if(img !== undefined)
	{
		self.canvas.toBlob(function(blob)
		{
			var url = URL.createObjectURL(blob);
			img.src = url;
		});
	}
}