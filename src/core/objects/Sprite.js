class Sprite extends THREE.Sprite {
	constructor(material) {
		super(material)

		this.name = "sprite"
		this.type = "Sprite"

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
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