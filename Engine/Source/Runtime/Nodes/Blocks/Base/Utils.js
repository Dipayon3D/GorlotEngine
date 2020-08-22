function ButtonNode() {
    this.addOutput("", LiteGraph.EVENT)
    this.clicked = false
    this.size = [164, 84]
}
ButtonNode.title = "Button"
ButtonNode.font = "Arial"
ButtonNode.prototype.onDrawForeground = function(ctx) {
    if(this.flags.collapsed)
        return

    var margin = 10
    ctx.fillStyle = "black"
    ctx.fillRect(
        margin + 1,
        margin + 1,
        this.size[0] - margin * 2,
        this.size[1] - margin * 2
    )
    ctx.fillStyle = "#AAF"
    ctx.fillRect(
        margin - 1,
        margin - 1,
        this.size[0] - margin * 2,
        this.size[1] - margin * 2
    )
    ctx.fillStyle = this.clicked ? "white" : this.mouseOver ? "#668" : "#334"
    ctx.fillRect(
        margin,
        margin,
        this.size[0] - margin * 2,
        this.size[1] - margin * 2
    )

    ctx.textAlign = "center"
    ctx.fillStyle = this.clicked ? "black" : "white"
    ctx.font = "30px Arial"
    ctx.fillText(
        "Button",
        this.size[0] * 0.5,
        this.size[1] * 0.5 + 30 * 0.3
    )
    ctx.textAlign = "left"
}
ButtonNode.prototype.onMouseDown = function(e, localPos) {
    if(localPos[0] > 1 && localPos[1] > 1 && localPos[0] < this.size[0] - 2 && localPos[1] < this.size[1] - 2) {
        this.clicked = true
        this.triggerSlot(0)
        return true
    }
}
ButtonNode.prototype.onMouseUp = function() {
    this.clicked = false
}

function registerUtilsNodes() {
    LiteGraph.registerNodeType("Utils/Button", ButtonNode)
}
