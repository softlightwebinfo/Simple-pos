package gorutinas

import (
	settings "article/settings"
	"fmt"
	"log"
)

func GoStreamAddView(streamId int64, col string) {
	_, err := settings.Db.Exec(fmt.Sprintf("UPDATE streams SET %s=%s + 1 where id = $1", col, col), streamId)
	if err!=nil{
		log.Print(err)
	}
}
