"use strict";

/**
 * Key is used by keyboard and mouse to represent a key state
 * @class Key
 * @module Input
 * @constructor
 */
function Key()
{
    /**
     * Indicates if this key is currently pressed
     * @property pressed
     * @default false
     * @type {Boolean}
     */
	this.pressed = false;

    /**
     * Indicates if this key was just pressed
     * @property justPressed
     * @default false
     * @type {Boolean}
     */
	this.justPressed = false;

    /**
     * Indiciates if this key was just released
     * @property justReleased
     * @default false
     * @type {Boolean}
     */
	this.justReleased = false;
}

/**
 * Down
 * @attribute DOWN
 * @type {Number}
 */
Key.DOWN = -1;

/**
 * Up
 * @attribute UP
 * @type {Number}
 */
Key.UP = 1;

/**
 * Reset
 * @attribute RESET
 * @type {Number}
 */
Key.RESET = 0;

/**
 * Update key status based on new key state
 * @method update
 * @param {action} Number The action to update the key (Keyboard.DOWN, Keyboard.UP, Keyboard.RESET)
 */
Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === Key.DOWN)
	{
		if(this.pressed ===  false)
		{
			this.justPressed = true;
		}
		this.pressed = true;
	}
	else if(action === Key.UP)
	{
		if(this.pressed)
		{
			this.justReleased = true;
		}
		this.pressed = false;
	}
	else if(action === Key.RESET)
	{
		this.justReleased = false;
		this.justPressed = false;
	}
}

/**
 * Set this key status manually
 * @method set
 * @param {justPressed} Boolean Was this key just pressed?
 * @param {pressed} Boolean Is this key being pressed
 * @param {justReleased} Boolean Was this key just released?
 */
Key.prototype.set = function(justPressed, pressed, justReleased)
{
	this.justPressed = justPressed;
	this.pressed = pressed;
	this.justReleased = justReleased;
}

/**
 * Reset this key to its default values
 * @method reset
 */
Key.prototype.reset = function()
{
	this.justPressed = false;
	this.pressed = false;
	this.justReleased = false;
}

