class SpotLight extends THREE.SpotLight {
	constructor(hex, intensity, distance, angle, exponent, decay) {
		super(hex, intensity, distance, angle, exponent, decay)

		this.name = "spot_light"

		this.castShadow = true

		this.shadow.camera.near = 0.1
		this.shadow.camera.far = 500
		this.shadow.camera.left = -10
		this.shadow.camera.right = 10
		this.shadow.camera.top = 10
		this.shadow.camera.bottom = -10

		this.shadow.mapSize.width = 1024
		this.shadow.mapSize.height = 1024
	
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new LightComponent())
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}
	
	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}
}