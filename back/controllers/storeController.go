package controllers

import (
	"article/libraries"
	"article/proto"
	"article/settings"
	"context"
	"encoding/json"
	"fmt"
)

type StoreController struct {
}

func (u *StoreController) GetAll(_ context.Context, _ *proto.StoreServiceGetAllRQ) (*proto.StoreServiceGetAllRS, error) {
	orm := new(libraries.ORM)
	orm.
		Select("id, store_name, email, phone, address, code").
		From("stores")
	redisKey := fmt.Sprintf("stores:all")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.StoreServiceGetAllRS{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.StoreList
	for rows.Next() {
		var studio proto.StoreList
		e := rows.Scan(
			&studio.Id,
			&studio.Name,
			&studio.Email,
			&studio.Phone,
			&studio.Address,
			&studio.Code,
		)
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &studio)
	}
	res := &proto.StoreServiceGetAllRS{
		Stores: result,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}