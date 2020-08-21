"use strict"

function SkyComponent() {
        Component.call(this)

        this.componentName = "Sky"
        this.className = "SkyComponent"

        this.values = {
                autoUpdate: false,
                duration: 240,
                time: 150,
                distance: 500,

                shadows: true,
                width: 512,
                height: 512,
                near: 0.5,
                far: 10000,
                left: -10,
                right: 10,
                top: 10,
                bottom: -10
        }
}

SkyComponent.prototype = Object.create(Component.prototype)

SkyComponent.prototype.initUI = function(pos, obj) {
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

        // Auto update
        this.form.addText("Auto Update")
        this.autoUpdate = new CheckBox(this.form.element)
        this.autoUpdate.size.set(20, 15)
        this.autoUpdate.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.autoUpdate = self.autoUpdate.getValue()
                }
        })
        this.form.add(this.autoUpdate)
        this.form.nextRow()

        // Day time
        this.form.addText("Day duration")
        this.dayTime = new NumberBox(this.form.element)
        this.dayTime.size.set(60, 18)
        this.dayTime.setStep(0.1)
        this.dayTime.setOnChange(() => {
                if(self.obj !== null) {
                        // Check and set day time
                        var dayTime = self.dayTime.getValue()
                        if(dayTime < 0) {
                                dayTime = 0
                                self.dayTime.setValue(dayTime)
                        }
                        self.obj.dayTime = dayTime

                        // Check actual time
                        if(self.obj.dayTime > dayTime) {
                                self.obj.time = dayTime
                                self.time.setValue(dayTime)
                        }

                        self.time.setRange(0, dayTime)
                        self.obj.updateSky()
                }
        })
        this.form.add(this.dayTime)
        this.form.addText("s")
        this.form.nextRow()

        // Time
        this.form.addText("Time")
        this.time = new NumberBox(this.form.element)
        this.time.size.set(100, 18)
        this.time.setStep(0.1)
        this.time.setOnChange(() => {
                if(self.obj !== null) {
                        var time = self.time.getValue()

                        if(time < 0) {
                                time = 0
                                self.time.setValue(time)
                        }
                        else if(time > self.obj.dayTime) {
                                time = self.obj.dayTime
                                self.time.setValue(time)
                        }

                        self.obj.time = time
                        self.obj.updateSky()
                }
        })
        this.form.add(this.time)
        this.form.addText("s")
        this.form.nextRow()

        // Sun distance
        this.form.addText("Sun distance")
        this.sunDistance = new NumberBox(this.form.element)
        this.sunDistance.size.set(80, 18)
        this.sunDistance.setStep(10)
        this.sunDistance.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.sunDistance = self.sunDistance.getValue()
                        self.obj.updateSky()
                }
        })
        this.form.add(this.sunDistance)
        this.form.nextRow()

        // Shadow Map
        this.form.addText("Shadows")
        this.form.nextRow()

        // Cast Shadow
        this.form.addText("Cast shadows")
        this.castShadow = new CheckBox(this.form.element)
        this.castShadow.size.set(20, 15)
        this.castShadow.position.set(5, 85)
        this.castShadow.updateInterface()
        this.castShadow.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.castShadow = self.castShadow.getValue()
                }
        })
        this.form.add(this.castShadow)
        this.form.nextRow()

        // Shadow resolution
        this.form.addText("Resolution",)
        this.shadowWidth = new DropdownList(this.form.element)
        this.shadowWidth.size.set(60, 18)
        this.shadowWidth.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.mapSize.width = self.shadowWidth.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowWidth)
        this.form.addText("x", true)
        this.shadowHeight = new DropdownList(this.form.element)
        this.shadowHeight.size.set(60, 18)
        this.shadowHeight.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.mapSize.height = self.shadowHeight.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowHeight)
        this.form.nextRow()

        for(var i = 0; i < 13; i++) {
                var size = Math.pow(2, i)
                this.shadowWidth.addValue(size.toString(), size)
                this.shadowHeight.addValue(size.toString(), size)
        }

        // Shadowmap camera near
        this.form.addText("Near")
        this.shadowNear = new NumberBox(this.form.element)
        this.shadowNear.size.set(60, 18)
        this.shadowNear.setStep(0.1)
        this.shadowNear.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.near = self.shadowNear.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowNear)
        this.form.nextRow()

        // Shadowmap camera far
        this.form.addText("Far")
        this.shadowFar = new NumberBox(this.form.element)
        this.shadowFar.size.set(60, 18)
        this.shadowFar.setStep(0.1)
        this.shadowFar.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.far = self.shadowFar.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowFar)
        this.form.nextRow()

        // Shadowmap camera left
        this.form.addText("Left")
        this.shadowLeft = new NumberBox(this.form.element)
        this.shadowLeft.size.set(60, 18)
        this.shadowLeft.setStep(0.1)
        this.shadowLeft.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.left = self.shadowLeft.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowLeft)
        this.form.nextRow()

        // Shadowmap camera right
        this.form.addText("Right")
        this.shadowRight = new NumberBox(this.form.element)
        this.shadowRight.size.set(60, 18)
        this.shadowRight.setStep(0.1)
        this.shadowRight.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.right = self.shadowRight.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowRight)
        this.form.nextRow()

        // Shadowmap camera top
        this.form.addText("Top")
        this.shadowTop = new NumberBox(this.form.element)
        this.shadowTop.size.set(60, 18)
        this.shadowTop.setStep(0.1)
        this.shadowTop.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.top = self.shadowTop.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowTop)
        this.form.nextRow()

        // Shadowmap camera bottom
        this.form.addText("Bottom")
        this.shadowBottom = new NumberBox(this.form.element)
        this.shadowBottom.size.set(60, 18)
        this.shadowBottom.setStep(0.1)
        this.shadowBottom.setOnChange(() => {
                if (self.obj !== null) {
                        self.obj.sun.shadow.camera.bottom = self.shadowBottom.getValue()
                        self.obj.sun.updateShadowMap()
                }
        })
        this.form.add(this.shadowBottom)
        this.form.nextRow()

        // Set position and update interface
        this.form.position.copy(this.widgetsPos)
        this.form.updateInterface()

        this.widgetsPos.y += this.form.size.y
        this.addResetButton()

        return this.element
}

