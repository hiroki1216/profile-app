package model

import (
	"gorm.io/gorm"
)
type Work struct {
	gorm.Model
	ProjectName string `json:"projectName"`
	Language string `json:"language"`
	Framework string `json:"framework"`
	Tool string `json:"tool"`
	Introduction string `json:"introduction"`
	Responsible string `json:"responsible"`
	AcquiredSkill string `json:"acquiredSkill"`
}
var Works = []Work{}