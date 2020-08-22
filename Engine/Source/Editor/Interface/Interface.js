"use strict"

function Interface() {}

// Initialise interface
Interface.initialize = function() {
	// File directory
	Interface.fileDir = "Source/Editor/Files/"

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab = new TabGroup()

	// ------------------------------------ Asset Manager ------------------------------------
	Interface.assetExplorerDiv = new DivisionResizable()
	Interface.assetExplorerDiv.resizableSide = DivisionResizable.TOP
	Interface.assetExplorerDiv.size.y = 210
	Interface.assetExplorerDiv.resizeSizeMin = 100
	Interface.assetExplorerDiv.resizeSizeMax = 400

	// Asset split
	Interface.assetSplit = new DualDivisionResizable(Interface.assetExplorerDiv.element)
	Interface.assetSplit.orientation = DualDivisionResizable.HORIZONTAL
	Interface.assetSplit.tabPosition = 0.12
	Interface.assetSplit.setOnResize(() => {
		Interface.assetSplit.updateInterface()
		Interface.foldersExplorer.updateInterface()
		Interface.assetExplorer.updateInterface()
	})

	// Folders explorer
	Interface.foldersExplorer = new FolderTree(Interface.assetSplit.divA)

	// Asset Explorer
	Interface.assetExplorer = new AssetExplorer(Interface.assetSplit.divB)
	Interface.assetExplorer.filesSize.set(Settings.general.filePreviewSize, Settings.general.filePreviewSize)
	Interface.assetExplorer.fitParent = true

	// Asset Explorer menu bar
	Interface.assetExplorerBar = new Bar(Interface.assetExplorerDiv.element)
	Interface.assetExplorerBar.position.set(0, 0)
	Interface.assetExplorerBar.size.y = 20

	// Create an asset
	Interface.assetNew = new DropdownMenu(Interface.assetExplorerBar.element)
	Interface.assetNew.setText("Add New")
	Interface.assetNew.size.set(100, Interface.assetExplorerBar.size.y)
	Interface.assetNew.position.set(0, 0)
	Interface.assetNew.element.style.backgroundColor = Editor.theme.specialColor

	Interface.assetNew.element.onmouseover = function() {
        Interface.assetNew.expanded = true
		Interface.assetNew.updateInterface()
		Interface.assetNew.element.style.cursor = "pointer"
		Interface.assetNew.element.style.backgroundColor = Editor.theme.specialOverColor
	}

	Interface.assetNew.element.onmouseleave = function() {
		Interface.assetNew.expanded = false
		Interface.assetNew.updateInterface()
		Interface.assetNew.element.style.cursor = "default"
		Interface.assetNew.element.style.backgroundColor = Editor.theme.specialColor
	}

	// Create materials
	var assetMaterial = Interface.assetNew.addMenu("Materials", Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterial.addOption("Standard Material", () => {
		var material = new MeshStandardMaterial()
		material.name = "standard"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterial.addOption("Phong Material", () => {
		var material = new MeshPhongMaterial()
		material.name = "phong"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterial.addOption("Basic Material", () => {
		var material = new MeshBasicMaterial()
		material.name = "basic"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterial.addOption("Sprite Material", () => {
		var material = new SpriteMaterial({color: 0xffffff})
		material.name = "sprite"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

    assetMaterial.addOption("Toon Material", () => {
        var material = new MeshToonMaterial()
        material.name = "toon"
        material.path = Editor.CURRENT_PATH
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterial.addOption("Lambert Material", () => {
		var material = new MeshLambertMaterial()
		material.name = "lambert"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	var assetMaterialOthers = assetMaterial.addMenu("Others")
	assetMaterialOthers.addOption("Shader Material", () => {
		var material = new MeshShaderMaterial()
		material.name = "shader"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterialOthers.addOption("Normal Material", () => {
		var material = new MeshNormalMaterial()
		material.name = "normal"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

	assetMaterialOthers.addOption("Depth Material", () => {
		var material = new MeshDepthMaterial()
		material.name = "depth"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Material.png")

    Interface.assetNew.addOption("Folder", () => {
		var folder = new Folder()
		folder.path = Editor.CURRENT_PATH
		Editor.program.addFolder(folder)
		Editor.updateAssetExplorer()
	}, Interface.fileDir + "Icons/Misc/Folder.png")

	Interface.assetNew.addOption("Blocks", () => {
		var obj = new BlockScript(undefined, undefined, "class")
		obj.name = "class"
		obj.path = Editor.CURRENT_PATH
		Editor.program.addObject(obj)
		Editor.updateAssetExplorer()
	}, Interface.fileDir + "Icons/Script/Blocks.png")

	// Import a file
	Interface.assetFile = new DropdownMenu(Interface.assetExplorerBar.element)
	Interface.assetFile.setText("Import")
	Interface.assetFile.size.set(100, Interface.assetExplorerBar.size.y)
	Interface.assetFile.position.set(100, 0)

    // 3D Models Loader
    Interface.assetFile.addOption("3D Models", () => {
        FileSystem.chooseFile((files) => {
            if(files.length > 0) {
                var file = files[0].path
                var path = FileSystem.getFilePath(file)
                var extension = FileSystem.getFileExtension(file)

                // Wavefront OBJ
                if(extension === "obj") {
                    var mtl = FileSystem.getNameWithoutExtension(file) + ".mtl"
                    var loader = new THREE.OBJLoader()

                    if(FileSystem.fileExists(mtl)) {
                        var mtlLoader = new THREE.MTLLoader()
                        mtlLoader.setPath(path)
                        var materials = mtlLoader.parse(FileSystem.readFile(mtl))

                        loader.setMaterials(materials)
                    }

                    var obj = loader.parse(FileSystem.readFile(file))

                    // TODO: Clean this
                    if(obj.children.length > 0) {
                        for(var i in obj.children) {
                            var child = obj.children[i]

                            if(child.material !== undefined && child.material instanceof THREE.Material) {
                                child.material.setPath(Editor.CURRENT_PATH)
                            }
                        }
                    }

                    Editor.addToScene(obj)
                }
                // Collada
                else if(extension === "dae") {
                    var loader = new THREE.ColladaLoader()
                    loader.options.convertUpAxis = true
                    var collada = loader.parse(FileSystem.readFile(file))
                    var scene = collada.scene
    
                    // TODO: Clean this
                    var children = scene.children
                    if(children.length > 0) {
                        for(var i in children) {
                            var child = children[i]
                            if(child.children.length > 0) {
                                for(var k in child.children) {
                                    var _child = child.children[k]
                                    if(_child.material !== undefined) {
                                        _child.material.setPath(Editor.CURRENT_PATH)
                                    }
                                }
                            }
                        }
                    }

                    Editor.addToScene(scene)
                }
                // GLTF
                else if(extension === "gltf") {
                    var loader = new THREE.GLTFLoader()
                    var gltf = loader.parse(FileSystem.readFile(file))
                    
                    // TODO: Store materials in Editor.CURRENT_PATH

                    if(gltf.scene !== undefined) {
                        Editor.addToScene(gltf.scene)
                    }
                }
                // AWD
                else if(extension === "awd") {
                    var loader = new THREE.AWDLoader()
                    var awd = loader.parse(FileSystem.readFileArrayBuffer(file))

                    // TODO: Store materials in Editor.CURRENT_PATH
                    
                    Editor.addToScene(awd)
                }
                // PLY
                else if(extension === "ply") {
                    var loader = new THREE.PLYLoader()
                    var geometry = loader.parse(FileSystem.readFile(file))

                    // TODO: Store materials in Editor.CURRENT_PATH

                    Editor.addToScene(new Mesh(geometry))
                }
                // VTK
                else if(extension === "vtk" || extension === "vtp") {
                    var loader = new THREE.VTKLoader()
                    var geometry = loader.parse(FileSystem.readFileArrayBuffer(file))

                    // TODO: Store materials in Editor.CURRENT_PATH
                    
                    Editor.addToScene(new Mesh(geometry))
                }
                // VRML
                else if(extension === "wrl" || extension === "vrml") {
                    var loader = new THREE.VRMLLoader()
                    var scene = loader.parse(FileSystem.readFile(file))

                    // TODO: Store materials in Editor.CURRENT_PATH

                    for(var i = 0; i < scene.children.length; i++) {
                        Editor.addToScene(scene.children[i])
                    }
                }
                // FBX
                else if(extension === "fbx") {
                    var loader = new THREE.FBXLoader()
                    var obj = loader.parse(FileSystem.readFile(file))

                    // TODO: Store materials in Editor.CURRENT_PATH

                    Editor.addToScene(obj)
                }
                // PCD Point Cloud Data
                else if(extension === "pcd") {
                    var loader = new THREE.PCDLoader()
                    var pcd = loader.parse(FileSystem.readFileArrayBuffer(file), file)
                    pcd.name = FileSystem.getFileName(file)
                    pcd.material.name = "points"
                    pcd.material.setPath(Editor.CURRENT_PATH)
                    Editor.addToScene(pcd)
                }
                // THREE JSON Model
                else if(extension === "json"){
                    var loader = new THREE.JSONLoader()
                    var data = loader.parse(JSON.parse(FileSystem.readFile(file)))
                    var materials = data.materials
                    var geometry = data.geometry

                    // Create Material object
                    var material = null

                    if(materials === undefined || materials.length === 0) {
                        material = new MeshStandardMaterial()
                        material.name = "standard"
                        material.path = Editor.CURRENT_PATH
                    } else if(materials.length === 1) {
                        material = materials[0]
                        material.path = Editor.CURRENT_PATH
                    } else if(materials.length > 1) {
                        material = THREE.MultiMaterial(materials)

                        // TODO: Store materials in Editor.CURRENT_PATH

                    }

                    // Create model
                    var model = null
                    if(geometry.bones.length > 0) {
                        model = new SkinnedMesh(geomerty, material)
                    } else {
                        model = new Mesh(geometry, material)
                    }

                    Editor.addToScene(model)
                }
            }
        }, ".obj, .dae, .gltf, .awd, .ply, .vtk, .vtp, .wrl, .vrml, .fbx, .pcd, .json")
    }, Interface.fileDir + "Icons/Models/Models.png")

    // Textures menu
    var importTexture = Interface.assetFile.addMenu("Texture", Interface.fileDir + "Icons/Misc/Image.png")

	// Image Texture
    importTexture.addOption("Texture", () => {
		FileSystem.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var name = FileSystem.getFileName(file)

				var texture = new Texture(new GORLOT.Image(file))
				texture.name = name
				Editor.program.addTexture(texture)
				Editor.updateObjectViews()
			}
		}, "image/*")
	}, Interface.fileDir + "Icons/Misc/Image.png")

	// Text Texture
	importTexture.addOption("Canvas Texture", () => {
        var texture = new CanvasTexture(512, 512)
        texture.name = "canvas"
        Editor.program.addTexture(texture)

        Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Image.png")

	// Video Texture
	importTexture.addOption("Video Texture", () => {
		FileSystem.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var name = FileSystem.getFileName(file)

				var texture = new VideoTexture(new Video(file))
				texture.name = name
				Editor.program.addTexture(texture)
				Editor.updateObjectViews()
			}
		}, "video/*")
	}, Interface.fileDir + "Icons/Misc/Video.png")

	// Webcam Texture
	importTexture.addOption("Webcam Texture", () => {
		var texture = new WebcamTexture()
		texture.name = "webcam"
		Editor.program.addTexture(texture)
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Hw/Webcam.png")

    // Load Spine Animation
    Interface.assetFile.addOption("Spine Animation", () => {
		FileSystem.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path

				var json = FileSystem.readFile(file)
				var atlas = FileSystem.readFile(file.replace("json", "atlas"))
				var path = file.substring(0, file.lastIndexOf("/"))

				var animation = new SpineAnimation(json, atlas, path)
				animation.name = FileSystem.getFileName(file)

				Editor.addToScene(animation)
				Editor.updateObjectViews()
			}
		}, ".json")
	}, Interface.fileDir + "Icons/Animation/Spine.png")

	// Load font
	Interface.assetFile.addOption("Font", () => {
		FileSystem.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new TTFLoader()

				if (confirm("Reverse font glyphs?")) {
					loader.reversed = true
				}

				var font = new Font(file)
				font.name = FileSystem.getFileName(file)

				Editor.program.addFont(font)
				Editor.updateObjectViews()
			}
		}, ".json, ttf, .otf")
	}, Interface.fileDir + "Icons/Misc/Font.png")

	// Load audio file
	Interface.assetFile.addOption("Audio", () => {
		FileSystem.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path

				var audio = new Audio(new Audio(file))
				audio.name = FileSystem.getFileName(file)

				Editor.program.addAudio(audio)

                var emitter = new AudioEmitter(audio)
                emitter.name = audio.name
                Editor.addToScene(emitter)

                Editor.updateObjectViews()
			}
		}, "audio/*")
	}, Interface.fileDir + "Icons/Misc/Audio.png")

	// ------------------------------------ Explorer ------------------------------------
	Interface.explorer = new DivisionResizable()
	Interface.explorer.size.x = 300
	Interface.explorer.resizeSizeMin = 100
	Interface.explorer.setOnResize(() => {
		Interface.updateInterface()
		if (Interface.panel !== null) {
			Interface.panel.updateInterface()
		}
	})

	Interface.explorerResizable = new DualDivisionResizable(Interface.explorer.element)
	Interface.explorerResizable.orientation = DualDivisionResizable.VERTICAL
	Interface.explorerResizable.tabPosition = 0.4
	Interface.explorerResizable.setOnResize(() => {
		Interface.explorerResizable.updateInterface()
		Interface.treeView.updateInterface()
		if (Interface.panel !== null) {
			Interface.panel.updateInterface()
		}
	})

	// Project Explorer
	Interface.treeView = new TreeView(Interface.explorerResizable.divA)

	// Object Components
	Interface.panel = new Panel(Interface.explorerResizable.divB)

	// ------------------------------------ Left Div ------------------------------------
	Interface.leftDiv = new DivisionResizable()
	Interface.leftDiv.resizableSide = DivisionResizable.RIGHT
	Interface.leftDiv.size.x = 300
	Interface.leftDiv.resizeSizeMin = 300
	Interface.leftDiv.resizeSizeMax = 305
	Interface.leftDiv.element.style.pointerEvents = "auto"

	Interface.leftTabs = new TabGroup(Interface.leftDiv.element)
	Interface.leftTabs.buttonSize.set(100, 30)
	Interface.leftTabs.element.style.cursor = "default"
	Interface.leftTabs.element.style.backgroundColor = Editor.theme.barColor
	Interface.leftTabs.mode = TabGroup.LEFT
	Interface.leftTabs.updateInterface()

    Interface.basicTab = Interface.leftTabs.addTab(ObjectChooserBasicTab, false)
	Interface.basicTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.basicTab.element.style.overflowY = "auto"

	Interface.lightsTab = Interface.leftTabs.addTab(ObjectChooserLightingTab, false)
	Interface.lightsTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.lightsTab.element.style.overflowY = "auto"

	Interface.cinematicTab = Interface.leftTabs.addTab(ObjectChooserCinematicTab, false)
	Interface.cinematicTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.cinematicTab.element.style.overflowY = "auto"

	Interface.effectsTab = Interface.leftTabs.addTab(ObjectChooserEffectsTab, false)
	Interface.effectsTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.effectsTab.element.style.overflowY = "auto"

	Interface.physicsTab = Interface.leftTabs.addTab(ObjectChooserPhysicsTab, false)
	Interface.physicsTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.physicsTab.element.style.overflowY = "auto"

	Interface.hwTab = Interface.leftTabs.addTab(ObjectChooserDeviceTab, false)
	Interface.hwTab.element.style.backgroundColor = Editor.theme.barColor
	Interface.hwTab.element.style.overflowY = "auto"

    Interface.leftTabs.selectTab(0)

	// ------------------------------------ Top Bar ------------------------------------
	Interface.topBar = new Bar()
	Interface.topBar.size.y = 25

	// Editor Logo
	Interface.image = new ImageBox()
	Interface.image.setImage("Source/Editor/Files/Logo.png")
	Interface.image.size.set(108, 18)
	Interface.image.updateInterface()

	// File
	Interface.file = new DropdownMenu()
	Interface.file.setText("File")
	Interface.file.size.set(120, Interface.topBar.size.y)
	Interface.file.position.set(0, 0)

	// New Project
	Interface.file.addOption("New", () => {
		Interface.newProgram()
	}, Interface.fileDir + "Icons/Misc/New.png")

	// Save Project
	Interface.file.addOption("Save", () => {
        if(Editor.openFile !== null) {
            Editor.saveProgram(undefined, false)
        } else {
            Interface.saveProgram()
        }
    }, Interface.fileDir + "Icons/Misc/Save.png")

    // Save project as
    Interface.file.addOption("Save As", () => {
        Interface.saveProgram()()
    }, Interface.fileDir + "Icons/Misc/Save.png")

	// Load Project
	Interface.file.addOption("Load", () => {
		Interface.loadProgram()
	})

    // Console
    Interface.file.addOption("Console", () => {
        var tab = Interface.tab.getTab(ConsoleTab)
        if(tab === null ){
            tab = Interface.tab.addTab(ConsoleTab, true)
        }
        tab.select()
    }, Interface.fileDir + "Icons/Misc/Console.png")

	var publish = Interface.file.addMenu("Export")

	publish.addOption("Web", () => {
		FileSystem.chooseFile((files) => {
			try {
				Editor.exportWebProject(files[0].path)
				alert("Project exported")
			} catch(e) {
				alert("Error exporting project (" + e + ")")
			}
		}, "", Editor.program.name)
	}, Interface.fileDir + "Icons/Platform/Web.png")

	publish.addOption("Windows", () => {
		FileSystem.chooseFile((files) => {
			try {
				Editor.exportWindowsProject(files[0].path)
			} catch(e) {
				alert("Error exporting project (" + e + ")")
			}
		}, "", Editor.program.name)
	}, Interface.fileDir + "Icons/Platform/Windows.png")

	publish.addOption("Linux", () => {
		alert("TODO: This")
	}, Interface.fileDir + "Icons/Platform/Linux.png")

	publish.addOption("macOS", () => {
		alert("TODO: This")
	}, Interface.fileDir + "Icons/Platform/OSX.png")

	Interface.file.addOption("Exit", () => {
		if (confirm("All unsaved changes to the project will be lost! Do you really want to exit?")) {
			Editor.exit()
		}
	}, Interface.fileDir + "Icons/Misc/Exit.png")

	// Edit
	Interface.editor = new DropdownMenu()
	Interface.editor.setText("Edit")
	Interface.editor.size.set(100, Interface.topBar.size.y)
	Interface.editor.position.set(120, 0)

	Interface.editor.addOption("Undo", () => {
		Editor.undo()
	}, Interface.fileDir + "Icons/Misc/Undo.png")

	Interface.editor.addOption("Redo", () => {
		Editor.redo()
	}, Interface.fileDir + "Icons/Misc/Redo.png")

	Interface.editor.addOption("Copy", () => {
		Editor.copyObject()
	}, Interface.fileDir + "Icons/Misc/Copy.png")

	Interface.editor.addOption("Cut", () => {
		Editor.cutObject()
	}, Interface.fileDir + "Icons/Misc/Cut.png")

	Interface.editor.addOption("Paste", () => {
		Editor.pasteObject()
	}, Interface.fileDir + "Icons/Misc/Paste.png")

	Interface.editor.addOption("Delete", () => {
		Editor.deleteObject()
	}, Interface.fileDir + "Icons/Misc/Delete.png")

	Interface.editor.addOption("Settings", () => {
        var tab = Interface.tab.getTab(SettingsTab)
        if(tab === null) {
            tab = Interface.tab.addTab(SettingsTab, true)
        }
        tab.select()
	}, Interface.fileDir + "Icons/Misc/Settings.png")

	// Project
	Interface.project = new DropdownMenu()
	Interface.project.setText("Project")
	Interface.project.size.set(100, Interface.topBar.size.y)
	Interface.project.position.set(220, 0)

	Interface.project.addOption("Create Scene", () => {
		Editor.program.addDefaultScene()
		Editor.updateObjectViews()
	}, Interface.fileDir + "Icons/Misc/Add.png")

	Interface.project.addOption("Execute Script", () => {
		FileSystem.chooseFile((files) => {
			try {
				if (files.length > 0) {
					var code = FileSystem.readFile(files[0].path)
					var func = Function(code)
					func()
				}
			} catch(e) {
				alert("Error: " + e)
			}
		}, ".js")
	}, Interface.fileDir + "Icons/Script/Script.png")

	// About
	Interface.about = new Button()
	Interface.about.setText("About")
	Interface.about.size.set(100, Interface.topBar.size.y)
	Interface.about.position.set(320, 0)
	Interface.about.updateInterface()
	Interface.about.setCallback(() => {
        var tab = Interface.tab.getTab(AboutTab)
        if(tab === null) {
            tab = Interface.tab.addTab(AboutTab, true)
        }
        tab.select()
	})

	// Run
	Interface.run = new Button()
	Interface.run.setText("Run")
	Interface.run.size.set(100, Interface.topBar.size.y)
	Interface.run.position.set(420, 0)
	Interface.run.updateInterface()
	Interface.run.setCallback(() => {
		if (Editor.state === Editor.STATE_EDITING) {
			Editor.setState(Editor.STATE_TESTING)
		} else if (Editor.state === Editor.STATE_TESTING) {
			Editor.setState(Editor.STATE_EDITING)
		}
	})
}

// Loop pdate elements
Interface.update = function() {
	Interface.leftDiv.update()
	Interface.explorer.update()
	Interface.assetExplorerDiv.update()
	Interface.explorerResizable.update()
	Interface.assetSplit.update()
	Interface.tab.update()
}

// Update interface
Interface.updateInterface = function() {
	// Window size
	var size = new THREE.Vector2(window.innerWidth, window.innerHeight)

	// ------------------------------------ Menu Top Bar ------------------------------------
	Interface.topBar.size.x = size.x
	Interface.topBar.updateInterface()

	// Logo
	Interface.image.position.set(size.x - Interface.image.size.x, 3)
	Interface.image.updateInterface()

	// ------------------------------------ Project Explorer ------------------------------------
	Interface.explorer.size.y = (size.y - Interface.topBar.size.y)
	Interface.explorer.position.set(size.x - Interface.explorer.size.x, Interface.topBar.size.y)
	Interface.explorer.resizeSizeMax = size.x * 0.7
	Interface.explorer.updateInterface()

	Interface.explorerResizable.size.set(Interface.explorer.size.x - Interface.explorer.resizeTabSize, Interface.explorer.size.y)
	Interface.explorerResizable.updateInterface()

	Interface.treeView.updateInterface()

    if(Interface.panel !== null) {
        Interface.panel.updateInterface()
    }

	// ------------------------------------ Asset Explorer ------------------------------------
	Interface.assetExplorerDiv.size.x = size.x - Interface.explorer.size.x
	Interface.assetExplorerDiv.position.set(0, size.y - Interface.assetExplorerDiv.size.y)
	Interface.assetExplorerDiv.resizeSizeMax = size.y * 0.6
	Interface.assetExplorerDiv.updateInterface()

	Interface.assetExplorerBar.size.x = Interface.assetExplorerDiv.size.x
	Interface.assetExplorerBar.updateInterface()

	Interface.assetSplit.size.x = Interface.assetExplorerDiv.size.x
	Interface.assetSplit.position.y = Interface.assetExplorerBar.size.y
	Interface.assetSplit.size.y = Interface.assetExplorerDiv.size.y - Interface.assetExplorer.position.y
	Interface.assetSplit.updateInterface()

	Interface.foldersExplorer.updateInterface()

	// ------------------------------------ Left Div ------------------------------------
	Interface.leftDiv.position.set(0, Interface.topBar.size.y)
	Interface.leftDiv.size.y = size.y - Interface.assetExplorerDiv.size.y - Interface.topBar.size.y //size.y - Interface.top_bar.size.y
	Interface.leftDiv.updateInterface()

	Interface.leftTabs.size.copy(Interface.leftDiv.size)
	Interface.leftTabs.updateInterface()

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab.position.set(Interface.leftDiv.size.x, Interface.topBar.size.y)
	Interface.tab.size.x = (size.x - Interface.leftDiv.size.x - Interface.explorer.size.x)
	Interface.tab.size.y = (size.y - Interface.topBar.size.y - Interface.assetExplorerDiv.size.y)
	Interface.tab.updateInterface()

	// Resize editor camera
	Editor.resizeCamera()
}

// Open the save program window
Interface.saveProgram = function() {
	FileSystem.chooseFile((files) => {
		try {
			Editor.saveProgram(files[0].path)
			alert("Program saved")
		} catch(e) {
			alert("Error saving file\n(" + e + ")")
		}
	}, ".isp", true)
}

// Open the load program window
Interface.loadProgram = function() {
	if (confirm("All unsaved changes to the project will be lost! Load file?")) {
		FileSystem.chooseFile((files) => {
			try {
				Editor.loadProgram(files[0].path)
				Editor.resetEditingFlags()
				Editor.updateObjectViews()
				alert("Project loaded")
			} catch(e) {
				alert("Error loading file\n(" + e + ")")
			}
		}, ".isp")
	}
}

// Interface element to create new program
Interface.newProgram = function() {
	if (confirm("All unsaved changes to the project will be lost! Create new file?")) {
		Editor.createNewProgram()
		Editor.updateObjectViews()
	}
}
