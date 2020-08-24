"use strict"

/**
 * Resource manager is used to manage available resources used by objects
 * The resource manager is used to extend the Program object, and it's not designed to be used as a standalone
 * The manager is used to manage the following types of resources
 *  - Images
 *  - Videos
 *  - Audio
 *  - Fonts
 *  - Textures
 *  - Materials
 *  - Geometries
 *
 * @class ResourceManager
 * @constructor
 * @module Resources
 */
function ResourceManager() {
    /**
     * Materials
     * @property materials
     * @type {Array}
     */
    this.materials = []

    /**
     * Textures
     * @property textures
     * @type {Array}
     */
    this.textures = []

    /**
     * Geometries
     * @property geometries
     * @type {Array}
     */
    this.geometries = []

    /**
     * Asset objects
     * @property assetObjects
     * @type {Array}
     */
    this.assetObjects = []

    /**
     * Folders
     * @property folders
     * @type {Array}
     */
    this.folders = []
    
    /**
     * Images
     * @property images
     * @type {Array}
     */
    this.images = []

    /**
     * Videos
     * @property videos
     * @type {Array}
     */
    this.videos = []

    /**
     * Audio
     * @property audio
     * @type {Array}
     */
    this.audio = []

    /**
     * Fonts
     * @property fonts
     * @type {Array}
     */
    this.fonts = []
}

/**
 * Get material by its name
 * @method getMaterialByName
 * @param {String} name Material name
 * @return {Material} Material if found, otherwise null
 */
ResourceManager.prototype.getMaterialByName = function(name) {
	for(var i in this.materials.length) {
		if (this.materials[i].name === name) {
			return this.materials[i]
		}
	}

	return null
}

/**
 * Add material to materials list
 * @method addMaterial
 * @param {Material} material Material to be added
 */
ResourceManager.prototype.addMaterial = function(material)
{
	if(material instanceof THREE.Material)
	{
 		this.materials[material.uuid] = material
 	}
}

/**
 * Remove material from materials list, also receives default material used to replace
 * @method removeMaterial
 * @param {Material} material Material to be removed from manager
 * @param {Material} defaultMaterial Default mesh material to replace objects with mesh materials
 * @param {Material} defaultMaterialSprite Default sprite material
 */
ResourceManager.prototype.removeMaterial = function(material, defaultMaterial, defaultMaterialSprite)
{
	if (defaultMaterial === undefined) {
		defaultMaterial = new MeshBasicMaterial()
	}

	if (defaultMaterialSprite === undefined) {
		defaultMaterialSprite = new SpriteMaterial()
	}

	if(material instanceof THREE.Material)
	{
		delete this.materials[material.uuid]
		
		this.traverse(function(child)
		{
			if(child.material !== undefined && child.material.uuid === material.uuid)
			{
				if (child instanceof THREE.Sprite) {
					child.material = defaultMaterialSprite
				} else {
					child.material = defaultMaterial
				}
			}
		});
	}
}

/**
 * Add a texture to texture list
 * @method addTexture
 * @param {Texture} texture
 */
ResourceManager.prototype.addTexture = function(texture)
{
 	this.textures[texture.uuid] = texture
}

/**
 * Get texture by name
 * @method getTextureByName
 * @param {String} name Texture name
 * @return {Texture} texture
 */
ResourceManager.prototype.getTextureByName = function(name) {
	for(var i in this.textures.length) {
		if (this.textures[i].name === name) {
			return this.textures[i]
		}
	}

	return null
}

/**
 * Remove texture from textures list (also receives default used to replace)
 * @method removeTexture
 * @param {Texture} texture
 * @param {Texture} defaultTexture
 * @return {Texture} Texture if found, otherwise null
 */
ResourceManager.prototype.removeTexture = function(texture, defaultTexture) {
	if (defaultTexture === undefined) {
		defaultTexture = new THREE.Texture()
	}

	if (texture instanceof THREE.Texture) {
		delete this.textures[texture.uuid]

		this.traverse((child) => {
			if (child.material !== undefined) {
				var material = child.material

				if (material.map != null && material.map.uuid === texture.uuid) {
					material.map = defaultTexture
					material.needsUpdate = true
				} else if (material.bumpMap != null && material.bumpMap.uuid === texture.uuid) {
					material.bumpMap = defaultTexture
					material.needsUpdate = true
				} else if (material.normalMap != null && material.normalMap.uuid === texture.uuid) {
					material.normalMap = defaultTexture
					material.needsUpdate = true
				} else if (material.displacementMap != null && material.displacementMap.uuid === texture.uuid) {
					material.displacementMap = defaultTexture
					material.needsUpdate = true
				} else if (material.specularMap != null && material.specularMap.uuid === texture.uuid) {
					material.specularMap = defaultTexture
					material.needsUpdate = true
				} else if (material.emissiveMap != null && material.emissiveMap.uuid === texture.uuid) {
					material.emissiveMap = defaultTexture
					material.needsUpdate = true
				} else if (material.alphaMap != null && material.alphaMap.uuid === texture.uuid) {
					material.alphaMap = defaultTexture
					material.needsUpdate = true
				} else if (material.roughnessMap != null && material.roughnessMap === texture.uuid) {
					material.roughnessMap = defaultTexture
					material.needsUpdate = true
				} else if (material.metalnessMap != null && material.metalnessMap) {
					material.metalnessMap = defaultTexture
					material.needsUpdate = true
				}
			} else if (child instanceof ParticleEmitter) {
				if (child.group.texture.uuid === texture.uuid) {
					child.group.texture = defaultTexture
				}
			}
		})
	}
}

