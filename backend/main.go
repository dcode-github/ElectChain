package main

import (
	"context"
	"log"
	"net/http"

	"github.com/dcode-github/ElectChain/backend/config"
	"github.com/dcode-github/ElectChain/backend/routes"
	"github.com/gorilla/mux"
)

func main() {
	client := config.ConnectDB()
	defer client.Disconnect(context.TODO())

	router := mux.NewRouter()
	routes.Routes(router, client)

	log.Fatal(http.ListenAndServe(":8080", router))
}
