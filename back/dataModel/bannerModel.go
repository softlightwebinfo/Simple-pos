package dataModel

import (
	"article/libraries"
	"article/proto"
	"article/settings"
	sql2 "database/sql"
	"encoding/json"
	"fmt"
)

func BannerModel(id int64) (*proto.Banner, error) {
	orm := new(libraries.ORM)

	orm.
		Select("id, title, subtitle, page, button, route, image, active").
		From("banners").
		Where("id", "=", id)
	redisKey := fmt.Sprintf("banner:%d", id)
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.Banner{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	res := &proto.Banner{}
	data, args := orm.Build().ToSql()
	subtitle := sql2.NullString{}
	button := sql2.NullString{}
	route := sql2.NullString{}
	e := settings.Db.QueryRow(data, args...).Scan(
		&res.Id,
		&res.Title,
		&subtitle,
		&res.Page,
		&button,
		&route,
		&res.Image,
		&res.Active,
	)
	res.Subtitle = subtitle.String
	res.Button = button.String
	res.Route = route.String
	if e != nil {
		return nil, e
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
