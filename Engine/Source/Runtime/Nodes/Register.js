function Register() {}

Register.registerBlocksNodes = function() {
	registerBase()
	registerEvents()
	registerArray()
	registerWidgets()
	registerColour()
	registerVectorNode()
	registerObjects()
	registerHierarchy()
	registerKeyboardNodes()
}

Register.registerMaterialNodes = function() {
	registerArray()
	registerWidgets()
	registerColour()
	registerMaterialNodes()
}

Register.registerParticlesNodes = function() {
	registerParticlesNodes()
	registerArray()
	registerWidgets()
	registerColour()
}

Register.registerTextureNodes = function() {

}

Register.unregisterAll = function() {
	LiteGraph.registered_node_types = {}
	LiteGraph.Nodes = {}
}

Register.registerAll = function() {	
	Register.registerBlocksNodes()
	Register.registerMaterialNodes()
	Register.registerParticlesNodes()
}
