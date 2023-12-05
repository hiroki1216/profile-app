package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "gorm.io/gorm"
    "profileApi/db"
    "errors"
)

type ID struct {
	ID string `param:"id"`
}

func main() {  
    e := echo.New()
    e.Use(middleware.CORS())
    e.GET( "/", mysqlConnect)
    e.GET( "/about", getAbout)
    e.GET( "/work/:id", getWork)
    e.GET( "/works", getWorks)
    e.POST("/new/about", postAboutdata)
    e.POST("/new/work", postWorkdata)
    e.PUT("/edit/work/:id", putWorkdata)
    e.PUT("/edit/about", putAboutdata)
    e.DELETE("/delete/work/:id", deleteWorkdata)
    e.Logger.Fatal(e.Start(":8080"))
}
//DB接続確認
func mysqlConnect(c echo.Context) error {
    db, _ := db.DB.DB()
    // defer db.Close()
    err := db.Ping()
    if err != nil {
        return c.String(http.StatusInternalServerError, "DB接続失敗しました")
    } else {
        return c.String(http.StatusOK, "DB接続しました")
    }
}
//GET
func getAbout(c echo.Context) error {
    about := db.About
	db.DB.Take(&about)
    if err := db.DB.Take(&about).Error; errors.Is(err, gorm.ErrRecordNotFound) {
        return c.JSON(http.StatusOK, map[string]interface{}{"data": "nil"})
    }else{
        return c.JSON(http.StatusOK, about)
    }
}
func getWork(c echo.Context) error {
    work := db.Work
    id := new(ID)
    if err := c.Bind(id); err != nil {
		return err
	}
    if err := c.Bind(&work); err != nil {
		return err
	}
	db.DB.First(&work, id.ID)
    return c.JSON(http.StatusOK, work)
}
func getWorks(c echo.Context) error {
    works := db.Works
    if err := c.Bind(&works); err != nil {
		return err
	}
    db.DB.Find(&works)
    return c.JSON(http.StatusCreated, works)
}
//POST
func postAboutdata(c echo.Context) error {
    about := db.About
    if err := c.Bind(&about); err != nil {
        return c.JSON(http.StatusBadRequest, "Invalid JSON data")
    }
    db.DB.Create(&about)
    return c.JSON(http.StatusCreated, about)
}
func postWorkdata(c echo.Context) error {
    work := db.Work
    if err := c.Bind(&work); err != nil {
        return c.JSON(http.StatusBadRequest, "Invalid JSON data")
    }
    db.DB.Create(&work)
    return c.JSON(http.StatusCreated, work)
}
//PUT
func putWorkdata(c echo.Context) error {
    work := db.Work
    if err := c.Bind(&work); err != nil {
        return c.JSON(http.StatusBadRequest, "Invalid JSON data")
    }
    // db.DB.Debug().Model(&work).Updates(&work)
    db.DB.Save(&work)
    return c.JSON(http.StatusOK, work)
}
func putAboutdata(c echo.Context) error {
    about := db.About
    if err := c.Bind(&about); err != nil {
        return c.JSON(http.StatusBadRequest, "Invalid JSON data")
    }
    // db.DB.Model(&about).Updates(&about)
    db.DB.Save(&about)
    return c.JSON(http.StatusOK, about)
}
//DELETE
func deleteWorkdata(c echo.Context) error {
    work := db.Work
    if err := c.Bind(&work); err != nil {
        return c.JSON(http.StatusBadRequest, "Invalid JSON data")
    }
    db.DB.Delete(&work)
    return c.JSON(http.StatusOK, work)
}
