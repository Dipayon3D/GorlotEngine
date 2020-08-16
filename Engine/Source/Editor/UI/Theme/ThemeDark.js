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

	this.bar_color = "#222222";
	this.panel_color = "#333333";
	this.resize_tab_color = "#222222";
	this.button_color = "#222222";
	this.button_over_color = "#555555";
	this.button_light_color = "#333333";
	this.box_color = "#444444";
	this.text_color = "#FFFFFF";
	this.icon_color = "#FFFFFF";

	this.special_color = "#005A00"
	this.special_over_color = "#008000"

    // Body
	document.body.style.fontFamily = this.font 
	document.body.style.fontSize = "12px";
	document.body.style.color = this.text_color;
}

Theme.register(ThemeDark, "dark");
