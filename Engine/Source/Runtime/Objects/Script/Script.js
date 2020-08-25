/**
 * Script objects are used to control other objects present in the scene
 * It can access and change every object in the program and supports some events
 *  - initialize
 *      - Called on app initialisation
 *  - update
 *      - Called on every frame (after the frame is rendered)
 *  - onMouseOver
 *      - Called on every frame if mouse is on top of one of the script children
 *  - onResize
 *      - Called every time the window is resize
 *  - onAppData
 *      - Called when receiving data sent by the host website
 *
 * Code written inside scripts have access to the following attributes
 *  - scene
 *  - program
 *  - self
 *      - Same as this reference but global in the script scope
 *  - Keyboard
 *  - Mouse
 * @class Script
 * @extends {THREE.Object}
 * @param {String} code Javascript code to be used by this script
 * @module Script
 */
function Script(code)
{
	THREE.Object3D.call(this)
	
	this.type = "Script"
	this.name = "script"
	this.path = "/"

    /**
     * Pointer to parent program
     * Used access program resources easier
     * @property program
     * @type {Program}
     */
	this.program = null

    /**
     * Pointer to the parent scene
     * @property scene
     * @type {Scene}
     */
	this.scene = null

    /**
     * Compiled function using during runtime
     * @property func
     * @type {Function}
     */
	this.func = null

    /**
     * Javascript code attached to the script
     * @property code
     * @type {String}
     */
    this.code = (code !== undefined) ? code : Script.default

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
    this.defaultComponents.push(new ScriptComponent())
}

Script.prototype = Object.create(THREE.Object3D.prototype)

/**
 * Default script code used when creating a new Script
 * @attribute default
 * @type {String}
 */
Script.default = "// This block of code is executed one\nthis.initialize = function() {\n\n}\n\n// This block of code is executed once per frame\nthis.update = function() {\n\n}\n\n// When mouse is over children\nthis.onMouseOver = function(object) {\n\n}\n\n// When the window is resized\nthis.onResize = function() {\n\n}\n\n// When the game is closed\nthis.onExit = function() {\n\n}\n"

/**
 * Initialise script
 * Automatically called by the runtime handler (Editor / App)
 * Calls the script initialise method - if it exists -
 * @method initialize
 */
Script.prototype.initialize = function()
{
	//Program and scene
	var node = this
	while(node.parent !== null)
	{
		node = node.parent
		if(node instanceof Scene)
		{
			this.scene = node
		}
		else if(node instanceof Program)
		{
			this.program = node
		}
	}

    // Compile script
    this.setCode(this.code)

    // Initialise children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize()
	}

    // Initialise script
    if(this.script.initialize !== undefined) {
        this.script.initialize.call(this)
    }
}

/**
 * Update script state
 * Calls the script update method - if it exists -
 * @method update
 */
Script.prototype.update = function()
{
	if (this.script.onMouseOver !== undefined) {
		var obj = this.scene.raycaster.intersectObjects(this.children, true)
		if (obj.length > 0) {
			this.script.onMouseOver.call(this, obj)
		}
	}

	if (this.script.update !== undefined) {
		this.script.update.call(this)
	}

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update()
	}
}

/**
 * Call resize method - if available -
 * @method resize
 */
Script.prototype.resize = function() {
    if(this.script.onResize !== undefined) {
        this.script.onResize.call(this)
    }
}

/**
 * Call onAppData - if available -
 * @param {Any} data
 * @method appData
 */
Script.prototype.appData = function(data) {
    if(this.script.onAppData !== undefined) {
        this.script.onAppData.call(this)
    }
}

/**
 * Set script code
 * @method setCode
 * @param {String} code
 */
Script.prototype.setCode = function(code)
{
    if(code !== undefined) {
        // Compile code and create object
        try
        {
            var Constructor = new Function("Keyboard, Mouse, self, program, scene", this.code)

            if(this.program !== null) {
                this.script = new Constructor(this.program.keyboard, this.program.mouse, this, this.program, this.scene)
            }
        }
        catch(e){
            console.error("Script: Error compiling script", e)
            this.script = new(function(){})()
        }
    }
}

/**
 * Create JSON for script
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
Script.prototype.toJSON = function(meta)
{
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)

	data.object.code = this.code
	data.object.path = this.path

	return data
}
