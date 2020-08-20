"use strict"

var path = "../"
var code = ""

// Namespace
include("Source/Engine/Gorlot.js")

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
include("Source/Engine/Core/Global.js")
include("Source/Engine/Core/FileSystem.js")

include("Source/Engine/Input/Key.js")
include("Source/Engine/Input/Keyboard.js")
include("Source/Engine/Input/Mouse.js")

include("Source/Engine/Core/WebVR/VRControls.js")

include("Source/Engine/Core/Resources/Font.js")
include("Source/Engine/Core/Resources/Video.js")
include("Source/Engine/Core/Resources/Audio.js")
include("Source/Engine/Core/Resources/Image.js")

include("Source/Engine/Core/Texture/CanvasTexture.js")
include("Source/Engine/Core/Texture/VideoTexture.js")
include("Source/Engine/Core/Texture/WebcamTexture.js")
include("Source/Engine/Core/Texture/Texture.js")

include("Source/Engine/Core/Loaders/FontLoader.js")
include("Source/Engine/Core/Loaders/ImageLoader.js")
include("Source/Engine/Core/Loaders/VideoLoader.js")

include("Source/Engine/Core/Loaders/AudioLoader.js")
include("Source/Engine/Core/Loaders/TextureLoader.js")
include("Source/Engine/Core/Loaders/ObjectLoader.js")
include("Source/Engine/Core/Loaders/MaterialLoader.js")
include("Source/Engine/Core/Loaders/TTFLoader.js")

include("Source/Engine/Core/Elements/Device/LeapMotion.js")
include("Source/Engine/Core/Elements/Device/KinectDevice.js")

include("Source/Engine/Core/Elements/Basic/Mesh.js")
include("Source/Engine/Core/Elements/Basic/SkinnedMesh.js")
include("Source/Engine/Core/Elements/Basic/Text3D.js")

include("Source/Engine/Core/Elements/Sprite/Sprite.js")

include("Source/Engine/Core/Elements/Lighting/PointLight.js")
include("Source/Engine/Core/Elements/Lighting/SpotLight.js")
include("Source/Engine/Core/Elements/Lighting/AmbientLight.js")
include("Source/Engine/Core/Elements/Lighting/DirectionalLight.js")
include("Source/Engine/Core/Elements/Lighting/HemisphereLight.js")
include("Source/Engine/Core/Elements/Lighting/RectAreaLight.js")
include("Source/Engine/Core/Elements/Lighting/Sky.js")

include("Source/Engine/Core/Elements/Cinematic/PerspectiveCamera.js")
include("Source/Engine/Core/Elements/Cinematic/OrthographicCamera.js")

include("Source/Engine/Core/Elements/Sound/AudioEmitter.js")
include("Source/Engine/Core/Elements/Sound/PositionalAudio.js")

include("Source/Engine/Core/Elements/Script/Script.js")
include("Source/Engine/Core/Elements/Script/BlockScript.js")

include("Source/Engine/Core/Elements/Physics/PhysicsObject.js")

include("Source/Engine/Core/Elements/Spine/SpineAnimation.js")
include("Source/Engine/Core/Elements/Spine/SpineTexture.js")

include("Source/Engine/Core/Elements/Animation/Bone.js")

include("Source/Engine/Core/Elements/Misc/Empty.js")

include("Source/Engine/Core/Elements/Particle/ParticleEmitter.js")

include("Source/Engine/Core/Elements/Program.js")
include("Source/Engine/Core/Elements/Scene.js")

include("Source/Engine/Core/Elements/Special/ObjectCaller.js")

include("Source/Engine/Core/Utils/Base64Utils.js")
include("Source/Engine/Core/Utils/ArraybufferUtils.js")
include("Source/Engine/Core/Utils/MathUtils.js")
include("Source/Engine/Core/Utils/ObjectUtils.js")
include("Source/Engine/Core/Utils/BufferUtils.js")

// Assets
include("Source/Engine/Core/Assets/Materials/MeshBasicMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshLambertMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshNormalMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshPhongMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshShaderMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshStandardMaterial.js")
include("Source/Engine/Core/Assets/Materials/MeshToonMaterial.js")
include("Source/Engine/Core/Assets/Materials/SpriteMaterial.js")

// Default Components
include("Source/Engine/Core/Components/Panel.js")
include("Source/Engine/Core/Components/Component.js")

include("Source/Engine/Core/Components/Sound/AudioComponent.js")

include("Source/Engine/Core/Components/Physics/PhysicsComponent.js")

include("Source/Engine/Core/Components/Scripts/ScriptComponent.js")

include("Source/Engine/Core/Components/Elements/ElementComponent.js")
include("Source/Engine/Core/Components/Elements/ObjectComponent.js")
include("Source/Engine/Core/Components/Elements/ProgramComponent.js")
include("Source/Engine/Core/Components/Elements/SceneComponent.js")

include("Source/Engine/Core/Components/Elements/Basic/Text3DComponent.js")

include("Source/Engine/Core/Components/Device/KinectComponent.js")
include("Source/Engine/Core/Components/Device/LeapComponent.js")

include("Source/Engine/Core/Components/Cameras/CameraComponent.js")

include("Source/Engine/Core/Components/Lights/LightComponent.js")
include("Source/Engine/Core/Components/Lights/SkyComponent.js")

include("Source/Engine/Core/Components/Geometry/GeometryForm.js")
include("Source/Engine/Core/Components/Geometry/BoxGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/ConeGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/PlaneGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/SphereGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/TorusGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/CylinderGeometryComponent.js")
include("Source/Engine/Core/Components/Geometry/TetrahedronGeometryComponent.js")

// THREE Modifiers
include("Source/Engine/Core/THREE/Object3D.js")
include("Source/Engine/Core/THREE/Vector3.js")
include("Source/Engine/Core/THREE/Vector2.js")
include("Source/Engine/Core/THREE/Texture.js")
include("Source/Engine/Core/THREE/LightShadow.js")
include("Source/Engine/Core/THREE/Fog.js")
include("Source/Engine/Core/THREE/Material.js")
include("Source/Engine/Core/THREE/MultiMaterial.js")

// Nodes
include("Source/Engine/Core/Nodes/Register.js")
include("Source/Engine/Core/Nodes/NodesHelper.js")

// Blocks
include("Source/Engine/Core/Nodes/Blocks/Base/Base.js")
include("Source/Engine/Core/Nodes/Blocks/Base/Events.js")
include("Source/Engine/Core/Nodes/Blocks/Base/Lists.js")
include("Source/Engine/Core/Nodes/Blocks/Base/Widgets.js")
include("Source/Engine/Core/Nodes/Blocks/Base/Elements.js")
include("Source/Engine/Core/Nodes/Blocks/Base/Hierarchy.js")

include("Source/Engine/Core/Nodes/Blocks/Math/Colour.js")
include("Source/Engine/Core/Nodes/Blocks/Math/Vector.js")
include("Source/Engine/Core/Nodes/Blocks/Math/Euler.js")

include("Source/Engine/Core/Nodes/Blocks/Input/Keyboard.js")

// Material
include("Source/Engine/Core/Nodes/Material/MaterialNodes.js")

// Particles
include("Source/Engine/Core/Nodes/Particles/ParticlesNodes.js")

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
