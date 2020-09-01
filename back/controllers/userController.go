package controllers

import (
	"article/auth"
	"article/libraries"
	"article/models"
	"article/proto"
	"article/settings"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"
)

type UserController struct {
}

func (u UserController) Update(c context.Context, rq *proto.UserServiceUpdateRq) (*proto.UserServiceBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("users")
	orm.Add("email", rq.GetEmail())
	orm.Add("password", rq.GetPassword())
	orm.Add("updated_at", time.Now())
	orm.Add("active", rq.GetActive())
	orm.Add("name", rq.GetName())
	orm.Where("id", "=", rq.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisUser{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.UserServiceBool{
		Success: a == 1,
	}, nil
}
func (u UserController) Get(c context.Context, rq *proto.UserServiceGetRq) (*proto.UserServiceGetRs, error) {
	orm := new(libraries.ORM)
	redisKey := fmt.Sprintf("users:get:%d", rq.GetId())
	redisKeyRs, redisKeyErr := settings.Redis.Get(redisKey).Result()
	model := proto.UserServiceGetRs{}
	if redisKeyErr == nil {
		_ = json.Unmarshal([]byte(redisKeyRs), &model)
		return &model, nil
	}
	data, args := orm.Select("id, email, updated_at, name, description").
		From("users").
		WhereAnd("active", "=", true).
		Where("id", "=", rq.GetId()).
		Build().ToSql()
	tim := time.Time{}

	err := settings.Db.QueryRow(data, args...).Scan(
		&model.Id,
		&model.Email,
		&tim,
		&model.Name,
		&model.Description,
	)
	model.UpdatedAt = tim.Format("2006-01-02 15:04:05")
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	redisSet, _ := json.Marshal(model)
	settings.Redis.Set(redisKey, redisSet, time.Duration(settings.MinuteSaveRedis))
	return &model, nil
}

func (u UserController) Login(c context.Context, rq *proto.UserServiceLoginRq) (*proto.UserServiceLoginRs, error) {
	orm := new(libraries.ORM)
	model := proto.UserServiceLoginRs{}
	var password string
	data, args := orm.Select("id, email, updated_at, name, password").
		From("users").
		WhereAnd("active", "=", true).
		Where("email", "=", rq.GetEmail()).
		//Where("password", "=", rq.GetPassword()).
		Build().ToSql()
	tim := time.Time{}
	model.User = &proto.UserServiceModel{}
	err := settings.Db.QueryRow(data, args...).Scan(
		&model.User.Id,
		&model.User.Email,
		&tim,
		&model.User.Name,
		&password,
	)
	//print(libraries.HashAndSalt(libraries.GetPwd(rq.GetPassword())))
	pass := libraries.ComparePasswords(password, libraries.GetPwd(rq.GetPassword()))
	if !pass {
		return nil, errors.New("error: la cuenta no existe")
	}
	model.User.UpdatedAt = tim.Format("2006-01-02 15:04:05")
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	authModel := auth.AuthModel{}
	us := model.User
	token, err := authModel.CreateToken(us)
	model.Token = token
	return &model, nil
}

func (u UserController) Start(c context.Context, rq *proto.UserServiceStartRq) (*proto.UserServiceLoginRs, error) {
	authorized := auth.IsAuthorized(rq.GetToken())
	//if authorized != nil {
	//	return nil, errors.New("el usuario no esta logeado")
	//}
	authModel := auth.AuthModel{}
	orm := new(libraries.ORM)
	model := proto.UserServiceLoginRs{}
	data, args := orm.Select("id, email, updated_at, name").
		From("users").
		WhereAnd("active", "=", true).
		Where("id", "=", authorized.User.Id).
		Build().ToSql()
	tim := time.Time{}
	model.User = &proto.UserServiceModel{}
	err := settings.Db.QueryRow(data, args...).Scan(
		&model.User.Id,
		&model.User.Email,
		&tim,
		&model.User.Name,
	)
	model.User.UpdatedAt = tim.Format("2006-01-02 15:04:05")
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	us := model.User
	token, err := authModel.CreateToken(us)
	model.Token = token
	return &model, nil
}

func (u UserController) GetAll(c context.Context, rq *proto.UserServiceGetAllRq) (*proto.UserServiceGetAllRs, error) {
	orm := new(libraries.ORM)
	orm.Select("id, email, updated_at, name")
	orm.From("users")
	orm.Where("active", "=", true)
	orm.Order("updated_at", "desc")
	orm.Limit(rq.GetLimit())
	orm.Offset(rq.GetOffset())
	redisKey := fmt.Sprintf("users:all:%s:%s", rq.GetOffset(), rq.GetLimit())
	sql, i := orm.Build().ToSql()
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.UserServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	rows, err := settings.Db.Query(sql, i...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.UserServiceModel
	for rows.Next() {
		model := proto.UserServiceModel{}
		tim := time.Time{}
		e := rows.Scan(
			&model.Id,
			&model.Email,
			&tim,
			&model.Name,
		)
		model.UpdatedAt = tim.Format("2006-01-02 15:04:05")
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
	rs := &proto.UserServiceGetAllRs{
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

func (u UserController) Delete(c context.Context, rq *proto.UserServiceDeleteRq) (*proto.UserServiceBool, error) {
	orm := new(libraries.ORMDelete)
	orm.From("users")
	orm.Where("id", "=", rq.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisUser{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.UserServiceBool{
		Success: a == 1,
	}, nil
}

func (u UserController) Create(c context.Context, r *proto.UserServiceCreateRq) (*proto.UserServiceLoginRs, error) {
	ormExistEmail := new(libraries.ORM)
	data2, args := ormExistEmail.Select("id").
		From("users").
		Where("email", "=", r.GetEmail()).
		Build().ToSql()
	e, err3 := settings.Db.Exec(data2, args...)

	affected, _ := e.RowsAffected()
	if affected > 0 {
		return nil, err3
	}

	pass := libraries.HashAndSalt(libraries.GetPwd(r.GetPassword()))
	orm := new(libraries.ORMInsert)
	orm.From("users")
	orm.Add("email", r.GetEmail())
	orm.Add("password", pass)
	orm.Add("created_at", time.Now())
	orm.Add("updated_at", time.Now())
	orm.Add("active", true)
	orm.Add("name", r.GetName())
	build := orm.Build()
	_, a, err := build.Save(settings.Db)
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	if a == 1 {
		redisDel := models.RedisUser{}
		redisDel.DeleteCache(settings.Redis)
	}
	orm2 := new(libraries.ORM)
	model := proto.UserServiceLoginRs{}
	data, args := orm2.Select("id, email, updated_at, name").
		From("users").
		WhereAnd("active", "=", true).
		WhereAnd("email", "=", r.GetEmail()).
		Where("password", "=", pass).
		Build().ToSql()
	tim := time.Time{}
	model.User = &proto.UserServiceModel{}
	err2 := settings.Db.QueryRow(data, args...).Scan(
		&model.User.Id,
		&model.User.Email,
		&tim,
		&model.User.Name,
	)
	model.User.UpdatedAt = tim.Format("2006-01-02 15:04:05")
	if err2 != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	authModel := auth.AuthModel{}
	us := model.User
	token, err := authModel.CreateToken(us)
	model.Token = token
	return &model, nil
}

func (u UserController) GetAllTokens(c context.Context, rq *proto.UserServiceGetAllTokensRq) (*proto.UserServiceGetAllTokensRs, error) {
	orm := new(libraries.ORM)
	orm.Select("notification_token, name")
	orm.From("users")
	orm.WhereAnd("active", "=", true)
	orm.Where("notification_token", "null", "is not null")
	redisKey := fmt.Sprintf("users:tokens")
	sql, i := orm.Build().ToSql()
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.UserServiceGetAllTokensRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	rows, err := settings.Db.Query(sql, i...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.NotToken
	for rows.Next() {
		model := proto.NotToken{}
		e := rows.Scan(
			&model.Token,
			&model.Name,
		)
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
	}
	rs := &proto.UserServiceGetAllTokensRs{
		Tokens: result,
	}
	p, err := json.Marshal(rs)
	errSet := settings.Redis.Set(redisKey, p, time.Duration(settings.MinuteSaveRedis)).Err()
	if errSet != nil {
		return nil, errSet
	}
	return rs, nil
}
