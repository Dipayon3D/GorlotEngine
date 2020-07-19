"use strict"

function SkyComponent() {
        Component.call(this)

        this.component_name = "Sky"
        this.className = "SkyComponent"

        this.values = {
                auto_update: false,
                duration: 240,
                time: 150,
                distance: 500
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
        this.form.addText(this.component_name)
        this.form.nextRow()

        // Auto update
        this.auto_update = new CheckBox(this.form.element)
        this.auto_update.setText("Auto Update")
        this.auto_update.size.set(200, 15)
        this.auto_update.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.auto_update = self.auto_update.getValue()
                }
        })
        this.form.add(this.auto_update)
        this.form.nextRow()

        // Day time
        this.form.addText("Day duration(s)")
        this.day_time = new NumberBox(this.form.element)
        this.day_time.size.set(100, 18)
        this.day_time.setStep(0.1)
        this.day_time.setOnChange(() => {
                if(self.obj !== null) {
                        // Check and set day time
                        var day_time = self.day_time.getValue()
                        if(day_time < 0) {
                                day_time = 0
                                self.day_time.setValue(day_time)
                        }
                        self.obj.day_time = day_time

                        // Check actual time
                        if(self.obj.day_time > day_time) {
                                self.obj.time = day_time
                                self.time.setValue(day_time)
                        }

                        self.time.setRange(0, day_time)
                        self.obj.updateSky()
                }
        })
        this.form.add(this.day_time)
        this.form.nextRow()

        // Time
        this.form.addText("Time (s)")
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
                        else if(time > self.obj.day_time) {
                                time = self.obj.day_time
                                self.time.setValue(time)
                        }

                        self.obj.time = time
                        self.obj.updateSky()
                }
        })
        this.form.add(this.time)
        this.form.nextRow()

        // Sun distance
        this.form.addText("Sun distance")
        this.sun_distance = new NumberBox(this.form.element)
        this.sun_distance.size.set(80, 18)
        this.sun_distance.setStep(10)
        this.sun_distance.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.sun_distance = self.sun_distance.getValue()
                        self.obj.updateSky()
                }
        })
        this.form.add(this.sun_distance)
        this.form.nextRow()

        // Set position and update interface
        this.form.position.copy(this.widgetsPos)
        this.form.updateInterface()

        this.widgetsPos.y += this.form.size.y
        this.addResetButton()

        return this.element
}

SkyComponent.prototype.updateData = function() {
        this.auto_update.setValue(this.obj.auto_update)
        this.day_time.setValue(this.obj.day_time)
        this.time.setValue(this.obj.time)
        this.sun_distance.setValue(this.obj.sun_distance)
}

SkyComponent.prototype.onReset = function() {
        this.obj.auto_update = this.values.auto_update
        this.obj.day_time = this.values.duration
        this.obj.time = this.values.time
        this.obj.sun_distance = this.values.distance

        this.updateData()
        this.obj.updateSky()
        Editor.updateObjectViews()
}
