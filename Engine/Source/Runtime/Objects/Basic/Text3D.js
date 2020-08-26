"use strict"

/**
 * Special mesh type used to draw 3D text
 * It receives a Font resource that is used to triangulate and extrude font data into a 3D mesh
 * @class Text3D
 * @module Meshes
 * @param {String} text Text to be drawn
 * @param {Material} material Material used to shade the surface of the geometry
 * @param {Font} font Font
 * @param {Number} height Text height
 * @param {Boolean} bevel
 * @param {Number} bevelThickness
 * @param {Number} size
 * @param {Number} curveSegments
 * @constructor
 * @extends {THREE.Mesh}
 */

/**
 * Material is used to define how the geometry surface is shaded
 * @property material
 * @type {Material}
 */
function Text3D(text, material, font, height, bevel, bevelThickness, bevelSize, size, curveSegments) {
	THREE.Mesh.call(this, undefined, material)
	
	this.name = "text"
	this.type = "Text3D"

    /**
     * Font used to draw text
     * @property font
     * @type {Font}
     */
	this.font = font

    /**
     * Text
     * @property text
     * @type {Text}
     */
	this.text = (text !== undefined) ? text : "text"
	
    /**
     * Size of the text (depth)
     * @property size
     * @type {Number}
     */
    this.size = (size !== undefined) ? size : 1
    
    /**
     * Height of the text
     * @property height
     * @type {Number}
     */
    this.height = (height !== undefined) ? height : 0.5
    
    /**
     * Curve segments
     * @property curveSegments
     * @type {Number}
     */
    this.curveSegments = (curveSegments !== undefined) ? curveSegments : 15

    /**
     * Bevel
     * @property bevel
     * @type {Boolean}
     */
    this.bevel = (bevel != undefined) ? bevel : false

    /**
     * Bevel thickness
     * @property bevelThickness
     * @type {Number}
     */
	this.bevelThickness = (bevelThickness !== undefined) ? bevelThickness : 0.1

    /**
     * Bevel size
     * @property bevelSize
     * @type {Number}
     */
	this.bevelSize = (bevelSize !== undefined) ? bevelSize : 0.05

	this.setText(this.text)

	this.receiveShadow = true
	this.castShadow = true

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
    this.defaultComponents.push(new Text3DComponent())
}

Text3D.prototype = Object.create(THREE.Mesh.prototype)

/**
 * Set font used by this text 3D instance
 * @param {Font} font Font
 * @method setFont
 */
Text3D.prototype.setFont = function(font) {
	this.font = font

	this.setText()
}

/**
 * Set text
 * @param {String} text
 * @method setText
 */
Text3D.prototype.setText = function(text)
{
	if (text !== undefined) {
		this.text = text
	}

	if (this.geometry !== undefined) {
		this.geometry.dispose()
	}

    this.updateText()
}

/**
 * Update text geometry
 * Should be called after changing any attribute
 * @method updateText
 */
Text3D.prototype.updateText = function() {
    if(this.font !== null) {
        this.geometry = new THREE.TextGeometry(this.text, {
            size: this.size,
            curveSegments: this.curveSegments,
            font: this.font,
            height: this.height,
            bevelEnabled: this.bevel,
            bevelSize: this.bevelSize,
            bevelThickness: this.bevelThickness
        })
    }
}

/**
 * Clone this Text3D instance
 * @method clone
 * @return {Text3D} Clone of this object
 */
Text3D.prototype.clone = function() {
    return new Text3D(this.text, this.material, this.font, this.height, this.bevel, this.bevelThickness, this.bevelSize, this.size, this.curveSegments)
}

/**
 * Dispose mesh along with its material and geometry
 * @method dispose
 */
Text3D.prototype.dispose = function()
{
	if(this.material.dispose !== undefined)
	{
		this.material.dispose()
	}

	if (this.geometry !== undefined) {
		this.geometry.dispose()
	}

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose()
	}
}

/**
 * Create JSON for object
 * Need to backup geometry and set to undefined to avoid it being stored
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
Text3D.prototype.toJSON = function(meta)
{
	var geometry = this.geometry
	this.geometry = undefined

	var font = this.font
	var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
		font = font.toJSON(meta)
	})
	
	data.object.text = this.text
	data.object.font = font.uuid
	
    data.object.size = this.size
    data.object.curveSegments = this.curveSegments

    data.object.height = this.height
	data.object.bevel = this.bevel
	data.object.bevelThickness = this.bevelThickness
	data.object.bevelSize = this.bevelSize

	//Restore geometry
	this.geometry = geometry

	return data
}
