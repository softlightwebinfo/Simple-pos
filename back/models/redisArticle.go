package models

import "github.com/go-redis/redis"

type RedisArticle struct {
}

func (then *RedisArticle) DeleteCache(redis *redis.Client) {
	iter := redis.Scan(0, "article*", 0).Iterator()
	for iter.Next() {
		err := redis.Del(iter.Val()).Err()
		if err != nil {
			panic(err)
		}
	}
}
