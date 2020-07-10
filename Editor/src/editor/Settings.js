"use strict"

function Settings() {}

// Debug Settings
Settings.show_stats = true

// Scene Editor settings
Settings.grid_size = 500
Settings.grid_spacing =  5
Settings.grid_enabled = true
Settings.axis_enabled = true
Settings.file_preview_size = 60
Settings.camera_preview_enabled = true
Settings.camera_preview_percentage = 0.2

// Renderer settings
Settings.shadows = true
Settings.shadows_type = THREE.PCFSoftShadowMap // (THREE.PCFSoftShadowMap) / (THREE.PCFShadowMap)
Settings.antialiasing = true

// Code editor settings
Settings.code_font_size = 14
Settings.code_theme = "monokai"
Settings.code_line_numbers = true

// Store settings file
Settings.store = function() {
	var data = JSON.stringify({
		show_stats: Settings.show_stats,

		grid_size: Settings.grid_size,
		grid_spacing: Settings.grid_spacing,
		grid_enabled: Settings.grid_enabled,
		axis_enabled: Settings.axis_enabled,

		file_preview_size: Settings.file_preview_size,

		camera_preview_enabled: Settings.camera_preview_enabled,
		camera_preview_percentage: Settings.camera_preview_percentage,

		shadows: Settings.shadows,
		shadows_type: Settings.shadows_type,
		antialiasing: Settings.antialiasing,

		code_theme: Settings.code_theme,
		code_font_size: Settings.code_font_size,
		code_line_numbers: Settings.code_line_numbers
	}, null, "\t")

	data.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")

	App.writeFile("config", data)
}

// Load settings file
Settings.load = function() {
	try {
		var data = JSON.parse(App.readFile("config"))

		Settings.general_theme = data.general_theme

		Settings.show_stats = data.show_stats
		Settings.grid_spacing = data.grid_spacing
		Settings.grid_enabled = data.grid_enabled
		Settings.axis_enabled = data.axis_enabled

		Settings.file_preview_size = data.file_preview_size

		Settings.camera_preview_enabled = data.camera_preview_enabled
		Settings.camera_preview_percentage = data.camera_preview_percentage

		Settings.shadows = data.shadows
		Settings.shadows_type = data.shadows_type
		Settings.antialiasing = data.antialiasing

		Settings.code_theme = data.code_theme
		Settings.code_font_size = data.code_font_size
		Settings.code_line_numbers = data.code_line_numbers
	} catch(e) {
	}
}