"use strict";

//WebVR polyfill
if(navigator.getVRDisplays === undefined)
{
	include("lib/webvr-polyfill.min.js", function()
	{
		window.WebVRConfig =
		{
			FORCE_ENABLE_VR: false, //Forces availability of VR mode in desktop
			CARDBOARD_UI_DISABLED: false,
			ROTATE_INSTRUCTIONS_DISABLED: true,
			TOUCH_PANNER_DISABLED: true,
			MOUSE_KEYBOARD_CONTROLS_DISABLED: true,
			K_FILTER: 1.0, //0 for accelerometer, 1 for gyro
			PREDICTION_TIME_S: 0.0, //Time predict during fast motion
			YAW_ONLY: false,
			DEFER_INITIALIZATION: false,
			ENABLE_DEPRECATED_API: false,
			BUFFER_SCALE: 1.0,
			DIRTY_SUBMIT_FRAME_BINDINGS: false
		}
	});
}

//External libs
include("lib/three/three.js");
include("lib/three/effects/VREffect.js");
include("lib/cannon.min.js");
include("lib/leap.min.js");
include("lib/stats.min.js");
include("lib/SPE.min.js");
include("lib/base64.min.js")

include("lib/litegraph/lgraph.js")

//Internal modules
include("src/core/three/Three.js");
include("src/core/three/Object3D.js");
include("src/core/three/Vector3.js");
include("src/core/three/Vector2.js");
include("src/core/three/Color.js");
include("src/core/three/Texture.js")

include("src/input/Key.js");
include("src/input/Keyboard.js");
include("src/input/Mouse.js");

include("src/core/webvr/VRControls.js");

include("src/core/assets/Font.js")
include("src/core/assets/Video.js")

include("src/core/assets/Image.js")

include("src/core/texture/TextTexture.js");
include("src/core/texture/VideoTexture.js");
include("src/core/texture/WebcamTexture.js");
include("src/core/texture/Texture.js");

include("src/core/loaders/FontLoader.js");
include("src/core/loaders/ImageLoader.js")
include("src/core/loaders/VideoLoader.js")

include("src/core/loaders/TextureLoader.js")
include("src/core/loaders/ObjectLoader.js")
include("src/core/loaders/MaterialLoader.js")

include("src/core/objects/physics/PhysicsObject.js");
include("src/core/objects/device/LeapMotion.js");
include("src/core/objects/device/KinectDevice.js");
include("src/core/objects/lights/PointLight.js");
include("src/core/objects/lights/SpotLight.js");
include("src/core/objects/lights/AmbientLight.js");
include("src/core/objects/lights/DirectionalLight.js");
include("src/core/objects/lights/HemisphereLight.js");
include("src/core/objects/lights/Sky.js");
include("src/core/objects/cameras/PerspectiveCamera.js");
include("src/core/objects/cameras/OrthographicCamera.js");
include("src/core/objects/audio/Audio.js");
include("src/core/objects/script/Script.js");
include("src/core/objects/script/BlockScript.js");
include("src/core/objects/Bone.js");
include("src/core/objects/Container.js");
include("src/core/objects/Mesh.js");
include("src/core/objects/SkinnedMesh.js");
include("src/core/objects/Text3D.js");
include("src/core/objects/Sprite.js");
include("src/core/objects/ParticleEmitter.js");
include("src/core/objects/Program.js");
include("src/core/objects/Scene.js");

// Assets
include("src/core/assets/materials/MeshBasicMaterial.js")
include("src/core/assets/materials/MeshLambertMaterial.js")
include("src/core/assets/materials/MeshNormalMaterial.js")
include("src/core/assets/materials/MeshPhongMaterial.js")
include("src/core/assets/materials/MeshShaderMaterial.js")
include("src/core/assets/materials/MeshStandardMaterial.js")

// Nodes
include("src/core/nodes/NodesHelper.js")

// Blueprints
// Base
include("src/core/nodes/base/Arrays.js")
include("src/core/nodes/base/Base.js")
include("src/core/nodes/base/Logic.js")

include("src/core/nodes/input/Keyboard.js")
include("src/core/nodes/input/Mouse.js")

// Math
include("src/core/nodes/math/Math.js")
include("src/core/nodes/math/Vector.js")
include("src/core/nodes/math/Quaternion.js")
include("src/core/nodes/math/Euler.js")

// Objects
include("src/core/nodes/objects/Objects.js")
include("src/core/nodes/objects/Scene.js")

// Particles Nodes
include("src/core/nodes/particles/Particles.js")

