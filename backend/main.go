package main

import (
	"context"
	"log"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/config"
	"github.com/dcode-github/ElectChain/backend/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	client := config.ConnectDB()
	defer client.Disconnect(context.TODO())

	router := mux.NewRouter()
	routes.Routes(router, client)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
