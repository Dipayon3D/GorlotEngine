"use strict";

//Core
var BufferAttribute = THREE.BufferAttribute;
var BufferGeometry = THREE.BufferGeometry;
var Clock = THREE.Clock;
var Face3 = THREE.Face3;
var Geometry = THREE.Geometry;
var Object3D = THREE.Object3D;
var Raycaster = THREE.Raycaster;

//Materials
var Material = THREE.Material
var LineBasicMaterial = THREE.LineBasicMaterial
var LineDashedMaterial = THREE.LineDashedMaterial
var MeshPhysicalMaterial = THREE.MeshPhysicalMaterial
var MultiMaterial = THREE.MultiMaterial
var PointsMaterial = THREE.PointsMaterial
var RawShaderMaterial = THREE.RawShaderMaterial

// Geometries
var BoxBufferGeometry = THREE.BoxBufferGeometry
var BoxGeometry = THREE.BoxGeometry
var CircleBufferGeometry = THREE.CircleBufferGeometry
var CircleGeometry = THREE.CircleGeometry
var ConeBufferGeometry = THREE.ConeBufferGeometry
var ConeGeometry = THREE.ConeGeometry
var CylinderBufferGeometry = THREE.CylinderBufferGeometry
var CylinderGeometry = THREE.CylinderGeometry
var DodecahedronBufferGeometry = THREE.DodecahedronBufferGeometry
var DodecahedronGeometry = THREE.DodecahedronGeometry
var ExtrudeGeometry = THREE.ExtrudeGeometry
var IcosahedronBufferGeometry = THREE.IcosahedronBufferGeometry
var IcosahedronGeometry = THREE.IcosahedronGeometry
var LatheBufferGeometry = THREE.LatheBufferGeometry
var LatheGeometry = THREE.LatheGeometry
var OctahedronBufferGeometry = THREE.OctahedronBufferGeometry
var OctahedronGeometry = THREE.OctahedronGeometry
var ParametricBufferGeometry = THREE.ParametricBufferGeometry
var ParametricGeometry = THREE.ParametricGeometry
var PlaneBufferGeometry = THREE.PlaneBufferGeometry
var PlaneGeometry = THREE.PlaneGeometry
var PolyhedronBufferGeometry = THREE.PolyhedronBufferGeometry
var PolyhedronGeometry = THREE.PolyhedronGeometry
var RingBufferGeometry = THREE.RingBufferGeometry
var RingGeometry = THREE.RingGeometry
var ShapeGeometry = THREE.ShapeGeometry
var SphereBufferGeometry = THREE.SphereBufferGeometry
var SphereGeometry = THREE.SphereGeometry
var TetrahedronBufferGeometry = THREE.TetrahedronBufferGeometry
var TetrahedronGeometry = THREE.TetrahedronGeometry
var TextGeometry = THREE.TextGeometry
var TorusBufferGeometry = THREE.TorusBufferGeometry
var TorusGeometry = THREE.TorusGeometry
var TorusKnotBufferGeometry = THREE.TorusKnotBufferGeometry
var TorusKnotGeometry = THREE.TorusKnotGeometry
var TubeGeometry = THREE.TubeGeometry
var WireframeGeometry = THREE.WireframeGeometry
var TubeBufferGeometry = THREE.TubeBufferGeometry

// Draw mode
var TrianglesDrawMode = THREE.TrianglesDrawMode
var TriangleStripDrawMode = THREE.TriangleStripDrawMode
var TriangleFanDrawMode = THREE.TriangleFanDrawMode

//Math
var Box2 = THREE.Box2;
var Box3 = THREE.Box3;
var Color = THREE.Color;
var Euler = THREE.Euler;
var Line3 = THREE.Line3
var Frustum = THREE.Frustum;
var Matrix3 = THREE.Matrix3;
var Matrix4 = THREE.Matrix4;
var Plane = THREE.Plane;
var Quarternion = THREE.Quarternion;
var Ray = THREE.Ray;
var Sphere = THREE.Sphere;
var Spline = THREE.Spline;
var Triangle = THREE.Triangle;
var Vector2 = THREE.Vector2;
var Vector3 = THREE.Vector3;
var Vector4 = THREE.Vector4;

//Objects
var LOD = THREE.LOD;
var LensFlare = THREE.LensFlare;
var Line = THREE.Line
var LineSegments = THREE.LineSegments

// CannonJS
var AABB = CANNON.AABB
var ArrayCollisionMatrix = CANNON.ArrayCollisionMatrix
var Body = CANNON.Body
var Box = CANNON.Box
var Broadphase = CANNON.Broadphase
var ConeEquation = CANNON.ConeEquation
var ConeTwistConstraint = CANNON.ConeTwistConstraint
var Constraint = CANNON.Constraint
var ContactEquation = CANNON.ContactEquation
var ContactMaterial = CANNON.ContactMaterial
var ConvexPolyhedron = CANNON.ConvexPolyhedron
var Cylinder = CANNON.Cylinder
var DistanceConstraint = CANNON.DistanceConstraint
var Equation = CANNON.Equation
var EventTarget = CANNON.EventTarget
var FrictionEquation = CANNON.FrictionEquation
var GridBroadphase = CANNON.GridBroadphase
var GSSolver = CANNON.GSSolver
var Heightfield = CANNON.Heightfield
var HingeConstraint = CANNON.HingeConstraint
var JacobianElement = CANNON.JacobianElement
var LockConstraint = CANNON.LockConstraint
var Mat3 = CANNON.Mat3
var PhysicsMaterial = CANNON.Material
var NaiveBroadphase = CANNON.NaiveBroadphase
var Narrowphase = CANNON.Narrowphase
var ObjectCollisionMatrix = CANNON.ObjectCollisionMatrix
var Octree = CANNON.Octree
var OctreeNode = CANNON.OctreeNode
var Particle = CANNON.Particle
var PointToPointConstraint = CANNON.PointToPointConstraint
var Pool = CANNON.Pool
var PhysicsRay = CANNON.Ray
var RaycastResult = CANNON.RaycastResult
var RaycastVehicle = CANNON.RaycastVehicle
var RigidVehicle = CANNON.RigidVehicle
var RotationalEquation = CANNON.RotationalEquation
var RotationalMotorEquation = CANNON.RotationalMotorEquation
var SAPBroadphase = CANNON.SAPBroadphase
var Shape = CANNON.Shape
var Solver = CANNON.Solver
var SPHSystem = CANNON.SPHSystem
var SplitSolver = CANNON.SplitSolver
var Spring = CANNON.Spring
var Transform = CANNON.Transform
var Trimesh = CANNON.Trimesh
var TupleDictionary = CANNON.TupleDictionary
var Vec3 = CANNON.Vec3
var Vec3Pool = CANNON.Vec3Pool
var WheelInfo = CANNON.WheelInfo
var World = CANNON.World