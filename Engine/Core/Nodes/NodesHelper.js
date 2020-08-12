function NodesHelper() {}

NodesHelper.slots = {}
NodesHelper.slots.output = {}
NodesHelper.slots.output.passer = {color_on: "#FFC0CB", color_off: "#FFC0CB", shape: LiteGraph.BOX_SHAPE}

// Functions

// The Slot Menu
NodesHelper.getSlotMenuOptions = function(s, n, e) {
	if (s.output !== undefined) {
		var c = new LiteGraph.ContextMenu([
			{
				title: "Convert to Variable",
				callback: () => {
					var graph = LGraphCanvas.active_canvas.graph
					var canvas = LGraphCanvas.active_canvas

					var node_var = LiteGraph.createNode("Base/Variable")
					node_var.pos = [n.pos[0]+150, n.pos[1]]
					graph.add(node_var)

					n.connect(0, node_var, 0)
					n.connect(s.slot, node_var, 1)
				}
			}
		], {title: s.output.name, event: e})
	}
}
