package interfaces

import "github.com/go-redis/redis"

type IRedis interface {
	DeleteCache(redis *redis.Client)
}