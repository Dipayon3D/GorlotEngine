YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AmbientLight",
        "ArraybufferUtils",
        "Audio",
        "AudioEmitter",
        "Base64Utils",
        "BlockScript",
        "BufferUtils",
        "CanvasTexture",
        "Container",
        "DirectionalLight",
        "FileSystem",
        "Folder",
        "Font",
        "GORLOT",
        "GORLOT.Image",
        "HemisphereLight",
        "Key",
        "Keyboard",
        "KinectDevice",
        "LeapMotion",
        "Mesh",
        "Mesh2shape",
        "Mouse",
        "OrthographicCamera",
        "ParticleEmitter",
        "PerspectiveCamera",
        "PhysicsObject",
        "PointLight",
        "PositionalAudio",
        "RectAreaLight",
        "Resource",
        "ResourceManager",
        "Scene",
        "Script",
        "SkinnedMesh",
        "Sky",
        "SpineAnimation",
        "SpineTexture",
        "SpotLight",
        "Sprite",
        "THREE.Fog",
        "THREE.Object3D",
        "Text3D",
        "Texture",
        "Video",
        "VideoTexture",
        "WebcamTexture"
    ],
    "modules": [
        "Animations",
        "Audio",
        "BinaryData",
        "Cameras",
        "Core",
        "Devices",
        "Input",
        "Lights",
        "Meshes",
        "Misc",
        "Particles",
        "Physics",
        "Resources",
        "Runtime",
        "Script",
        "Sprite",
        "THREE",
        "Textures"
    ],
    "allModules": [
        {
            "displayName": "Animations",
            "name": "Animations",
            "description": "Spine animation object, to used with animation produced with Esoteric spine"
        },
        {
            "displayName": "Audio",
            "name": "Audio",
            "description": "AudioEmitter is a 3D object used to play audio inside the scene"
        },
        {
            "displayName": "BinaryData",
            "name": "BinaryData",
            "description": "ArraybufferUtils contains method to convert from and to ArrayBuffer binary format"
        },
        {
            "displayName": "Cameras",
            "name": "Cameras",
            "description": "Orthographic Camera is used for 2D-like image projection\nBased on THREE.OrthographicCamera, original documentation available at https://threejs.org/docs/#api/en/cameras/OrthographicCamera"
        },
        {
            "displayName": "Core",
            "name": "Core",
            "description": "Scenes allow you to set up what and where it is supposed to be renderer by three.js This is where you place objects, lights and cameras."
        },
        {
            "displayName": "Devices",
            "name": "Devices",
            "description": "Kinect device object\nThis object is used to connect Gorlot to a Microsoft Kinect v1, it only works in Microsoft Windows.\nThe operation of the kinect object depends on a server program used to connect to kinect that sends the data to nunuStudio via WebSocket."
        },
        {
            "displayName": "Input",
            "name": "Input",
            "description": "Key is used by keyboard and mouse to represent a key state"
        },
        {
            "displayName": "Lights",
            "name": "Lights",
            "description": "Same as THREE.AmbientLight\nDocumentation for the object can be found at https://threejs.org/docs/index.html#api/en/lights/AmbientLight"
        },
        {
            "displayName": "Meshes",
            "name": "Meshes",
            "description": "Meshes are used to combine a geometry and a material, forming a complete renderisable"
        },
        {
            "displayName": "Misc",
            "name": "Misc",
            "description": "Creates an empty object"
        },
        {
            "displayName": "Particles",
            "name": "Particles",
            "description": "Particle emitter is a wrapper for SPE particle systems"
        },
        {
            "displayName": "Physics",
            "name": "Physics",
            "description": "Mesh2shape is used to convert ThreeJS objects to CannonJS shapes\nIt is based on the original Mesh2Shape converted by @donmccurdy"
        },
        {
            "displayName": "Resources",
            "name": "Resources",
            "description": "Audio class is used to store audio data as an arraybuffer to be used later by objects with the WebAudio API"
        },
        {
            "displayName": "Runtime",
            "name": "Runtime",
            "description": "Class used to store gorlot version and timestamp used for development"
        },
        {
            "displayName": "Script",
            "name": "Script",
            "description": "BlockScripts are used to code in a graphic way\nThis could be imagined as some kind of ue4 blueprints"
        },
        {
            "displayName": "Sprite",
            "name": "Sprite",
            "description": "Sprites always face the screen and are mainly used for 2D elements"
        },
        {
            "displayName": "Textures",
            "name": "Textures",
            "description": "Canvas textures can be used to draw content to the texture using runtime\nCanvas textures always start with black background and a red text \"Canvas Texture\""
        },
        {
            "displayName": "THREE",
            "name": "THREE",
            "description": "Fog class is used to store fog attributes attached to a THREE.Scene"
        }
    ],
    "elements": []
} };
});