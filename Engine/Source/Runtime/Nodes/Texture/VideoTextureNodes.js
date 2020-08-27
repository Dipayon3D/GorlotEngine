function VolumeNode() {
    this.addInput("", "texture")
    this.addOutput("", "texture")

    this.properties = { value: 1.0 }

    this.serialize_widgets = true
}
VolumeNode.title = "Volume"
VolumeNode.prototype.onAdded = function() {
    var self = this
    this.widget = this.addWidget("slider", "Volume", this.graph.extra.texture.volume, (v) => { self.properties.value = v }, { property: "value", min: 0, max: 1.0, text: "Volume" })
}
VolumeNode.prototype.onPropertyChanged = function(n, v) {
    if(n === "value")
        this.graph.extra.texture.setVolume(v)

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function PlaybackRateNode() {
    this.addInput("", "texture")
    this.addOutput("", "texture")

    this.properties = { value: 1 }
    this.serialize_widgets = true
}
PlaybackRateNode.title = "Playback Rate"
PlaybackRateNode.prototype.onAdded = function() {
    this.widget = this.addWidget("number", "Rate", this.graph.extra.texture.playbackRate, "value")
}
PlaybackRateNode.prototype.onPropertyChanged = function(n, v) {
    if(n === "value")
        this.graph.extra.texture.setPlaybackRate(v)

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function AutoplayNode() {
    this.addInput("", "texture")
    this.addOutput("", "texture")

    this.addProperty("value", true)
}
AutoplayNode.title = "Autoplay"
AutoplayNode.prototype.onAdded = function() {
    this.widget = this.addWidget("toggle", "Autoplay?", this.graph.extra.texture.autoplay, "value")
}
AutoplayNode.prototype.onPropertyChanged = function(n, v) {
    if(n === "value")
        this.graph.extra.texture.autoplay = v

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function LoopNode() {
    this.addInput("", "texture")
    this.addOutput("", "texture")

    this.addProperty("value", true)
}
LoopNode.title = "Loop"
LoopNode.prototype.onAdded = function() {
    this.widget = this.addWidget("toggle", "Loop?", this.graph.extra.texture.loop, "value")
}
LoopNode.prototype.onPropertyChanged = function(n, v) {
    if(n === "value")
        this.graph.extra.texture.setLoop(v)

    if(this.graph && this.graph.onNodeConnectionChange)
        this.graph.onNodeConnectionChange()
}

function registerVideoTextureNodes() {
    LiteGraph.registerNodeType("Video/Volume", VolumeNode)
    LiteGraph.registerNodeType("Video/Rate", PlaybackRateNode)
    LiteGraph.registerNodeType("Video/Autoplay", AutoplayNode)
    LiteGraph.registerNodeType("Video/Loop", LoopNode)
}
