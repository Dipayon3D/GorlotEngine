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
	registerMaterialNodes()
	registerArray()
	registerWidgets()
	registerColour()
    registerUtilsNodes()
}

Register.registerParticlesNodes = function() {
	registerParticlesNodes()
	registerArray()
	registerWidgets()
	registerColour()
    registerUtilsNodes()
}

Register.registerTextureNodes = function() {
    registerTextureNodes()
	registerVectorNode()
    registerUtilsNodes()
}

Register.unregisterAll = function() {
	LiteGraph.registered_node_types = {}
	LiteGraph.Nodes = {}
}

Register.registerAll = function() {	
	Register.registerBlocksNodes()
	Register.registerMaterialNodes()
	Register.registerParticlesNodes()
    Register.registerTextureNodes()
}
