"use strict"

var path = "../"
var code = ""

// Namespace
include("Engine/Gorlot.js")

// Runtime dependencies
include("Engine/Libraries/THREE/three.js")
include("Engine/Libraries/THREE/effects/VREffect.js")

include("Engine/Libraries/THREE/animation/Animation.js")
include("Engine/Libraries/THREE/animation/AnimationHandler.js")
include("Engine/Libraries/THREE/animation/KeyFrameAnimation.js")

include("Engine/Libraries/CANNON/cannon.min.js")

include("Engine/Libraries/Leap/leap.min.js")

include("Engine/Libraries/stats.min.js")

include("Engine/Libraries/SPE/SPE.min.js")

include("Engine/Libraries/Spine/spine.min.js")

include("Engine/Libraries/litegraph/litegraph.js")

// Core runtime modules
include("Engine/Core/Global.js")
include("Engine/Core/FileSystem.js")

include("Engine/Core/THREE/Object3D.js")
include("Engine/Core/THREE/Vector3.js")
include("Engine/Core/THREE/Vector2.js")
include("Engine/Core/THREE/Texture.js")
include("Engine/Core/THREE/LightShadow.js")
include("Engine/Core/THREE/Fog.js")
include("Engine/Core/THREE/Material.js")
include("Engine/Core/THREE/MultiMaterial.js")

include("Engine/Input/Key.js")
include("Engine/Input/Keyboard.js")
include("Engine/Input/Mouse.js")

include("Engine/Core/WebVR/VRControls.js")

include("Engine/Core/Resources/Font.js")
include("Engine/Core/Resources/Video.js")
include("Engine/Core/Resources/Audio.js")
include("Engine/Core/Resources/Image.js")

include("Engine/Core/Texture/CanvasTexture.js")
include("Engine/Core/Texture/VideoTexture.js")
include("Engine/Core/Texture/WebcamTexture.js")
include("Engine/Core/Texture/Texture.js")

include("Engine/Core/Loaders/FontLoader.js")
include("Engine/Core/Loaders/ImageLoader.js")
include("Engine/Core/Loaders/VideoLoader.js")

include("Engine/Core/Loaders/AudioLoader.js")
include("Engine/Core/Loaders/TextureLoader.js")
include("Engine/Core/Loaders/ObjectLoader.js")
include("Engine/Core/Loaders/MaterialLoader.js")
include("Engine/Core/Loaders/TTFLoader.js")

include("Engine/Core/Elements/Device/LeapMotion.js")
include("Engine/Core/Elements/Device/KinectDevice.js")

include("Engine/Core/Elements/Basic/Mesh.js")
include("Engine/Core/Elements/Basic/SkinnedMesh.js")
include("Engine/Core/Elements/Basic/Text3D.js")

include("Engine/Core/Elements/Sprite/Sprite.js")

include("Engine/Core/Elements/Lighting/PointLight.js")
include("Engine/Core/Elements/Lighting/SpotLight.js")
include("Engine/Core/Elements/Lighting/AmbientLight.js")
include("Engine/Core/Elements/Lighting/DirectionalLight.js")
include("Engine/Core/Elements/Lighting/HemisphereLight.js")
include("Engine/Core/Elements/Lighting/RectAreaLight.js")
include("Engine/Core/Elements/Lighting/Sky.js")

include("Engine/Core/Elements/Cinematic/PerspectiveCamera.js")
include("Engine/Core/Elements/Cinematic/OrthographicCamera.js")

include("Engine/Core/Elements/Sound/AudioEmitter.js")
include("Engine/Core/Elements/Sound/PositionalAudio.js")

include("Engine/Core/Elements/Script/Script.js")
include("Engine/Core/Elements/Script/BlockScript.js")

include("Engine/Core/Elements/Physics/PhysicsObject.js")

include("Engine/Core/Elements/Spine/SpineAnimation.js")
include("Engine/Core/Elements/Spine/SpineTexture.js")

