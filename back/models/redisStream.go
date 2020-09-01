package models

import "github.com/go-redis/redis"

type RedisStream struct {
}

func (then *RedisStream) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "stream*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
