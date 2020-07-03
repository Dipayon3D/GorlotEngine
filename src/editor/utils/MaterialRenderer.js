class MaterialRenderer {
	constructor() {
		// Canvas
		this.canvas = document.createElement("canvas")
		this.canvas.width = 128
		this.canvas.height = 128
		this.canvas.style.width = "128px"
		this.canvas.style.height = "128px"
		this.canvas.style.position = "absolute"

		// Material renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true})
		this.renderer.setSize(this.canvas.width, this.canvas.height)

		// Material camera
		this.camera = new PerspectiveCamera(90, this.canvas.width/this.canvas.height, 0.1, 5000)

		// Material Renderer Scene
		this.scene = new Scene()

		this.obj = new Model3D(new THREE.SphereBufferGeometry(1, 32, 32), null)
		this.obj.position.set(0, 0, -1.5)
		this.obj.visible = false
		this.scene.add(this.obj)

		//this.sprite = new Sprite(null)
		//this.sprite.position.set(0, 0, -1.5)
		//this.sprite.visible = false
		//this.scene.add(this.sprite)

		this.scene.add(new PointLight(0x666666))
		this.scene.add(new AmbientLight(0x666666))
	}

	setSize(x, y) {
		this.canvas.width = x
		this.canvas.height = y
		this.renderer.setSize(this.canvas.width, this.canvas.height)
	}

	renderMaterial(material, img) {
		// Renders material to internal canvas and copy image to html image element
		if (material instanceof THREE.SpriteMaterial) {
		//	this.sprite.material = material
		//	this.sprite.visible = true
		//	this.obj.visible = false
		} else {
			this.obj.material = material
			this.obj.visible = true
			//this.sprite.visible = true
		}

		this.renderer.render(this.scene, this.camera)

		var self = this
		if (img !== undefined) {
			self.canvas.toBlob((blob) => {
				var url = URL.createObjectURL(blob)
				img.src = url
				EditorUI.updateAssetExplorer()
			})
		}
	}
}