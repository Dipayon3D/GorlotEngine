"use strict"

function GeneralSettingsTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "General", "Source/Editor/Files/Icons/Misc/Tool.png")

    this.element.style.overflow = "auto"

    // Self pointer
    var self = this

    // Form
    this.form = new Form(this.element)
    this.form.defaultTextWidth = 125
    this.form.position.set(5, 5)
    this.form.spacing.set(5, 5)

    // General text
    this.form.addText("General")
    this.form.nextRow()

    // Theme
    this.form.addText("Theme")
    this.theme = new DropdownList(this.form.element)
    this.theme.size.set(150, 20)
    this.theme.setOnChange(() => {
        var value = self.theme.getValue()
        Settings.general.theme = value
    })
    this.form.add(this.theme)
    this.form.nextRow()

    // Fill theme dropdown
    for(var i = 0; i < Theme.list.length; i++) {
        var theme = Theme.list[i]
        this.theme.addValue(theme, theme)
    }

    // Show stats
    this.form.addText("Show performance info")
    this.showStats = new CheckBox(this.form.element)
    this.showStats.size.set(20, 16)
    this.showStats.setOnChange(() => {
        Settings.general.showStats = self.showStats.getValue()
    })
    this.form.add(this.showStats)
    this.form.nextRow()

    // Show UUID
    this.form.addText("Show object UUID")
    this.showUuid = new CheckBox(this.form.element)
    this.showUuid.size.set(20, 16)
    this.showUuid.setOnChange(() => {
        Settings.general.showUuid = self.showUuid.getValue()
        Editor.selectObjectPanel()
    })
    this.form.add(this.showUuid)
    this.form.nextRow()

    // Blank Space
    this.form.addText("")
    this.form.nextRow()

    // Scene Editor
    this.form.addText("Scene Editor")
    this.form.nextRow()

    // Enable grid
    this.form.addText("Show grid")
    this.gridEnabled = new CheckBox(this.form.element)
    this.gridEnabled.size.set(20, 16)
    this.gridEnabled.setOnChange(() => {
        Settings.editor.gridEnabled = self.gridEnabled.getValue()
        Editor.gridHelper.visible = Settings.editor.gridHelper
    })
    this.form.add(this.gridEnabled)
    this.form.nextRow()

    // Grid size
    this.form.addText("Grid Size")
    this.gridSize = new NumberBox(this.form.element)
    this.gridSize.size.set(60, 18)
    this.gridSize.setRange(0, Number.MAX_SAFE_INTEGER)
    this.gridSize.setStep(0.05)
    this.gridSize.setOnChange(() => {
        Settings.editor.gridSize = self.gridSize.getValue()
        Editor.gridHelper.setSize(Settings.editor.gridSize)
        Editor.gridHelper.update()
    })
    this.form.add(this.gridSize)
    this.form.nextRow()

    // Grid spacing
    this.form.addText("Grid Spacing")
    this.gridSpacing = new NumberBox(this.form.element)
    this.gridSpacing.size.set(60, 18)
    this.gridSpacing.setRange(0, Number.MAX_SAFE_INTEGER)
    this.gridSpacing.setStep(1.0)
    this.gridSpacing.setOnChange(() => {
        Settings.editor.gridSpacing = self.gridSpacing.getValue()
        Editor.gridHelper.setSpacing(Settings.editor.gridSpacing)
        Editor.gridHelper.update()
    })
    this.form.add(this.gridSpacing)
    this.form.nextRow()

    // Enable axis
    this.form.addText("Show Axis")
    this.axisEnabled = new CheckBox(this.form.element)
    this.axisEnabled.size.set(20, 16)
    this.axisEnabled.setOnChange(() => {
        Settings.editor.axisEnabled = self.axisEnabled.getValue()
        Editor.axisHelper.visible = Settings.editor.axisHelper
    })
    this.form.add(this.axisEnabled)
    this.form.nextRow()

    // Mouse lock on camera move
    this.form.addText("Lock mouse editor")
    this.lockMouse = new CheckBox(this.form.element)
    this.lockMouse.size.set(20, 16)
    this.lockMouse.setOnChange(() => {
        Settings.editor.lockMouse = self.lockMouse.getValue()
    })
    this.form.add(this.lockMouse)
    this.form.nextRow()

    // Transformations space
    this.form.addText("Transformations space")
    this.transformationSpace = new DropdownList(this.form.element)
    this.transformationSpace.size.set(150, 20)
    this.transformationSpace.addValue("Local", "local")
    this.transformationSpace.addValue("World", "world")
    this.transformationSpace.setOnChange(() => {
        Settings.editor.transformationSpace = self.transformationSpace.getValue()
        if(Editor.tool !== null && Editor.toolMode !== Editor.MODE_SCALE) {
            Editor.tool.setSpace(Settings.editor.transformationSpace)
        }
    })
    this.form.add(this.transformationSpace)
    this.form.nextRow()

    // Enable camera preview
    this.form.addText("Camera preview")
    this.cameraPreviewEnabled = new CheckBox(this.form.element)
    this.cameraPreviewEnabled.size.set(20, 16)
    this.cameraPreviewEnabled.setOnChange(() => {
        Settings.editor.cameraPreviewEnabled = self.cameraPreviewEnabled.getValue()
    })
    this.form.add(this.cameraPreviewEnabled)
    this.form.nextRow()

    // Camera preview size
    this.form.addText("Preview size")
    this.cameraPreviewPercentage = new Slider(this.form.element)
    this.cameraPreviewPercentage.size.set(120, 18)
    this.cameraPreviewPercentage.setRange(0.05, 0.7)
    this.cameraPreviewPercentage.setStep(0.05)
    this.cameraPreviewPercentage.setOnChange(() => {
        if(self.obj !== null) {
            Settings.editor.cameraPreviewPercentage = self.cameraPreviewPercentage.getValue()
        }
    })
    this.form.add(this.cameraPreviewPercentage)
    this.form.nextRow()

    // Blank space
    this.form.addText("")
    this.form.nextRow()

    // Asset explorer
    this.form.addText("Asset explorer")
    this.form.nextRow()

    // File preview size
    this.form.addText("Preview size")
    this.filePreviewSize = new NumberBox(this.form.element)
    this.filePreviewSize.size.set(60, 18)
    this.filePreviewSize.setRange(60, 500)
    this.filePreviewSize.setStep(1)
    this.filePreviewSize.setOnChange(() => {
        var value = self.filePreviewSize.getValue()
        Settings.general.filePreviewSize = value
        Interface.assetExplorer.filesSize.set(value, value)
        Editor.updateAssetExplorer()
    })
    this.form.add(this.filePreviewSize)
    this.form.nextRow()

    // Blank Space
    this.form.addText("")
    this.form.nextRow()

    // Renderer settigns
    this.form.addText("Rendering Quality")
    this.form.nextRow()

    // Use project settings
    this.form.addText("Follow project settings")
    this.followProject = new CheckBox(this.form.element)
    this.followProject.size.set(20, 16)
    this.followProject.setOnChange(() => {
        Settings.render.followProject = self.followProject.getValue()
    })
    this.form.add(this.followProject)
    this.form.nextRow()

    // Antialiasing
    this.form.addText("Antialiasing")
    this.antialiasing = new CheckBox(this.form.element)
    this.antialiasing.size.set(20, 16)
    this.antialiasing.setOnChange(() => {
        Settings.render.antialiasing = self.antialiasing.getValue()
    })
    this.form.add(this.antialiasing)
    this.form.nextRow()

    // Shadows
    this.form.addText("Shadows")
    this.shadows = new CheckBox(this.form.element)
    this.form.size.set(20, 15)
    this.shadows.setOnChange(() => {
        Settings.render.shadows = self.shadows.getValue()
    })
    this.form.add(this.shadows)
    this.form.nextRow()

    // Shadows settings
    this.form.addText("Shadows Type")
    this.shadowsType = new DropdownList(this.form.element)
    this.shadowsType.size.set(150, 20)
    this.shadowsType.addValue("Basic", THREE.BasicShadowMap)
    this.shadowsType.addValue("PCF", THREE.PCFShadowMap)
    this.shadowsType.addValue("PCF Soft", THREE.PCFSoftShadowMap)
    this.shadowsType.setOnChange(() => {
        Settings.render.shadowsType = self.shadowsType.getValue()
    })
    this.form.add(this.shadowsType)
    this.form.nextRow()
}

