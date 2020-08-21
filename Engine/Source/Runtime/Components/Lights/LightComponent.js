"use strict"

function LightComponent() {
	Component.call(this)

	this.componentName = "Light"
	this.className = "LightComponent"

	this.values = {
		colour: [0.265, 0.265, 0.265],
		castShadow: true,
		groundCol: [1,1,1],
		distance: 0,
		intensity: 1,
		shadowWidth: 512,
		shadowHeight: 512,
		shadowNear: 0.01,
		shadowFar: 1000000,
		angle: 1,
		penumbra: 0,
        rectWidth: 20,
        rectHeight: 20
	}
}

LightComponent.prototype = Object.create(Component.prototype)

LightComponent.prototype.initUI = function(pos, obj) {
	// Clear the element
	this.clearElement()

	this.widgetsPos = pos

	// Self pointer
	var self = this
	this.obj = obj

	// Form
	this.form = new Form(this.element)
	this.form.spacing.set(5, 5)

	// Displays this component name
	this.form.addText(this.componentName)
	this.form.nextRow()

	// Colour
	this.form.addText("Colour")
	this.colour = new ColorChooser(this.form.element)
	this.colour.size.set(80, 18)
	this.colour.setOnChange(() => {
		if (self.obj !== null) {
			var colour = self.colour.getValue()
			self.obj.color.setRGB(colour.r, colour.g, colour.b)
		}
	})
	this.form.add(this.colour)
	this.form.nextRow()

	// Hemisphere Light
	if (this.obj instanceof HemisphereLight) {
		// Ground Colour
		this.form.addText("Ground Colour")
		this.groundCol = new ColorChooser(this.form.element)
		this.groundCol.size.set(80, 18)
		this.groundCol.setOnChange(() => {
			if (self.obj !== null) {
				var col = self.groundCol.getValue()
				self.obj.groundColor.setRGB(col.r, col.g, col.b)
			}
		})
		this.form.add(this.groundCol)
		this.form.nextRow()
	}
	// Point Light
	if (this.obj instanceof PointLight) {
		// Distance
		this.form.addText("Distance")
		this.distance = new NumberBox(this.form.element)
		this.distance.size.set(60, 18)
		this.distance.setStep(0.1)
		this.distance.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.distance = self.distance.getValue()
			}
		})
		this.form.add(this.distance)
		this.form.nextRow()

		// Intensity
		this.form.addText("Intensity")
		this.intensity = new Slider(this.form.element)
		this.intensity.size.set(160, 18)
		this.intensity.setStep(0.1)
		this.intensity.setRange(0, 10)
		this.intensity.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.intensity = self.intensity.getValue()
			}
		})
		this.form.add(this.intensity)
		this.form.nextRow()

	}
	// Spot Light
	if (this.obj instanceof SpotLight) {
		// Penumbra
		this.form.addText("Penumbra")
		this.penumbra = new Slider(this.form.element)
		this.penumbra.size.set(160, 18)
		this.penumbra.position.set(65, 110)
		this.penumbra.setRange(0, 1)
		this.penumbra.setStep(0.01)
		this.penumbra.updateInterface()
		this.penumbra.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.penumbra = self.penumbra.getValue()
			}
		})
		this.form.add(this.penumbra)
		this.form.nextRow()

		// Angle
		this.form.addText("Angle")
		this.angle = new Slider(this.form.element)
		this.angle.size.set(160, 18)
		this.angle.setRange(0, 1.57)
		this.angle.setStep(0.01)
		this.angle.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.angle = self.angle.getValue()
			}
		})
		this.form.add(this.angle)
		this.form.nextRow()
	}

	if (this.obj instanceof DirectionalLight || this.obj instanceof PointLight || this.obj instanceof SpotLight) {
		//Shadows
		this.form.addText("Shadows")
		this.form.nextRow()

		this.form.addText("Cast Shadow")
		this.castShadow = new CheckBox(this.form.element)
		this.castShadow.size.set(20, 15)
		this.castShadow.position.set(5, 85)
		this.castShadow.updateInterface()
		this.castShadow.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.castShadow = self.castShadow.getValue()
			}
		})
		this.form.add(this.castShadow)
		this.form.nextRow()

		// Map
		this.form.addText("Map")
		this.form.nextRow()

		// Shadow resolution
		this.form.addText("Resolution")
		this.shadowWidth = new DropdownList(this.form.element)
		this.shadowWidth.size.set(60, 18)
		this.shadowWidth.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.shadow.mapSize.width = self.shadowWidth.getValue()
				self.obj.updateShadowMap()
			}
		})
		this.form.add(this.shadowWidth)
		this.form.addText("x", true)
		this.shadowHeight = new DropdownList(this.form.element)
		this.shadowHeight.size.set(60, 18)
		this.shadowHeight.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.shadow.mapSize.height = self.shadowHeight.getValue()
				self.obj.updateShadowMap()
			}
		})
		this.form.add(this.shadowHeight)
		this.form.nextRow()

		for(var i = 0; i < 13; i++) {
			var size = Math.pow(2, i)
			this.shadowWidth.addValue(size.toString(), size)
			this.shadowHeight.addValue(size.toString(), size)
		}

		// ShadowMap camera near
		this.form.addText("Near")
		this.shadowNear = new NumberBox(this.form.element)
		this.shadowNear.size.set(60, 18)
		this.shadowNear.setStep(0.1)
		this.shadowNear.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.shadow.camera.near = self.shadowNear.getValue()
				self.obj.updateShadowMap()
			}
		})
		this.form.add(this.shadowNear)
        this.form.nextRow()

		// ShadowMap Camera Far
		this.form.addText("Far")
		this.shadowFar = new NumberBox(this.form.element)
		this.shadowFar.size.set(60, 18)
		this.shadowFar.setStep(0.1)
		this.shadowFar.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.shadow.camera.far = self.shadowFar.getValue()
				self.obj.updateShadowMap()
			}
		})
		this.form.add(this.shadowFar)
		this.form.nextRow()

		if(this.obj instanceof DirectionalLight) {
			// ShadowMap Camera left
			this.form.addText("Left")
			this.shadowLeft = new NumberBox(this.form.element)
			this.shadowLeft.size.set(60, 18)
			this.shadowLeft.setStep(0.1)
			this.shadowLeft.setOnChange(() => {
				if (self.obj !== null) {
					self.obj.shadow.camera.left = self.shadowLeft.getValue()
					self.obj.updateShadowMap()
				}
			})
			this.form.add(this.shadowLeft)
            this.form.nextRow()
	
			// ShadowMap Camera right
			this.form.addText("Right")
			this.shadowRight = new NumberBox(this.form.element)
			this.shadowRight.size.set(60, 18)
			this.shadowRight.setStep(0.1)
			this.shadowRight.setOnChange(() => {
				if (self.obj !== null) {
					self.obj.shadow.camera.right = self.shadowRight.getValue()
					self.obj.updateShadowMap()
				}
			})
			this.form.add(this.shadowRight)
			this.form.nextRow()
	
			// ShadowMap Camera top
			this.form.addText("Top")
			this.shadowTop = new NumberBox(this.form.element)
			this.shadowTop.size.set(60, 18)
			this.shadowTop.setStep(0.1)
			this.shadowTop.setOnChange(() => {
				if (self.obj !== null) {
					self.obj.shadow.camera.top = self.shadowTop.getValue()
					self.obj.updateShadowMap()
				}
			})
			this.form.add(this.shadowTop)
            this.form.nextRow()
	
			// ShadowMap Camera bottom
			this.form.addText("Bottom")
			this.shadowBottom = new NumberBox(this.form.element)
			this.shadowBottom.size.set(60, 18)
			this.shadowBottom.setStep(0.1)
			this.shadowBottom.setOnChange(() => {
				if (self.obj !== null) {
					self.obj.shadow.camera.bottom = self.shadowBottom.getValue()
					self.obj.updateShadowMap()
				}
			})
			this.form.add(this.shadowBottom)
			this.form.nextRow()
		}
		
	} else if(this.obj instanceof RectAreaLight) {
        // Intensity
        this.form.addText("Intensity")
        this.intensity = new Slider(this.form.element)
        this.intensity.size.set(160, 18)
        this.intensity.setStep(0.1)
        this.intensity.setRange(0, 500)
        this.intensity.setOnChange(() => {
            if(self.obj !== null) {
                self.obj.intensity = self.intensity.getValue()
            }
        })
        this.form.add(this.intensity)
        this.form.nextRow()

        // Rect width
        this.form.addText("Width")
        this.width = new NumberBox(this.form.element)
        this.width.size.set(60, 18)
        this.width.setStep(0.1)
        this.width.setOnChange(() => {
            if(self.obj !== null) {
                self.obj.width = self.width.getValue()
            }
        })
        this.form.add(this.width)

        // Rect Height
        this.form.addText("Height")
        this.height = new NumberBox(this.form.element)
        this.height.size.set(60, 18)
        this.height.setStep(0.1)
        this.height.setOnChange(() => {
            if(self.obj !== null) {
                self.obj.height = self.height.getValue()
            }
        })
        this.form.add(this.height)
        this.form.nextRow()
    }

	// Set form position and update interface
	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

