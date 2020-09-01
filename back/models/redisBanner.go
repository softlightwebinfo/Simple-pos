package models

import "github.com/go-redis/redis"

type RedisBanner struct {
}

func (then *RedisBanner) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "banner*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
