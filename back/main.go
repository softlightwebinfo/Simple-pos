package main

import (
	"article/controllers"
	"article/proto"
	"article/settings"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"net"
)

func main() {
	dbInit := settings.DbSetting{}
	settings.Db = dbInit.InitDb()
	defer settings.Db.Close()
	redisInit := settings.RedisSetting{}
	settings.Redis = redisInit.InitDb()
	defer settings.Redis.Close()
	listener, err := net.Listen("tcp", ":4040")
	if err != nil {
		panic(err)
	}
	srv := grpc.NewServer()
	proto.RegisterAddServiceServer(srv, &controllers.AddController{})
	proto.RegisterArticleServiceServer(srv, &controllers.ArticleController{})
	proto.RegisterUserServiceServer(srv, &controllers.UserController{})
	proto.RegisterCategoryServiceServer(srv, &controllers.CategoryController{})
	proto.RegisterContactServiceServer(srv, &controllers.ContactController{})
	proto.RegisterBannerServiceServer(srv, &controllers.BannerController{})
	proto.RegisterStudioServiceServer(srv, &controllers.StudioController{})
	proto.RegisterStreamServiceServer(srv, &controllers.StreamController{})

	proto.RegisterStoreServiceServer(srv, &controllers.StoreController{})

	reflection.Register(srv)
	println("Start server http://localhost:4040")
	if e := srv.Serve(listener); e != nil {
		panic(e)
	}
}
