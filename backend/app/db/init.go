package db

import (
	"log"
	"os"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"profileApi/db/model"
)

var DB *gorm.DB
var err error
var About *model.About
var Work *model.Work
var Works = model.Works

func init() {
	//コンテナ間通信のためホストIPアドレスをコンテナ名に設定。
	dsn := "root:pass@tcp(mysql:3306)/profile_db?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	logFile, err := os.Create("init.log")
	if err != nil {
    log.Fatal("Cannot create log file: ", err)
	}
	defer logFile.Close()

	if err != nil {
		log.Fatalln(dsn + "database can't connect")
	}

	DB.AutoMigrate(&About)
	DB.AutoMigrate(&Work)
}
