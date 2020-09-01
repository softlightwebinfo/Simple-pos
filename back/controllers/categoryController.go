package controllers

import (
	"article/libraries"
	"article/models"
	"article/proto"
	"article/settings"
	"context"
	sql2 "database/sql"
	"encoding/json"
	"fmt"
	"log"
	"time"
)

type CategoryController struct {
}

func (u CategoryController) Update(c context.Context, rq *proto.CategoryServiceUpdateRq) (*proto.CategoryServiceBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("categories")
	orm.Add("name", rq.GetName())
	if rq.GetParentId() == 0 {
		orm.Add("parent_id", nil)
	} else {
		orm.Add("parent_id", rq.GetParentId())
	}
	orm.Where("id", "=", rq.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisCategory{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.CategoryServiceBool{
		Success: a == 1,
	}, nil
}

func (u CategoryController) Get(c context.Context, rq *proto.CategoryServiceGetRq) (*proto.CategoryServiceGetRs, error) {
	orm := new(libraries.ORM)
	redisKey := fmt.Sprintf("categories:get:%d", rq.GetId())
	redisKeyRs, redisKeyErr := settings.Redis.Get(redisKey).Result()
	model := proto.CategoryServiceGetRs{}
	if redisKeyErr == nil {
		_ = json.Unmarshal([]byte(redisKeyRs), &model)
		return &model, nil
	}
	var parentId sql2.NullInt64
	data, args := orm.Select("id, name, parent_id").
		From("categories").
		Where("id", "=", rq.GetId()).
		Build().ToSql()
	err := settings.Db.QueryRow(data, args...).Scan(
		&model.Id,
		&model.Name,
		&parentId,
	)
	model.ParentId = parentId.Int64
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	redisSet, _ := json.Marshal(&model)
	settings.Redis.Set(redisKey, redisSet, time.Duration(settings.MinuteSaveRedis))
	return &model, nil
}

func (u CategoryController) GetAll(c context.Context, rq *proto.CategoryServiceGetAllRq) (*proto.CategoryServiceGetAllRs, error) {
	orm := new(libraries.ORM)
	orm.Select("id, name, parent_id")
	orm.From("categories")
	orm.Order("id", "desc")
	orm.Limit(rq.GetLimit())
	orm.Offset(rq.GetOffset())
	redisKey := fmt.Sprintf("categories:all:%s:%s", rq.GetOffset(), rq.GetLimit())
	sql, i := orm.Build().ToSql()
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.CategoryServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	rows, err := settings.Db.Query(sql, i...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.CategoryServiceModel
	for rows.Next() {
		model := proto.CategoryServiceModel{}
		var parentId sql2.NullInt64
		e := rows.Scan(
			&model.Id,
			&model.Name,
			&parentId,
		)
		model.ParentId=parentId.Int64
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
	rs := &proto.CategoryServiceGetAllRs{
		Result: result,
		Count:  totalCount,
	}
	p, err := json.Marshal(rs)
	errSet := settings.Redis.Set(redisKey, p, time.Duration(settings.MinuteSaveRedis)).Err()
	if errSet != nil {
		return nil, errSet
	}
	return rs, nil
}

func (u CategoryController) Delete(c context.Context, rq *proto.CategoryServiceDeleteRq) (*proto.CategoryServiceBool, error) {
	orm := new(libraries.ORMDelete)
	orm.From("categories")
	orm.Where("id", "=", rq.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisCategory{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.CategoryServiceBool{
		Success: a == 1,
	}, nil
}

func (u CategoryController) Create(c context.Context, r *proto.CategoryServiceCreateRq) (*proto.CategoryServiceBool, error) {
	orm := new(libraries.ORMInsert)
	orm.From("categories")
	orm.Add("name", r.GetName())
	if r.GetParentId() == 0 {
		orm.Add("parent_id", nil)
	} else {
		orm.Add("parent_id", r.GetParentId())
	}

	build := orm.Build()
	_, a, err := build.Save(settings.Db)
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if a == 1 {
		redisDel := models.RedisCategory{}
		redisDel.DeleteCache(settings.Redis)
	}
	return &proto.CategoryServiceBool{
		Success: a == 1,
	}, nil
}
