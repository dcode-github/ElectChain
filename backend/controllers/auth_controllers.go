package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection
var guestCollection *mongo.Collection

func InitCollections(client *mongo.Client) {
	userCollection = client.Database("ElectChain").Collection("voters")
	guestCollection = client.Database("ElectChain").Collection("guests")
}

type User struct {
	Address  string `json:"address"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Guest struct {
	Address  string `json:"address"`
	Name     string `json:"name"`
	Age      int    `json:"age"`
	Gender   string `json:"gender"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
	Address string `json:"address"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	var guestRequest Guest
	err := json.NewDecoder(r.Body).Decode(&guestRequest)
	if err != nil {
		http.Error(w, "Error parsing the request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	fmt.Printf("Guest request: %+v\n", guestRequest)

	var existingUser bson.M
	err = userCollection.FindOne(r.Context(), bson.M{"address": guestRequest.Address}).Decode(&existingUser)
	if err == nil {
		http.Error(w, "Address already in use", http.StatusConflict)
		return
	}
	if err != mongo.ErrNoDocuments {
		http.Error(w, "Error accessing database", http.StatusInternalServerError)
		return
	}

	var existingGuest bson.M
	err = guestCollection.FindOne(r.Context(), bson.M{"address": guestRequest.Address}).Decode(&existingGuest)
	if err == nil {
		http.Error(w, "Address already in use", http.StatusConflict)
		return
	}
	if err != mongo.ErrNoDocuments {
		http.Error(w, "Error accessing database", http.StatusInternalServerError)
		return
	}

	_, err = guestCollection.InsertOne(r.Context(), guestRequest)
	if err != nil {
		http.Error(w, "Error inserting guest into the database", http.StatusInternalServerError)
		return
	}

	response := LoginResponse{Message: "Registration successful"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var loginRequest User
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Error parsing the request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	fmt.Printf("Login request: %+v\n", loginRequest)

	var user bson.M
	err = userCollection.FindOne(r.Context(), bson.M{"address": loginRequest.Address}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "Address not found", http.StatusNotFound)
			return
		} else {
			http.Error(w, "Error accessing database", http.StatusInternalServerError)
			return
		}
	}

	if loginRequest.Password != user["password"].(string) {
		http.Error(w, "Wrong Password", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJWT(loginRequest.Address)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	response := LoginResponse{
		Message: "Login Successful",
		Token:   token,
		Address: loginRequest.Address,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
