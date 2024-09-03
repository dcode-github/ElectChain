package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/dcode-github/ElectChain/backend/utils"
)

func JWTAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		fmt.Println(parts)
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
			return
		}
		token := parts[1]

		claims, err := utils.ValidateJWT(token)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		x := r.WithContext(context.WithValue(r.Context(), "address", claims.Address))

		next.ServeHTTP(w, x)
	})
}
