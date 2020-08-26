/**
 * BlockScripts are used to code in a graphic way
 * This could be imagined as some kind of ue4 blueprints
 * @class BlockScript
 * @extends {Object3D}
 * @param {Object} nodes
 * @module Script
 */
function BlockScript(nodes, uuid, objType)
{
	THREE.Object3D.call(this);
	
	this.type = "BlockScript";
	this.name = "blocks";
	this.objUuid = (uuid !== undefined) ? uuid : this.uuid
	this.blocksType = (objType !== undefined) ? objType : "scene"

	this.path = "/"

    /**
     * The current nodes of this block class
     * @property nodes
     * @type {Object}
     */
	this.nodes = {
		config: {
			blocks: "Blocks",
			type: this.blocksType,
			uuid: this.objUuid
		},
		extra: {},
		groups: {},
		last_link_id: 0,
		last_node_id: 0,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				mode: 0,
				order: 0,
				outputs: [
					{
						name: "",
						type: -1,
						links: null,
						...NodesHelper.slots.output.passer,
					},
					{
						name: "",
						type: -1,
						links: null,
					}
				],
				pos: [100, 100],
				properties: {},
				size: [120, 46],
				type: "Events/BeginPlay"
			},
			{
				flags: {},
				id: 2,
				inputs: [],
				mode: 0,
				order: 1,
				outputs: [
					{
						name: "",
						type: -1,
						links: null,
						...NodesHelper.slots.output.passer
					}
				],
				pos: [100, 200],
				properties: {},
				size: [120, 46],
				type: "Events/EventTick"
			}
		],
		version: 0.4
	}

	// Data
	if (nodes !== undefined) {
		this.nodes = nodes
	}

    /**
     * The nodes graph (used for serialising and running the nodes)
     * @property graph
     * @type {LGraph}
     */
	this.graph = null

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
}

BlockScript.prototype = Object.create(THREE.Object3D.prototype);

/**
 * Initialise this class and triggers every node in the graph that supports onStart
 * @method initialize
 */
BlockScript.prototype.initialize = function()
{
	var self = this
	this.graph = new LGraph(this.nodes)

	if (this.graph.config.type === "scene") {
        this.graph.config.scene = ObjectUtils.getScene(this)
		this.graph.config.self = this
	} else if(this.graph.config.type === "class") {
		var scene = (Editor.programRunning !== undefined && Editor.programRunning !== null) ? Editor.programRunning.scene : Main.program.scene
		this.graph.config.scene = scene

		scene.traverse((child) => {
			if (child.objUuid !== undefined && child.objUuid === self.uuid) {
				self.graph.config.self = child
			}
		})
	}

    if(this.graph.config.scene !== undefined && this.graph.config.scene.parent instanceof Program) {
        this.graph.config.program = this.graph.config.scene.parent
    }

	this.graph.runStep(1)
    this.graph.start()
	//setTimeout(() => {self.graph.start()}, 100)
	
	//Initialize children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

/**
 * Disposes the object and stops the execution of the graph
 * @method dispose
 */
BlockScript.prototype.dispose = function() {

	if(this.graph !== null) {
		this.graph.sendEventToAllNodes("onDispose")
		this.graph.stop()

		this.nodes.extra = {}
	}

	// Dispose children
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].dispose()
	}
}

// Set path
BlockScript.prototype.setPath = function(path) {
    if(path !== undefined) {
        this.path = path
    }
}

/**
 * Update the current nodes
 * @param {Object} nodes
 * @method updateNodes
 */
BlockScript.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

/**
 * Create JSON for the blocks
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
BlockScript.prototype.toJSON = function(meta) {
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)

	delete this.nodes.config.self
	delete this.nodes.config.scene

	data.object.nodes = this.nodes
	data.object.path = this.path

	return data
}
