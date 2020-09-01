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

type BannerController struct {
}

func (u BannerController) Create(c context.Context, r *proto.BannerServiceCreateRq) (*proto.BannerServiceBool, error) {
	orm := new(libraries.ORMInsert)
	orm.From("banners")
	orm.Add("title", r.GetTitle())
	if r.GetSubtitle() == "null" {
		orm.Add("subtitle", nil)
	} else {
		orm.Add("subtitle", r.GetSubtitle())
	}
	if r.GetRoute() == "null" {
		orm.Add("route", r.GetRoute())
	} else {
		orm.Add("route", r.GetRoute())
	}
	if r.GetButton() == "null" {
		orm.Add("button", nil)
	} else {
		orm.Add("button", r.GetButton())
	}
	orm.Add("page", r.GetPage())
	orm.Add("image", r.GetImage())

	build := orm.Build()
	_, a, err := build.Save(settings.Db)
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if a == 1 {
		redisDel := models.RedisBanner{}
		redisDel.DeleteCache(settings.Redis)
	}
	return &proto.BannerServiceBool{
		Success: a == 1,
	}, nil
}
func (u BannerController) Update(c context.Context, r *proto.BannerServiceUpdateRq) (*proto.BannerServiceUpdateRq, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("banners")
	orm.Add("title", r.GetTitle())
	if r.GetSubtitle() == "null" {
		orm.Add("subtitle", nil)
	} else {
		orm.Add("subtitle", r.GetSubtitle())
	}
	if r.GetRoute() == "null" {
		orm.Add("route", nil)
	} else {
		orm.Add("route", r.GetRoute())
	}
	if r.GetButton() == "null" {
		orm.Add("button", nil)
	} else {
		orm.Add("button", r.GetButton())
	}
	orm.Add("page", r.GetPage())
	if len(r.GetImage()) > 0 {
		orm.Add("image", r.GetImage())
	}
	orm.Where("id", "=", r.GetId())

	build := orm.Build()
	_, a, err := build.Save(settings.Db)
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if a == 1 {
		redisDel := models.RedisBanner{}
		redisDel.DeleteCache(settings.Redis)
	}
	banner, _ := dataModel.BannerModel(r.GetId())
	return &proto.BannerServiceUpdateRq{
		Image:    banner.Image,
		Route:    banner.Route,
		Button:   banner.Button,
		Page:     banner.Page,
		Subtitle: banner.Subtitle,
		Title:    banner.Title,
		Id:       banner.Id,
		Token:    r.GetToken(),
	}, nil
}
func (s *BannerController) GetAll(_ context.Context, request *proto.BannerServiceGetAllRq) (*proto.BannerServiceGetAllRs, error) {
	orm := new(libraries.ORM)

	orm.
		Select("id, title, subtitle, page, button, route, image, active").
		From("banners")
	redisKey := fmt.Sprintf("banner:all")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.BannerServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.Banner
	for rows.Next() {
		subtitle := sql2.NullString{}
		button := sql2.NullString{}
		route := sql2.NullString{}
		model := proto.Banner{}
		e := rows.Scan(
			&model.Id,
			&model.Title,
			&subtitle,
			&model.Page,
			&button,
			&route,
			&model.Image,
			&model.Active,
		)
		model.Subtitle = subtitle.String
		model.Button = button.String
		model.Route = route.String
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
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
	res := &proto.BannerServiceGetAllRs{
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
func (s *BannerController) Active(_ context.Context, request *proto.BannerServiceActiveRq) (*proto.BannerServiceBool, error) {
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
		art := models.RedisBanner{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.BannerServiceBool{
		Success: a == 1,
	}, nil
}
func (s *BannerController) Delete(_ context.Context, request *proto.BannerServiceDeleteRq) (*proto.BannerServiceBool, error) {
	orm := new(libraries.ORMDelete)
	orm.From("banners")
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisBanner{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.BannerServiceBool{
		Success: a == 1,
	}, nil
}