LightComponent.prototype.updateData = function() {
	this.colour.setValue(this.obj.color.r, this.obj.color.g, this.obj.color.b)

	if (this.obj instanceof HemisphereLight) {
		this.groundCol.setValue(this.obj.groundColor.r, this.obj.groundColor.g, this.obj.groundColor.b)
	}
	if (this.obj instanceof PointLight) {
		this.distance.setValue(this.obj.distance)
        this.intensity.setValue(this.obj.intensity)
	}
	if (this.obj instanceof SpotLight) {
		this.angle.setValue(this.obj.angle)
		this.penumbra.setValue(this.obj.penumbra)
	}

	if (this.obj instanceof DirectionalLight || this.obj instanceof PointLight || this.obj instanceof SpotLight) {
		this.castShadow.setValue(this.obj.castShadow)
		this.shadowWidth.setValue(this.obj.shadow.mapSize.width)
		this.shadowHeight.setValue(this.obj.shadow.mapSize.height)
		this.shadowNear.setValue(this.obj.shadow.camera.near)
		this.shadowFar.setValue(this.obj.shadow.camera.far)
	}

	if (this.obj instanceof DirectionalLight) {
		this.shadowLeft.setValue(this.obj.shadow.camera.left)
		this.shadowRight.setValue(this.obj.shadow.camera.right)
		this.shadowTop.setValue(this.obj.shadow.camera.top)
		this.shadowBottom.setValue(this.obj.shadow.camera.bottom)
	}

    if(this.obj instanceof RectAreaLight) {
        this.width.setValue(this.obj.width)
        this.height.setValue(this.obj.height)
        this.intensity.setValue(this.obj.intensity)
    }
}

