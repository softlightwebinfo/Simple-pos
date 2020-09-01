package controllers

import (
	"article/libraries"
	"article/models"
	"article/proto"
	"article/settings"
	"context"
	"encoding/json"
	"fmt"
	"github.com/lib/pq"
	"sort"
	"time"
)

type ArticleController struct {
}

/**
Devuelve todos los registros de los articulos que estan activados
*/
func (s *ArticleController) GetAll(_ context.Context, request *proto.ArticleServiceGetAllRq) (*proto.ArticleServiceGetAllRs, error) {
	limit := "0"
	offset := "0"
	orm := new(libraries.ORM)

	orm.
		Select("a.id, a.title, a.description, u.name, a.updated_at, a.fk_category, c.name").
		From("articles a").
		Join("users u", "a.fk_user_id = u.id").
		Join("categories c", "a.fk_category = c.id")

	if request.Category != 0 {
		orm.WhereAnd("a.fk_category", "=", request.GetCategory())
	}
	orm.Where("a.active", "=", true)
	if request.OrderLast {
		orm.Order("a.updated_at", "desc")
	} else {
		orm.Order("a.updated_at", "desc")
	}
	if request.GetLimit() != "" {
		orm.Limit(request.GetLimit())
		limit = request.GetLimit()
	} else {
		orm.Limit(string(settings.Limit))
		limit = string(settings.Limit)
	}
	if request.GetOffset() != "" {
		orm.Offset(request.GetOffset())
		offset = request.GetOffset()
	}
	redisKey := fmt.Sprintf("articles:all:%s:%s:%d", offset, limit, request.GetCategory())
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.ArticleServiceGetAllRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.ArticleServiceModel
	for rows.Next() {
		model := proto.ArticleServiceModel{}
		tim := time.Time{}
		var name, category string
		e := rows.Scan(
			&model.Id,
			&model.Title,
			&model.Description,
			&name,
			&tim,
			&model.FkCategoryId,
			&category,
		)
		model.User = &proto.ArticleUserModel{
			Name: name,
		}
		model.Category = &proto.ArticleCategoryModel{
			Name: category,
		}
		model.UpdatedAt = tim.Format("2006-01-02 15:04:05")
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
	}
	orm.ClearSelect()
	orm.Select("count(a.id) as total")
	orm.ClearLimit()
	orm.ClearOffset()
	orm.ClearOrderBy()
	sql, args2 := orm.Build().ToSql()
	var totalCount int64 = 0
	e := settings.Db.QueryRow(sql, args2...).Scan(&totalCount)
	if e != nil {
		return nil, e
	}
	res := &proto.ArticleServiceGetAllRs{
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
func (s *ArticleController) GetPopular(_ context.Context, request *proto.ArticleServiceGetPopularRq) (*proto.ArticleServiceGetPopularRs, error) {
	limit := "0"
	offset := "0"
	orm := new(libraries.ORM)

	orm.
		Select("a.id, a.title, a.updated_at").
		From("articles a")
	orm.Where("a.active", "=", true)
	orm.Order("(SELECT SUM(views) FROM articles_book where fk_article=a.id)", "desc")
	orm.Limit(request.GetLimit())
	orm.Offset(request.GetOffset())
	offset = request.GetOffset()
	redisKey := fmt.Sprintf("articles:popular:%s:%s", offset, limit)
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.ArticleServiceGetPopularRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.ArticleServicePopularModel
	for rows.Next() {
		model := proto.ArticleServicePopularModel{}
		tim := time.Time{}
		e := rows.Scan(
			&model.Id,
			&model.Title,
			&tim,
		)
		model.UpdatedAt = tim.Format("2006-01-02 15:04:05")
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
	}
	orm.ClearSelect()
	orm.Select("count(a.id) as total")
	orm.ClearLimit()
	orm.ClearOffset()
	orm.ClearOrderBy()
	sql, args2 := orm.Build().ToSql()
	var totalCount int64 = 0
	e := settings.Db.QueryRow(sql, args2...).Scan(&totalCount)
	if e != nil {
		return nil, e
	}
	res := &proto.ArticleServiceGetPopularRs{
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

/**
Devuelve todos los comentarios de los articulos que estan activados
*/
func (s *ArticleController) GetComments(_ context.Context, request *proto.ArticleServiceGetCommentsRq) (*proto.ArticleServiceGetCommentsRs, error) {
	orm := new(libraries.ORM)

	orm.
		Select("c.id, c.created_at, c.description, u.name").
		From("articles_book_comments c").
		Join("users u", "c.fk_user_id = u.id").
		WhereAnd("c.fk_article_id", "=", request.GetId()).
		Where("c.fk_article_num", "=", request.GetBook()).
		Order("created_at", "DESC")

	redisKey := fmt.Sprintf("articles:comments:%d:%s", request.GetId(), request.GetBook())
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.ArticleServiceGetCommentsRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.ArticleComment
	for rows.Next() {
		model := proto.ArticleComment{}
		tim := time.Time{}
		e := rows.Scan(
			&model.Id,
			&tim,
			&model.Description,
			&model.Name,
		)
		model.CreatedAt = tim.String()
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
	}
	res := &proto.ArticleServiceGetCommentsRs{
		Comments: result,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}
func (s *ArticleController) GetCommentsLast(_ context.Context, request *proto.ArticleServiceGetCommentsLastRq) (*proto.ArticleServiceGetCommentsLastRs, error) {
	orm := new(libraries.ORM)

	orm.
		Select("c.id, c.created_at, c.description, u.name, c.fk_article_id").
		From("articles_book_comments c").
		Join("users u", "c.fk_user_id = u.id").
		Order("created_at", "DESC").Limit("5")

	redisKey := fmt.Sprintf("articles:comments:last")
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.ArticleServiceGetCommentsLastRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	data, args := orm.Build().ToSql()
	rows, err := settings.Db.Query(data, args...)
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	var result []*proto.ArticleCommentLast
	for rows.Next() {
		model := proto.ArticleCommentLast{}
		tim := time.Time{}
		e := rows.Scan(
			&model.Id,
			&tim,
			&model.Description,
			&model.Name,
			&model.Blog,
		)
		if len(model.Description) > 30 {
			model.Description = fmt.Sprintf("%s ...", model.Description[:30])
		}
		model.CreatedAt = tim.String()
		if e != nil {
			println("Error 2", e.Error())
			return nil, e
		}
		result = append(result, &model)
	}
	res := &proto.ArticleServiceGetCommentsLastRs{
		Comments: result,
	}
	p, _ := json.Marshal(res)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}
	return res, nil
}

/**
Get Article book
*/
func (s *ArticleController) GetBook(_ context.Context, request *proto.ArticleServiceGetBookRq) (*proto.ArticleServiceGetBookRs, error) {
	redisKey := fmt.Sprintf("book:get:%d:%s", request.GetId(), request.GetBook())
	get := settings.Redis.Get(redisKey)
	valRedis, errRedis := get.Result()
	if errRedis == nil {
		var r = &proto.ArticleServiceGetBookRs{}
		_ = json.Unmarshal([]byte(valRedis), r)
		return r, nil
	}
	orm := new(libraries.ORM)
	orm.
		Select("l.line, l.fk_type, t.fk_prop, t.value").
		From("articles_book b").
		Join("articles_book_line l", "l.fk_article = b.fk_article and l.fk_article_num = b.num").
		Join("articles_book_line_type t", "l.fk_article = t.fk_article and l.fk_article_num = t.fk_article_num and l.line = t.line and l.fk_type = t.fk_type").
		WhereAnd("b.fk_article", "=", request.GetId()).
		Where("b.num", "=", request.GetBook()).
		Order("l.line", "ASC")

	sql, args := orm.Build().ToSql()

	rows, err := settings.Db.Query(sql, args...)

	if err != nil {
		panic(err)
	}
	var result []*proto.ArticleLine

	rs := proto.ArticleServiceGetBookRs{}

	m := map[string]*proto.ArticleLine{}
	for rows.Next() {
		line := proto.ArticleLine{}
		prop := proto.ArticleProps{}
		err := rows.Scan(
			&line.Line,
			&line.FkType,
			&prop.Prop,
			&prop.Value,
		)
		if err != nil {
			panic(err)
		}
		key := fmt.Sprintf("%d-%s", line.Line, line.FkType)
		i, ok := m[key]

		if ok {
			i.Props[prop.Prop] = &prop
		} else {
			line.Props = map[string]*proto.ArticleProps{}
			line.Props[prop.Prop] = &prop
			m[key] = &line
		}
		//result = append(result, &line)
	}

	for _, line := range m {
		result = append(result, line)
	}
	rs.Count = 0
	rs.Lines = result

	orm = new(libraries.ORM)
	orm.Select("count(b.fk_article)").
		From("articles_book b").
		Where("b.fk_article", "=", request.GetId())
	toSql, args2 := orm.Build().ToSql()

	row := settings.Db.QueryRow(toSql, args2...)
	err = row.Scan(&rs.Count)
	if err != nil {
		panic(err)
	}
	orm = new(libraries.ORM)
	orm.Select("b.views").
		From("articles_book b").
		WhereAnd("b.fk_article", "=", request.GetId()).
		Where("b.num", "=", request.GetBook())

	toSql2, args3 := orm.Build().ToSql()

	row = settings.Db.QueryRow(toSql2, args3...)
	err = row.Scan(&rs.Views)

	sort.Slice(rs.Lines, func(i, j int) bool {
		return rs.Lines[i].Line < rs.Lines[j].Line
	})
	p, _ := json.Marshal(rs)
	errSet := settings.Redis.Set(redisKey, p, settings.MinuteSaveRedis).Err()
	if errSet != nil {
		return nil, errSet
	}

	return &rs, nil
}

/**
Devuelve solo el registro con el ID del articulo
*/
func (s *ArticleController) Get(_ context.Context, request *proto.ArticleServiceGetRq) (*proto.ArticleServiceGetRs, error) {
	orm := new(libraries.ORM)
	redisKey := fmt.Sprintf("article:get:%d", request.GetId())
	redisKeyRs, redisKeyErr := settings.Redis.Get(redisKey).Result()
	model := proto.ArticleServiceGetRs{}
	if redisKeyErr == nil {
		_ = json.Unmarshal([]byte(redisKeyRs), &model)
		return &model, nil
	}
	data, args := orm.
		Select("a.id, a.title, a.description, u.name, a.updated_at, a.fk_category, c.name,  ARRAY (SELECT tag from articles_tags where fk_article_id=a.id) tags,a.fk_user_id").
		From("articles a").
		Join("users u", "a.fk_user_id = u.id").
		Join("categories c", "a.fk_category = c.id").
		WhereAnd("a.active", "=", true).
		Where("a.id", "=", request.GetId()).
		Build().ToSql()
	//tim := time.Time{}
	var name, category string
	var t []string
	err := settings.Db.QueryRow(data, args...).Scan(
		&model.Id,
		&model.Title,
		&model.Description,
		&name,
		&model.UpdatedAt,
		&model.FkCategoryId,
		&category,
		pq.Array(&t),
		&model.FkUserId,
	)
	model.Tags = []*proto.ArticleTag{}
	for _, s2 := range t {
		model.Tags = append(model.Tags, &proto.ArticleTag{
			Tag: s2,
		})
	}
	model.User = &proto.ArticleUserModel{
		Name: name,
	}
	model.Category = &proto.ArticleCategoryModel{
		Name: category,
	}
	//model.UpdatedAt = tim.Format("2006-01-02 15:04:05")
	if err != nil {
		println("Error: ", err.Error())
		return nil, err
	}
	redisSet, _ := json.Marshal(&model)
	settings.Redis.Set(redisKey, redisSet, settings.MinuteSaveRedis)

	return &model, nil
}

/**
Crea el nuevo articulo
*/
func (s *ArticleController) Create(_ context.Context, request *proto.ArticleServiceCreateRq) (*proto.ArticleServiceRsBool, error) {
	orm := new(libraries.ORMInsert)
	orm.From("articles")
	orm.Add("title", request.GetTitle())
	orm.Add("description", request.GetDescription())
	orm.Add("fk_user_id", request.GetFkUserId())
	orm.Add("fk_category", request.GetFkCategoryId())
	orm.Add("created_at", libraries.GetTimeNow())
	orm.Add("updated_at", libraries.GetTimeNow())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisArticle{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.ArticleServiceRsBool{
		Success: a == 1,
	}, nil
}

/**
Actualiza el articulo con sus nuevos datos
*/
func (s *ArticleController) Update(_ context.Context, request *proto.ArticleServiceUpdateRq) (*proto.ArticleServiceRsBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("articles")
	orm.Add("title", request.GetTitle())
	orm.Add("description", request.GetDescription())
	orm.Add("fk_category", request.GetFkCategoryId())
	orm.Add("updated_at", libraries.GetTimeNow())
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisArticle{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.ArticleServiceRsBool{
		Success: a == 1,
	}, nil
}

/**
Activa/Desactiva el articulo
*/
func (s *ArticleController) Active(_ context.Context, request *proto.ArticleServiceActiveRq) (*proto.ArticleServiceRsBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("articles")
	orm.Add("active", request.GetActive())
	orm.Add("updated_at", libraries.GetTimeNow())
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisArticle{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.ArticleServiceRsBool{
		Success: a == 1,
	}, nil
}

func (s *ArticleController) AddView(_ context.Context, request *proto.ArticleServiceViewRq) (*proto.ArticleServiceRsBool, error) {
	_, err := settings.Db.Exec("UPDATE articles_book SET views = views+1 WHERE fk_article=$1 and num=$2", request.GetId(), request.GetBook())

	if err != nil {
		panic(err)
		return nil, nil
	}
	return &proto.ArticleServiceRsBool{
		Success: true,
	}, nil
}

/**
Activa/Desactiva el articulo publicamente
*/
func (s *ArticleController) TogglePublic(_ context.Context, request *proto.ArticleServicePublicRq) (*proto.ArticleServiceRsBool, error) {
	orm := new(libraries.ORMUpdate)
	orm.From("articles")
	orm.Add("is_public", true)
	orm.Add("updated_at", libraries.GetTimeNow())
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisArticle{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.ArticleServiceRsBool{
		Success: a == 1,
	}, nil
}

/**
Elimina el articulo
*/
func (s *ArticleController) Delete(_ context.Context, request *proto.ArticleServiceDeleteRq) (*proto.ArticleServiceRsBool, error) {
	orm := new(libraries.ORMDelete)
	orm.From("articles")
	orm.Where("id", "=", request.GetId())
	b := orm.Build()
	_, a, e := b.Save(settings.Db)
	if e != nil {
		println("Error", e.Error())
		return nil, e
	}
	if a == 1 {
		art := models.RedisArticle{}
		art.DeleteCache(settings.Redis)
	}
	return &proto.ArticleServiceRsBool{
		Success: a == 1,
	}, nil
}
