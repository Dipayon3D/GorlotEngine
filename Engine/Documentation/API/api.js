YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AmbientLight",
        "AudioEmitter",
        "BlockScript",
        "Container",
        "DirectionalLight",
        "FileSystem",
        "GORLOT",
        "HemisphereLight",
        "Key",
        "Keyboard",
        "KinectDevice",
        "LeapMotion",
        "Mesh",
        "Mouse",
        "Object3D",
        "OrthographicCamera",
        "ParticleEmitter",
        "PerspectiveCamera",
        "PhysicsObject",
        "PointLight",
        "PositionalAudio",
        "RectAreaLight",
        "ResourceManager",
        "Scene",
        "Script",
        "SkinnedMesh",
        "Sky",
        "SpineAnimation",
        "SpineTexture",
        "SpotLight",
        "Sprite",
        "Text3D"
    ],
    "modules": [
        "Animations",
        "Audio",
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
        "Textures",
        "ThreeJS"
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
            "displayName": "Cameras",
            "name": "Cameras",
            "description": "Orthographic Camera is used for 2D-like image projection\nBased on THREE.OrthographicCamera, original documentation available at https://threejs.org/docs/#api/en/cameras/OrthographicCamera"
        },
        {
            "displayName": "Core",
            "name": "Core",
            "description": "Scene"
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
            "description": "Wrapper for cannon.js Body physics objects"
        },
        {
            "displayName": "Resources",
            "name": "Resources",
            "description": "Resource manager is used to manage available resources used by objects\nThe resource manager is used to extend the Program object, and it's not designed to be used as a standalone\nThe manager is used to manage the following types of resources\n - Images\n - Videos\n - Audio\n - Fonts\n - Textures\n - Materials\n - Geometries"
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
            "description": "Spine animation textures\nBased on SpineTexture from original spine runtime for three.js"
        },
        {
            "displayName": "ThreeJS",
            "name": "ThreeJS",
            "description": "This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space.\nThis page provides documentation for some of the main features of this class, the original documentation can be found at https://threejs.org/docs/index.html#api/en/core/Object3D\nAll Gorlot objects extend the Object3D class of some other higher level class from three.js\nCode examples provided for three.js should also work inside Gorlot"
        }
    ],
    "elements": []
} };
});