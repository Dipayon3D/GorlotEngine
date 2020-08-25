function TextureNode() {
    this.addOutput("", "texture")
    this.resizable = false
}
TextureNode.title = "Texture"
TextureNode.collapsable = true
TextureNode.skip_list = true
TextureNode.prototype.onStart = function() {
    this.texture = this.graph.extra.texture
    this.alpha = this.graph.extra.alpha

    this.setOutputData(0, this.graph.extra.texture)
}

function TexturePreviewNode() {
    this.addInput("", "texture")
    this.resizable = false
}
TexturePreviewNode.title = "Preview"
TexturePreviewNode.prototype.onDrawBackground = function(ctx) {
    if(this.isInputConnected(0)) {
        if(this.getInputData(0) !== undefined) {
            this.texture = this.getInputData(0)
        } else {
            this.texture = this.graph.extra.texture
        }

        this.alpha = this.graph.extra.alpha

        ctx.drawImage(this.alpha.image, 15, 30, 100, 100)
        ctx.drawImage(this.texture.image, 25, 40, 80, 80)

        this.size = [130, 140]
    } else {
        if(this.size[1] > 26) {
            this.size = [140, 26]
        }
    }
}

function WrapHorNode() {
    this.addInput("", "texture")
    this.resizable = false

    this.serialize_widgets = true
    this.properties = {wrap: THREE.RepeatWrapping, wraps: "Clamp To Edge;Repeat;Repeat Mirrored", wrapString: "", added: false}

    this.wrap = ""
    this.wraps = this.properties.wraps.split(";")
}
WrapHorNode.title = "Wrap Hor"
WrapHorNode.prototype.onAdded = function() {
    var self = this

    setTimeout(() => {
        if(self.properties.added === true && self.combo === undefined) 
            self.checkConnection()
    }, 100)
}
WrapHorNode.prototype.checkConnection = function() {
    if(this.isInputConnected(0)) {
        if(this.getInputData(0) !== undefined) {
            this.texture = this.getInputData(0)
        } else {
            this.texture = this.graph.extra.texture
        }

        this.properties.added = true

        this.addCombo()
    } else {
        if(this.size[1] > 26) {
            this.size = [140, 26]
            this.combo = undefined
            this.widgets = []

            this.removeOutput(0)
            this.properties.added = false
        }
    }

    if(this.outputs.length > 0) {
        for(var i = 1; i < this.outputs.length; i++) {
            this.removeOutput(i)
        }
    }
}
WrapHorNode.prototype.connectionChange = function() {
    this.checkConnection()
}
WrapHorNode.prototype.addCombo = function() {
    if(this.combo === undefined && this.properties.added) {
        var self = this

        this.properties.wrap = this.texture.wrapS

        if(this.properties.wrap === THREE.ClampToEdgeWrapping)
            this.wrap = "Clamp to Edge"
        else if(this.properties.wrap === THREE.RepeatWrapping)
            this.wrap = "Repeat"
        else if(this.properties.wrap === THREE.MirroredRepeatWrapping)
            this.wrap = "Repeat Mirrored"

        this.combo = this.addWidget("combo", "Wrap", this.wrap, (v) => {self.properties.wrapString = v}, { values: this.wraps, property: "wrapString" })
        this.combo.width = 200

        this.addOutput("", "texture")
        this.setOutputData(0, this.texture)

        this.size = [200, 50]
    }
}
WrapHorNode.prototype.onPropertyChanged = function(name, value) {
    if(this.texture === undefined)
        return

    if(name === "wrapString")
        if(value === "Clamp To Edge")
            this.texture.wrapS = THREE.ClampToEdgeWrapping
        else if(value === "Repeat")
            this.texture.wrapS = THREE.RepeatWrapping
        else if(value === "Repeat Mirrored")
            this.texture.wrapS = THREE.MirroredRepeatWrapping

    if(this.graph.onNodeConnectionChange !== undefined)
        this.graph.onNodeConnectionChange()
}

