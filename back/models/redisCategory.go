package models

import "github.com/go-redis/redis"

type RedisCategory struct {
}

func (then *RedisCategory) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "user*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
