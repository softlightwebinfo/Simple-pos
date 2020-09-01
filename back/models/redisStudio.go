package models

import "github.com/go-redis/redis"

type RedisStudio struct {
}

func (then *RedisStudio) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "studio*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
