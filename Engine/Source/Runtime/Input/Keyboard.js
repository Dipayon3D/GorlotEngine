"use strict"

/**
 * Keyboard instance for input in sync with the 3D application, it's updated automatically by the runtime handler (Editor/App)
 * @class Keyboard
 * @module Input
 * @constructor
 */
function Keyboard() {
    /**
     * Array with keyboard keys status
     * @type {Array}
     * @property keys
     */
	this.keys = []

	this.actions = []

	// Initialize Keys
	for(var i = 0; i < 256; i++) {
		this.keys.push(new Key())
	}

	// Events
	this.events = []

	// Actions pointer
	var actions = this.actions

	// Key down
	this.events.push([window, "keydown", function(event) {
		actions.push(event.keyCode)
		actions.push(Key.DOWN)
	}])

	// Key up
	this.events.push([window, "keyup", function(event) {
		actions.push(event.keyCode)
		actions.push(Key.UP)
	}])

	// Initialize events
	for(var i = 0; i < this.events.length; i++) {
		var event = this.events[i]
		event[0].addEventListener(event[1], event[2])
	}
}

// Prototype
Keyboard.prototype = Keyboard

/**
 * Update the key flags synchronously (called automatically by the runtine - Editor/App - )
 * @method update
 */
Keyboard.update = function() {
	var end = 0

	while(this.actions.length > end) {
		var key = this.actions.shift()
		var action = this.actions.shift()

		this.keys[key].update(action)

		if(this.keys[key].justReleased || this.keys[key].justPressed) {
			this.actions.push(key)
			this.actions.push(Key.RESET)
			end += 2
		}
	}
}

/**
 * Reset keyboard status to default
 * @method reset
 */
Keyboard.reset = function() {
	// Clear actions array
	this.actions = []

	// Reset all keys
	for(var i = 0; i < this.keys.length; i++) {
		this.keys[i].reset()
	}
}

/**
 * Check if a key is pressed
 * @method keyPressed
 * @param {key} Number The key to check if it's pressed
 * @return {Boolean} True if the entered key is currently pressed
 */
Keyboard.keyPressed = function(key) {
	return this.keys[key].pressed
}

/**
 * Check if a key was just pressed
 * @method keyJustPressed
 * @param {key} Number The key to check if was just pressed
 * @return {Boolean} True if the entered key is currently pressed
 */
Keyboard.keyJustPressed = function(key) {
	return this.keys[key].justPressed
}

/**
 * Check if a key was just released
 * @method keyJustReleased
 * @param {key} Number The key to check if was just released
 * @return {Boolean} True if the entered key is currently pressed
 */
Keyboard.keyJustReleased = function(key) {
	return this.keys[key].justReleased
}

/**
 * Dispose keyboard events (called automatically by the runtime - Editor/App - )
 * @method dispose
 */
Keyboard.dispose = function() {
	for(var i = 0; i < this.events.length; i++) {
		var event = this.events[i]
		event[0].removeEventListener(event[1], event[2])
	}
}

/**
 * TAB key
 * @attribute TAB
 * @type {Number}
 */
Keyboard.TAB = 9

/**
 * ENTER key
 * @attribute ENTER
 * @type {Number}
 */
Keyboard.ENTER = 13

/**
 * SHIFT key
 * @attribute SHIFT
 * @type {Number}
 */
Keyboard.SHIFT = 16

/**
 * CTRL key
 * @attribute CTRL
 * @type {Number}
 */
Keyboard.CTRL = 17

/**
 * ALT key
 * @attribute ALT
 * @type {Number}
 */
Keyboard.ALT = 18

/**
 * CAPS_LOCK key
 * @attribute CAPS_LOCK
 * @type {Number}
 */
Keyboard.CAPS_LOCK = 20

/**
 * ESC key
 * @attribute ESC
 * @type {Number}
 */
Keyboard.ESC = 27

/**
 * SPACEBAR key
 * @attribute SPACEBAR
 * @type {Number}
 */
Keyboard.SPACEBAR = 32

/**
 * PAGE_UP key
 * @attribute PAGE_UP
 * @type {Number}
 */
Keyboard.PAGE_UP = 33

/**
 * PAGE_DOWN key
 * @attribute PAGE_DOWN
 * @type {Number}
 */
Keyboard.PAGE_DOWN = 34

/**
 * END key
 * @attribute END
 * @type {Number}
 */
Keyboard.END = 35

/**
 * HOME key
 * @attribute HOME
 * @type {Number}
 */
Keyboard.HOME = 36

/**
 * INSERT key
 * @attribute INSERT
 * @type {Number}
 */
Keyboard.INSERT = 45

/**
 * DEL key
 * @attribute DEL
 * @type {Number}
 */
Keyboard.DEL = 46


/**
 * LEFT key
 * @attribute LEFT
 * @type {Number}
 */
Keyboard.LEFT = 37

/**
 * RIGHT key
 * @attribute RIGHT
 * @type {Number}
 */
Keyboard.RIGHT = 39

/**
 * UP key
 * @attribute UP
 * @type {Number}
 */
Keyboard.UP = 38

/**
 * DOWN key
 * @attribute DOWN
 * @type {Number}
 */
