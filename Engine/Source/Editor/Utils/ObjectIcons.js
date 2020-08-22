"use strict"

//List of object icon path by object type
function ObjectIcons(){}

//Create icon map
ObjectIcons.icons = []

//Default icon
ObjectIcons.icons["Object3D"] = "Source/Editor/Files/Icons/Tab/Scene.png"

//Devices
ObjectIcons.icons["Kinect"] = "Source/Editor/Files/Icons/Hw/Kinect.png"
ObjectIcons.icons["LeapDevice"] = "Source/Editor/Files/Icons/Hw/Leap.png"

//Ligths
ObjectIcons.icons["Sky"] = "Source/Editor/Files/Icons/Lights/Sky.png"
ObjectIcons.icons["SpotLight"] = "Source/Editor/Files/Icons/Lights/Spot.png"
ObjectIcons.icons["PointLight"] = "Source/Editor/Files/Icons/Lights/Point.png"
ObjectIcons.icons["HemisphereLight"] = "Source/Editor/Files/Icons/Lights/Hemisphere.png"
ObjectIcons.icons["DirectionalLight"] = "Source/Editor/Files/Icons/Lights/Directional.png"
ObjectIcons.icons["AmbientLight"] = "Source/Editor/Files/Icons/Lights/Ambient.png"
ObjectIcons.icons["RectAreaLight"] = "Source/Editor/Files/Icons/Lights/RectArea.png"

//Cameras
ObjectIcons.icons["PerspectiveCamera"] = "Source/Editor/Files/Icons/Camera/Perspective.png"
ObjectIcons.icons["OrthographicCamera"] = "Source/Editor/Files/Icons/Camera/Orthographic.png"

//Objects
ObjectIcons.icons["SpineAnimation"] = "Source/Editor/Files/Icons/Animation/Spine.png"
ObjectIcons.icons["Mesh"] = "Source/Editor/Files/Icons/Models/Cube.png"
ObjectIcons.icons["SkinnedMesh"] = "Source/Editor/Files/Icons/Animation/Skeleton.png"
ObjectIcons.icons["ParticleEmitter"] = "Source/Editor/Files/Icons/Effects/Particles.png"
ObjectIcons.icons["Script"] = "Source/Editor/Files/Icons/Script/Script.png"
ObjectIcons.icons["BlockScript"] = "Source/Editor/Files/Icons/Script/Blocks.png"
ObjectIcons.icons["Sprite"] = "Source/Editor/Files/Icons/Misc/Image.png"
ObjectIcons.icons["Text3D"] = "Source/Editor/Files/Icons/Models/Text.png"
ObjectIcons.icons["Points"] = "Source/Editor/Files/Icons/Models/Points.png"

//Program
ObjectIcons.icons["Program"] = "Source/Editor/Files/Icons/Script/Script.png"
ObjectIcons.icons["Scene"] = "Source/Editor/Files/Icons/Models/Models.png"

//Audio
ObjectIcons.icons["Audio"] = "Source/Editor/Files/Icons/Misc/Audio.png"
ObjectIcons.icons["PositionalAudio"] = "Source/Editor/Files/Icons/Misc/AudioPositional.png"

//Physics
ObjectIcons.icons["Physics"] = "Source/Editor/Files/Icons/Misc/Physics.png"

//Others
ObjectIcons.icons["Bone"] = "Source/Editor/Files/Icons/Animation/Bone.png"
ObjectIcons.icons["Group"] = "Source/Editor/Files/Icons/Effects/Empty.png"

//Get icon path from object type
ObjectIcons.get = function(type)
{
	return ObjectIcons.icons[type]
}
