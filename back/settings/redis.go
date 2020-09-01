package settings

import (
	"github.com/go-redis/redis"
	"log"
)

type RedisSetting struct {
}

func (then *RedisSetting) InitDb() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6384",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	pong, err := client.Ping().Result()
	if err != nil {
		log.Fatal("Error redis", err.Error())
	} else {
		println(pong)
	}
	return client
}
