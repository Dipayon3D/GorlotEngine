//Object tools contains some object managing helpers
function ObjectUtils(){}

// Limit object size
ObjectUtils.limitSize = function(x, y, z) {
	// TODO: This
}

// Set shadow receiving
ObjectUtils.setShadowReceiving = function(obj, value) {
	obj.receiveShadow = value

	for(var i = 0; i < obj.children.length; i++) {
		ObjectUtils.setShadowReceiving(obj.children[i], value)
	}
}

// Set shadow casting
ObjectUtils.setShadowCasting = function(obj, value) {
	obj.castShadow = value

	for(var i = 0; i < obj.children.length; i++) {
		ObjectUtils.setShadowCasting(obj.children[i], value)
	}
}

//Check if object is child of another object
ObjectUtils.isChildOf = function(parent, child)
{
	for(var j = 0; j < parent.children.length; j++) {
		if (parent.children[i] === child || ObjectUtils.isChildOf(parent.children[i], child)) {
			return true
		}
	}
	return false
}

//Return object absolute position (not relative to parent)
ObjectUtils.objectAbsolutePosition = function(obj)
{
	if(obj.parent !== null &&  obj.parent !== undefined)
	{
		var parent = obj.parent;
		var scale = new THREE.Vector3(1, 1, 1);
		
		while(parent !== null)
		{
			scale.multiply(parent.scale);
			parent = parent.parent;
		}

		var position = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
		position.multiply(scale);
		position.add(ObjectUtils.objectAbsolutePosition(obj.parent));

		return position;
	}

	return obj.position;
}

//Return object absolute scale (not relative to parent)
ObjectUtils.objectAbsoluteScale = function(obj)
{
	if(obj.parent !== null &&  obj.parent !== undefined)
	{
		var scale = new THREE.Vector3(obj.scale.x, obj.scale.y, obj.scale.z);
		scale.multiply(ObjectUtils.objectAbsoluteScale(obj.parent));

		return scale;
	}

	return obj.scale;
}