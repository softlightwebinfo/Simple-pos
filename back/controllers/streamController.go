package controllers

import (
	"article/gorutinas"
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

type StreamController struct {
}

func (u StreamController) Create(_ context.Context, r *proto.StreamServiceCreateRq) (*proto.StreamServiceCreateRs, error) {
	orm := new(libraries.ORMInsert)
	orm.From("streams")
	orm.Add("title", r.GetTitle())
	orm.Add("description", r.GetDescription())
	orm.Add("video", r.GetVideo())
	orm.Add("st_views", r.GetViews())
	orm.Add("st_clicks", r.GetClicks())
	orm.Add("st_likes", r.GetLikes())
	orm.Add("st_dislikes", r.GetDislikes())

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
		redisDel := models.RedisStream{}
		redisDel.DeleteCache(settings.Redis)
	}
	return &proto.StreamServiceCreateRs{
		Id: id,
	}, nil
}
func (u *StreamController) GetAll(_ context.Context, _ *proto.StreamServiceGetAllRq) (*proto.StreamServiceGetAllRs, error) {
	orm := new(libraries.ORM)
	orm.
		Select("id, title, description, video, st_views, st_clicks, st_likes, st_dislikes, created_at").
		From("streams").
		Order("created_at", "DESC")
	redisKey := fmt.Sprintf("streams:all")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.StreamServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		for _, item := range r.Streams {
			go gorutinas.GoStreamAddView(item.GetId(), "st_views")
		}
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.Stream
	for rows.Next() {
		var studio proto.Stream
		st := sql2.NullString{}
		e := rows.Scan(
			&studio.Id,
			&studio.Title,
			&studio.Description,
			&st,
			&studio.Views,
			&studio.Clicks,
			&studio.Likes,
			&studio.Dislikes,
			&studio.CreatedAt,
		)
		studio.Video = st.String
		studio.Description = studio.Description[0:100]
		go gorutinas.GoStreamAddView(studio.GetId(), "st_views")
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &studio)
	}
	res := &proto.StreamServiceGetAllRs{
		Streams: result,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
func (u *StreamController) Get(_ context.Context, r *proto.StreamServiceGetRq) (*proto.StreamServiceGetRs, error) {
	orm := new(libraries.ORM)
	orm.
		Select("id, title, description, video, st_views, st_clicks, st_likes, st_dislikes, created_at").
		From("streams").
		Where("id", "=", r.GetId())
	redisKey := fmt.Sprintf("streams:get:%d", r.GetId())
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.StreamServiceGetRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		go gorutinas.GoStreamAddView(r.GetId(), "st_views")
		return r, nil
	}
	data, args := orm.Build().ToSql()
	row := settings.Db.QueryRow(data, args...)
	var studio proto.StreamServiceGetRs
	st := sql2.NullString{}
	e := row.Scan(
		&studio.Id,
		&studio.Title,
		&studio.Description,
		&st,
		&studio.Views,
		&studio.Clicks,
		&studio.Likes,
		&studio.Dislikes,
		&studio.CreatedAt,
	)
	studio.Video = st.String
	if e != nil {
		println("Error 2", e.Error())
		return nil, e
	}
	res := &studio
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	go gorutinas.GoStreamAddView(r.GetId(), "st_views")
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
func (u *StreamController) StAdd(_ context.Context, r *proto.StreamServiceStAddRq) (*proto.StreamServiceStAddRs, error) {
	gorutinas.GoStreamAddView(r.GetId(), r.GetColumn())
	return &proto.StreamServiceStAddRs{
		Success: true,
	}, nil
}
