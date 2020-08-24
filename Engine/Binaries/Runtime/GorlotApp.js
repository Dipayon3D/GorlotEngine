"use strict"

function GorlotApp(canvas) {

    // Program and renderer
	this.program = null
    this.renderer = null

    // Fullscreen control
    this.fullscreen = false
    this.vr = false

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

    // Lock pointer function
    var canvas = this.canvas
    this.lock_mouse = function() {
        if(canvas.requestPointerLock) {
            canvas.requestPointerLock()
        } else if(canvas.mozPointerRequest) {
            canvas.mozPointerRequest()
        } else if(canvas.webkitRequestPointLock) {
            canvas.webkitRequestPointLock()
        }
    }
}

// Load and run program (async)
GorlotApp.prototype.loadRunProgram = function(fname, onLoad, onProgress) {
    var loader = new ObjectLoader()
    var app = this

    FileSystem.readFile(fname, false, (data) => {
        app.program = loader.parse(JSON.parse(data))
        app.run()

        if(onLoad !== undefined) {
            onLoad()
        }
    }, onProgress)
}

// Load program from file
GorlotApp.prototype.loadProgram = function(fname) {
    var loader = new ObjectLoader()
    var data = FileSystem.readFile(fname)
    this.program = loader.parse(JSON.parse(data))
}

// Start Gorlot program
GorlotApp.prototype.run = function() {

	if (this.program === null) {
		console.warn("GorlotApp: No program is loaded")
		return
	}

    // WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    this.renderer.setSize(this.canvas.width, this.canvas.height)

	// Mouse and keyboard input
    this.keyboard = new Keyboard()
    this.mouse = new Mouse()
    this.mouse.setCanvas(this.canvas)

    // Attach this runtime to program
    this.program.app = this

	// Create default camera
	this.program.default_camera = new PerspectiveCamera(60, this.canvas.width/this.canvas.height, 0.1, 1000000)
	this.program.default_camera.position.set(0, 10, 30)

    // Set renderer
    this.program.setRenderer(this.renderer)
    this.program.setMouseKeyboard(this.mouse, this.keyboard)

    // Initialise program
	this.program.initialize()
	this.program.resize(this.canvas.width, this.canvas.height)

    // Lock mouse pointer
    if(this.program.lock_pointer) {
        this.canvas.addEventListener("click", this.lock_mouse, false)
    }

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
GorlotApp.prototype.update = function() {
	this.mouse.update()
	this.keyboard.update()

	this.program.update()
	this.program.render(this.renderer)
}

// Exit from App
GorlotApp.prototype.exit = function() {
    // Remove mouse lock event from canvas
    if(this.program.lock_pointer) {
        this.canvas.removeEventListener("click", this.lock_mouse, false)
    }

    // Dispose and remove program
	if (this.program !== null) {
		this.program.dispose()
		this.program = null
	}

    // Dispose keyboard and mouse
    this.mouse.dispose()
    this.keyboard.dispose()

    // Run onExit callback if any
	if (this.onExit !== undefined) {
		this.onExit()
	}
}

// Resize to fit window
GorlotApp.prototype.resize = function() {
	if(this.canvas !== null && this.canvas_resize) {
		this.canvas.style.width = window.innerWidth + "px"
		this.canvas.style.height = window.innerHeight + "px"
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
	}

	if (this.program !== null && this.renderer !== null) {
		this.renderer.setSize(this.canvas.width, this.canvas.height)
		this.program.resize(this.canvas.width, this.canvas.height)
	}
}

// Send data to running application
GorlotApp.prototype.sendData = function(data) {
    if(this.program !== null ) {
        this.program.receiveDataApp()
    }
}

// Set on data receive callback (callback receives data as argument)
GorlotApp.prototype.setOnDataReceived = function(callback) {
    this.onDataReceived = callback
}

// Set on exit callback
GorlotApp.prototype.setOnExit = function(callback) {
	this.onExit = callback
}

// Check if VR is available
GorlotApp.prototype.vrAvailable = function() {
    return this.program.vr && GORLOT.WebVRAvailable()
}

// Toggle VR
GorlotApp.prototype.toggleVR = function() {
    if(this.program.vr) {
        if(this.vr) {
            this.program.exitVR()
            this.vr = false
        } else {
            this.program.displayVR()
            this.vr = true
        }
    } else {
        console.warn("GorlotApp: Loaded program is not VR enabled")
    }
}

// Set fullscreen mode
GorlotApp.prototype.setFullscreen = function(fullscreen, element) {
    if(fullscreen !== undefined) {
        this.fullscreen = fullscreen
    } else {
        this.fullscreen = !this.fullscreen
    }

	if(this.fullscreen) {
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
