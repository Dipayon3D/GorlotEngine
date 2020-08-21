"use strict";

function ThemeDark()
{
    // Metadata
	this.name = "dark";
    this.info = ""
    this.version = "V1.0"
    this.author = "Tentone"

    // Font
    this.font = "Arial"

	this.barColor = "#222222";
	this.panelColor = "#333333";
	this.resizeTabColor = "#222222";
	this.buttonColor = "#222222";
	this.buttonOverColor = "#555555";
	this.buttonLightColor = "#333333";
	this.boxColor = "#444444";
	this.textColor = "#FFFFFF";
	this.iconColor = "#FFFFFF";

	this.specialColor = "#005A00"
	this.specialOverColor = "#008000"

    // Body
	document.body.style.fontFamily = this.font 
	document.body.style.fontSize = "12px";
	document.body.style.color = this.textColor;
}

Theme.register(ThemeDark, "dark");