include("Engine/Core/Elements/Animation/Bone.js")

include("Engine/Core/Elements/Misc/Empty.js")

include("Engine/Core/Elements/Particle/ParticleEmitter.js")

include("Engine/Core/Elements/Program.js")
include("Engine/Core/Elements/Scene.js")

include("Engine/Core/Elements/Special/ObjectCaller.js")

include("Engine/Core/Utils/Base64Utils.js")
include("Engine/Core/Utils/ArraybufferUtils.js")
include("Engine/Core/Utils/MathUtils.js")
include("Engine/Core/Utils/ObjectUtils.js")
include("Engine/Core/Utils/BufferUtils.js")

// Assets
include("Engine/Core/Assets/Materials/MeshBasicMaterial.js")
include("Engine/Core/Assets/Materials/MeshLambertMaterial.js")
include("Engine/Core/Assets/Materials/MeshNormalMaterial.js")
include("Engine/Core/Assets/Materials/MeshPhongMaterial.js")
include("Engine/Core/Assets/Materials/MeshShaderMaterial.js")
include("Engine/Core/Assets/Materials/MeshStandardMaterial.js")
include("Engine/Core/Assets/Materials/MeshToonMaterial.js")
include("Engine/Core/Assets/Materials/SpriteMaterial.js")

// Default Components
include("Engine/Core/Components/Panel.js")
include("Engine/Core/Components/Component.js")

include("Engine/Core/Components/Sound/AudioComponent.js")

include("Engine/Core/Components/Physics/PhysicsComponent.js")

include("Engine/Core/Components/Scripts/ScriptComponent.js")

include("Engine/Core/Components/Elements/ElementComponent.js")
include("Engine/Core/Components/Elements/ObjectComponent.js")
include("Engine/Core/Components/Elements/ProgramComponent.js")
include("Engine/Core/Components/Elements/SceneComponent.js")

include("Engine/Core/Components/Elements/Basic/Text3DComponent.js")

include("Engine/Core/Components/Device/KinectComponent.js")
include("Engine/Core/Components/Device/LeapComponent.js")

include("Engine/Core/Components/Cameras/CameraComponent.js")

include("Engine/Core/Components/Lights/LightComponent.js")
include("Engine/Core/Components/Lights/SkyComponent.js")

include("Engine/Core/Components/Geometry/GeometryForm.js")
include("Engine/Core/Components/Geometry/BoxGeometryComponent.js")
include("Engine/Core/Components/Geometry/ConeGeometryComponent.js")
include("Engine/Core/Components/Geometry/PlaneGeometryComponent.js")
include("Engine/Core/Components/Geometry/SphereGeometryComponent.js")
include("Engine/Core/Components/Geometry/TorusGeometryComponent.js")
include("Engine/Core/Components/Geometry/CylinderGeometryComponent.js")
include("Engine/Core/Components/Geometry/TetrahedronGeometryComponent.js")

// Nodes
include("Engine/Core/Nodes/Register.js")
include("Engine/Core/Nodes/NodesHelper.js")

// Blocks
include("Engine/Core/Nodes/Blocks/Base/Base.js")
include("Engine/Core/Nodes/Blocks/Base/Events.js")
include("Engine/Core/Nodes/Blocks/Base/Lists.js")
include("Engine/Core/Nodes/Blocks/Base/Widgets.js")
include("Engine/Core/Nodes/Blocks/Base/Elements.js")
include("Engine/Core/Nodes/Blocks/Base/Hierarchy.js")

include("Engine/Core/Nodes/Blocks/Math/Colour.js")
include("Engine/Core/Nodes/Blocks/Math/Vector.js")
include("Engine/Core/Nodes/Blocks/Math/Euler.js")

include("Engine/Core/Nodes/Blocks/Input/Keyboard.js")

// Material
include("Engine/Core/Nodes/Material/MaterialNodes.js")

// Particles
include("Engine/Core/Nodes/Particles/ParticlesNodes.js")

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
