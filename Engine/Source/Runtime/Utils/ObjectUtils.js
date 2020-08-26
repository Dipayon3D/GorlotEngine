"use strict";

/**
 * ObjectUtils is a collection of methods to apply operations to Object3D objects
 *
 * @class ObjectUtils
 * @static
 */
function ObjectUtils(){}

/**
 * Gets all fonts in an object and its children
 * 
 * @method getFonts
 * @param {Object3D} obj
 * @param {Array} fonts
 * @return {Array} font array
 */
ObjectUtils.getFonts = function(obj, fonts) {
	if (fonts === undefined) {
		fonts = []
	}

	obj.traverse((child) => {
		if (child.font instanceof Font) {
			if (fonts[child.font.uuid] === undefined) {
				fonts[child.font.uuid] = child.font
			}
		}
	})

	return fonts
}

/**
 * Get all audio files in objects and children
 *
 * @method getAudio
 * @param {Object3D} obj
 * @param {Array} audio
 * @return {Array} audio
 */
ObjectUtils.getAudio = function(obj, audio) {
	if (audio === undefined) {
		audio = []
	}

	obj.traverse((child) => {
		if (child.audio instanceof Audio) {
			if (audio[child.audio.uuid] === undefined) {
				audio[child.audio.uuid] = child.audio
			}
		}
	})

	return audio
}

/**
 * Get all materials in an object and its children
 *
 * @method getMaterials
 * @param {Object3D} obj
 * @param {Array} materials
 * @return {Array} materials
 */
ObjectUtils.getMaterials = function(obj, materials) {
	//Auxiliar function to add materials
	function add(material) {
		if(materials[material.uuid] === undefined)
		{
			materials[material.uuid] = material;
		}
	}

	//If undefined create new array to store materials
	if(materials === undefined)
	{
		materials = [];
	}

	// Traverse obj children
	obj.traverse((child) => {
		// Check if child has material
		if(!(child.material === undefined || child.hidden || child instanceof Sky || child instanceof ParticleEmitter || child instanceof SpineAnimation)) {
            if(child.material instanceof THREE.Material)
			{
				add(child.material);
			}
			else if(child.material instanceof THREE.MultiMaterial)
			{
				var array = child.material.materials;
				for(var j = 0; j < array.length; j++)
				{
					add(array[j]);
				}
			}

            if(child.materials !== undefined) {
                for(var j = 0; j < child.materials.length; i++) {
                    add(child.materials[j])
                }
            }
		}
	})

	return materials;
}

/**
 * Gets all textures in an object and its children
 *
 * @method getTextures
 * @param {Object3D} obj
 * @param {Array} textures Textures array
 * @return {Array} files
 */
ObjectUtils.getTextures = function(obj, textures) {

    // Get Textures from material
    function addFromMaterial(material) {
        add(material.map)
        add(material.bumpMap)
        add(material.normalMap)
        add(material.displacementMap)
        add(material.specularMap)
        add(material.emissiveMap)
        add(material.alphaMap)
        add(material.roughnessMap)
        add(material.metalnessMap)
    }

	// Auxiliar function to add textures
	function add(texture) {
		if(texture != null)
		{
			if(textures[texture.uuid] === undefined) {
				textures[texture.uuid] = texture;
			}
		}
	}

	// If undefined create new array to store materials
	if(textures === undefined)
	{
		textures = [];
	}

	// Add textures from children
    obj.traverse((child) => {
		if(child.material !== undefined)
		{
            if(child.material instanceof THREE.Material) {
                addFromMaterial(child.material)
            } else if(child.material instanceof THREE.MultiMaterial) {
                var array = child.material.materials
                for(var j = 0; j < array.length; j++) {
                    addFromMaterial(array[j])
                }
            }
		}

        if(child.texture !== undefined) {
            add(child.texture)
        }
	})

	return textures;
}

/**
 * Get object scene
 *
 * @method getScene
 * @param {Object3D} obj
 * @return {Object3D} scene
 */
ObjectUtils.getScene = function(obj)
{
	var node = obj;

	while(node.parent !== null)
	{
		node = node.parent;
		if(node instanceof Scene)
		{
			return node;
		}
	}

	return null;
}

/**
 * Get object tree root
 *
 * @method getRoot
 * @param {Object3D} obj
 * @return {Object3D} root
 */
ObjectUtils.getRoot = function(obj)
{
	var node = obj;
	
	while(node.parent !== null)
	{
		node = node.parent;
	}

	return node;
}

/**
 * Set object and all its children matrixAutoUpdate value
 *
 * @method setMatrixAutoUpdate
 * @param {Object3D} obj
 * @param {Boolean} value
 */
ObjectUtils.setMatrixAutoUpdate = function(obj, value)
{
    obj.matrixAutoUpdate = value

	obj.traverse((child) => {
		child.matrixAutoUpdate = value
	})
}

/**
 * Set an object and its children to receive shadows
 * 
 * @method setShadowReceiving
 * @param {Object3D} obj
 * @param {Boolean} value
 */
ObjectUtils.setShadowReceiving = function(obj, value)
{
    obj.receiveShadow = value

	obj.traverse((child) => {
		child.receiveShadow = value
	})
}

/**
 * Set object and all children to cast shadows
 *
 * @method setShadowCasting
 * @param {Object3D} obj
 * @param {Boolean} value
 */
ObjectUtils.setShadowCasting = function(obj, value)
{
    obj.castShadow = value

	obj.traverse((child) => {
		child.castShadow = value
	})
}

/**
 * Check if an object is the child of another one
 *
 * @method isChildOf
 * @param {Object3D} parent
 * @param {Object3D} child
 * @return {Boolean} True if parent is parent of child
 */
ObjectUtils.isChildOf = function(parent, child)
{
	for(var i = 0; i < parent.children.length; i++)
	{
		if(parent.children[i] === child || ObjectUtils.isChildOf(parent.children[i], child))
		{
			return true;
		}
	}
	return false;
}
