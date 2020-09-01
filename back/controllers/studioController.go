package controllers

import (
	"article/dataModel"
	"article/libraries"
	"article/models"
	"article/proto"
	"article/settings"
	"context"
	sql2 "database/sql"
	"encoding/json"
	"fmt"
	"log"
)

type StudioController struct {
}

func (u StudioController) Create(_ context.Context, r *proto.StudioServiceCreateRq) (*proto.StudioServiceCreateRs, error) {
	orm := new(libraries.ORMInsert)
	orm.From("studios")
	orm.Add("title", r.GetTitle())
	orm.Add("description", r.GetDescription())
	orm.Add("size", r.GetSize())
	orm.Add("capacity", r.GetCapacity())
	orm.Add("price_from", r.GetPriceFrom())
	orm.Add("active", true)

	build := orm.Build()
	data, i := build.ToString()
	sql := fmt.Sprintf("%s returning %s", data, "id")
	var id int64
	err := settings.Db.QueryRow(sql, i...).Scan(&id)

	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if id > 0 {
		redisDel := models.RedisStudio{}
		redisDel.DeleteCache(settings.Redis)
	}
	return &proto.StudioServiceCreateRs{
		Id: id,
	}, nil
}
func (u StudioController) Update(_ context.Context, r *proto.StudioServiceUpdateRq) (*proto.StudioServiceUpdateRq, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("studios")
	orm.Add("title", r.GetTitle())
	orm.Add("description", r.GetDescription())
	orm.Add("size", r.GetSize())
	orm.Add("capacity", r.GetCapacity())
	orm.Add("price_from", r.GetPriceFrom())
	orm.Add("active", r.GetActive())
	orm.Where("id", "=", r.GetId())

	build := orm.Build()
	_, a, err := build.Save(settings.Db)
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if a == 1 {
		redisDel := models.RedisStudio{}
		redisDel.DeleteCache(settings.Redis)
	}
	studio, _ := dataModel.StudioModel(r.GetId())
	return &proto.StudioServiceUpdateRq{
		Title:       studio.Title,
		Description: studio.Description,
		Size:        studio.Size,
		Capacity:    studio.Capacity,
		PriceFrom:   studio.PriceFrom,
		Active:      studio.Active,
		Id:          studio.Id,
		Token:       r.GetToken(),
	}, nil
}
func (u StudioController) UpdatePrices(_ context.Context, r *proto.StudioServiceUpdatePricesRq) (*proto.StudioServiceBool, error) {
	tx, _ := settings.Db.Begin()
	orm := new(libraries.ORMDelete)
	orm.From("studios_prices")
	orm.Where("fk_studio", "=", r.GetId())
	toString, i := orm.Build().ToString()
	_, err2 := tx.Exec(toString, i...)
	if err2 != nil {
		_ = tx.Rollback()
		return nil, err2
	}
	ormU := new(libraries.ORMInsert)
	ormU.From("studios_prices")
	ormU.Add("id", "")
	ormU.Add("fk_studio", "")
	ormU.Add("title", "")
	ormU.Add("description", "")
	ormU.Add("price", "")
	ormU.Add("ishour", "")

	s, _ := ormU.Build().ToString()
	prepare, _ := tx.Prepare(s)
	for _, price := range r.GetPrices() {
		_, err2 := prepare.Exec(
			price.GetId(),
			price.GetFkStudio(),
			price.GetTitle(),
			price.GetDescription(),
			price.GetPrice(),
			price.GetIsHour(),
		)
		if err2 != nil {
			log.Fatal(err2)
		}
	}
	err := tx.Commit()
	if err != nil {
		redisDel := models.RedisStudio{}
		redisDel.DeleteCache(settings.Redis)
	}
	defer prepare.Close()
	return &proto.StudioServiceBool{
		Success: true,
	}, nil
}
func (u StudioController) UpdateImages(_ context.Context, r *proto.StudioServiceUpdateImagesRq) (*proto.StudioServiceBool, error) {
	ormU := new(libraries.ORMInsert)
	ormU.From("studios_images")
	ormU.Add("fk_studio", r.GetId())
	ormU.Add("image", r.GetImage())
	_, _, err := ormU.Build().Save(settings.Db)
	if err != nil {
		redisDel := models.RedisStudio{}
		redisDel.DeleteCache(settings.Redis)
	}
	return &proto.StudioServiceBool{
		Success: true,
	}, nil
}
func (u *StudioController) GetAll(_ context.Context, _ *proto.StudioServiceGetAllRq) (*proto.StudioServiceGetAllRs, error) {
	orm := new(libraries.ORM)
	orm.
		Select("id, title, description, size, capacity, price_from, active, (SELECT image from studios_images where fk_studio=studios.id limit 1) as image").
		From("studios")
	redisKey := fmt.Sprintf("studio:all")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.StudioServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.Studio
	for rows.Next() {
		var studio proto.Studio
		st := sql2.NullString{}
		e := rows.Scan(
			&studio.Id,
			&studio.Title,
			&studio.Description,
			&studio.Size,
			&studio.Capacity,
			&studio.PriceFrom,
			&studio.Active,
			&st,
		)
		studio.Image = st.String
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &studio)
	}
	orm.ClearSelect()
	orm.Select("count(id) as total")
	orm.ClearLimit()
	orm.ClearOffset()
	orm.ClearOrderBy()
	sql, args2 := orm.Build().ToSql()
	var totalCount int64 = 0
	e := settings.Db.QueryRow(sql, args2...).Scan(&totalCount)
	if e != nil {
		return nil, e
	}
	res := &proto.StudioServiceGetAllRs{
		Result: result,
		Count:  totalCount,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
func (u *StudioController) GetAllPrices(_ context.Context, _ *proto.StudioServiceGetAllPricesRq) (*proto.StudioServiceGetAllPricesRs, error) {
	orm := new(libraries.ORM)
	orm.
		Select("fk_studio, id, title, description, price, ishour").
		From("studios_prices")
	redisKey := fmt.Sprintf("studio:all:prices")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.StudioServiceGetAllPricesRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.Prices
	for rows.Next() {
		var studio proto.Prices
		e := rows.Scan(
			&studio.FkStudio,
			&studio.Id,
			&studio.Title,
			&studio.Description,
			&studio.Price,
			&studio.IsHour,
		)
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &studio)
	}
	orm.ClearSelect()
	orm.Select("count(id) as total")
	orm.ClearLimit()
	orm.ClearOffset()
	orm.ClearOrderBy()
	sql, args2 := orm.Build().ToSql()
	var totalCount int64 = 0
	e := settings.Db.QueryRow(sql, args2...).Scan(&totalCount)
	if e != nil {
		return nil, e
	}
	res := &proto.StudioServiceGetAllPricesRs{
		Result: result,
		Count:  totalCount,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
func (u *StudioController) Active(_ context.Context, request *proto.StudioServiceActiveRq) (*proto.StudioServiceBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("banners")
	orm.Add("active", request.GetActive())
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisStudio{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.StudioServiceBool{
		Success: a == 1,
	}, nil
}
func (u *StudioController) Delete(_ context.Context, request *proto.StudioServiceDeleteRq) (*proto.StudioServiceBool, error) {
	orm := new(libraries.ORMDelete)
	orm.From("studios")
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisStudio{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.StudioServiceBool{
		Success: a == 1,
	}, nil
}