function WrapVertNode() {
    this.addInput("", "texture")
    this.resizable = false

    this.serialize_widgets = true
    this.properties = {wrap: THREE.RepeatWrapping, wraps: "Clamp To Edge;Repeat;Repeat Mirrored", wrapString: "", added: false}

    this.wrap = ""
    this.wraps = this.properties.wraps.split(";")
}
WrapVertNode.title = "Wrap Vert"
WrapVertNode.prototype.onAdded = function() {
    var self = this

    setTimeout(() => {
        if(self.properties.added === true && self.combo === undefined) 
            self.checkConnection()
    }, 100)
}
WrapVertNode.prototype.checkConnection = function() {
    if(this.isInputConnected(0)) {
        if(this.getInputData(0) !== undefined) {
            this.texture = this.getInputData(0)
        } else {
            this.texture = this.graph.extra.texture
        }

        this.properties.added = true

        this.addCombo()
    } else {
        if(this.size[1] > 26) {
            this.size = [140, 26]
            this.combo = undefined
            this.widgets = []

            this.removeOutput(0)
            this.properties.added = false
        }
    }

    if(this.outputs.length > 0) {
        for(var i = 1; i < this.outputs.length; i++) {
            this.removeOutput(i)
        }
    }
}
WrapVertNode.prototype.connectionChange = function() {
    this.checkConnection()
}
WrapVertNode.prototype.addCombo = function() {
    if(this.combo === undefined && this.properties.added) {
        var self = this

        this.properties.wrap = this.texture.wrapT

        if(this.properties.wrap === THREE.ClampToEdgeWrapping)
            this.wrap = "Clamp to Edge"
        else if(this.properties.wrap === THREE.RepeatWrapping)
            this.wrap = "Repeat"
        else if(this.properties.wrap === THREE.MirroredRepeatWrapping)
            this.wrap = "Repeat Mirrored"

        this.combo = this.addWidget("combo", "Wrap", this.wrap, (v) => {self.properties.wrapString = v}, { values: this.wraps, property: "wrapString" })
        this.combo.width = 200

        this.addOutput("", "texture")
        this.setOutputData(0, this.texture)

        this.size = [200, 50]
    }
}
WrapVertNode.prototype.onPropertyChanged = function(name, value) {
    if(this.texture === undefined)
        return

    if(name === "wrapString")
        if(value === "Clamp To Edge")
            this.texture.wrapT = THREE.ClampToEdgeWrapping
        else if(value === "Repeat")
            this.texture.wrapT = THREE.RepeatWrapping
        else if(value === "Repeat Mirrored")
            this.texture.wrapT = THREE.MirroredRepeatWrapping

    if(this.graph.onNodeConnectionChange !== undefined)
        this.graph.onNodeConnectionChange()
}

function RepeatNode() {
    this.addInput("", "texture")
    this.addInput("Value", "vector")

    this.addOutput("", "texture")

    this.resizable = false
}
RepeatNode.title = "Repeat"
RepeatNode.prototype.onExecute = function() {
    this.texture = (this.getInputData(0) !== undefined) ? this.getInputData(0) : this.graph.extra.texture
    this.repeat = (this.getInputData(1) !== undefined) ? this.getInputData(1) : new THREE.Vector2(1, 1)

    this.texture.repeat.set(this.repeat.x, this.repeat.y)
    this.setOutputData(0, this.texture)
}

function MinFilterNode() {
    this.addInput("", "texture")
    this.resizable = false

    this.serialize_widgets = true
    this.properties = { filter: THREE.NearestFilter, filters: "Nearest;Linear;Nearest Nearest;Nearest Linear;Linear Nearest;Linear Linear", filterString: "", added: false }

    this.filter = ""
    this.filters = this.properties.filters.split(";")
}
MinFilterNode.title = "Min. Filter"
MinFilterNode.prototype.onAdded = function() {
    var self = this

    setTimeout(() => {
        if(self.properties.added === true && self.combo === undefined)
            self.checkConnection()
    }, 100)
}
MinFilterNode.prototype.checkConnection = function() {
    if(this.isInputConnected(0)) {
        if(this.getInputData(0) !== undefined) {
            this.texture = this.getInputData(0)
        } else {
            this.texture = this.graph.extra.texture
        }
        
        this.properties.added = true

        this.addCombo()
    } else {
        if(this.size[1] > 26) {
            this.size = [140, 26]
            this.combo = undefined
            this.widgets = []

            this.removeOutput(0)
            this.properties.added = false
        }
    }

    if(this.outputs.length > 0) {
        for(var i = 1; i < this.outputs.length; i++) {
            this.removeOutput(i)
        }
    }
}
MinFilterNode.prototype.connectionChange = function() {
    this.checkConnection()
}
MinFilterNode.prototype.addCombo = function() {
    if(this.combo === undefined && this.properties.added) {
        var self = this

        this.properties.filter = this.texture.minFilter

        if(this.properties.filter === THREE.NearestFilter)
            this.filter = "Nearest"
        else if(this.properties.filter === THREE.LinearFilter)
            this.filter = "Linear"
        else if(this.properties.filter === THREE.NearestMipMapNearestFilter)
            this.filter = "Nearest Nearest"
        else if(this.properties.filter === THREE.NearestMipMapLinearFilter)
            this.filter = "Nearest Linear"
        else if(this.properties.filter === THREE.LinearMipMapNearestFilter)
            this.filter = "Linear Nearest"
        else if(this.properties.filter === THREE.LinearMipMapLinearFilter)
            this.filter = "Linear Linear"

        this.combo = this.addWidget("combo", "Filter", this.filter, (v) => {self.properties.filterString = v}, { values: this.filters, property: "filterString" })
        this.combo.width = 220

        this.addOutput("", "texture")
        this.setOutputData(0, this.texture)

        this.size = [240, 50]
    }
}
MinFilterNode.prototype.onPropertyChanged = function(name, value) {
    if(this.texture === undefined)
        return

    if(name === "filterString")
        if(value === "Nearest")
            this.texture.minFilter = THREE.NearestFilter
        else if(value === "Linear")
            this.texture.minFilter = THREE.LinearFilter
        else if(value === "Nearest Nearest")
            this.texture.minFilter = THREE.NearestMipMapNearestFilter
        else if(value === "Nearest Linear")
            this.texture.minFilter = THREE.NearestMipMapLinearFilter
        else if(value === "Linear Nearest")
            this.texture.minFilter = THREE.LinearMipMapNearestFilter
        else if(value === "Linear Linear")
            this.texture.minFilter = THREE.LinearMipMapLinearFilter

    if(this.graph.onNodeConnectionChange !== undefined)
        this.graph.onNodeConnectionChange()
}

