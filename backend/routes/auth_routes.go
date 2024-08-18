package routes

import (
	"github.com/dcode-github/ElectChain/backend/controllers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

func AuthRoutes(router *mux.Router, client *mongo.Client) {
	controllers.InitCollections(client)
	router.HandleFunc("/login", controllers.Login).Methods("POST")
	router.HandleFunc("/register", controllers.Register).Methods("POST")
}
