package models

type EnvModel struct {
	Dbhost     string `json:"dbhost"`
	Dbport     string `json:"dbport"`
	Dbuser     string `json:"dbuser"`
	Dbpassword string `json:"dbpassword"`
	Dbname     string `json:"dbname"`
}
