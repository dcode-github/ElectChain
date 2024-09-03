package routes

import (
	"github.com/dcode-github/ElectChain/backend/controllers"
	"github.com/dcode-github/ElectChain/backend/middleware"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

func Routes(router *mux.Router, client *mongo.Client) {
	controllers.InitCollections(client)
	router.HandleFunc("/login", controllers.Login).Methods("POST")
	router.HandleFunc("/register", controllers.Register).Methods("POST")
	protectedRouter := router.PathPrefix("/").Subrouter()
	protectedRouter.Use(middleware.JWTAuthMiddleware)
	protectedRouter.HandleFunc("/user-dashboard", controllers.UserDashboard).Methods("GET")
	protectedRouter.HandleFunc("/admin-dashboard", controllers.AdminDashboard).Methods("GET")
}
