"use strict"

function CodeSettingsTab(parent, closeable, container, index) {
    TabElement.call(this, parent, closeable, container, index, "Code Editor", "Source/Editor/Files/Icons/Script/Script.png")

    this.element.style.overflow = "auto"

    // Self pointer
    var self = this

    // Form
    this.form = new Form(this.element)
    this.form.defaultTextWidth = 125
    this.form.position.set(5, 5)
    this.form.spacing.set(5, 5)

    // Code editor text
    this.form.addText("Code Editor")
    this.form.nextRow()

    // Code theme
    this.form.addText("Editor Theme")
    this.codeTheme = new DropdownList(this.form.element)
    this.codeTheme.size.set(120, 20)
    this.codeTheme.setOnChange(() => {
        Settings.code.theme = self.codeTheme.getValue()
    })
    this.form.add(this.codeTheme)
    this.form.nextRow()

    // Get codemirror themes available
    var files = FileSystem.getFilesDirectory("Libraries/codemirror/theme/")
    for(var i = 0; i < files.length; i++) {
        var theme = files[i].replace(".css", "")
        this.codeTheme.addValue(theme, theme)
    }

    // Code keymap
    this.form.addText("Key bindings")
    this.codeKeymap = new DropdownList(this.form.element)
    this.codeKeymap.size.set(120, 20)
    this.codeKeymap.addValue("codemirror", "default")
    this.codeKeymap.addValue("sublime", "sublime")
    this.codeKeymap.addValue("vim", "vim")
    this.codeKeymap.addValue("emacs", "emacs")
    this.codeKeymap.setOnChange(() => {
        Settings.code.keymap = self.codeKeymap.getValue()
    })
    this.form.add(this.codeKeymap)
    this.form.nextRow()

    // Code font size
    this.form.addText("Font size")
    this.codeFontSize = new NumberBox(this.form.element)
    this.codeFontSize.size.set(60, 18)
    this.codeFontSize.setRange(5, 9999)
    this.codeFontSize.setStep(1)
    this.codeFontSize.setOnChange(() => {
        Settings.code.fontFize = self.codeFontSize.getValue()
    })
    this.form.add(this.codeFontSize)
    this.form.nextRow()

    // Show line numbers
    this.form.addText("Show line numbers")
    this.codeLineNumbers = new CheckBox(this.form.element)
    this.codeLineNumbers.size.set(20, 16)
    this.codeLineNumbers.setOnChange(() => {
        Settings.code.lineNumbers = self.codeLineNumbers.getValue()
    })
    this.form.add(this.codeLineNumbers)
    this.form.nextRow()

    // Line wrapping
    this.form.addText("Line wrap")
    this.codeLineWrapping = new CheckBox(this.form.element)
    this.codeLineWrapping.size.set(20, 16)
    this.codeLineWrapping.setOnChange(() => {
        Settings.code.lineWrapping = self.codeLineWrapping.getValue()
    })
    this.form.add(this.codeLineWrapping)
    this.form.nextRow()

    // Auto close brackets
    this.form.addText("Auto close brackets")
    this.codeAutoCloseBrackets = new CheckBox(this.form.element)
    this.codeAutoCloseBrackets.size.set(20, 16)
    this.codeAutoCloseBrackets.setOnChange(() => {
        Settings.code.autoCloseBrackets = self.codeAutoCloseBrackets.getValue()
    })
    this.form.add(this.codeAutoCloseBrackets)
    this.form.nextRow()

    // Highlight active line
    this.form.addText("Highlight line")
    this.codeHighlightActiveLine = new CheckBox(this.form.element)
    this.codeHighlightActiveLine.size.set(20, 16)
    this.codeHighlightActiveLine.setOnChange(() => {
        Settings.code.highlightActiveLine = self.codeHighlightActiveLine.getValue()
    })
    this.form.add(this.codeHighlightActiveLine)
    this.form.nextRow()
}

CodeSettingsTab.prototype = Object.create(TabElement.prototype)

// Activate
CodeSettingsTab.prototype.activate = function() {
    Editor.setState(Editor.STATE_IDLE)

	this.codeTheme.setValue(Settings.code.theme)
	this.codeFontSize.setValue(Settings.code.fontSize)
	this.codeKeymap.setValue(Settings.code.keymap)
	this.codeLineNumbers.setValue(Settings.code.lineNumbers)
	this.codeLineWrapping.setValue(Settings.code.lineWrapping)
	this.codeAutoCloseBrackets.setValue(Settings.code.autoCloseBrackets)
	this.codeHighlightActiveLine.setValue(Settings.code.highlightActiveLine)
}

// Update division size
CodeSettingsTab.prototype.updateInterface = function() {
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