GeneralSettingsTab.prototype = Object.create(TabElement.prototype)

// Update container object data
GeneralSettingsTab.prototype.updateMetadata = function(container) {}

// Activate
GeneralSettingsTab.prototype.activate = function() {
    Editor.setState(Editor.STATE_IDLE)

	//General
	this.theme.setValue(Settings.general.theme)
	this.filePreviewSize.setValue(Settings.general.filePreviewSize)
	this.showStats.setValue(Settings.general.showStats)
    this.showUuid.setValue(Settings.general.showUuid)

	//Editor
	this.gridEnabled.setValue(Settings.editor.gridEnabled)
	this.gridSize.setValue(Settings.editor.gridSize)
	this.gridSpacing.setValue(Settings.editor.gridSpacing)
	this.axisEnabled.setValue(Settings.editor.axisEnabled)
	this.lockMouse.setValue(Settings.editor.lockMouse)
	this.transformationSpace.setValue(Settings.editor.transformationSpace)
	this.cameraPreviewEnabled.setValue(Settings.editor.cameraPreviewEnabled)
	this.cameraPreviewPercentage.setValue(Settings.editor.cameraPreviewPercentage)

	//Render
	this.followProject.setValue(Settings.render.followProject)
	this.antialiasing.setValue(Settings.render.antialiasing)
	this.shadows.setValue(Settings.render.shadows)
	this.shadowsType.setValue(Settings.render.shadowsType)
}

// Update division size
GeneralSettingsTab.prototype.updateInterface = function() {
    // Set visibility
    if(this.visible) {
        this.element.style.visibility = "visible"
    } else {
        this.element.style.visibility = "hidden"
    }

    // Form
    this.form.visible = this.visible
    this.form.updateInterface()

    // Update base element
    this.element.style.top = this.position.y + "px"
    this.element.style.left = this.position.x + "px"
    this.element.style.width = this.size.x + "px"
    this.element.style.height = this.size.y + "px"
}