LightComponent.prototype.onReset = function() {
	this.obj.color.setRGB(this.values.colour[0], this.values.colour[1], this.values.colour[2])

	if (this.obj instanceof DirectionalLight || this.obj instanceof PointLight) {
		this.obj.castShadow = this.values.castShadow
        this.obj.intensity = this.values.intensity
	}
	if (this.obj instanceof HemisphereLight) {
		this.obj.groundColor.setRGB(this.values.groundCol[0], this.values.groundCol[1], this.values.groundCol[2])
	}
	if (this.obj instanceof PointLight) {
		this.obj.distance = this.values.distance
		this.obj.shadow.mapSize.width = this.values.shadowWidth
		this.obj.shadow.mapSize.height = this.values.shadowHeight
		this.obj.shadow.camera.near = this.values.shadowNear
		this.obj.shadow.camera.far = this.values.shadowFar
		this.obj.updateShadowMap()
	}
	if (this.obj instanceof SpotLight) {
		this.obj.penumbra = this.values.penumbra
		this.obj.angle = this.values.angle
	}
    if (this.obj instanceof RectAreaLight) {
        this.obj.width = this.values.rectWidth
        this.obj.height = this.values.rectHeight
        this.obj.intensity = this.values.intensity
    }

	Editor.updateObjectViews()
	this.updateData()
}
