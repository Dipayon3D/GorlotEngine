"use strict"

// Resource manager is used to keep a list of resources
function ResourceManager() {
    // Global resource list
    this.materials = []
    this.textures = []
    this.geometries = []
    this.asset_objects = []
    this.folders = []
    
    this.images = []
    this.videos = []
    this.audio = []
    this.fonts = []

    this.files = []
}

// TODO: This
