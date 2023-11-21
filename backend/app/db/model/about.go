package model

import (
	"gorm.io/gorm"
)
type About struct {
	gorm.Model
	Name string `json:"name"`
	Introduction string `json:"introduction"`
	Certification string `json:"certification"`
	Speciality string `json:"speciality"`
	Experiences string `json:"experiences"`
	Strength string `json:"strength"`
}
var Abouts = []About{}