function MeshShaderMaterial(options) {
	THREE.ShaderMaterial.call(this, options)

	this.nodes = {
		config: {},
		groups: [],
		last_link_id: 0,
		last_node_id: 2,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				mode: 0,
				inputs: [
					{
						name: "Colour",
						type: "Color",
						link: null
					},
					{
						name: "Emissive",
						type: "number",
						link: null
					},
					{
						name: "Reflectivity",
						type: "number",
						link: null
					},
					{
						name: "Shininess",
						type: "number",
						link: null
					},
					{
						name: "Specular",
						type: "Color",
						link: null
					},
					{
						name: "Wireframe",
						type: "Boolean",
						link: null
					}
				],
				outputs: [],
				pos: [208, 140],
				properties: {
					mat: this.uuid
				},
				size: [210, 382],
				type: "Material/MeshPhongMaterial"
			},
			{
				flags: {},
				id: 2,
				inputs: [],
				mode: 0,
				order: 1,
				pos: [502, 141],
				properties: {
					mat: this.uuid
				},
				type: "Material/Shader"
			}
		],
		version: 0.4
	}
}

MeshShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

MeshShaderMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshShaderMaterial.prototype.toJSON = function(meta) {
	var data = THREE.ShaderMaterial.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}