// Materials nodes
include("src/core/nodes/materials/Material.js")
include("src/core/nodes/materials/Color.js")
include("src/core/nodes/materials/Texture.js")
include("src/core/nodes/materials/Constants.js")

include("src/core/nodes/Register.js")

include("src/core/ObjectUtils.js");
include("src/core/MathUtils.js");

//App class
function App(){}

// NWJS modules
try
{
	App.fs = require("fs");
	App.gui = require("nw.gui");
	App.clipboard = App.gui.Clipboard.get();
	App.args = App.gui.App.argv
}
catch(e){
	App.args = []
}

//App initialization
App.initialize = function(main)
{
	//Fullscreen flag
	App.fullscreen = false;

	//Init Input
	Keyboard.initialize();
	Mouse.initialize();

	//Create main program
	App.main = main;
	App.main.initialize(App.canvas);

	//Time control
	App.delta_time = 0;
	App.time = Date.now();

	//Start Loop
	App.loop();
}

//Leave fullscreen mode
App.leaveFullscreen = function()
{
	//Set fullscreen flag
	App.fullscreen = false;

	if(document.exitFullscreen)
	{
		document.exitFullscreen();
	}
	else if(document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen();
	}
	else if(document.webkitExitFullscreen)
	{
		document.webkitExitFullscreen();
	}
}

//Set an element to fullscreen mode
App.enterFullscreen = function(element)
{
	//If no element passed use full page
	if(element === undefined)
	{
		element = document.body;
	}

	//Set fullscreen flag
	App.fullscreen = true;

	//Set element to fullscreen
	if(element.requestFullscreen)
	{
		element.requestFullscreen();
	}
	else if(element.mozRequestFullScreen)
	{
		element.mozRequestFullScreen();
	}
	else if(element.webkitRequestFullscreen)
	{
		element.webkitRequestFullscreen();
	}
	else if(element.msRequestFullscreen)
	{
		element.msRequestFullscreen();
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main;
	App.main.initialize(App.canvas);
}

//Check if webvr is available
App.webvrAvailable = function()
{
	return (navigator.getVRDisplays !== undefined);
}

//App loop
App.loop = function()
{
	//Call loop again
	requestAnimationFrame(App.loop);

	//Update Mouse Values
	Mouse.update();
	Keyboard.update();
	
	//Update time values
	App.delta_time = Date.now() - App.time;
	App.time += App.delta_time;

	//Update and draw
	App.main.update();
	App.main.draw();
}

//Called every time page is resized
App.resize = function()
{
	App.main.resize();
}

//Open file chooser dialog receives callback function, file filter, savemode and is its directory only
App.chooseFile = function(callback, filter, savemode)
{
	//Create file chooser element
	var chooser = document.createElement("input");
	chooser.type = "file";

	if(filter !== undefined)
	{
		chooser.accept = filter;
	}
	
	if(savemode === true)
	{
		chooser.nwsaveas = "file";
	}

	//Create onchange event
	chooser.onchange = function(event)
	{
		if(callback !== undefined)
		{
			callback(chooser.value);
		}
	};

	//Force trigger onchange event
	chooser.click();
}

//Read File
App.readFile = function(fname, sync, callback)
{
	//If sync undefined set true
	if(sync === undefined)
	{
		sync = true;
	}

	//Check if node available
	if(App.fs !== undefined)
	{
		//If sync
		if(sync)
		{
			return App.fs.readFileSync(fname, "utf8");
		}
		else
		{
			App.fs.readFile(fname, "utf8", callback);
			return null;
		}
	}
	else
	{
		var file = new XMLHttpRequest();
		file.overrideMimeType("text/plain");

		//Request file to server
		file.open("GET", fname, false);

		//Get file
		file.onreadystatechange = function ()
		{
			if(file.status === 200 || file.status === 0)
			{
				//Callback
				if(callback !== undefined)
				{
					callback(file.responseText);
				}
			}
		}

		//Send null to ensure that file was received
		if(sync)
		{
			file.send(null);
		}

		return file.responseText
	}
}

// Read File
App.readFileArrayBuffer = function(fname, callback) 
{
	if (App.fs !== undefined) 
	{
		var buffer = App.fs.readFileSync(fname, undefined)
		var array = new ArrayBuffer(buffer.length)
		var view = new Uint8Array(array)

		for(var i = 0; i < buffer.length; i++) 
		{
			view[i] = buffer[i]
		}

		return array
	}
	else
	{
		var file = new XMLHttpRequest()
		file.open("GET", fname, false)
		file.responseType = "arraybuffer"

		file.onreadystatechange = function() 
		{
			if (file.status === 200 || file.status === 0) 
			{
				if (callback !== undefined) 
				{
					callback(file.response)
				}
			}
		}

		file.send(null)
		return file.response
	}
}

//Write File
App.writeFile = function(fname, data)
{
	if(App.fs !== undefined)
	{
		var stream = App.fs.createWriteStream(fname, "utf8");
		stream.write(data);
		stream.end();
	}
}

//Copy file (can't be used to copy folders)
App.copyFile = function(src, dest)
{
	if(App.fs !== undefined)
	{
		App.fs.createReadStream(src).pipe(App.fs.createWriteStream(dest));
	}
}

//Make a directory (dont trow exeption if directory already exists)
App.makeDirectory = function(dir)
{
	if(App.fs !== undefined)
	{
		try
		{
			App.fs.mkdirSync(dir);
		}
		catch(e){}
	}
}

//Returns files in directory (returns empty array in case of error)
App.getFilesDirectory = function(dir)
{
	if(App.fs !== undefined)
	{
		try
		{
			return App.fs.readdirSync(dir);
		}
		catch(e)
		{
			return [];
		}
	}
	return [];
}

//Copy folder and all its files (includes symbolic links)
App.copyFolder = function(src, dest)
{
	if(App.fs !== undefined)
	{
		App.makeDirectory(dest);
		var files = App.fs.readdirSync(src);

		for(var i = 0; i < files.length; i++)
		{
			var source = src + "\\" + files[i];
			var destiny = dest + "\\" + files[i];
			var current = App.fs.statSync(source);
			
			//Directory
			if(current.isDirectory())
			{
				App.copyFolder(source, destiny);
			}
			//Symbolic link
			else if(current.isSymbolicLink())
			{
				App.fs.symlinkSync(App.fs.readlinkSync(source), destiny);
			}
			//File
			else
			{
				App.copyFile(source, destiny);
			}
			
		}
	}
}

// Include javascript or css file in project
function include(file, onload)
{
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script");
		js.src = file;
		js.type = "text/javascript";
		js.async = false;
		if(onload)
		{
			js.onload = onload;
		}
		document.body.appendChild(js);
	}
	else if(file.endsWith(".css"))
	{
		var css = document.createElement("link");
		css.href = file;
		css.rel = "stylesheet";
		document.body.appendChild(css);
	}
	else if(file.endsWith("*"))
	{
		var directory = file.replace("*", "");
		var files = App.getFilesDirectory(directory);
		for(var i = 0; i < files.length; i++)
		{
			include(directory + files[i]);
		}
	}
	else
	{
		var directory = file + "/";
		try
		{
			var files = App.getFilesDirectory(directory);
			for(var i = 0; i < files.length; i++)
			{
				include(directory + files[i]);
			}
		}
		catch(e){}
	}
}

