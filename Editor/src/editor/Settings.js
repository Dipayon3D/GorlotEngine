"use strict"

// Static function to store editor settings
function Settings() {}

// General Settings
Settings.general = {}
Settings.general.file_preview_size = 60
Settings.general.show_stats = true

// Editor settings
Settings.editor = {}
Settings.editor.grid_size = 500
Settings.editor.grid_spacing =  5
Settings.editor.grid_enabled = true
Settings.editor.axis_enabled = true
Settings.editor.camera_preview_enabled = true
Settings.editor.camera_preview_percentage = 0.2

// Render settings
Settings.render = {}
Settings.render.shadows = true
Settings.render.shadows_type = THREE.PCFSoftShadowMap // (THREE.PCFSoftShadowMap) / (THREE.PCFShadowMap)
Settings.render.antialiasing = true

// Code editor settings
Settings.code = {}
Settings.code.theme = "monokai"
Settings.code.font_size = 14
Settings.code.line_numbers = true
Settings.code.auto_close_brackets = true

// Store settings file
Settings.store = function() {
	var data = JSON.stringify({
		general: Settings.general,
		editor: Settings.editor,
		render: Settings.render,
		code: Settings.code
	}, null, "\t")

	data.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")

	App.writeFile("config", data)
}

// Load settings file
Settings.load = function() {
	try {
		var data = JSON.parse(App.readFile("config"))

		// General
		Settings.general.file_preview_size = data.general.file_preview_size
		Settings.general.show_stats = data.general.show_stats

		// Editor
		Settings.editor.grid_size = data.editor.grid_size
		Settings.editor.grid_spacing = data.editor.grid_spacing
		Settings.editor.grid_enabled = data.editor.grid_enabled
		Settings.editor.axis_enabled = data.editor.axis_enabled
		Settings.editor.camera_preview_enabled = data.editor.camera_preview_enabled
		Settings.editor.camera_preview_percentage = data.editor.camera_preview_percentage

		// Render
		Settings.render.shadows = data.render.shadows
		Settings.render.shadows_type = data.render.shadows_type
		Settings.render.antialiasing = data.render.antialiasing

		// Code Editor settings
		Settings.code.theme = data.code.theme
		Settings.code.font_size = data.code.font_size
		Settings.code.line_numbers = data.code.line_numbers
		Settings.code.auto_close_brackets = data.code.auto_close_brackets

	} catch(e) {
	}
}