SkyComponent.prototype.updateData = function() {
        this.autoUpdate.setValue(this.obj.autoUpdate)
        this.dayTime.setValue(this.obj.dayTime)
        this.time.setValue(this.obj.time)
        this.sunDistance.setValue(this.obj.sunDistance)

        this.castShadow.setValue(this.obj.sun.castShadow)
        this.shadowWidth.setValue(this.obj.sun.shadow.mapSize.width)
        this.shadowHeight.setValue(this.obj.sun.shadow.mapSize.height)
        this.shadowNear.setValue(this.obj.sun.shadow.camera.near);
        this.shadowFar.setValue(this.obj.sun.shadow.camera.far)
        this.shadowLeft.setValue(this.obj.sun.shadow.camera.left)
        this.shadowRight.setValue(this.obj.sun.shadow.camera.right)
        this.shadowTop.setValue(this.obj.sun.shadow.camera.top)
        this.shadowBottom.setValue(this.obj.sun.shadow.camera.bottom)
}

SkyComponent.prototype.onReset = function() {
        this.obj.autoUpdate = this.values.autoUpdate
        this.obj.dayTime = this.values.duration
        this.obj.time = this.values.time
        this.obj.sunDistance = this.values.distance

        this.obj.sun.castShadow = this.values.shadows
        this.obj.sun.shadow.mapSize.width = this.values.width
        this.obj.sun.shadow.mapSize.height = this.values.height
        this.obj.sun.shadow.camera.near = this.values.near
        this.obj.sun.shadow.camera.far = this.values.far
        this.obj.sun.shadow.camera.left = this.values.left
        this.obj.sun.shadow.camera.right = this.values.right
        this.obj.sun.shadow.camera.top = this.values.top
        this.obj.sun.shadow.camera.bottom = this.values.bottom

        this.updateData()
        this.obj.updateSky()
        Editor.updateObjectViews()
}
