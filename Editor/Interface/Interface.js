"use strict"

function Interface() {}

// Initialise interface
Interface.initialize = function() {
	// File directory
	Interface.file_dir = "Editor/Files/"

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab = new TabGroup()

	// ------------------------------------ Asset Manager ------------------------------------
	Interface.asset_explorer_div = new DivisionResizable()
	Interface.asset_explorer_div.resizable_side = DivisionResizable.TOP
	Interface.asset_explorer_div.size.y = 210
	Interface.asset_explorer_div.resize_size_min = 100
	Interface.asset_explorer_div.resize_size_max = 400

	// Asset split
	Interface.asset_split = new DualDivisionResizable(Interface.asset_explorer_div.element)
	Interface.asset_split.orientation = DualDivisionResizable.HORIZONTAL
	Interface.asset_split.tab_position = 0.12
	Interface.asset_split.setOnResize(() => {
		Interface.asset_split.updateInterface()
		Interface.folders_explorers.updateInterface()
		Interface.asset_explorer.updateInterface()
	})

	// Folders explorer
	Interface.folders_explorers = new FolderTree(Interface.asset_split.div_a)

	// Asset Explorer
	Interface.asset_explorer = new AssetExplorer(Interface.asset_split.div_b)
	Interface.asset_explorer.files_size.set(Settings.general.file_preview_size, Settings.general.file_preview_size)
	Interface.asset_explorer.fit_parent = true

	// Asset Explorer menu bar
	Interface.asset_explorer_bar = new Bar(Interface.asset_explorer_div.element)
	Interface.asset_explorer_bar.position.set(0, 0)
	Interface.asset_explorer_bar.size.y = 20

	// Create an asset
	Interface.asset_new = new DropdownMenu(Interface.asset_explorer_bar.element)
	Interface.asset_new.setText("Add New")
	Interface.asset_new.size.set(100, Interface.asset_explorer_bar.size.y)
	Interface.asset_new.position.set(0, 0)
	Interface.asset_new.element.style.backgroundColor = Editor.theme.special_color

	Interface.asset_new.element.onmouseover = function() {
		Interface.asset_new.expanded = true
		Interface.asset_new.updateInterface()
		Interface.asset_new.element.style.cursor = "pointer"
		Interface.asset_new.element.style.backgroundColor = Editor.theme.special_over_color
	}

	Interface.asset_new.element.onmouseleave = function() {
		Interface.asset_new.expanded = false
		Interface.asset_new.updateInterface()
		Interface.asset_new.element.style.cursor = "default"
		Interface.asset_new.element.style.backgroundColor = Editor.theme.special_color
	}

	// Create materials
	var asset_material = Interface.asset_new.addMenu("Materials", Interface.file_dir + "Icons/Misc/Material.png")

	asset_material.addOption("Standard Material", () => {
		var material = new MeshStandardMaterial()
		material.name = "standard"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material.addOption("Phong Material", () => {
		var material = new MeshPhongMaterial()
		material.name = "phong"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material.addOption("Basic Material", () => {
		var material = new MeshBasicMaterial()
		material.name = "basic"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material.addOption("Sprite Material", () => {
		var material = new SpriteMaterial({color: 0xffffff})
		material.name = "sprite"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

    asset_material.addOption("Toon Material", () => {
        var material = new MeshToonMaterial()
        material.name = "toon"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material.addOption("Lambert Material", () => {
		var material = new MeshLambertMaterial()
		material.name = "lambert"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	var asset_material_others = asset_material.addMenu("Others")
	asset_material_others.addOption("Shader Material", () => {
		var material = new MeshShaderMaterial()
		material.name = "shader"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material_others.addOption("Normal Material", () => {
		var material = new MeshNormalMaterial()
		material.name = "normal"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

	asset_material_others.addOption("Depth Material", () => {
		var material = new MeshDepthMaterial()
		material.name = "depth"
		material.path = Editor.CURRENT_PATH
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Material.png")

    Interface.asset_new.addOption("Folder", () => {
		var folder = new Folder()
		folder.path = Editor.CURRENT_PATH
		Editor.program.addFolder(folder)
		Editor.updateAssetExplorer()
	}, Interface.file_dir + "Icons/Misc/Folder.png")

	Interface.asset_new.addOption("Class Blocks", () => {
		var obj = new BlockScript(undefined, undefined, "class")
		obj.name = "class"
		obj.path = Editor.CURRENT_PATH
		Editor.program.addObject(obj)
		Editor.updateAssetExplorer()
	}, Interface.file_dir + "Icons/Script/Blocks.png")

	// Import a file
	Interface.asset_file = new DropdownMenu(Interface.asset_explorer_bar.element)
	Interface.asset_file.setText("Import")
	Interface.asset_file.size.set(100, Interface.asset_explorer_bar.size.y)
	Interface.asset_file.position.set(100, 0)

    // 3D Models Loader
    Interface.asset_file.addOption("3D Models", () => {
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
                        var mtl_loader = new THREE.MTLLoader()
                        mtl_loader.setPath(path)
                        var materials = mtl_loader.parse(FileSystem.readFile(mtl))

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
                                        console.log(_child.material)
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
    }, Interface.file_dir + "Icons/Models/Models.png")

    // Textures menu
    var import_texture = Interface.asset_file.addMenu("Texture", Interface.file_dir + "Icons/Assets/Image.png")

	// Image Texture
    import_texture.addOption("Texture", () => {
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
	}, Interface.file_dir + "Icons/Assets/Image.png")

	// Text Texture
	import_texture.addOption("Canvas Texture", () => {
        var texture = new CanvasTexture(512, 512)
        texture.name = "canvas"
        Editor.program.addTexture(texture)

        Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Assets/Image.png")

	// Video Texture
	import_texture.addOption("Video Texture", () => {
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
	}, Interface.file_dir + "Icons/Assets/Video.png")

	// Webcam Texture
	import_texture.addOption("Webcam Texture", () => {
		var texture = new WebcamTexture()
		texture.name = "webcam"
		Editor.program.addTexture(texture)
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Hw/Webcam.png")

    // Load Spine Animation
    Interface.asset_file.addOption("Spine Animation", () => {
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
	}, Interface.file_dir + "Icons/Animation/Spine.png")

	// Load font
	Interface.asset_file.addOption("Font", () => {
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
	}, Interface.file_dir + "Icons/Assets/Font.png")

	// Load audio file
	Interface.asset_file.addOption("Audio", () => {
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
	}, Interface.file_dir + "Icons/Assets/Audio.png")

	// ------------------------------------ Explorer ------------------------------------
	Interface.explorer = new DivisionResizable()
	Interface.explorer.size.x = 300
	Interface.explorer.resize_size_min = 100
	Interface.explorer.setOnResize(() => {
		Interface.updateInterface()
		if (Interface.panel !== null) {
			Interface.panel.updateInterface()
		}
	})

	Interface.explorer_resizable = new DualDivisionResizable(Interface.explorer.element)
	Interface.explorer_resizable.orientation = DualDivisionResizable.VERTICAL
	Interface.explorer_resizable.tab_position = 0.4
	Interface.explorer_resizable.setOnResize(() => {
		Interface.explorer_resizable.updateInterface()
		Interface.tree_view.updateInterface()
		if (Interface.panel !== null) {
			Interface.panel.updateInterface()
		}
	})

	// Project Explorer
	Interface.tree_view = new TreeView(Interface.explorer_resizable.div_a)

	// Object Components
	Interface.panel = new Panel(Interface.explorer_resizable.div_b)

	// ------------------------------------ Left Div ------------------------------------
	Interface.left_div = new DivisionResizable()
	Interface.left_div.resizable_side = DivisionResizable.RIGHT
	Interface.left_div.size.x = 300
	Interface.left_div.resize_size_min = 300
	Interface.left_div.resize_size_max = 305
	Interface.left_div.element.style.pointerEvents = "auto"

	Interface.left_tabs = new TabGroup(Interface.left_div.element)
	Interface.left_tabs.button_size.set(100, 30)
	Interface.left_tabs.element.style.cursor = "default"
	Interface.left_tabs.element.style.backgroundColor = Editor.theme.bar_color
	Interface.left_tabs.mode = TabGroup.LEFT
	Interface.left_tabs.updateInterface()

    Interface.basic_tab = Interface.left_tabs.addTab(ObjectChooserBasicTab, false)
	Interface.basic_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.basic_tab.element.style.overflowY = "auto"

	Interface.lights_tab = Interface.left_tabs.addTab(ObjectChooserLightingTab, false)
	Interface.lights_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.lights_tab.element.style.overflowY = "auto"

	Interface.cinematic_tab = Interface.left_tabs.addTab(ObjectChooserCinematicTab, false)
	Interface.cinematic_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.cinematic_tab.element.style.overflowY = "auto"

	Interface.effects_tab = Interface.left_tabs.addTab(ObjectChooserEffectsTab, false)
	Interface.effects_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.effects_tab.element.style.overflowY = "auto"

	Interface.physics_tab = Interface.left_tabs.addTab(ObjectChooserPhysicsTab, false)
	Interface.physics_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.physics_tab.element.style.overflowY = "auto"

	Interface.hw_tab = Interface.left_tabs.addTab(ObjectChooserDeviceTab, false)
	Interface.hw_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.hw_tab.element.style.overflowY = "auto"

    Interface.left_tabs.selectTab(0)

	// ------------------------------------ Top Bar ------------------------------------
	Interface.top_bar = new Bar()
	Interface.top_bar.size.y = 25

	// Editor Logo
	Interface.image = new ImageBox()
	Interface.image.setImage("Editor/Files/Logo.png")
	Interface.image.size.set(108, 18)
	Interface.image.updateInterface()

	// File
	Interface.file = new DropdownMenu()
	Interface.file.setText("File")
	Interface.file.size.set(120, Interface.top_bar.size.y)
	Interface.file.position.set(0, 0)

	// New Project
	Interface.file.addOption("New", () => {
		Interface.newProgram()
	}, Interface.file_dir + "Icons/Misc/New.png")

	// Save Project
	Interface.file.addOption("Save", () => {
        if(Editor.open_file !== null) {
            Editor.saveProgram(undefined, false)
        } else {
            Interface.saveProgram()
        }
    }, Interface.file_dir + "Icons/Misc/Save.png")

    // Save project as
    Interface.file.addOption("Save As", () => {
        Interface.saveProgram()()
    }, Interface.file_dir + "Icons/Misc/Save.png")

	// Load Project
	Interface.file.addOption("Load", () => {
		Interface.loadProgram()
	})

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
	}, Interface.file_dir + "Icons/Platform/Web.png")

	publish.addOption("Windows", () => {
		FileSystem.chooseFile((files) => {
			try {
				Editor.exportWindowsProject(files[0].path)
			} catch(e) {
				alert("Error exporting project (" + e + ")")
			}
		}, "", Editor.program.name)
	}, Interface.file_dir + "Icons/Platform/Windows.png")

	publish.addOption("Linux", () => {
		alert("TODO: This")
	}, Interface.file_dir + "Icons/Platform/Linux.png")

	publish.addOption("macOS", () => {
		alert("TODO: This")
	}, Interface.file_dir + "Icons/Platform/OSX.png")

	Interface.file.addOption("Exit", () => {
		if (confirm("All unsaved changes to the project will be lost! Do you really want to exit?")) {
			Editor.exit()
		}
	}, Interface.file_dir + "Icons/Misc/Exit.png")

	// Edit
	Interface.editor = new DropdownMenu()
	Interface.editor.setText("Edit")
	Interface.editor.size.set(100, Interface.top_bar.size.y)
	Interface.editor.position.set(120, 0)

	Interface.editor.addOption("Undo", () => {
		Editor.undo()
	}, Interface.file_dir + "Icons/Misc/Undo.png")

	Interface.editor.addOption("Redo", () => {
		Editor.redo()
	}, Interface.file_dir + "Icons/Misc/Redo.png")

	Interface.editor.addOption("Copy", () => {
		Editor.copyObject()
	}, Interface.file_dir + "Icons/Misc/Copy.png")

	Interface.editor.addOption("Cut", () => {
		Editor.cutObject()
	}, Interface.file_dir + "Icons/Misc/Cut.png")

	Interface.editor.addOption("Paste", () => {
		Editor.pasteObject()
	}, Interface.file_dir + "Icons/Misc/Paste.png")

	Interface.editor.addOption("Delete", () => {
		Editor.deleteObject()
	}, Interface.file_dir + "Icons/Misc/Delete.png")

	Interface.editor.addOption("Settings", () => {
        var tab = Interface.tab.getTab(SettingsTab)
        if(tab === null) {
            tab = Interface.tab.addTab(SettingsTab, true)
        }
        tab.select()
	}, Interface.file_dir + "Icons/Misc/Settings.png")

	// Project
	Interface.project = new DropdownMenu()
	Interface.project.setText("Project")
	Interface.project.size.set(100, Interface.top_bar.size.y)
	Interface.project.position.set(220, 0)

	Interface.project.addOption("Create Scene", () => {
		Editor.program.addDefaultScene()
		Editor.updateObjectViews()
	}, Interface.file_dir + "Icons/Misc/Add.png")

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
	}, Interface.file_dir + "Icons/Script/Script.png")

	// About
	Interface.about = new Button()
	Interface.about.setText("About")
	Interface.about.size.set(100, Interface.top_bar.size.y)
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
	Interface.run.size.set(100, Interface.top_bar.size.y)
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
	Interface.left_div.update()
	Interface.explorer.update()
	Interface.asset_explorer_div.update()
	Interface.explorer_resizable.update()
	Interface.asset_split.update()
	Interface.tab.update()
}

// Update interface
Interface.updateInterface = function() {
	// Window size
	var size = new THREE.Vector2(window.innerWidth, window.innerHeight)

	// ------------------------------------ Menu Top Bar ------------------------------------
	Interface.top_bar.size.x = size.x
	Interface.top_bar.updateInterface()

	// Logo
	Interface.image.position.set(size.x - Interface.image.size.x, 3)
	Interface.image.updateInterface()

	// ------------------------------------ Project Explorer ------------------------------------
	Interface.explorer.size.y = (size.y - Interface.top_bar.size.y)
	Interface.explorer.position.set(size.x - Interface.explorer.size.x, Interface.top_bar.size.y)
	Interface.explorer.resize_size_max = size.x * 0.7
	Interface.explorer.updateInterface()

	Interface.explorer_resizable.size.set(Interface.explorer.size.x - Interface.explorer.resize_tab_size, Interface.explorer.size.y)
	Interface.explorer_resizable.updateInterface()

	Interface.tree_view.updateInterface()

	// ------------------------------------ Asset Explorer ------------------------------------
	Interface.asset_explorer_div.size.x = size.x - Interface.explorer.size.x
	Interface.asset_explorer_div.position.set(0, size.y - Interface.asset_explorer_div.size.y)
	Interface.asset_explorer_div.resize_size_max = size.y * 0.6
	Interface.asset_explorer_div.updateInterface()

	Interface.asset_explorer_bar.size.x = Interface.asset_explorer_div.size.x
	Interface.asset_explorer_bar.updateInterface()

	Interface.asset_split.size.x = Interface.asset_explorer_div.size.x
	Interface.asset_split.position.y = Interface.asset_explorer_bar.size.y
	Interface.asset_split.size.y = Interface.asset_explorer_div.size.y - Interface.asset_explorer.position.y
	Interface.asset_split.updateInterface()

	Interface.folders_explorers.updateInterface()

	// ------------------------------------ Left Div ------------------------------------
	Interface.left_div.position.set(0, Interface.top_bar.size.y)
	Interface.left_div.size.y = size.y - Interface.asset_explorer_div.size.y - Interface.top_bar.size.y //size.y - Interface.top_bar.size.y
	Interface.left_div.updateInterface()

	Interface.left_tabs.size.copy(Interface.left_div.size)
	Interface.left_tabs.updateInterface()

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab.position.set(Interface.left_div.size.x, Interface.top_bar.size.y)
	Interface.tab.size.x = (size.x - Interface.left_div.size.x - Interface.explorer.size.x)
	Interface.tab.size.y = (size.y - Interface.top_bar.size.y - Interface.asset_explorer_div.size.y)
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
