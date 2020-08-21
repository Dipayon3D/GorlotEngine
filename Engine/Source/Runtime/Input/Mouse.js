"use strict";

function Mouse(){}

//Mouse Atached to camera
Mouse.initialize = function()
{
	//Mouse raw data
	Mouse._keys = [];
	Mouse._position = new THREE.Vector2(0,0);
	Mouse._positionUpdated = false;
	Mouse._delta = new THREE.Vector2(0,0);
	Mouse._wheel = 0;
	Mouse._wheelUpdated = false;
	Mouse._doubleClicked = false;

	//Mouse position, delta, and scroll speed
	Mouse.keys = [];
	Mouse.position = new THREE.Vector2(0,0);
	Mouse.delta = new THREE.Vector2(0,0);
	Mouse.wheel = 0;
	Mouse.doubleClicked = false;

	//Calculate coordinates relative to canvas
	Mouse.canvas = null;

	//Events
	Mouse.events = [];

	//Initialize key instances
	for(var i = 0; i < 3; i++)
	{
		Mouse._keys.push(new Key());
		Mouse.keys.push(new Key());
	}

	//Scroll wheel
	if(window.onmousewheel !== undefined)
	{
		//Chrome, edge
		Mouse.events.push([window, "mousewheel", function(event)
		{
			Mouse._wheel = event.deltaY;
			Mouse._wheelUpdated = true;
		}]);
	}
	else if(window.addEventListener !== undefined)
	{
		//Firefox
		Mouse.events.push([window, "DOMMouseScroll", function(event)
		{
			Mouse._wheel = event.detail * 30;
			Mouse._wheelUpdated = true;
		}]);
	}
	else
	{
		Mouse.events.push([window, "wheel", function(event)
		{
			Mouse._wheel = event.deltaY;
			Mouse._wheelUpdated = true;
		}]);
	}

	//Touchscreen input
	if("ontouchstart" in window || navigator.msMaxTouchPoints > 0)
	{
		//Auxiliar variables to calculate touch delta
		var lastTouch = new THREE.Vector2(0, 0);

		//Touch screen pressed event
		Mouse.events.push([window, "touchstart", function(event)
		{
			var touch = event.touches[0];
			lastTouch.set(touch.clientX, touch.clientY);
			Mouse.updateKey(Mouse.LEFT, Key.DOWN);
		}]);

		//Touch screen released event
		Mouse.events.push([window, "touchend", function(event)
		{
			Mouse.updateKey(Mouse.LEFT, Key.UP);
		}]);

		//Touch screen move event
		Mouse.events.push([window, "touchmove", function(event)
		{
			var touch = event.touches[0];

			if(Mouse.canvas !== null)
			{
				var rect = Mouse.canvas.getBoundingClientRect();
				Mouse.updatePosition(touch.clientX - rect.left, touch.clientY - rect.top, touch.clientX - lastTouch.x, touch.clientY - lastTouch.y);
			}
			else
			{
				Mouse.updatePosition(touch.clientX, touch.clientY, touch.clientX - lastTouch.x, touch.clientY - lastTouch.y);
			}

			lastTouch.set(touch.clientX, touch.clientY);
		}]);
	}
	//Input
	else
	{
		//Move event
		Mouse.events.push([window, "mousemove", function(event)
		{
			if(Mouse.canvas !== null)
			{
				var rect = Mouse.canvas.getBoundingClientRect();
				Mouse.updatePosition(event.clientX - rect.left, event.clientY - rect.top, event.movementX, event.movementY);
			}
			else
			{
				Mouse.updatePosition(event.clientX, event.clientY, event.movementX, event.movementY);
			}
		}]);

		//Button pressed event
		Mouse.events.push([window, "mousedown", function(event)
		{
			Mouse.updateKey(event.which - 1, Key.DOWN);
		}]);

		//Button released event
		Mouse.events.push([window, "mouseup", function(event)
		{
			Mouse.updateKey(event.which - 1, Key.UP);
		}]);
	}

	//Mouse double click
	Mouse.events.push([window, "dblclick", function(event)
	{
		Mouse._doubleClicked = true;
	}]);

	//Initialize events
	for(var i = 0; i < Mouse.events.length; i++)
	{
		var event = Mouse.events[i];
		event[0].addEventListener(event[1], event[2], false);
	}
}

