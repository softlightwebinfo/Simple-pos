package libraries

import (
	"fmt"
	"time"
)

func PrintPre(data interface{}) {
	fmt.Printf("%+v\n", data)
}
func GetTimeNow() string {
	t := time.Now()
	//fmt.Println(t.Format("2006-01-02 15:04:05"))
	return t.Format(time.RFC3339)
}
