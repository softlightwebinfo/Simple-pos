package settings

import (
	"database/sql"
	"github.com/go-redis/redis"
)

var Db *sql.DB
var Redis *redis.Client
