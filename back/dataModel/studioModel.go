package dataModel

import (
	"article/libraries"
	"article/proto"
	"article/settings"
	"encoding/json"
	"fmt"
)

func StudioModel(id int64) (*proto.Studio, error) {
	orm := new(libraries.ORM)
	orm.
		Select("id, title, description, size, capacity, price_from, active").
		From("studios").
		Where("id", "=", id)
	redisKey := fmt.Sprintf("studio:%d", id)
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.Studio{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	studio := &proto.Studio{}
	data, args := orm.Build().ToSql()
	e := settings.Db.QueryRow(data, args...).Scan(
		&studio.Id,
		&studio.Title,
		&studio.Description,
		&studio.Size,
		&studio.Capacity,
		&studio.PriceFrom,
		&studio.Active,
	)
	if e != nil {
		return nil, e
	}
	p, _ := json.Marshal(studio)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return studio, nil
}
