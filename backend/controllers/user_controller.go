package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserDetails struct {
	Address string `json:"address"`
	Name    string `json:"name"`
	Age     string `json:"age"`
	Gender  string `json:"gender"`
	Email   string `json:"email"`
}

func UserDashboard(w http.ResponseWriter, r *http.Request) {
	address := middleware.FromContext(r.Context())
	if address == "" {
		http.Error(w, "Address not found in request context", http.StatusUnauthorized)
		return
	}
	log.Println("User address from context:", address)

	userDetails, err := fetchUserData(r.Context(), address)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to fetch user data", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(userDetails); err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
		return
	}
}

func fetchUserData(ctx context.Context, address string) (*UserDetails, error) {
	var user bson.M
	err := userCollection.FindOne(ctx, bson.M{"address": address}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("User not found")
		}
		return nil, err
	}
	userDetails := &UserDetails{
		Address: user["address"].(string),
		Name:    user["name"].(string),
		Age:     user["age"].(string),
		Gender:  user["gender"].(string),
		Email:   user["email"].(string),
	}

	return userDetails, nil
}
