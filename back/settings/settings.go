package settings

import (
	"time"
	"github.com/dgrijalva/jwt-go"
)

const (
	Limit           = 30
	Offset          = 0
	MinuteSaveRedis = time.Minute * 10
)

var JwtKey = []byte("softlightweb_code_secret_@12a3dfscx#1789")
var LoginExpirationDuration = time.Duration(24) * time.Hour
var JwtSigningMethod = jwt.SigningMethodHS256
