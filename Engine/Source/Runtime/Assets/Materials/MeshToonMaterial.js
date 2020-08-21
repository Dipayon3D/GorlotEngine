function MeshToonMaterial(options) {
    THREE.MeshToonMaterial.call(this, options)

    this.path = "/"
}

MeshToonMaterial.prototype = Object.create(THREE.MeshToonMaterial.prototype)

MeshToonMaterial.prototype.toJSON = function(meta) {
    var data = THREE.Material.prototype.toJSON.call(this, meta)

    data.nodes = this.nodes
    data.path = this.path

    return data
}
