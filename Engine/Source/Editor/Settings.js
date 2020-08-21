"use strict";

function Settings(){}

// Constants
Settings.RADIANS = 0
Settings.DEGREES = 1

// Load default settings
Settings.loadDefault = function() {
    //General settings
    Settings.general = {};
    Settings.general.theme = "dark";
    Settings.general.filePreviewSize = 70;
    Settings.general.showStats = false;
    Settings.general.showUuid = true

    //Editor settings
    Settings.editor = {};
    Settings.editor.gridSize = 500;
    Settings.editor.gridSpacing = 5;
    Settings.editor.gridEnabled = true;
    Settings.editor.axisEnabled = true;
    Settings.editor.cameraPreviewEnabled = true;
    Settings.editor.cameraPreviewPercentage = 0.35;
    Settings.editor.lockMouse = true
    Settings.editor.transformationSpace = "local"

    //Rendering settings
    Settings.render = {};
    Settings.render.followProject = false
    Settings.render.tonemapping = THREE.NoToneMapping
    Settings.render.tonemappingExposure = 1.0
    Settings.render.tonemappingWhitepoint = 1.0
    Settings.render.antialiasing = true;
    Settings.render.shadows = true;
    Settings.render.shadowsType = THREE.PCFSoftShadowMap;

    //Code editor settings
    Settings.code = {};
    Settings.code.theme = "monokai";
    Settings.code.keymap = "sublime";
    Settings.code.fontSize = 14;
    Settings.code.lineNumbers = true;
    Settings.code.lineWrapping = false;
    Settings.code.autoCloseBrackets = true;
    Settings.code.highlightActiveLine = false;
}

//Store settings file
Settings.store = function()
{
	var data = JSON.stringify(
	{
		general: Settings.general,
		editor: Settings.editor,
		render: Settings.render,
		code: Settings.code
	}, null, "\t");

	data.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");

	FileSystem.writeFile("config", data);
}

//Load settings file
Settings.load = function()
{
	try
	{
		var data = JSON.parse(FileSystem.readFile("config"));
		
        Settings.general = data.general
        Settings.editor = data.editor
        Settings.render = data.render
        Settings.code = data.code
	}
	catch(e) {
        Settings.loadDefault()
    }
}
