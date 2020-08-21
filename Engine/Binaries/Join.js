"use strict"

var path = "../"
var code = ""

// Namespace
include("Source/Runtime/Gorlot.js")

// Runtime dependencies
include("Libraries/THREE/three.js")
include("Libraries/THREE/effects/VREffect.js")

include("Libraries/THREE/animation/Animation.js")
include("Libraries/THREE/animation/AnimationHandler.js")
include("Libraries/THREE/animation/KeyFrameAnimation.js")

include("Libraries/CANNON/cannon.min.js")

include("Libraries/Leap/leap.min.js")

include("Libraries/stats.min.js")

include("Libraries/SPE/SPE.min.js")

include("Libraries/Spine/spine.min.js")

include("Libraries/litegraph/litegraph.js")

// Core runtime modules
include("Source/Runtime/Global.js")
include("Source/Runtime/FileSystem.js")

include("Source/Runtime/Input/Key.js")
include("Source/Runtime/Input/Keyboard.js")
include("Source/Runtime/Input/Mouse.js")

include("Source/Runtime/WebVR/VRControls.js")

include("Source/Runtime/Resources/Font.js")
include("Source/Runtime/Resources/Video.js")
include("Source/Runtime/Resources/Audio.js")
include("Source/Runtime/Resources/Image.js")

include("Source/Runtime/Texture/CanvasTexture.js")
include("Source/Runtime/Texture/VideoTexture.js")
include("Source/Runtime/Texture/WebcamTexture.js")
include("Source/Runtime/Texture/Texture.js")

include("Source/Runtime/Loaders/FontLoader.js")
include("Source/Runtime/Loaders/ImageLoader.js")
include("Source/Runtime/Loaders/VideoLoader.js")

include("Source/Runtime/Loaders/AudioLoader.js")
include("Source/Runtime/Loaders/TextureLoader.js")
include("Source/Runtime/Loaders/ObjectLoader.js")
include("Source/Runtime/Loaders/MaterialLoader.js")
include("Source/Runtime/Loaders/TTFLoader.js")

include("Source/Runtime/Objects/Device/LeapMotion.js")
include("Source/Runtime/Objects/Device/KinectDevice.js")

include("Source/Runtime/Objects/Basic/Mesh.js")
include("Source/Runtime/Objects/Basic/SkinnedMesh.js")
include("Source/Runtime/Objects/Basic/Text3D.js")

include("Source/Runtime/Objects/Sprite/Sprite.js")

include("Source/Runtime/Objects/Lighting/PointLight.js")
include("Source/Runtime/Objects/Lighting/SpotLight.js")
include("Source/Runtime/Objects/Lighting/AmbientLight.js")
include("Source/Runtime/Objects/Lighting/DirectionalLight.js")
include("Source/Runtime/Objects/Lighting/HemisphereLight.js")
include("Source/Runtime/Objects/Lighting/RectAreaLight.js")
include("Source/Runtime/Objects/Lighting/Sky.js")

include("Source/Runtime/Objects/Cinematic/PerspectiveCamera.js")
include("Source/Runtime/Objects/Cinematic/OrthographicCamera.js")

include("Source/Runtime/Objects/Sound/AudioEmitter.js")
include("Source/Runtime/Objects/Sound/PositionalAudio.js")

include("Source/Runtime/Objects/Script/Script.js")
include("Source/Runtime/Objects/Script/BlockScript.js")

include("Source/Runtime/Objects/Physics/PhysicsObject.js")

include("Source/Runtime/Objects/Spine/SpineAnimation.js")
include("Source/Runtime/Objects/Spine/SpineTexture.js")

include("Source/Runtime/Objects/Animation/Bone.js")

include("Source/Runtime/Objects/Misc/Empty.js")

include("Source/Runtime/Objects/Particle/ParticleEmitter.js")

include("Source/Runtime/Objects/Program.js")
include("Source/Runtime/Objects/Scene.js")

include("Source/Runtime/Objects/Special/ObjectCaller.js")

include("Source/Runtime/Utils/Base64Utils.js")
include("Source/Runtime/Utils/ArraybufferUtils.js")
include("Source/Runtime/Utils/MathUtils.js")
include("Source/Runtime/Utils/ObjectUtils.js")
include("Source/Runtime/Utils/BufferUtils.js")

