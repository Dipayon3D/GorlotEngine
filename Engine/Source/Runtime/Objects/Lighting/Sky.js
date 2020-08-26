"use strict"

/**
 * Sky class is composed of a Hemisphere Light, Directional Light and a dynamic generated Sky sphere geometry
 * This object is composed by 3 internal hidden children
 *  - Hemisphere Light
 *  - Directional Light
 *  - Mesh
 *
 * @param {Boolean} autoUpdate If true, sky auto updates its state
 * @param {Number} dayTime Day duration (in seconds)
 * @param {Number} sunDistance Distance of the sun
 * @param {Number} time Starting time
 * @class Sky
 * @extends {Object3D}
 * @module Lights
 * @constructor
 */
function Sky(autoUpdate, dayTime, sunDistance, time)
{	
	THREE.Object3D.call(this)

	this.name = "sky"
	this.type = "Sky"

    /**
     * Clock used to control day time
     * @property clock
     * @type {Clock}
     */
	this.clock = new THREE.Clock()

    /**
     * Array with top sky colours
     * @property colorTop
     * @type {Array}
     */
    this.colorTop = [new THREE.Color(0x77b3fb), new THREE.Color(0x0076ff), new THREE.Color(0x035bb6), new THREE.Color(0x002439)]

    /**
     * Array with bottom sky colours
     * @property colorBottom
     * @type {Array}
     */
	this.colorBottom = [new THREE.Color(0xebece6), new THREE.Color(0xffffff), new THREE.Color(0xfee7d7), new THREE.Color(0x0065a7)]

    /**
     * Sun colour in hex RGB
     * @property sunColor
     * @type {Number}
     * @default {0xFFFFAA}
     */
	this.sunColor = 0xFFFFAA

    /**
     * Moon colour in hex RGB
     * @property moonColor
     * @type {Number}
     * @default 0x5555bb
     */
	this.moonColor = 0x5555bb

    /**
     * Hemisphere light used to match ambient light with sky colour
     * @property hemisphere
     * @type {HemisphereLight}
     */
	this.hemisphere = new THREE.HemisphereLight(0, 0, 0.6)
	this.hemisphere.color.setHSL(0.6, 1, 0.6)
	this.hemisphere.groundColor.setHSL(0.1, 1, 0.75)
	this.hemisphere.hidden = true
	this.hemisphere.rotationAutoUpdate = false
	this.hemisphere.matrixAutoUpdate = false
	this.add(this.hemisphere)

    /**
     * Directional light to simulate light and cast shadows
     * @property sun
     * @type {DirectionalLight}
     */
	this.sun = new THREE.DirectionalLight(this.sunColor, 0.5)
	this.sun.castShadow = true
	this.sun.hidden = true
	this.add(this.sun)

	// Vertex Shader
	var vertex = "varying vec3 vWorldPosition; \
	void main() \
	{ \
		vec4 worldPosition = modelMatrix * vec4(position, 1.0); \
		vWorldPosition = worldPosition.xyz; \
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); \
	}"

	// Pixel shader
	var fragment = "uniform vec3 topColor; \
	uniform vec3 bottomColor; \
	uniform float offset; \
	uniform float exponent; \
	varying vec3 vWorldPosition; \
	void main() \
	{ \
		float h = normalize(vWorldPosition + offset).y; \
		gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), 1.0); \
	}"

	// Uniforms
	var uniforms =
	{
		topColor: {type: "c", value: new THREE.Color(0.0, 0.46, 1.0)},
		bottomColor: {type: "c", value: new THREE.Color(1.0, 1.0, 1.0)},
		offset:	{type: "f", value: 20},
		exponent: {type: "f", value: 0.4}
	}
	uniforms.topColor.value.copy(this.hemisphere.color)

	// Sky
	var geometry = new THREE.SphereBufferGeometry(1000, 16, 16)
	var material = new THREE.ShaderMaterial({vertexShader: vertex, fragmentShader: fragment, uniforms: uniforms, side: THREE.BackSide})

    /**
     * Sky mesh with material shader to calculate dinamically sky colour
     * @property sky
     * @type {Mesh}
     */
	this.sky = new THREE.Mesh(geometry, material)
	this.sky.hidden = true
	this.sky.rotationAutoUpdate = false
	this.sky.matrixAutoUpdate = false
	this.add(this.sky)

	// Override sky raycast function
	this.sky.raycast = function() {
		return null;
	}

    /**
     * If set to true, the sky auto updates its time
     * @property autoUpdate
     * @default true
     * @type {Boolean}
     */
	this.autoUpdate = (autoUpdate !== undefined) ? autoUpdate : true

    /**
     * Sun distance
     * @property sunDistance
     * @type {Number}
     */
	this.sunDistance = (sunDistance !== undefined) ? sunDistance : 100

    /**
     * Day time (in seconds)
     * @property dayTime
     * @type {number}
     */
	this.dayTime = (dayTime !== undefined) ? dayTime : 120

    /**
     * Current day time (in seconds)
     * @property time
     * @type {Number}
     */
	this.time = (time !== undefined) ? time : 75

	this.updateSky()

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
    this.defaultComponents.push(new SkyComponent())
}

