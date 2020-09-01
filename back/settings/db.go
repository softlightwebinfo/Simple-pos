package settings

import (
	"article/models"
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq" // here
	"os"
)

type DbSetting struct {
}

func (then *DbSetting) dbConfig() models.EnvModel {
	conf := models.EnvModel{}
	file, err := os.Open("./env/config.development.json")
	if err != nil {
		print("Error get config.development.json", err.Error())
	}
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&conf)
	if err != nil {
		print("Error decoder file config.development.json", err.Error())
	}
	return conf
}
func (then *DbSetting) connect(config models.EnvModel) *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Dbhost, config.Dbport,
		config.Dbuser, config.Dbpassword, config.Dbname)

	println(psqlInfo)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected!")
	return db
}
func (then *DbSetting) InitDb() *sql.DB {
	return then.connect(then.dbConfig())
}
