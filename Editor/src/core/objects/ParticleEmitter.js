class ParticleEmitter extends THREE.Object3D {
	constructor(texture) {
		super()

		this.type = "ParticleEmitter"
		this.name = "particle"

		this.nodes = {
			config: {},
			groups: [],
			last_link_id: 0,
			last_node_id: 1,
			links: [],
			nodes: [
				{
					flags: {},
					id: 1,
					mode: 0,
					order: 0,
					outputs: [
						{
							links: null,
							name: "Particles",
							type: "Particles"
						}
					],
					pos: [130, 130],
					properties: {
						uuid: this.uuid,
						uuid_runtime: ""
					},
					size: [140, 26],
					type: "Particles/Particles"
				}
			],
			version: 0.4
		}

		this.clock = new THREE.Clock()

		this.group = new SPE.Group({
			texture: {
				value: (texture !== undefined) ? texture : new Texture("data/particle.png")
			},
			blending: THREE.AdditiveBlending,
			maxParticleCount: 10000
		})

		// Disable frustum culling
		this.group.mesh.frustumCulled = false

		this.emitter = new SPE.Emitter({
			
			particleCount: 2000,
			direction: 1,
			duration: null,

			maxAge: {
				value: 2,
				spread: 0
			},
			position: {
				value: new THREE.Vector3(0, 0, 0),
				spread: new THREE.Vector3(0, 0, 0)
			},
			velocity: {
				value: new THREE.Vector3(0, 25, 0),
				spread: new THREE.Vector3(10, 7.5, 10)
			},
			acceleration: {
				value: new THREE.Vector3(0, -10, 0),
				spread: new THREE.Vector3(10, 0, 10)
			},
			wiggle: {
				value: 0,
				spread: 0
			},
			color: {
				value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 0, 0)],
				spread: [new THREE.Color(0, 0, 0), new THREE.Color(0.1, 0.1, 0.1)]
			},
			opacity: {
				value: 1,
				spread: 0
			},
			size: {
				value: 1,
				spread: 0
			},
			angle: {
				value: 0,
				spread: 0
			}
		})

		this.group.addEmitter(this.emitter)

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	updateValues() {
		// Update particle group and emitter runtime values
		this.group.material.uniforms.texture.value = this.group.texture
		this.group.material.blending = this.group.blending
		this.group.material.needsUpdate = true
	}

	updateNodes(nodes) {
		this.nodes = nodes
	}

	initialize() {
		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
		
		// Add particle group to self
		this.add(this.group.mesh)
	}

	update() {
		// Update state
		this.group.tick(this.clock.getDelta())

		// Update children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	toJSON(meta) {
		var self = this

		var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
			self.group.texture.toJSON(meta)
		})
	
		data.object.components = this.components
		data.object.nodes = this.nodes

		// Group
		data.object.group = {}
		data.object.group.texture = this.group.texture.uuid
		data.object.group.textureFrames = this.group.textureFrames
		data.object.group.textureFrameCount = this.group.textureFrameCount
		data.object.group.textureLoop = this.group.textureLoop
		data.object.group.hasPerspective = this.group.hasPerspective
		data.object.group.colorize = this.group.colorize
		data.object.group.maxParticleCount = this.group.maxParticleCount
		data.object.group.blending = this.group.blending

		// Emitter
		data.object.emitter = {}
		data.object.emitter.direction = this.emitter.direction
		data.object.emitter.particleCount = this.emitter.particleCount

		return data
	}
}