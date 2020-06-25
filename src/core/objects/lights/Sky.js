class Sky extends THREE.Mesh {
	constructor(auto_update, day_time, sun_distance) {
		super()

		// Hemisphere
		this.hemisphere = new HemisphereLight(0xffffff, 0xffffff, 0.3)
		this.hemisphere.color.setHSL(0.6, 1, 0.6)
		this.hemisphere.groundColor.setHSL(0.095, 1, 0.75)
		this.hemisphere.position.set(0, 500, 0)
		this.hemisphere.name = "horizon"

		// Sky geometry and material
		var vertex = App.readFile("data/shaders/sky_vertex.glsl")
		var fragment = App.readFile("data/shaders/sky_fragment.glsl")
		var uniforms = {
			top_color: {type: "c", value: new THREE.Color(0.0, 0.46, 1.0)},
			bottom_color: {type: "c", value: new THREE.Color(1.0, 1.0, 1.0)},
			offset: {type: "f", value: 20},
			exponent: {type: "f", value: 0.4}
		}
		uniforms.top_color.value.copy(this.hemisphere.color)

		// Sky
		var geometry = new THREE.SphereGeometry(4000, 32, 15)
		var material = new THREE.ShaderMaterial({vertexShader: vertex, fragmentShader: fragment, uniforms: uniforms, side: THREE.BackSide})

		// Set the sky geometry and material to the Mesh
		this.geometry = geometry
		this.material = material

		// Name and type
		this.name = "sky"
		this.type = "Sky"

		// Sun
		this.sun = new DirectionalLight(0xffffaa, 0.3)
		this.sun.castShadow = true
		this.sun.name = "sun"
		this.add(this.sun)

		// Add Hemisphere
		this.add(this.hemisphere)

		// Day Time and sun control
		this.sun_distance = 100
		this.auto_update = true
		this.day_time = 20
		this.time = 13

		if (auto_update !== undefined) {
			this.auto_update = auto_update
		}
		if (day_time !== undefined) {
			this.day_time = day_time
		}
		if (sun_distance !== undefined) {
			this.sun_distance = sun_distance
		}

		this.updateSky()

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
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {


		//Update time
		if(this.auto_update)
		{
			this.time += App.delta_time / 1000;
			if(this.time > this.day_time)
			{
				this.time -= this.day_time;
			}
	
			this.updateSky();
		}


		// Update children
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update) {
				this.children[i].update
			}
		}
	}

	updateSky() {
		//Time in % of day
		var time = (this.time / this.day_time);
	
		//0H - 6H (night)
		if(time < 0.25)
		{
			this.material.uniforms.top_color.value.setRGB(Sky.color_top[3].r, Sky.color_top[3].g, Sky.color_top[3].b);
			this.material.uniforms.bottom_color.value.setRGB(Sky.color_bottom[3].r, Sky.color_bottom[3].g, Sky.color_bottom[3].b);
		}
		//6H - 7H (night to morning)
		else if(time < 0.292)
		{
			var t = (time-0.25) * 23.81;
			var f = 1 - t;
	
			this.material.uniforms.top_color.value.setRGB(f*Sky.color_top[3].r + t*Sky.color_top[0].r, f*Sky.color_top[3].g + t*Sky.color_top[0].g, f*Sky.color_top[3].b + t*Sky.color_top[0].b);
			this.material.uniforms.bottom_color.value.setRGB(f*Sky.color_bottom[3].r + t*Sky.color_bottom[0].r, f*Sky.color_bottom[3].g + t*Sky.color_bottom[0].g, f*Sky.color_bottom[3].b + t*Sky.color_bottom[0].b);
		}
		//7H - 10H (morning)
		else if(time < 0.4167)
		{
			this.material.uniforms.top_color.value.setRGB(Sky.color_top[0].r, Sky.color_top[0].g, Sky.color_top[0].b);
			this.material.uniforms.bottom_color.value.setRGB(Sky.color_bottom[0].r, Sky.color_bottom[0].g, Sky.color_bottom[0].b);
		}
		//10H - 12H (morning to noon)
		else if(time < 0.5)
		{
			var t = (time-0.4167) * 12;
			var f = 1 - t;
	
			this.material.uniforms.top_color.value.setRGB(f*Sky.color_top[0].r + t*Sky.color_top[1].r, f*Sky.color_top[0].g + t*Sky.color_top[1].g, f*Sky.color_top[0].b + t*Sky.color_top[1].b);
			this.material.uniforms.bottom_color.value.setRGB(f*Sky.color_bottom[0].r + t*Sky.color_bottom[1].r, f*Sky.color_bottom[0].g + t*Sky.color_bottom[1].g, f*Sky.color_bottom[0].b + t*Sky.color_bottom[1].b);
		}
		//12H - 17H (noon)
		else if(time < 0.708)
		{
			this.material.uniforms.top_color.value.setRGB(Sky.color_top[1].r, Sky.color_top[1].g, Sky.color_top[1].b);
			this.material.uniforms.bottom_color.value.setRGB(Sky.color_bottom[1].r, Sky.color_bottom[1].g, Sky.color_bottom[1].b);
		}
		//17H -> 19h (noon to afternoon)
		else if(time < 0.792)
		{
			var t = (time-0.708) * 11.90476;
			var f = 1 - t;
	
			this.material.uniforms.top_color.value.setRGB(f*Sky.color_top[1].r + t*Sky.color_top[2].r, f*Sky.color_top[1].g + t*Sky.color_top[2].g, f*Sky.color_top[1].b + t*Sky.color_top[2].b);
			this.material.uniforms.bottom_color.value.setRGB(f*Sky.color_bottom[1].r + t*Sky.color_bottom[2].r, f*Sky.color_bottom[1].g + t*Sky.color_bottom[2].g, f*Sky.color_bottom[1].b + t*Sky.color_bottom[2].b);
		}
		//19H -> 21H (afternoon to night)
		else if(time < 0.875)
		{
			var t = (time-0.792) * 12.048;
			var f = 1 - t;
	
			this.material.uniforms.top_color.value.setRGB(f*Sky.color_top[2].r + t*Sky.color_top[3].r, f*Sky.color_top[2].g + t*Sky.color_top[3].g, f*Sky.color_top[2].b + t*Sky.color_top[3].b);
			this.material.uniforms.bottom_color.value.setRGB(f*Sky.color_bottom[2].r + t*Sky.color_bottom[3].r, f*Sky.color_bottom[2].g + t*Sky.color_bottom[3].g, f*Sky.color_bottom[2].b + t*Sky.color_bottom[3].b);
		}
		//21H -> 24H (night)
		else
		{
			this.material.uniforms.top_color.value.setRGB(Sky.color_top[3].r, Sky.color_top[3].g, Sky.color_top[3].b);
			this.material.uniforms.bottom_color.value.setRGB(Sky.color_bottom[3].r, Sky.color_bottom[3].g, Sky.color_bottom[3].b);
		}
	
		//Update sun position
		var rotation = (Sky.pi2 * time) - Sky.pid2;
		this.sun.position.x = this.sun_distance * Math.cos(rotation);
		this.sun.position.y = this.sun_distance * Math.sin(rotation);
	}

	toJSON(meta) {
		var isRootObject = (meta === undefined)
		var output = {}

		// If root object initialize base structure
		if (isRootObject) {
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			}

			output.metadata = {
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			}
		}

		// Object serialization
		var object = {}
		object.uuid = this.uuid
		object.type = this.type

		// Sky specific data
		object.auto_update = this.auto_update
		object.day_time = this.day_time
		object.sun_distance = this.sun_distance
		object.components = this.components

		if (this.name !== '') {
			object.name = this.name
		}
		if (JSON.stringify(this.userData) !== '{}') {
			object.userData = this.userData
		}

		object.castShadow = (this.castShadow === true)
		object.receiveShadow = (this.receiveShadow === true)
		object.visible = !(this.visible === false)

		object.matrix = this.matrix.toArray()

		if (this.geometry !== undefined) {
			if (meta.geometries[this.geometry.uuid] === undefined) {
				meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta)
			}

			object.geometry = this.geometry.uuid
		}

		if (this.material !== undefined) {
			if (meta.materials[this.material.uuid] === undefined) {
				meta.materials[this.material.uuid] = this.material.toJSON(meta)
			}

			object.material = this.material.uuid
		}

		// Collect children data
		if (this.children.length > 2) {
			object.children = []

			for(var i = 2; i < this.children.length; i++) {
				object.children.push(this.children[i].toJSON(meta).object)
			}
		}

		if (isRootObject) {
			var geometries = extractFromCache( meta.geometries );
			var materials = extractFromCache( meta.materials );
			var textures = extractFromCache( meta.textures );
			var images = extractFromCache( meta.images );

			if(geometries.length > 0)
			{
				output.geometries = geometries;
			}
			if(materials.length > 0)
			{
				output.materials = materials;
			}
			if(textures.length > 0)
			{
				output.textures = textures;
			}
			if(images.length > 0)
			{
				output.images = images;
			}
		}

		output.object = object
		return output

		// Extract data from the cache hash, remove metadata on each item and return as array
		function extractFromCache(cache) {
		 	var values = []
		 	for(var key in cache) {
		 		var data = cache[key]
		 		delete data.metadata
		 		values.push(data)
		 	}

		 	return values
		 } 
	}
}

// Auxiliar Values
Sky.pi2 = Math.PI * 2
Sky.pid2 = Math.PI / 2

//Sky color (morning, noon, afternoon, nigh)
Sky.color_top = [new THREE.Color(0x77b3fb), new THREE.Color(0x0076ff), new THREE.Color(0x035bb6), new THREE.Color(0x002439)];
Sky.color_bottom = [new THREE.Color(0xebece6), new THREE.Color(0xffffff), new THREE.Color(0xfee7d7), new THREE.Color(0x0065a7)];