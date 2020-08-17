"use strict"

function AudioPlayer(parent) {
    this.parent = (parent !== undefined) ? parent : document.body

    // Webaudio context
    this.context = THREE.AudioContext.getContext()

    // Element
    this.element = document.createElement("div")
    this.element.style.position = "absolute"
    this.element.style.overflow = "hidden"

    // Button
    this.button = document.createElement("button")
    this.button.style.position = "absolute"
    this.button.style.cursor = "pointer"
    this.button.style.background = "transparent"
    this.button.style.border = "none"
    this.button.style.outline = "none"
    this.element.appendChild(this.button)

    // Track
    this.track = document.createElement("div")
    this.track.style.position = "absolute"
    this.track.style.backgroundColor = "#FF0000"
    this.element.appendChild(this.track)

    // Progress
    this.progress = document.createElement("div")
    this.progress.style.position = "absolute"
    this.progress.style.backgroundColor = "#FF0000"
    this.track.appendChild(this.progress)

    // Scrubber
    this.scrubber = document.createElement("div")
    this.scrubber.style.position = "absolute"
    this.scrubber.style.backgroundColor = "#0000FF"
    this.scrubber.style.cursor = "pointer"
    this.track.appendChild(this.scrubber)

    // Create events
    this.button.addEventListener("click", this.toggle.bind(this))
    //this.scrubber.addEventListener("mousedown", this.onMouseDown.bind(this))

    // Audio source and buffer
    this.buffer = null
    this.source = null

    // Playback control
    this.time = 0
    this.startTime = 0
    this.playing = false

    this.loop = false
    this.dragging = false

    // Self pointer
    var self = this

    // Update elements
    function draw() {
        if(self.playing) {
            self.time = self.context.currentTime - self.startTime

            if(self.time >= self.buffer.duration) {
                self.pause()
            }
        }

        if(Keyboard.keyPressed(Keyboard.Y)) {
            console.log("Context")
            console.log(self.context)
            console.log("Buffer")
            console.log(self.buffer)
            console.log("Source")
            console.log(self.source)
        }

        if(self.parent !== null ){
            requestAnimationFrame(draw)
        }
    }

    draw()

    // Attributes
    this.visible = true
    this.size = new THREE.Vector2(0, 0)
    this.position = new THREE.Vector2(0, 0)

    // Attach element
    this.parent.appendChild(this.element)
}

// Decode audio
AudioPlayer.prototype.setAudioBuffer = function(buffer, onLoad) {
    this.context.decodeAudioData(buffer, function (buffer) {
        this.buffer = buffer

        if(onload !== undefined) {
            onLoad(buffer)
        }
    }.bind(this))
}

// Conect audio source
AudioPlayer.prototype.connect = function() {
    if(this.playing) {
        this.pause()
    }

    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.context.destination)
}

// Disconnect source
AudioPlayer.prototype.disconnect = function() {
    this.source.disconnect()
}

// Play audio
AudioPlayer.prototype.play = function(time) {
    if(time !== undefined) {
        this.time = time
    }

    this.connect()

    this.source.loop = this.loop
    this.startTime = this.context.currentTime - this.time
    this.source.start(this.context.currentTime, this.time)
    this.playing = true

    this.button.style.backgroundColor = "#00FF00"
}

// Pause audio
AudioPlayer.prototype.pause = function() {
    if(this.playing) {
        this.playing = false
        this.source.stop()
        this.time = this.context.currentTime - this.startTime

        this.button.style.backgroundColor = "#FF0000"
    }
}

// Stop audio playback
AudioPlayer.prototype.stop = function() {
    if(this.playing) {
        this.source.stop()
        this.time = 0
        this.playing = false

        this.button.style.backgroundColor = "#FF0000"
    }
}

// Seek time
AudioPlayer.prototype.seek = function(time) {
    if(this.playing) {
        this.play(time)
    } else {
        this.time = time
    }
}

// Toggle play/pause
AudioPlayer.prototype.toggle = function() {
    if(this.playing) {
        this.pause()
    } else {
        this.play()
    }
}

// Remove element
AudioPlayer.prototype.destroy = function() {
    try {
        // Stop audio playback
        this.stop()

        // Remove event listeners
        this.button.removeEventListener("click", this.toggle.bind(this))

        // Remove element
        this.parent.removeChild(this.element)
        this.parent = null
    } catch(e) {}
}

// Update
AudioPlayer.prototype.update = function() {}

// Update division size
AudioPlayer.prototype.updateInterface = function() {
    // Set visibility
    if(this.visible) {
        this.element.style.visibility = "visible"
    } else {
        this.element.style.visibility = "hidden"
    }

    // Element
    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"

    // Button
    this.button.style.width = this.element.style.height
    this.button.style.height = this.element.style.height
    this.button.style.left = (this.size.y / 2) + "px"

    // Scrubber
    this.scrubber.style.width = this.button.style.left
    this.scrubber.style.height = this.button.style.left
    this.scrubber.style.left = (this.size.y / 4) + "px"
    this.scrubber.style.top = (-this.size.y / 4) + "px"

    // Track
    this.track.style.top = "0px"
    this.track.style.left = this.size.y + "px"
    this.track.style.width = (this.size.x - this.size.y) + "px"
    this.track.style.height = (this.size.y * 0.1) + "px"

    // Progress
    this.progress.style.top = this.track.style.top
    this.progress.style.left = this.track.style.left
    this.progress.style.height = this.track.style.height
}