/**
 * Get font by name
 * @method getFontByName
 * @param {String} name
 * @return {Font} Font if found, otherwise null
 */
ResourceManager.prototype.getFontByName = function(name) {
    for(var i in this.fonts) {
        if(this.fonts[i],name === name) {
            return this.fonts[i]
        }
    }

    return null
}

/**
 * Add font to fonts list
 * @method addFont
 * @param {Font} font
 */
ResourceManager.prototype.addFont = function(font) {
	if (font instanceof Font) {
		this.fonts[font.uuid] = font
	}
}

/**
 * Remove font from font list
 * @method removeFont
 * @param {Font} font
 * @param {Font} defaultFont
 */
ResourceManager.prototype.removeFont = function(font, defaultFont) {
	if (defaultFont === undefined) {
		defaultFont = new Font()
	}

	if (font instanceof Font) {
		delete this.fonts[font.uuid]

		this.traverse((child) => {
			if (child.font !== undefined && child.font.uuid === font.uuid) {
				child.setFont(defaultFont)
			}
		})
	}
}

/**
 * Get audio by name
 * @method getAudioByName
 * @param {String} name
 * @return {Audio} Audio if found, otherwise null
 */
ResourceManager.prototype.getAudioByName = function(name) {
    for(var i in this.audio) {
        if(this.audio[i].name === name) {
            return this.audio[i]
        }
    }

    return null
}

/**
 * Add audio to audio list
 * @param {Audio} audio
 * @method addAudio
 */
ResourceManager.prototype.addAudio = function(audio) {
	if (audio instanceof Audio) {
		this.audio[audio.uuid] = audio
	}
}

/**
 * Remove audio
 * @param {Audio} audio
 * @param {Audio} defaultAudio
 * @method removeAudio
 */
ResourceManager.prototype.removeAudio = function(audio, defaultAudio) {
    if(defaultAudio === undefined) {
        defaultAudio = new Audio()
    }

    if(audio instanceof Audio) {
        delete this.audio[audio.uuid]

        this.traverse((child) => {
            if(child.audio !== undefined && child.audio.uuid === audio.uuid) {
                // TODO: Set default audio
            }
        })
    }
}

/**
 * Add an object to object list
 * @param {Object} object
 * @method addObject
 */
ResourceManager.prototype.addObject = function(object) {
	this.assetObjects[object.uuid] = object
}

/**
 * Get an object by name
 * @param {String} name
 * @method getAssetObjectByname
 */
ResourceManager.prototype.getAssetObjectByname = function(name) {
	for(var i in this.assetOobjects.length) {
		if (this.assetOobjects[i].name === name) {
			return this.assetOobjects[i]
		}
	}

	return null
} 

/**
 * Remove an asset object
 * @method removeObject
 * @param {Object} object
 */
ResourceManager.prototype.removeObject = function(object) {
	if (object instanceof THREE.Object3D) {
		delete this.assetOobjects[object.uuid]
	}
}

/**
 * Add folder
 * @method addFolder
 * @param {Folder} folder
 */
ResourceManager.prototype.addFolder = function(folder) {
	if(folder instanceof Folder) {
		this.folders[folder.uuid] = folder
	}
}

/**
 * Remove folder
 * @method removeFolder
 * @param {Folder} folder
 */
ResourceManager.prototype.removeFolder = function(folder) {
	if (folder instanceof Folder) {
		delete this.folders[folder.uuid]

		var oldPath = folder.path + folder.name + "/"
        var pathParts = oldPath.split("/")
        pathParts.splice(pathParts.length-2, 1)
        var newPath = pathParts.toString()

        if(newPath === "") {
            newPath = "/"
        } else {
            newPath = pathParts.toString().replace(/,/gi, '/')
        }

		for(var i in this.materials) {
			if (this.materials[i].path === oldPath) {
				this.materials[i].path = newPath
			}
		}

		for(var i in this.textures) {
			if (this.textures[i].path === oldPath) {
				this.textures[i].path = newPath
			}
		}

		for(var i in this.fonts) {
			if (this.fonts[i].path === oldPath) {
				this.fonts[i].path = newPath
			}
		}

		for(var i in this.assetOobjects) {
			if (this.assetOobjects[i].path === oldPath) {
				this.assetOobjects[i].path = newPath
			}
		}

		for(var i in this.audio) {
			if (this.audio[i].path === oldPath) {
				this.audio[i].path = newPath
			}
		}

	}
}

