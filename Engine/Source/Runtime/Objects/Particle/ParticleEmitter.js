"use strict";

/**
 * Particle emitter is a wrapper for SPE particle systems
 *
 * @class ParticleEmitter
 * @constructor
 * @extends {Points}
 * @module Particles
 */
function ParticleEmitter(group, emitter)
{
	this.nodes = {}

    // Clock
	this.clock = new THREE.Clock();

	// Group
	if(group !== undefined)
	{
		this.group = new SPE.Group(group);
	}
	else
	{
		this.group = new SPE.Group(
		{
			texture:
			{
                value: null
			},
			maxParticleCount: 2000,
			blending: THREE.AdditiveBlending,
            fog: false,
            depthWrite: false,
            depthTest: true,
            transparent : false,
			hasPerspective: true
		});
	}

    // Points constructor
    THREE.Points.call(this, this.group.geometry, this.group.material)

    this.type = "ParticleEmitter"
    this.name = "particles"
    this.frustumCulled = false

    // Texture
    var group = this.group
    Object.defineProperties(this, {
        texture: {
            get: () => {
                return group.texture
            },
            set: () => {
                group.texture = texture
            }
        }
    })

	// Emitter
	if(emitter !== undefined)
	{
		this.emitter = new SPE.Emitter(emitter);
        this.group.addEmitter(this.emitter)
	}
	else
	{
		this.emitter = new SPE.Emitter(
		{		
			particleCount: 2000,
			type: SPE.distributions.BOX,

			maxAge:
			{
				value: 3,
				spread: 0
			},

			velocity:
			{
				value: new THREE.Vector3(0, 25, 0),
				spread: new THREE.Vector3(10, 10, 10)
			},

			acceleration:
			{
				value: new THREE.Vector3(0, -10, 0),
				spread: new THREE.Vector3(10, 0, 10)
			},

			color:
			{
				value: [new THREE.Color(1, 1, 1)],
				spread: [new THREE.Vector3(0, 0, 0)]
			}
		});

        this.group.addEmitter(this.emitter)
	}

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

ParticleEmitter.prototype = Object.create(THREE.Points.prototype);

/**
 * Initialise particle emitter state
 * Automatically called by the runtime handler (Editor / App)
 * @method initialize
 */
ParticleEmitter.prototype.initialize = function()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}

    this.clock.start()
}

/**
 * Update particle emitter state
 * Called automatically by the runtime handler (Editor / App)
 * @method update
 */
ParticleEmitter.prototype.update = function()
{
	this.group.tick(this.clock.getDelta());

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update();
	}
}

/**
 * Updates the particle nodes
 * @param {Object} nodes
 * @method updateNodes
 */
ParticleEmitter.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

/**
 * Dispose particle emitter
 * @method dispose
 */
ParticleEmitter.prototype.dispose = function()
{
    this.group.texture.dispose()

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

// Update Matrix World
ParticleEmitter.prototype.updateMatrix = function() {
    this.matrix.makeRotationFromQuaternion(this.quaternion)
    this.matrix.scale(this.scale)
    this.matrix.setPosition(this.position)

    this.matrixWorldNeedsUpdate = true
}

/**
 * Create JSON for object
 * Need to backup material and geometry and set to undefined to avoid it to being stored
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
ParticleEmitter.prototype.toJSON = function(meta)
{
    // Back material and geometry to avoid unwanted serialisation
    var material = this.material
    var geometry = this.geometry
    this.material = undefined
    this.geometry = undefined

    var texture = this.group.texture
    var data = THREE.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
    {
        texture = texture.toJSON(meta);
    });

    // Restore material and geometry
    this.material = material
    this.geometry = geometry

	//Group attributes
	data.object.group = {};
	data.object.group.texture = {};
	data.object.group.texture.value = texture.uuid;
	data.object.group.textureFrames = this.group.textureFrames;
	data.object.group.textureFrameCount = this.group.textureFrameCount
	data.object.group.textureLoop = this.group.textureLoop;
	data.object.group.hasPerspective = this.group.hasPerspective;
	data.object.group.colorize = this.group.colorize;
	data.object.group.maxParticleCount = this.group.maxParticleCount;
	data.object.group.blending = this.group.blending;
	data.object.group.scale = this.group.scale;
	data.object.group.depthWrite = this.group.depthWrite;
	data.object.group.depthTest = this.group.depthTest;
	data.object.group.fog = this.group.fog;

	//Emitter attributes
	data.object.emitter = {};
	data.object.emitter.uuid = this.emitter.uuid;
	data.object.emitter.direction = this.emitter.direction;
	data.object.emitter.particleCount = this.emitter.particleCount;
	data.object.emitter.duration = this.emitter.duration;
	data.object.emitter.type = this.emitter.type;

	//Max age
	data.object.emitter.maxAge = {};
	data.object.emitter.maxAge.value = this.emitter.maxAge.value;
	data.object.emitter.maxAge.spread = this.emitter.maxAge.spread;

	//Position
	data.object.emitter.position = {};
	data.object.emitter.position.value = this.emitter.position.value;
	data.object.emitter.position.spread = this.emitter.position.spread;

	//Velocity
	data.object.emitter.velocity = {};
	data.object.emitter.velocity.value = this.emitter.velocity.value;
	data.object.emitter.velocity.spread = this.emitter.velocity.spread;

	//Acceleration
	data.object.emitter.acceleration = {};
	data.object.emitter.acceleration.value = this.emitter.acceleration.value;
	data.object.emitter.acceleration.spread = this.emitter.acceleration.spread;

	//Wiggle
	data.object.emitter.wiggle = {};
	data.object.emitter.wiggle.value = this.emitter.wiggle.value;
	data.object.emitter.wiggle.spread = this.emitter.wiggle.spread;

	//Opacity
	data.object.emitter.opacity = {};
	data.object.emitter.opacity.value = this.emitter.opacity.value;
	data.object.emitter.opacity.spread = this.emitter.opacity.spread;

	//Size
	data.object.emitter.size = {};
	data.object.emitter.size.value = this.emitter.size.value;
	data.object.emitter.size.spread = this.emitter.size.spread;

	//Angle
	data.object.emitter.angle = {};
	data.object.emitter.angle.value = this.emitter.angle.value;
	data.object.emitter.angle.spread = this.emitter.angle.spread;

	//Color
	data.object.emitter.color = {};
	data.object.emitter.color.value = this.emitter.color.value;
	data.object.emitter.color.spread = this.emitter.color.spread;

	// Nodes
	data.object.nodes = this.nodes

	return data;
}
