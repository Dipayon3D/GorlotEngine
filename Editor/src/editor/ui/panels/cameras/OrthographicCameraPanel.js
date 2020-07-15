"use strict";

function OrthographicCameraPanel(parent)
{
	Panel.call(this, parent);

	//Self pointer
	var self = this;

	//Name
	this.form.addText("Name");
	this.name = new TextBox(this.form.element);
	this.name.size.set(200, 18);
	this.name.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.name = self.name.getText();
			Editor.updateObjectViews();
		}
	});
	this.form.add(this.name);
	this.form.nextRow();

	//Position
	this.form.addText("Position");
	this.position = new CoordinatesBox(this.form.element);
	this.position.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var position = self.position.getValue();
			self.obj.position.set(position.x, position.y, position.z);
		}
	});
	this.form.add(this.position);
	this.form.nextRow();

	//Rotation
	this.form.addText("Rotation");
	this.rotation = new CoordinatesBox(this.form.element);
	this.rotation.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var rotation = self.rotation.getValue();
			self.obj.rotation.set(rotation.x, rotation.y, rotation.z);
		}
	});
	this.form.add(this.rotation);
	this.form.nextRow();

	//Size
	this.form.addText("Size");
	this.size = new NumberBox(this.form.element);
	this.size.size.set(80, 18);
	this.size.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.size = self.size.getValue();
			self.obj.updateProjectionMatrix();
		}
	});
	this.form.add(this.size);
	this.form.nextRow();

	//Camera resize Mode
	this.form.addText("Resize Mode");
	this.mode = new DropdownList(this.form.element);
	this.mode.size.set(130, 18);
	this.mode.addValue("Horizontal", OrthographicCamera.FIXED_VERTICAL);
	this.mode.addValue("Vertical", OrthographicCamera.FIXED_HORIZONTAL);
	this.mode.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.mode = self.mode.getSelectedIndex();
		}
	});
	this.form.add(this.mode);
	this.form.nextRow();

	//Select camera as scene default
	this.default = new CheckBox(this.form.element);
	this.default.setText("Default camera");
	this.default.size.set(200, 15);
	this.default.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var scene = ObjectUtils.getScene(self.obj);
			if(scene !== null)
			{
				if(self.default.getValue())
				{
					scene.initial_camera = self.obj.uuid;
				}
				else
				{
					scene.initial_camera = null;
				}
			}
		}
	});
	this.form.add(this.default);

	//Update form
	this.form.updateInterface();
}

//Super Prototypes
OrthographicCameraPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
OrthographicCameraPanel.prototype.updatePanel = function()
{
	if(this.obj !== null)
	{
		this.name.setText(this.obj.name);
		this.position.setValue(this.obj.position.x, this.obj.position.y, this.obj.position.z);
		this.rotation.setValue(this.obj.rotation.x, this.obj.rotation.y, this.obj.rotation.z);
		this.size.setValue(this.obj.size);
		this.mode.setSelectedIndex(this.obj.mode);

		var scene = ObjectUtils.getScene(this.obj);
		if(scene !== null)
		{
			this.default.setValue(scene.initial_camera === this.obj.uuid);
		}
		else
		{
			this.default.setValue(false);
		}
	}
}
