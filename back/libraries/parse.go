package libraries

import "fmt"

type Parse struct {
}

func (then *Parse) FloatToString(item interface{}) string {
	return fmt.Sprintf("%f", item.(float32))
}
func (then *Parse) Int64ToString(item interface{}) string {
	return fmt.Sprintf("%d", item.(int64))
}
