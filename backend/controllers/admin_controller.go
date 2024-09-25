package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/models"
	"go.mongodb.org/mongo-driver/bson"
)

func AdminDashboard(w http.ResponseWriter, r *http.Request) {
	guestList, err := fetchGuestList(r.Context())
	fmt.Println(guestList)
	if err != nil {
		log.Println(err)
		http.Error(w, "Failed to fetch guest list", http.StatusNotFound)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(guestList); err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
		return
	}
}

func fetchGuestList(ctx context.Context) ([]*models.UserDetails, error) {
	var guests []*models.UserDetails

	cursor, err := guestCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var guest models.UserDetails
		if err := cursor.Decode(&guest); err != nil {
			return nil, err
		}
		guests = append(guests, &guest)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return guests, nil
}