Keyboard.DOWN = 40


/**
 * NUM0 key
 * @attribute NUM0
 * @type {Number}
 */
Keyboard.NUM0 = 48

/**
 * NUM1 key
 * @attribute NUM1
 * @type {Number}
 */
Keyboard.NUM1 = 49

/**
 * NUM2 key
 * @attribute NUM2
 * @type {Number}
 */
Keyboard.NUM2 = 50

/**
 * NUM3 key
 * @attribute NUM3
 * @type {Number}
 */
Keyboard.NUM3 = 51

/**
 * NUM4 key
 * @attribute NUM4
 * @type {Number}
 */
Keyboard.NUM4 = 52

/**
 * NUM5 key
 * @attribute NUM5
 * @type {Number}
 */
Keyboard.NUM5 = 53

/**
 * NUM6 key
 * @attribute NUM6
 * @type {Number}
 */
Keyboard.NUM6 = 54

/**
 * NUM7 key
 * @attribute NUM7
 * @type {Number}
 */
Keyboard.NUM7 = 55

/**
 * NUM8 key
 * @attribute NUM8
 * @type {Number}
 */
Keyboard.NUM8 = 56

/**
 * NUM9 key
 * @attribute NUM9
 * @type {Number}
 */
Keyboard.NUM9 = 57


/**
 * A key
 * @attribute A
 * @type {Number}
 */
Keyboard.A = 65

/**
 * B key
 * @attribute B
 * @type {Number}
 */
Keyboard.B = 66

/**
 * C key
 * @attribute C
 * @type {Number}
 */
Keyboard.C = 67

/**
 * D key
 * @attribute D
 * @type {Number}
 */
Keyboard.D = 68

/**
 * E key
 * @attribute E
 * @type {Number}
 */
Keyboard.E = 69

/**
 * F key
 * @attribute F
 * @type {Number}
 */
Keyboard.F = 70

/**
 * G key
 * @attribute G
 * @type {Number}
 */
Keyboard.G = 71

/**
 * H key
 * @attribute H
 * @type {Number}
 */
Keyboard.H = 72

/**
 * I key
 * @attribute I
 * @type {Number}
 */
Keyboard.I = 73

/**
 * J key
 * @attribute J
 * @type {Number}
 */
Keyboard.J = 74

/**
 * K key
 * @attribute K
 * @type {Number}
 */
Keyboard.K = 75

/**
 * L key
 * @attribute L
 * @type {Number}
 */
Keyboard.L = 76

/**
 * M key
 * @attribute M
 * @type {Number}
 */
Keyboard.M = 77

/**
 * N key
 * @attribute N
 * @type {Number}
 */
Keyboard.N = 78

/**
 * O key
 * @attribute O
 * @type {Number}
 */
Keyboard.O = 79

/**
 * P key
 * @attribute P
 * @type {Number}
 */
Keyboard.P = 80

/**
 * Q key
 * @attribute Q
 * @type {Number}
 */
Keyboard.Q = 81

/**
 * R key
 * @attribute R
 * @type {Number}
 */
Keyboard.R = 82

/**
 * S key
 * @attribute S
 * @type {Number}
 */
Keyboard.S = 83

/**
 * T key
 * @attribute T
 * @type {Number}
 */
Keyboard.T = 84

/**
 * U key
 * @attribute U
 * @type {Number}
 */
Keyboard.U = 85

/**
 * V key
 * @attribute V
 * @type {Number}
 */
Keyboard.V = 86

/**
 * W key
 * @attribute W
 * @type {Number}
 */
Keyboard.W = 87

/**
 * X key
 * @attribute X
 * @type {Number}
 */
Keyboard.X = 88

/**
 * Y key
 * @attribute Y
 * @type {Number}
 */
Keyboard.Y = 89

/**
 * Z key
 * @attribute Z
 * @type {Number}
 */
Keyboard.Z = 90



/**
 * F1 key
 * @attribute F1
 * @type {Number}
 */
Keyboard.F1 = 112

/**
 * F2 key
 * @attribute F2
 * @type {Number}
 */
Keyboard.F2 = 113

/**
 * F3 key
 * @attribute F3
 * @type {Number}
 */
Keyboard.F3 = 114

/**
 * F4 key
 * @attribute F4
 * @type {Number}
 */
Keyboard.F4 = 115

/**
 * F5 key
 * @attribute F5
 * @type {Number}
 */
Keyboard.F5 = 116

/**
 * F6 key
 * @attribute F6
 * @type {Number}
 */
Keyboard.F6 = 117

/**
 * F7 key
 * @attribute F7
 * @type {Number}
 */
Keyboard.F7 = 118

/**
 * F8 key
 * @attribute F8
 * @type {Number}
 */
Keyboard.F8 = 119

/**
 * F9 key
 * @attribute F9
 * @type {Number}
 */
Keyboard.F9 = 120

/**
 * F10 key
 * @attribute F10
 * @type {Number}
 */
Keyboard.F10 = 121

/**
 * F11 key
 * @attribute F11
 * @type {Number}
 */
Keyboard.F11 = 122

/**
 * F12 key
 * @attribute F12
 * @type {Number}
 */
Keyboard.F12 = 123