//Mouse Buttons
Mouse.LEFT = 0;
Mouse.MIDDLE = 1;
Mouse.RIGHT = 2;

//Canvas to be used for relative coordinates calculation
Mouse.setCanvas = function(canvas)
{
	Mouse.canvas = canvas;

	canvas.mouseInside = false;

	canvas.addEventListener("mouseenter", function()
	{
		this.mouseInside = true;
	}, false);

	canvas.addEventListener("mouseleave", function()
	{
		this.mouseInside = false;
	}, false);
}

//Check if mouse is inside attached canvas
Mouse.insideCanvas = function()
{
	if(Mouse.canvas === null)
	{
		return false;
	}
	
	return Mouse.canvas.mouseInside;
}

//Set if mouse locked
Mouse.setLock = function(value)
{
	if(Mouse.canvas !== null)
	{
		if(value)
		{
			if(Mouse.canvas.requestPointerLock)
			{
				Mouse.canvas.requestPointerLock();
			}
			else if(Mouse.canvas.mozRequestPointerLock)
			{
				Mouse.canvas.mozRequestPointerLock();
			}
			else if(Mouse.canvas.webkitRequestPointerLock)
			{
				Mouse.canvas.webkitRequestPointerLock();
			}
		}
		else
		{
			if(document.exitPointerLock)
			{
				document.exitPointerLock();
			}
			else if(document.mozExitPointerLock)
			{
				document.mozExitPointerLock();
			}
			else if(document.webkitExitPointerLock)
			{
				document.webkitExitPointerLock();
			}
		}
	}
}

//Check if Mouse button is pressed
Mouse.buttonPressed = function(button)
{
	return Mouse.keys[button].pressed;
}

//Check if Mouse button was double clicked
Mouse.buttonDoubleClicked = function()
{
	return Mouse.doubleClicked;
}

//Check if a mouse button was just pressed
Mouse.buttonJustPressed = function(button)
{
	return Mouse.keys[button].justPressed;
}

//Check if a mouse button was just released
Mouse.buttonJustReleased = function(button)
{
	return Mouse.keys[button].justReleased;
}

//Update Mouse Position
Mouse.updatePosition = function(x, y, xDiff, yDiff)
{
	Mouse._position.set(x, y);
	Mouse._delta.x += xDiff;
	Mouse._delta.y += yDiff;
	Mouse._positionUpdated = true;
}

//Update Mouse Key
Mouse.updateKey = function(button, action)
{
	if(button > -1)
	{
		Mouse._keys[button].update(action);
	}
}

//Update Mouse State (Calculate position diff)
Mouse.update = function()
{
	//Update mouse keys state
	for(var i = 0; i < Mouse._keys.length; i++)
	{
		if(Mouse._keys[i].justPressed && Mouse.keys[i].justPressed)
		{
			Mouse._keys[i].justPressed = false;
		}
		if(Mouse._keys[i].justReleased && Mouse.keys[i].justReleased)
		{
			Mouse._keys[i].justReleased = false;
		}
		Mouse.keys[i].set(Mouse._keys[i].justPressed, Mouse._keys[i].pressed, Mouse._keys[i].justReleased);
	}

	//Update mouse wheel
	if(Mouse._wheelUpdated)
	{
		Mouse.wheel = Mouse._wheel;
		Mouse._wheelUpdated = false;
	}
	else
	{
		Mouse.wheel = 0;
	}

	//Update mouse double click
	if(Mouse._doubleClicked)
	{
		Mouse.doubleClicked = true;
		Mouse._doubleClicked = false;
	}
	else
	{
		Mouse.doubleClicked = false;
	}

	//Update mouse position if needed
	if(Mouse._positionUpdated)
	{
		Mouse.delta.x = Mouse._delta.x;
		Mouse.delta.y = Mouse._delta.y;
		Mouse._delta.set(0,0);

		Mouse.position.x = Mouse._position.x;
		Mouse.position.y = Mouse._position.y;

		Mouse._positionUpdated = false;
	}
	else
	{
		Mouse.delta.x = 0;
		Mouse.delta.y = 0;
	}
}

//Dispose mouse object
Mouse.dispose = function()
{
	for(var i = 0; i < Mouse.events.length; i++)
	{
		var event = Mouse.events[i];
		event[0].removeEventListener(event[1], event[2]);
	}
}

