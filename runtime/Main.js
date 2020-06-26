function Main() {}

// Initialize Main
Main.initialize = function(canvas) {
	// Set mouse lock false
	App.setMouseLock(false)

	// Main program and scene
	Main.program = Main.loadProgram("program.json")

	// Renderer and canvas
	Main.canvas = document.createElement("canvas")
	Main.canvas.style.position = "absolute"
	Main.canvas.style.top = "0px"
	Main.canvas.style.left = "0px"
	Main.canvas.width = window.innerWidth
	Main.canvas.height= window.innerHeight
	document.body.appendChild(Main.canvas)

	Mouse.canvas = Main.canvas

	Main.renderer = new THREE.WebGLRenderer({canvas: Main.canvas})
	Main.renderer.autoClear = false
	Main.renderer.shadowMap.enabled = true
	Main.renderer.shadowMap.type = THREE.PCFShadowMap
	Main.renderer.setSize(Main.canvas.width, Main.canvas.height)

	// Main Camera
	Main.camera = new PerspectiveCamera(60, Main.canvas.width/Main.canvas.height, 0.1, 1000000)
	Main.camera.position.set(0, 5, -5)

	// If no camera attached, attach default camera
	if (Main.program.scene.camera === null) {
		Main.program.scene.camera = Main.camera
	}

	// Initialize scene
	Main.program.initialize()
	Main.program.resize(Main.canvas.width, Main.canvas.height)
}

// Update Main
Main.update = function() {
	Main.program.scene.update()
}

// Draw stuff into screen
Main.draw = function() {
	Main.renderer.clear()
	Main.renderer.render(Main.program.scene, Main.program.scene.camera)
}

// Resize to fit window
Main.resize = function() {
	if (Main.canvas !== null && Main.renderer !== null) {
		Main.canvas.width = window.innerWidth
		Main.canvas.height = window.innerHeight

		Main.renderer.setSize(Main.canvas.width, Main.canvas.height)
		Main.camera.aspect = Main.canvas.width/Main.canvas.height
		Main.camera.updateProjectionMatrix()

		Main.program.resize(Main.canvas.width, Main.canvas.height)
	}
}

// Load program from file
Main.loadProgram = function(fname) {
	var loader = new ObjectLoader()
	var data = JSON.parse(App.readFile(fname))

	return loader.parse(data)
}

// Exit
Main.exit = function() {
	process.exit()
}