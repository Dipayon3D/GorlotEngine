"use strict"

function Runtime(canvas) {

	this.program = null

	// Create canvas
	if(canvas === undefined) {
		this.canvas = document.createElement("canvas")
		this.canvas.style.position = "absolute"
		this.canvas.style.left = "0px"
		this.canvas.style.top = "0px"
		this.canvas.style.width = window.innerWidth + "px"
		this.canvas.style.height =window.innerHeight + "px"
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		document.body.appendChild(this.canvas)
		this.canvas_resize = true
	} else {
		this.canvas = canvas
		this.canvas_resize = false
	}

	// WebGL renderer
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true})
	this.renderer.autoClear = false
	this.renderer.shadowMap.enabled = true
	this.renderer.shadowMap.type = THREE.PCFShadowMap
	this.renderer.setPixelRatio(window.devicePixelRatio || 1.0)
	this.renderer.setSize(this.canvas.width, this.canvas.height)
}

// Fullscreen control
Runtime.fullscreen = false

// Load program from file
Runtime.prototype.loadProgram = function(fname) {
	var loader = new ObjectLoader()
	var data = JSON.parse(FileSystem.readFile(fname))
	this.program =  loader.parse(data)
}

// Start Gorlot program
Runtime.prototype.run = function() {

	if (this.program === null) {
		console.warn("Runtime: No program is loaded")
		return
	}

	// Mouse and keyboard input
	Keyboard.initialize()
	Mouse.initialize()
	Mouse.setCanvas(this.canvas)

	// Virtual reality
	if (this.program.vr) {
		this.vr_controls = new VRControls()
		this.vr_effect = new THREE.VREffect(this.renderer)
	}

    // Attach this runtime to program
    this.program.gorlot_app = this

	// Create default camera
	this.program.default_camera = new PerspectiveCamera(60, this.canvas.width/this.canvas.height, 0.1, 1000000)
	this.program.default_camera.position.set(0, 10, 30)
	this.program.renderer = this.renderer

    // Initialise program
	this.program.initialize()
	this.program.resize(this.canvas.width, this.canvas.height)

	// Update loop
	var self = this
	var update = function() {
        if(self.program !== null) {
            requestAnimationFrame(update)
            self.update()
        }
	}

	update()
}

// Update gorlot program
Runtime.prototype.update = function() {
	Mouse.update()
	Keyboard.update()

	this.program.update()
	this.program.render(this.renderer)
}

// Exit from App
Runtime.prototype.exit = function() {
    // Dispose and remove program
	if (this.program !== null) {
		this.program.dispose()
		this.program = null
	}

    // Dispose keyboard and mouse
    Mouse.dispose()
    Keyboard.dispose()

    // Run onExit callback if any
	if (this.onExit !== undefined) {
		this.onExit()
	}

    // If running on nwjs close all windows
	if (Runtime.gui !== undefined) {
		Runtime.gui.App.closeAllWindows()
		Runtime.gui.App.quit()
	}
}

// Resize to fit window
Runtime.prototype.resize = function() {
	if(this.canvas !== null && this.canvas_resize) {
		this.canvas.style.width = window.innerWidth + "px"
		this.canvas.style.height = window.innerHeight + "px"
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
	}

	if (this.renderer !== null && this.renderer !== undefined) {
		this.renderer.setSize(this.canvas.width, this.canvas.height)
		this.program.resize(this.canvas.width, this.canvas.height)
	}
}

// Set on data receive callback (callback receives data as argument)
Runtime.prototype.setOnDataReceived = function(callback) {
    this.onDataReceived = callback
}

// Set on exit callback
Runtime.prototype.setOnExit = function(callback) {
	this.onExit = callback
}

// Set fullscreen mode
Runtime.setFullscreen = function(fullscreen, element) {
	Runtime.fullscreen = fullscreen

	if(fullscreen) {
		if(element === undefined) {
			element = document.body
		}

		element.requestFullscreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen

		if(element.requestFullscreen) {
			element.requestFullscreen()
		}
	} else {
		document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen

		if(document.exitFullscreen) {
			document.exitFullscreen()
		}
	}
}