// Assets
include("Source/Runtime/Assets/Materials/MeshBasicMaterial.js")
include("Source/Runtime/Assets/Materials/MeshLambertMaterial.js")
include("Source/Runtime/Assets/Materials/MeshNormalMaterial.js")
include("Source/Runtime/Assets/Materials/MeshPhongMaterial.js")
include("Source/Runtime/Assets/Materials/MeshShaderMaterial.js")
include("Source/Runtime/Assets/Materials/MeshStandardMaterial.js")
include("Source/Runtime/Assets/Materials/MeshToonMaterial.js")
include("Source/Runtime/Assets/Materials/SpriteMaterial.js")

// Default Components
include("Source/Runtime/Components/Panel.js")
include("Source/Runtime/Components/Component.js")

include("Source/Runtime/Components/Sound/AudioComponent.js")

include("Source/Runtime/Components/Physics/PhysicsComponent.js")

include("Source/Runtime/Components/Scripts/ScriptComponent.js")

include("Source/Runtime/Components/Elements/ElementComponent.js")
include("Source/Runtime/Components/Elements/ObjectComponent.js")
include("Source/Runtime/Components/Elements/ProgramComponent.js")
include("Source/Runtime/Components/Elements/SceneComponent.js")

include("Source/Runtime/Components/Elements/Basic/Text3DComponent.js")

include("Source/Runtime/Components/Device/KinectComponent.js")
include("Source/Runtime/Components/Device/LeapComponent.js")

include("Source/Runtime/Components/Cameras/CameraComponent.js")

include("Source/Runtime/Components/Lights/LightComponent.js")
include("Source/Runtime/Components/Lights/SkyComponent.js")

include("Source/Runtime/Components/Geometry/GeometryForm.js")
include("Source/Runtime/Components/Geometry/BoxGeometryComponent.js")
include("Source/Runtime/Components/Geometry/ConeGeometryComponent.js")
include("Source/Runtime/Components/Geometry/PlaneGeometryComponent.js")
include("Source/Runtime/Components/Geometry/SphereGeometryComponent.js")
include("Source/Runtime/Components/Geometry/TorusGeometryComponent.js")
include("Source/Runtime/Components/Geometry/CylinderGeometryComponent.js")
include("Source/Runtime/Components/Geometry/TetrahedronGeometryComponent.js")

// THREE Modifiers
include("Source/Runtime/THREE/Object3D.js")
include("Source/Runtime/THREE/Vector3.js")
include("Source/Runtime/THREE/Vector2.js")
include("Source/Runtime/THREE/Texture.js")
include("Source/Runtime/THREE/LightShadow.js")
include("Source/Runtime/THREE/Fog.js")
include("Source/Runtime/THREE/Material.js")
include("Source/Runtime/THREE/MultiMaterial.js")

// Nodes
include("Source/Runtime/Nodes/Register.js")
include("Source/Runtime/Nodes/NodesHelper.js")

// Blocks
include("Source/Runtime/Nodes/Blocks/Base/Base.js")
include("Source/Runtime/Nodes/Blocks/Base/Events.js")
include("Source/Runtime/Nodes/Blocks/Base/Lists.js")
include("Source/Runtime/Nodes/Blocks/Base/Widgets.js")
include("Source/Runtime/Nodes/Blocks/Base/Elements.js")
include("Source/Runtime/Nodes/Blocks/Base/Hierarchy.js")

include("Source/Runtime/Nodes/Blocks/Math/Colour.js")
include("Source/Runtime/Nodes/Blocks/Math/Vector.js")
include("Source/Runtime/Nodes/Blocks/Math/Euler.js")

include("Source/Runtime/Nodes/Blocks/Input/Keyboard.js")

// Material
include("Source/Runtime/Nodes/Material/MaterialNodes.js")

// Particles
include("Source/Runtime/Nodes/Particles/ParticlesNodes.js")

include("Binaries/Runtime/GorlotApp.js")

writeFile("out.js", code.replace(/"use strict"/gi, "").replace(/include\(".*"\)/gi, ""))

function include(file) {
	code += "\n" + readFile(path + file)
}

function readFile(fname) {
	var fs = require("fs")

	if (fs !== undefined) {
		return fs.readFileSync(fname, "utf8")
	}
}

function writeFile(fname, text) {
	var fs = require("fs")

	if (fs !== undefined) {
		var stream = fs.createWriteStream(fname, "utf8")
		stream.write(text)
		stream.end()
	}
}
