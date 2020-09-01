package models

import "github.com/go-redis/redis"

type RedisUser struct {
}

func (then *RedisUser) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "user*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
