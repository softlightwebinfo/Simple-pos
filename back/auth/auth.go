package auth

import (
	"article/libraries"
	"article/proto"
	"article/settings"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/go-openapi/errors"
	"time"
)

type GraphModelAuthUsers struct {
	Id       int
	Email    string
	Password string
}
type GraphModelAuthUser struct {
	Users []GraphModelAuthUsers
}

type JwtToken struct {
	Token string `json:"token"`
}
type AuthUser struct {
	User  *proto.UserServiceModel `json:"user"`
	Token string                  `json:"token"`
	jwt.StandardClaims
}

type AutCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthModel struct {
	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	ExpirationTime time.Time
	Claims         *AuthUser
	Token          *jwt.Token
}

func (auth *AuthModel) Expired() {
	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	auth.ExpirationTime = time.Now().Add(settings.LoginExpirationDuration)
}
func (auth *AuthModel) CreateToken(user *proto.UserServiceModel) (token string, err error) {
	auth.Expired()
	// Create the JWT claims, which includes the username and expiry time
	auth.Claims = &AuthUser{
		User: user,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: auth.ExpirationTime.Unix(),
		},
	}
	// Declare the token with the algorithm used for signing, and the claims
	auth.Token = jwt.NewWithClaims(settings.JwtSigningMethod, auth.Claims)
	// Create the JWT string
	token, err = auth.Token.SignedString(settings.JwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		err = errors.New(400, `Error en crear el token`)
		return
	}
	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	/*
		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   tokenString,
			Expires: expirationTime,
		})
	*/

	return
}
func AuthDecodeUser(c *gin.Context) (user *AuthUser, isLogin bool) {
	u, exist := c.Get("user")
	if !exist {
		isLogin = false
		return
	}
	user = u.(*AuthUser)
	isLogin = true
	return
}
func ComparePasswordAndGenerateToken(user GraphModelAuthUsers, password string) (success bool) {
	if !libraries.ComparePasswords(user.Password, libraries.GetPwd(password)) {
		return false
	}
	return true
}
func IsAuthorized(tokenString string) *AuthUser {
	if len(tokenString) > 1 {
		// Parse takes the token string and a function for looking up the key. The latter is especially
		// useful if you use multiple keys for your application.  The standard is to use 'kid' in the
		// head of the token to identify which key to use, but the parsed token (head and claims) is provided
		// to the callback, providing flexibility.
		token, err := jwt.ParseWithClaims(tokenString, &AuthUser{}, func(token *jwt.Token) (interface{}, error) {
			// Don't forget to validate the alg is what you expect:
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
			return settings.JwtKey, nil
		})
		if claims, ok := token.Claims.(*AuthUser); ok && token.Valid {
			claims.Token = tokenString
			return claims
		} else {
			fmt.Println(err)
		}
	}
	return nil
}
