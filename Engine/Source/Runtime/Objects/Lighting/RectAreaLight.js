"use strict"

function RectAreaLight(color, intensity, width, height) {
    THREE.RectAreaLight.call(this, color, intensity, width, height)

    this.name = "rectarea light"

    this.components = []
    this.defaultComponents = []

    this.defaultComponents.push(new ElementComponent())
    this.defaultComponents.push(new ObjectComponent())
    this.defaultComponents.push(new LightComponent())
}

RectAreaLight.prototype = Object.create(THREE.RectAreaLight.prototype)

RectAreaLight.prototype.toJSON = function(meta) {
    var data = THREE.Light.prototype.toJSON.call(this, meta)

    data.object.width = this.width
    data.object.height = this.height

    return data
}
