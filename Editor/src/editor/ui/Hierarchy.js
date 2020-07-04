function EditorUIHierarchy() {

	EditorUI.right_area.split("vertical", [null, EditorUI.assetEx_height + 200], true)
    
    EditorUI.hierarchy_panel = new LiteGUI.Panel({title: "Hierarchy", scroll: true})
    EditorUI.right_area.getSection(0).add(EditorUI.hierarchy_panel)
    
    EditorUI.hierarchy = new LiteGUI.Tree({
        id: "Program",
        children: []
    }, {
        allow_drag: true,
        height: EditorUI.right_area.getSection(0).getHeight(),
    })
    EditorUI.hierarchy_panel.add(EditorUI.hierarchy)

    // When selecting an object in the hierarchy, that object will be selected
    LiteGUI.bind(EditorUI.hierarchy.root, "item_selected", function(e) {
        Editor.selectObject(e.detail.data.attachedTo)
        EditorUI.updateInspector(e.detail.data.attachedTo)
    })

    // When an item is moved, this will check if we should set a parent
    LiteGUI.bind(EditorUI.hierarchy.root, "item_moved", function(e) {
        if (e.detail.parent_item) {
            var parObj = e.detail.parent_item.data.attachedTo
            var obj = e.detail.item.data.attachedTo

            if (parObj != null) {
                parObj.add(obj)
                Editor.updateObjectViews()
            } else {
                Editor.updateObjectViews()
            }
        }
    })

    // If an item in the hierarchy is double clicked and that object can add a new tab, this will open it
    LiteGUI.bind(EditorUI.hierarchy.root, "item_dblclicked", function(e) {
        var data = e.detail.data

        // Script
        if (data.attachedTo instanceof Script) {

            var id = CodeEditor.id-1
            EditorUI.tabs_widget.removeTab("Code Editor " + id)

            EditorUI.code = new CodeEditor()
            EditorUI.code.attachScript(data.attachedTo)
            EditorUI.code.updateInterface()
        }
        else if (data.attachedTo instanceof ParticleEmitter) {
            var id = ParticleEditor.id-1
            EditorUI.tabs_widget.removeTab("Particle Editor " + id)

            EditorUI.partEd = new ParticleEditor(data.attachedTo)
            EditorUI.partEd.updateInterface()
        }
        else if (data.attachedTo instanceof Scene) {
            var id = SceneEditor.id-1
            EditorUI.tabs_widget.removeTab("Scene Editor " + id)

            EditorUI.canvas = new SceneEditor()
            EditorUI.canvas.setScene(data.attachedTo)
            EditorUI.canvas.updateInterface()
            EditorUI.canvas.activate()
        }
    })

    // When renaming an object, renaming it in the scene
    LiteGUI.bind(EditorUI.hierarchy.root, "item_renamed", function(e) {
        //Editor.renameObject(e.detail.data.attachedTo, e.detail.new_name)
    })
    
}

EditorUI.updateHierarchy = function() {
    if(EditorUI.hierarchy !== undefined) {
        EditorUI.hierarchy.updateTree({id: Editor.program.name, attachedTo: Editor.program, children: []})
    
        Editor.program.children.forEach((item, index) => {
            var obj = Editor.program.children[index]
            var name = obj.name

            if(!obj.hidden) {
                var it = EditorUI.hierarchy.insertItem({id: name, attachedTo: obj})
                
                it.addEventListener("contextmenu", (e) => {
                    return EditorUI.hierarchyContext(e, {item: it, data: it.data})
                })
        
                if(Editor.program.children[index].children.length > 0){
                    EditorUI.addChildrenToHierarchy(obj, name)
                }
            }

        })
    }
}

EditorUI.addChildrenToHierarchy = function(object, parent) {

object.children.forEach((v, i) => {
    if(!object.children[i].hidden) {
        var it = EditorUI.hierarchy.insertItem({id: object.children[i].name, attachedTo: object.children[i]}, parent)
        
        it.addEventListener("contextmenu", (e) => {
            return EditorUI.hierarchyContext(e, {item: it, data: it.data})
        })
        if (object.children[i].children.length > 0) {
            EditorUI.addChildrenToHierarchy(object.children[i], object.children[i].name, parent)
        }
    }
})

}

EditorUI.hierarchyContext = function(e, data) {
    var object = data.data.attachedTo
    Editor.selectObject(object)

    var content = []

    if (!(object instanceof Program) && !(object instanceof Scene)) {
        content.push(
            {title: "New Material", callback: () => {
                var mat = new MeshPhongMaterial({color: 0xffffff, specular: 0x333333, shininess: 30})
                mat.name = object.name
                object.material = mat
                EditorUI.addAsset(undefined, mat)
            }},
            {title: "Copy", callback: () => {
                Editor.copySelectedObject()
            }},
            {title: "Cut", callback: () => {
                Editor.cutSelectedObject()
            }},
            {title: "Paste", callback: () => {
                Editor.pasteIntoSelectedObject()
            }},
            {title: "Duplicate", callback: () => {
                // TODO: This
            }},
            {title: "Set Static", callback: () => {
                ObjectUtils.setMatrixAutoUpdate(object, false)
                EditorUI.updateInspector()
            }},
            {title: "Set Dynamic", callback: () => {
                ObjectUtils.setMatrixAutoUpdate(object, true)
                EditorUI.updateInspector()
            }},
            {title: "Delete", callback: () => {
                EditorUI.deleteObject(object)
            }}
        )
    }

    var context = new LiteGUI.ContextMenu(content, {title: "Edit item", event: e})
}