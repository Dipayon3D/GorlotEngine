class SettingsTab {
	constructor(parent) {

		var self = this
		this.id = "Settings Tab " + SettingsTab.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			SettingsTab.id--
			EditorUI.selectPreviousTab()
		}, callback: () => {
			self.updateInspector()
			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		Editor.setState(Editor.STATE_IDLE)

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.panel = new LiteGUI.Panel({title: "Projects Settings", closable: true, scroll: true, width: EditorUI.mainarea.getSection(0).getWidth()-2})
		this.parent.appendChild(this.panel.root)

		this.inspector = new LiteGUI.Inspector({full: true, onchange: this.applyChanges})
		this.panel.content.appendChild(this.inspector.root)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.initUI()

		SettingsTab.id++
	}

	initUI() {
		this.inspector.addTitle("General")
		// TODO: General settings
		this.inspector.addSeparator()

		this.inspector.addTitle("Rendering Quality")
		this.inspector.addCheckbox("Show Grid", Settings.grid_enabled)
		this.inspector.addCheckbox("Show Axis", Settings.axis_enabled)
		this.inspector.addCheckbox("Antialiasing", Settings.antialiasing)
		this.inspector.addCombo("Shadows Type", undefined, {values: ["Basic", "PCF", "PCF Soft"]})
		this.inspector.addSeparator()

		this.inspector.addTitle("Code Editor")
		this.inspector.addCombo("Code Theme", Settings.code_theme,{values: ["monokai"]})
		this.inspector.addNumber("Font Size", Settings.code_font_size)
		this.inspector.addSeparator()

	}

	updateInspector() {
		
		if (this.inspector !== undefined) {
			this.inspector.clear()
			this.initUI()
		}

	}

	applyChanges(name, value) {

		if (value === "true") {
			value = true
		} else if (value === "false") {
			value = false
		}

		if (name === "Antialiasing") {
			Settings.antialiasing = value
		} else if (name === "Shadows Type") {
			if (value === "Basic") {
				Settings.shadows_type = THREE.BasicShadowMap
			} else if (value === "PCF") {
				Settings.shadows_type = THREE.PCFShadowMap
			} else if (value === "PCF Soft") {
				Settings.shadows_type = THREE.PCFSoftShadowMap
			}
		} else if (name === "Font Size") {
			Settings.code_font_size = value
		}
	}

	updateInterface() {
		this.panel.root.style.width = EditorUI.left_area.getWidth() - 4
    	this.panel.root.style.height = EditorUI.left_area.getHeight() - EditorUI.assetEx_height
	}
}

SettingsTab.id = 0