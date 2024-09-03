package controllers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserDashboard(w http.ResponseWriter, r *http.Request) {
	address := r.URL.Query().Get("address")
	token := r.URL.Query().Get("token")

	_, err := utils.ValidateJWT(token)
	fmt.Println(err)
	if err != nil {
		http.Error(w, "Invlaid or expired token", http.StatusUnauthorized)
		return
	}

	userData, err := fetchUserData(r.Context(), address)
	if err != nil {
		http.Error(w, "Failed to fetch user data", http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Welcome to dashboard, %s !! \n", userData["name"])
	fmt.Fprintf(w, "Your address is \n", address)
}

func fetchUserData(ctx context.Context, address string) (bson.M, error) {
	var user bson.M
	err := userCollection.FindOne(ctx, bson.M{"address": address}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("User not found")
		}
		return nil, err
	}
	return user, nil
}