function MagFilterNode() {
    this.addInput("", "texture")
    this.resizable = false

    this.serialize_widgets = true
    this.properties = {filter: THREE.NearestFilter, filters: "Nearest;Linear", filterString: "", added: false}
    
    this.filter = ""
    this.filters = this.properties.filters.split(";")
}
MagFilterNode.title = "Mag. Filter"
MagFilterNode.prototype.onAdded = function() {
    var self = this

    setTimeout(() => {
        if(self.properties.added === true && self.combo === undefined)
            self.checkConnection()
    }, 100)
}
MagFilterNode.prototype.checkConnection = function() {
    if(this.isInputConnected(0)){
        if(this.getInputData(0) !== undefined) {
            this.texture = this.getInputData(0)
        } else {
            this.texture = this.graph.extra.texture
        }

        this.properties.added = true

        this.addCombo()
    } else {
        if(this.size[1] > 26) {
            this.size = [140, 26]
            this.combo = undefined
            this.widgets = []

            this.removeOutput(0)
            this.properties.added = false
        }
    }

    if(this.outputs.length > 0) {
        for(var i = 0; i < this.outputs.length; i++) {
            this.removeOutput(i)
        }
    }
}
MagFilterNode.prototype.connectionChange = function() {
    this.checkConnection()
}
MagFilterNode.prototype.addCombo = function() {
    if(this.combo === undefined && this.properties.added) {
        var self = this

        this.properties.filter = this.texture.magFilter

        if(this.properties.filter === THREE.NearestFilter)
            this.filter = "Nearest"
        else if(this.properties.filter === THREE.LinearFilter)
            this.filter = "Linear"

        this.combo = this.addWidget("combo", "Filter", this.filter, (v) => {self.properties.filterString = v}, { values: this.filters, property: "filterString" })
        this.combo.width = 220

        this.addOutput("", "texture")
        this.setOutputData(0, this.texture)

        this.size = [240, 50]
    }
}
MagFilterNode.prototype.onPropertyChanged = function(name, value) {
    if(this.texture === undefined)
        return

    if(name === "filterString")
        if(value === "Nearest")
            this.texture.magFilter = THREE.NearestFilter
        else if(value === "Linear")
            this.texture.magFilter = THREE.LinearFilter

    if(this.graph.onNodeConnectionChange !== undefined)
        this.graph.onNodeConnectionChange()
}

function FlipYNode() {
    this.addInput("", "texture")
    this.serialize_widgets = true

    this.properties = {flip: true}

    this.flip = this.addWidget("toggle", "Flip?", this.properties.flip, {property: "flip"})
}
FlipYNode.title = "Flip Y"
FlipYNode.prototype.onPropertyChanged = function(name, value) {
    if(this.isInputConnected(0) && this.getInputData(0) !== undefined)
        this.texture = this.getInputData(0)
    else
        this.texture = this.graph.extra.texture

    if(name === "flip")
        this.properties.flip = value

    this.texture.flipY = this.properties.flip

    if(this.graph.onNodeConnectionChange !== undefined)
        this.graph.onNodeConnectionChange()
}

function registerTextureNodes() {
    LiteGraph.registerNodeType("Texture/Texture", TextureNode)
    LiteGraph.registerNodeType("Texture/Preview", TexturePreviewNode)
    LiteGraph.registerNodeType("Texture/WrapHor", WrapHorNode)
    LiteGraph.registerNodeType("Texture/WrapVert", WrapVertNode)
    LiteGraph.registerNodeType("Texture/Repeat", RepeatNode)
    LiteGraph.registerNodeType("Texture/MinFilter", MinFilterNode)
    LiteGraph.registerNodeType("Texture/MagFilter", MagFilterNode)
    LiteGraph.registerNodeType("Texture/FlipY", FlipYNode)
}