Sky.prototype = Object.create(THREE.Object3D.prototype)

/**
 * Initialize sky object
 * Called automatically by the runtime handler (Editor / App)
 * @method initialize
 */
Sky.prototype.initialize = function()
{
	this.updateSky()
	
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize()
	}
}

/**
 * Update sky state
 * Called automatically by the runtime handler (Editor / App)
 * @method update
 */
Sky.prototype.update = function()
{
	//Update time
	if(this.autoUpdate)
	{
		this.time += this.clock.getDelta()

		if(this.time > this.dayTime)
		{
			this.time -= this.dayTime
		}

		this.updateSky()
	}

	//Update children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update()
	}
}


/**
 * Update sky state
 * Called automatically by the runtime handler (Editor / App)
 * @method updateSky
 */
Sky.prototype.updateSky = function()
{
	//Time in % of day
	var time = (this.time / this.dayTime)

	//0H - 6H (night)
	if(time < 0.25)
	{
		this.sky.material.uniforms.topColor.value.setRGB(this.colorTop[3].r, this.colorTop[3].g, this.colorTop[3].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(this.colorBottom[3].r, this.colorBottom[3].g, this.colorBottom[3].b)
	}
	//6H - 7H (night to morning)
	else if(time < 0.292)
	{
		var t = (time-0.25) * 23.81
		var f = 1 - t

		this.sky.material.uniforms.topColor.value.setRGB(f*this.colorTop[3].r + t*this.colorTop[0].r, f*this.colorTop[3].g + t*this.colorTop[0].g, f*this.colorTop[3].b + t*this.colorTop[0].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(f*this.colorBottom[3].r + t*this.colorBottom[0].r, f*this.colorBottom[3].g + t*this.colorBottom[0].g, f*this.colorBottom[3].b + t*this.colorBottom[0].b)
	}
	//7H - 10H (morning)
	else if(time < 0.4167)
	{
		this.sky.material.uniforms.topColor.value.setRGB(this.colorCop[0].r, this.colorCop[0].g, this.colorCop[0].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(this.colorBottom[0].r, this.colorBottom[0].g, this.colorBottom[0].b)
	}
	//10H - 12H (morning to noon)
	else if(time < 0.5)
	{
		var t = (time-0.4167) * 12
		var f = 1 - t

		this.sky.material.uniforms.topColor.value.setRGB(f*this.colorTop[0].r + t*this.colorTop[1].r, f*this.colorTop[0].g + t*this.colorTop[1].g, f*this.colorTop[0].b + t*this.colorTop[1].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(f*this.colorBottom[0].r + t*this.colorBottom[1].r, f*this.colorBottom[0].g + t*this.colorBottom[1].g, f*this.colorBottom[0].b + t*this.colorBottom[1].b)
	}
	//12H - 17H (noon)
	else if(time < 0.708)
	{
		this.sky.material.uniforms.topColor.value.setRGB(this.colorTop[1].r, this.colorTop[1].g, this.colorTop[1].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(this.colorBottom[1].r, this.colorBottom[1].g, this.colorBottom[1].b)
	}
	//17H -> 18h (noon to afternoon)
	else if(time < 0.75)
	{
		var t = (time-0.708) * 23.81
		var f = 1 - t

		this.sky.material.uniforms.topColor.value.setRGB(f*this.colorTop[1].r + t*this.colorTop[2].r, f*this.colorTop[1].g + t*this.colorTop[2].g, f*this.colorTop[1].b + t*this.colorTop[2].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(f*this.colorBottom[1].r + t*this.colorBottom[2].r, f*this.colorBottom[1].g + t*this.colorBottom[2].g, f*this.colorBottom[1].b + t*this.colorBottom[2].b)
	}
	//18H -> 20H (afternoon to night)
	else if(time < 0.8333)
	{
		var t = (time-0.75) * 12.048
		var f = 1 - t

		this.sky.material.uniforms.topColor.value.setRGB(f*this.colorTop[2].r + t*this.colorTop[3].r, f*this.colorTop[2].g + t*this.colorTop[3].g, f*this.colorTop[2].b + t*this.colorTop[3].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(f*this.colorBottom[2].r + t*this.colorBottom[3].r, f*this.colorBottom[2].g + t*this.colorBottom[3].g, f*this.colorBottom[2].b + t*this.colorBottom[3].b)
	}
	//20H -> 24H (night)
	else
	{
		this.sky.material.uniforms.topColor.value.setRGB(this.colorTop[3].r, this.colorTop[3].g, this.colorTop[3].b)
		this.sky.material.uniforms.bottomColor.value.setRGB(this.colorBottom[3].r, this.colorBottom[3].g, this.colorBottom[3].b)
	}

	//Sun / moon color
	if(time < 0.20)
	{
		this.sun.color.setHex(this.moonColor)
	}
	else if(time < 0.30)
	{
		var t = (time-0.20) * 10
		var f = 1 - t

		if(t < 0.5)
		{
			var f = 2 - t*2
			this.sun.intensity = f * 0.3
			this.sun.color.setHex(this.moonColor)
		}
		else
		{
			t = t*2
			this.sun.intensity = t * 0.3
			this.sun.color.setHex(Sky.sunColor)
		}
	}
	else if(time < 0.70)
	{
		this.sun.color.setHex(Sky.sunColor)
	}
	else if(time < 0.80)
	{
		var t = (time - 0.70) * 10
		
		if(t < 0.5)
		{
			var f = 2 - t*2
			this.sun.intensity = f * 0.3
			this.sun.color.setHex(Sky.sunColor)
		}
		else
		{
			t = t*2
			this.sun.intensity = t * 0.3
			this.sun.color.setHex(this.moonColor)
		}
	}
	else
	{
		this.sun.color.setHex(this.moonColor)
	}

	//Update sun position
	var rotation = (MathUtils.pi2 * time) - MathUtils.pid2
	if(time > 0.25 && time < 0.75)
	{
		this.sun.position.x = this.sunDistance * Math.cos(rotation)
		this.sun.position.y = this.sunDistance * Math.sin(rotation)
	}
	else
	{
		this.sun.position.x = this.sunDistance * Math.cos(rotation + Math.PI)
		this.sun.position.y = this.sunDistance * Math.sin(rotation + Math.PI);
	}
}

/**
 * Create JSON for object
 * @param {Object} meta
 * @method toJSON
 * @return {Object} json
 */
Sky.prototype.toJSON = function(meta)
{
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)
	
	data.object.autoUpdate = this.autoUpdate
	data.object.sunDistance = this.sunDistance
	data.object.dayTime = this.dayTime
	data.object.time = this.time

	data.object.sun = {}
	data.object.sun.shadow = this.sun.shadow.toJSON()

	return data
}