//Create base64 string from arraybuffer object
function base64ArrayBuffer(arrayBuffer)
{
	var base64 = ""
	var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

	var bytes = new Uint8Array(arrayBuffer)
	var remainder = bytes.byteLength % 3
	var length = bytes.byteLength - remainder

	//Auxiliar variables
	var a, b, c, d
	var chunk

	//Main loop deals with bytes in chunks of 3 bytes
	for(var i = 0; i < length; i += 3)
	{
		//Combine the three bytes into a single integer
		chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

		//Use bitmasks to extract 6-bit segments from the triplet
		a = (chunk & 16515072) >> 18 //16515072 = (2^6 - 1) << 18
		b = (chunk & 258048) >> 12 //258048 = (2^6 - 1) << 12
		c = (chunk & 4032) >> 6 //4032 = (2^6 - 1) << 6
		d = chunk & 63 //63 = 2^6 - 1

		// Convert the raw binary segments to the appropriate ASCII encoding
		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
	}

	//Deal with the remaining bytes and padding
	if(remainder === 1)
	{
		chunk = bytes[length]

		a = (chunk & 252) >> 2 //252 = (2^6 - 1) << 2
		b = (chunk & 3) << 4 //3 = 2^2 - 1 (Set the 4 LSB to zero)

		base64 += encodings[a] + encodings[b] + '=='
	}
	else if(remainder === 2)
	{
		chunk = (bytes[length] << 8) | bytes[length + 1]

		a = (chunk & 64512) >> 10 //64512 = (2^6 - 1) << 10
		b = (chunk & 1008) >> 4 //1008  = (2^6 - 1) << 4
		c = (chunk & 15) << 2 //15 = 2^4 - 1 (Set the 2 LSB to zero)

		base64 += encodings[a] + encodings[b] + encodings[c] + '='
	}

	return base64
}